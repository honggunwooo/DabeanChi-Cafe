from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile, File, Form
from pathlib import Path
import uuid, os
from pydantic import BaseModel, Field
from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import text

from deps import get_db, get_current_user

router = APIRouter(prefix="/api/coffee", tags=["coffee"])

# 업로드 디렉토리 설정
UPLOAD_DIR = Path("static/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

def _save_upload(file: UploadFile | None) -> str | None:
    if not file:
        return None
    # 확장자 유지 + 안전한 파일명 생성
    ext = os.path.splitext(file.filename or "")[1].lower()
    new_name = f"{uuid.uuid4().hex}{ext}"
    dest = UPLOAD_DIR / new_name
    with dest.open("wb") as f:
        f.write(file.file.read())
    # /static 으로 마운트되어 있다고 가정 → URL 경로만 보관
    return f"/static/uploads/{new_name}"

# 헬스 체크 (간단 테스트용) 
@router.get("/health", summary="Coffee router health check")
def coffee_health():
    return {"ok": True, "router": "coffee"}

# 스키마 
class CoffeeCreateIn(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    roastery: Optional[str] = Field(default=None, max_length=120)
    country: str = Field(min_length=1, max_length=100)
    region: str = Field(min_length=1, max_length=100)
    roast_level: str = Field(min_length=1, max_length=50)
    variety: Optional[str] = Field(default=None, max_length=120)
    altitude_meters: Optional[int] = Field(default=None, ge=0, le=4000)
    flavor_notes: Optional[str] = Field(default=None, max_length=255)
    price_krw: int = Field(ge=0)
    weight_grams: int = Field(ge=1)
    description: Optional[str] = None
    seller_description: Optional[str] = None
    image_url: Optional[str] = None
    created_at: Optional[datetime] = None

class CoffeeOut(BaseModel):
    id: int
    user_id: int
    name: str
    roastery: Optional[str] = None
    country: str
    region: str
    roast_level: str
    variety: Optional[str] = None
    altitude_meters: Optional[int] = None
    flavor_notes: Optional[str] = None
    price_krw: int
    weight_grams: int
    description: Optional[str] = None
    seller_description: Optional[str] = None
    image_url: Optional[str] = None
    created_at: Optional[datetime] = None

#  생성 (multipart/form-data + 파일 업로드 지원)
@router.post("/", response_model=dict, summary="Create Coffee")
def create_coffee(
    # 필수
    name: str = Form(...),
    country: str = Form(...),
    region: str = Form(...),
    roast_level: str = Form(...),
    price_krw: int = Form(...),
    weight_grams: int = Form(...),

    # 선택
    roastery: Optional[str] = Form(None),
    variety: Optional[str] = Form(None),
    altitude_meters: Optional[int] = Form(None),
    flavor_notes: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    seller_description: Optional[str] = Form(None),

    image: UploadFile | None = File(None),

    db: Session = Depends(get_db),
    user = Depends(get_current_user),
):
    try:
        # 이미지 저장
        image_url = _save_upload(image)

        # INSERT
        db.execute(text("""
            INSERT INTO coffee (
                user_id, name, roastery, country, region, roast_level,
                variety, altitude_meters, flavor_notes,
                price_krw, weight_grams,
                description, seller_description, image_url
            )
            VALUES (
                :user_id, :name, :roastery, :country, :region, :roast_level,
                :variety, :altitude_meters, :flavor_notes,
                :price_krw, :weight_grams,
                :description, :seller_description, :image_url
            )
        """), {
            "user_id": user.id,
            "name": name,
            "roastery": roastery,
            "country": country,
            "region": region,
            "roast_level": roast_level,
            "variety": variety,
            "altitude_meters": altitude_meters,
            "flavor_notes": flavor_notes,
            "price_krw": int(price_krw) if price_krw is not None else None,
            "weight_grams": int(weight_grams) if weight_grams is not None else None,
            "description": description,
            "seller_description": seller_description,
            "image_url": image_url,
        })
        db.commit()

        # 방금 생성한 id 조회 (MySQL)
        new_id = db.execute(text("SELECT LAST_INSERT_ID() AS id")).mappings().first()["id"]

        # 생성 레코드 반환
        row = db.execute(text("SELECT * FROM coffee WHERE id = :id"), {"id": new_id}).mappings().first()
        return dict(row)

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Coffee create failed: {e}")

# 원두 목록 조회 (리스트) 
from typing import Literal

@router.get("/", response_model=List[CoffeeOut])
def list_coffees(
    db: Session = Depends(get_db),
    q: Optional[str] = Query(None, description="이름/로스터리/향미 검색"),
    roast: Optional[str] = Query(None, description="Light/Medium/Dark 등"),
    country: Optional[str] = Query(None),
    region: Optional[str] = Query(None),
    sort: Literal["new", "price_low", "price_high"] = Query("new"),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
):
    try:
        # 기본 쿼리
        query = """
            SELECT *
            FROM coffee
            WHERE 1=1
        """
        params = {}

        # 검색(q): name/roastery/flavor_notes에서 LIKE
        if q:
            query += " AND (name LIKE :kw OR roastery LIKE :kw OR flavor_notes LIKE :kw)"
            params["kw"] = f"%{q}%"

        if roast:
            query += " AND roast_level = :roast"
            params["roast"] = roast
        if country:
            query += " AND country = :country"
            params["country"] = country
        if region:
            query += " AND region = :region"
            params["region"] = region

        # 정렬
        if sort == "price_low":
            query += " ORDER BY price_krw ASC, created_at DESC"
        elif sort == "price_high":
            query += " ORDER BY price_krw DESC, created_at DESC"
        else:  # "new"
            query += " ORDER BY created_at DESC"

        # 페이지네이션
        query += " LIMIT :limit OFFSET :offset"
        params["limit"] = limit
        params["offset"] = offset

        rows = db.execute(text(query), params).mappings().all()

        out: list[CoffeeOut] = []
        for r in rows:
            d = dict(r)

            # created_at: 드라이버가 문자열을 줄 수도 있어 대비
            ca = d.get("created_at")
            if isinstance(ca, str):
                try:
                    d["created_at"] = datetime.fromisoformat(ca)
                except Exception:
                    try:
                        d["created_at"] = datetime.strptime(ca, "%Y-%m-%d %H:%M:%S")
                    except Exception:
                        d["created_at"] = None

            # 숫자 필드 정규화 (NULL/문자 → 정수)
            def to_int(value, default):
                try:
                    if value is None:
                        return default
                    # bool도 int로 캐스팅
                    if isinstance(value, bool):
                        return int(value)
                    return int(value)
                except Exception:
                    return default

            d["price_krw"] = to_int(d.get("price_krw"), 0)
            d["weight_grams"] = to_int(d.get("weight_grams"), 0)
            d["altitude_meters"] = None if d.get("altitude_meters") is None else to_int(d.get("altitude_meters"), None)

            out.append(CoffeeOut(**d))
        return out
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"list_coffees failed: {e}")

# ====== 선택값 목록 (드롭다운용) ======
@router.get("/options", response_model=dict, summary="Dropdown Options")
def coffee_options(
    db: Session = Depends(get_db),
):
    try:
        # DISTINCT 값 가져오기 (NULL 제외)
        countries = [r[0] for r in db.execute(text("SELECT DISTINCT country FROM coffee WHERE country IS NOT NULL ORDER BY country")).all()]
        regions   = [r[0] for r in db.execute(text("SELECT DISTINCT region  FROM coffee WHERE region  IS NOT NULL ORDER BY region")).all()]
        roasts    = [r[0] for r in db.execute(text("SELECT DISTINCT roast_level FROM coffee WHERE roast_level IS NOT NULL ORDER BY roast_level")).all()]
        varieties = [r[0] for r in db.execute(text("SELECT DISTINCT variety FROM coffee WHERE variety IS NOT NULL ORDER BY variety")).all()]
        flavors   = [r[0] for r in db.execute(text("SELECT DISTINCT flavor_notes FROM coffee WHERE flavor_notes IS NOT NULL ORDER BY flavor_notes")).all()]

        # 기본 추천 세트 (데이터 없을 때 대비)
        defaults = {
            "roast_levels_default": ["Light", "Medium-Light", "Medium", "Medium-Dark", "Dark"],
            "regions_default": ["africa", "america-cent", "america-south", "asia"],
        }

        return {
            "countries": countries,
            "regions": regions,
            "roast_levels": roasts if roasts else defaults["roast_levels_default"],
            "varieties": varieties,
            "flavor_notes": flavors,
            "defaults": defaults,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"coffee_options failed: {e}")

# ====== 상세 조회 ======
@router.get("/{coffee_id}", response_model=CoffeeOut, summary="Get Coffee Detail")
def get_coffee_detail(
    coffee_id: int,
    db: Session = Depends(get_db),
):
    try:
        row = db.execute(
            text("SELECT * FROM coffee WHERE id = :id"),
            {"id": coffee_id},
        ).mappings().first()

        if not row:
            raise HTTPException(status_code=404, detail="Coffee not found")

        d = dict(row)

        # created_at 정규화
        ca = d.get("created_at")
        if isinstance(ca, str):
            try:
                d["created_at"] = datetime.fromisoformat(ca)
            except Exception:
                try:
                    d["created_at"] = datetime.strptime(ca, "%Y-%m-%d %H:%M:%S")
                except Exception:
                    d["created_at"] = None

        # 숫자 필드 정규화
        def to_int(value, default):
            try:
                if value is None:
                    return default
                if isinstance(value, bool):
                    return int(value)
                return int(value)
            except Exception:
                return default

        d["price_krw"] = to_int(d.get("price_krw"), 0)
        d["weight_grams"] = to_int(d.get("weight_grams"), 0)
        d["altitude_meters"] = None if d.get("altitude_meters") is None else to_int(d.get("altitude_meters"), None)

        return CoffeeOut(**d)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"get_coffee_detail failed: {e}")