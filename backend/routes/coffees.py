from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile, File, Form
from pathlib import Path
import uuid, os
from pydantic import BaseModel, Field, model_validator
from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import text
import joblib
import pandas as pd
import numpy
from joblib import load
from backend.deps import get_db, get_current_user


router = APIRouter(prefix="/api/coffee", tags=["coffee"])

ALLOWED_NOTES = ("berry", "chocolate", "floral", "fruit")




class RecommendIn(BaseModel):
    acid: Optional[float] = Field(default=None, ge=0, le=10)
    aicd: Optional[float] = Field(default=None, ge=0, le=10)  
    sweet: Optional[float] = Field(default=None, ge=0, le=10)
    body: Optional[float]  = Field(default=None, ge=0, le=10)
    cupnote: str = Field(..., description=f"향 라벨. 허용: {ALLOWED_NOTES}")

    @model_validator(mode="after")
    def _merge_acid(cls, v):
        if v.acid is None and v.aicd is not None:
            v.acid = v.aicd
        if v.acid is None or v.sweet is None or v.body is None:
            raise ValueError("acid, sweet, body는 모두 필요합니다 (0~10).")
        v.cupnote = (v.cupnote or "").strip().lower()
        if v.cupnote not in ALLOWED_NOTES:
            raise ValueError(f"cupnote는 {ALLOWED_NOTES} 중 하나여야 합니다.")
        return v

ALLOWED_IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp"}
MAX_UPLOAD_MB = 5

UPLOAD_DIR = Path("static/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

feature_cols = ["roast", "origin", "location"]
categories_dict = {
    "roast": ["Light", "Medium-Light", "Medium", "Dark"],
    "origin": ["Ethiopia", "Colombia", "Brazil", "Kenya"],
    "location": ["africa", "asia", "caribbean", "cent_america", "south_america"],
}

_model = None
_encoder = None
_loaded_from = None 

ROAST_MAP = {
    "light": "Light",
    "medium-light": "Medium-Light",
    "medium": "Medium",
    "dark": "Dark",
}
ORIGIN_MAP = { 
    "ethiopia": "Ethiopia",
    "colombia": "Colombia",
    "brazil": "Brazil",
    "kenya": "Kenya",
}
LOCATION_MAP = {
    "africa": "africa",
    "africa_arabia": "africa",
    "asia": "asia",
    "asia_pacific": "asia",
    "caribbean": "caribbean",
    "central_america": "cent_america",
    "cent_america": "cent_america",
    "america-cent": "cent_america",
    "south_america": "south_america",
    "america-south": "south_america",
}

# --- Heuristic fallback for taste when ML model is unavailable ---
def _heuristic_taste(roast_level: str) -> dict:
    """Return simple (acid, sweet, body) fallback in 0~10, rounded to 1 decimal.
    Light → higher acid / lower body, Dark → lower acid / higher body.
    """
    base = {"acid": 5.0, "sweet": 5.0, "body": 5.0}
    level = (roast_level or "").strip().lower()
    if "light" in level and "medium" not in level:  # Light
        base["acid"] += 2.0; base["body"] -= 1.0
    elif "medium-light" in level:
        base["acid"] += 1.0
    elif level == "medium":
        pass
    elif level == "dark":
        base["acid"] -= 2.0; base["body"] += 2.0
    # clamp and round
    for k in base:
        base[k] = round(max(0.0, min(10.0, base[k])), 1)
    return base

_taste_model = None


def _get_taste_model():
    """
    Lazy-load the taste prediction model. Return None if the artifact is missing or fails to load.
    """
    global _taste_model
    if _taste_model is not None:
        return _taste_model

    # model path: backend/taste/xgb_coffee_multitarget_model.joblib (relative to this file)
    path = Path(__file__).resolve().parents[2] / "taste" / "xgb_coffee_multitarget_model.joblib"
    if not path.exists():
        # Graceful: model optional. Return None so caller can skip prediction.
        _taste_model = None
        return _taste_model

    try:
        _taste_model = load(path)
    except Exception:
        # Graceful: treat as optional
        _taste_model = None

    return _taste_model

def predict_taste(country, method, altitude, variety):
    """
    Best-effort taste prediction.
    Returns dict like {"acid": float, "sweet": float, "body": float} or None when unavailable.
    """
    model = _get_taste_model()
    if model is None:
        return None

    # Normalize fields defensively
    method = (method or "").strip().lower()
    if "washed" in method:
        method = "washed"
    elif "natural" in method:
        method = "natural"
    else:
        method = "other"

    try:
        # altitude can be None or "", handle gracefully
        altitude = float(altitude) if altitude is not None and str(altitude).strip() != "" else None
    except Exception:
        altitude = None

    country = (country or "").strip()
    variety = (variety or "").strip()

    # If key features missing, skip prediction
    if not country or altitude is None or not variety:
        return None

    new_df = pd.DataFrame({
        "Country.of.Origin": [country],
        "Processing.Method": [method],
        "Altitude": [altitude],
        "Variety": [variety],
    })

    try:
        y_pred = model.predict(new_df)[0]
        acidity = round(float(y_pred[0]), 2) + 0.4
        sweet = round(float(y_pred[1]), 2) - 2.6
        body = round(float(y_pred[2]), 2) - 0.2
        return {"acid": acidity, "sweet": sweet, "body": body}
    except Exception:
        return None

def norm_roast(s: str) -> str:
    if not s: return ""
    k = s.strip().lower().replace(" ", "-")
    return ROAST_MAP.get(k, s)

def norm_origin(country: str) -> str:
    if not country: return ""
    k = country.strip().lower()
    return ORIGIN_MAP.get(k, country.title())

def norm_location(region: str) -> str:
    if not region: return ""
    k = region.strip().lower().replace(" ", "_").replace("-", "_")
    return LOCATION_MAP.get(k, k)

def _load():
    global _model, _encoder, _loaded_from
    if _model is not None and _encoder is not None:
        return

    base = Path(__file__).resolve().parents[1] / "cupnote"
    model_path = base / "xgb_coffee_model.joblib"
    enc_path   = base / "label_encoder_coffee.joblib"

    if not model_path.exists() or not enc_path.exists():
        raise RuntimeError(f"모델 또는 인코더가 존재하지 않음: {base}")

    _model = joblib.load(model_path)
    _encoder = joblib.load(enc_path)
    _loaded_from = str(base)

def f_predict(roast, origin, location):
    _load()

    X = pd.DataFrame([[roast, origin, location]], columns=feature_cols)

    for col in feature_cols:
        X[col] = X[col].astype("category").cat.set_categories(categories_dict[col])

    try:
        pred_encoded = int(_model.predict(X)[0])
        pred_label = _encoder.inverse_transform([pred_encoded])[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"inference failed: {str(e)}")

    return {
        "ok": True,
        "pred": pred_label,
        "loaded_from": _loaded_from
    }



def _save_upload(file: UploadFile | None) -> str | None:
    if not file:
        return None
    ext = os.path.splitext(file.filename or "")[1].lower()
    if ext not in ALLOWED_IMAGE_EXTS:
        raise HTTPException(status_code=400, detail=f"Unsupported image type: {ext}")

    new_name = f"{uuid.uuid4().hex}{ext}"
    dest = UPLOAD_DIR / new_name

    total = 0
    with dest.open("wb") as f:
        while True:
            chunk = file.file.read(1024 * 1024) 
            if not chunk:
                break
            total += len(chunk)
            if total > MAX_UPLOAD_MB * 1024 * 1024:
                try:
                    dest.unlink(missing_ok=True)
                except Exception:
                    pass
                raise HTTPException(status_code=400, detail=f"Image too large (>{MAX_UPLOAD_MB}MB)")
            f.write(chunk)
    return f"/static/uploads/{new_name}"

@router.get("/health", summary="Coffee router health check")
def coffee_health():
    return {"ok": True, "router": "coffee"}

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
    image_url: Optional[str] = None
    pro_method: Optional[str] = Field(default=None, max_length=100)
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
    image_url: Optional[str] = None
    pro_method: Optional[str]
    created_at: Optional[datetime] = None

@router.post("/", response_model=dict, summary="Create Coffee")
def create_coffee(
    name: str = Form(...),
    country: str = Form(...),
    region: str = Form(...),
    roast_level: str = Form(...),
    price_krw: int = Form(...),
    weight_grams: int = Form(...),
    pro_method: str = Form(...),

    acid: Optional[float] = Form(None),
    sweet: Optional[float] = Form(None),
    body: Optional[float] = Form(None),

    roastery: Optional[str] = Form(None),
    variety: Optional[str] = Form(None),
    altitude_meters: Optional[int] = Form(None),
    description: Optional[str] = Form(None),

    image: UploadFile | None = File(None),

    db: Session = Depends(get_db),
    user = Depends(get_current_user),
):
    try:
        image_url = _save_upload(image)

        db.execute(text("""
            INSERT INTO coffee (
                user_id, name, roastery, country, region, roast_level,
                variety, altitude_meters,
                price_krw, weight_grams,
                description, image_url, pro_method, created_at
            )
            VALUES (
                :user_id, :name, :roastery, :country, :region, :roast_level,
                :variety, :altitude_meters,
                :price_krw, :weight_grams,
                :description, :image_url, :pro_method, NOW()
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
            "price_krw": int(price_krw) if price_krw is not None else None,
            "weight_grams": int(weight_grams) if weight_grams is not None else None,
            "description": description,
            "pro_method" : pro_method,
            "image_url": image_url,
        })
        db.commit()

        new_id = db.execute(text("SELECT LAST_INSERT_ID() AS id")).mappings().first()["id"]

        # 3) 예측에 쓸 값 정규화 → predict 호출
        roast_norm = norm_roast(roast_level)
        origin_norm = norm_origin(country)
        location_norm = norm_location(region)

        note = None
        try:
            res = f_predict(roast_norm, origin_norm, location_norm)
            if isinstance(res, dict):
                note = res.get("pred")
        except Exception:
            note = None

        if note:
            db.execute(
                text("UPDATE coffee SET flavor_notes = :note WHERE id = :id"),
                {"note": note, "id": new_id}
            )
            db.commit()

        # --- Taste (acid/sweet/body) ---
        # Priority: explicit form value > ML prediction > heuristic fallback
        pred_acid = pred_sweet = pred_body = None
        try:
            res = predict_taste(country, pro_method, altitude_meters, variety)
            if isinstance(res, dict):
                pred_acid = res.get("acid")
                pred_sweet = res.get("sweet")
                pred_body = res.get("body")
        except Exception:
            pred_acid = pred_sweet = pred_body = None

        # choose values
        chosen = {
            "acid": acid if acid is not None else pred_acid,
            "sweet": sweet if sweet is not None else pred_sweet,
            "body": body if body is not None else pred_body,
        }

        # if any is still None, fill by heuristic
        if any(v is None for v in chosen.values()):
            h = _heuristic_taste(roast_level)
            for k in ("acid", "sweet", "body"):
                if chosen[k] is None:
                    chosen[k] = h[k]

        # sanitize numbers: cast to float, clip 0~10, round 1 decimal
        for k in chosen:
            try:
                val = float(chosen[k])
            except Exception:
                val = None
            if val is not None:
                val = max(0.0, min(10.0, val))
                val = round(val, 1)
            chosen[k] = val

        # single UPDATE (all 3 columns). They will never be None here due to heuristic, but keep safety.
        db.execute(
            text("UPDATE coffee SET acid = :acid, sweet = :sweet, body = :body WHERE id = :id"),
            {"acid": chosen["acid"], "sweet": chosen["sweet"], "body": chosen["body"], "id": new_id}
        )
        db.commit()

        row = db.execute(text("SELECT * FROM coffee WHERE id = :id"), {"id": new_id}).mappings().first()
        if not row:
            raise HTTPException(status_code=500, detail="Failed to fetch inserted coffee")
        return dict(row)

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Coffee create failed: {e}")

from typing import Literal

@router.get("/", response_model=List[CoffeeOut])
def list_coffees(
    db: Session = Depends(get_db),
    q: Optional[str] = Query(None, description="이름/로스터리/향미 검색"),
    roast: Optional[str] = Query(None, description="Light/Medium/Dark 등"),
    country: Optional[str] = Query(None),
    region: Optional[str] = Query(None),
    min_price: Optional[int] = Query(None, ge=0),
    max_price: Optional[int] = Query(None, ge=0),
    sort: Literal["new", "price_low", "price_high"] = Query("new"),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
):
    try:
        query = """
            SELECT *
            FROM coffee
            WHERE 1=1
        """
        params = {}

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
        if min_price is not None:
            query += " AND price_krw >= :min_price"
            params["min_price"] = min_price
        if max_price is not None:
            query += " AND price_krw <= :max_price"
            params["max_price"] = max_price

        if sort == "price_low":
            query += " ORDER BY price_krw ASC, created_at DESC"
        elif sort == "price_high":
            query += " ORDER BY price_krw DESC, created_at DESC"
        else:  
            query += " ORDER BY created_at DESC"

        query += " LIMIT :limit OFFSET :offset"
        params["limit"] = limit
        params["offset"] = offset

        rows = db.execute(text(query), params).mappings().all()

        out: list[CoffeeOut] = []
        for r in rows:
            d = dict(r)

            ca = d.get("created_at")
            if isinstance(ca, str):
                try:
                    d["created_at"] = datetime.fromisoformat(ca)
                except Exception:
                    try:
                        d["created_at"] = datetime.strptime(ca, "%Y-%m-%d %H:%M:%S")
                    except Exception:
                        d["created_at"] = None

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

            out.append(CoffeeOut(**d))
        return out
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"list_coffees failed: {e}")

@router.put("/{coffee_id}", response_model=CoffeeOut, summary="Update Coffee")
def update_coffee(
    coffee_id: int,
    name: Optional[str] = Form(None),
    country: Optional[str] = Form(None),
    region: Optional[str] = Form(None),
    roast_level: Optional[str] = Form(None),
    price_krw: Optional[int] = Form(None),
    weight_grams: Optional[int] = Form(None),
    roastery: Optional[str] = Form(None),
    variety: Optional[str] = Form(None),
    altitude_meters: Optional[int] = Form(None),
    flavor_notes: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    image: UploadFile | None = File(None),
    pro_method: Optional[str] = Form(None),
    db: Session = Depends(get_db),
    user = Depends(get_current_user),
):
    try:
        owner = db.execute(text("SELECT user_id FROM coffee WHERE id = :id"), {"id": coffee_id}).mappings().first()
        if not owner:
            raise HTTPException(status_code=404, detail="Coffee not found")
        if owner["user_id"] != user.id:
            raise HTTPException(status_code=403, detail="Forbidden: not owner")

        fields = {
            "name": name,
            "country": country,
            "region": region,
            "roast_level": roast_level,
            "price_krw": price_krw,
            "weight_grams": weight_grams,
            "roastery": roastery,
            "variety": variety,
            "altitude_meters": altitude_meters,
            "flavor_notes": flavor_notes,
            "description": description,
            "pro_method": pro_method,
        }
        set_parts = []
        params = {"id": coffee_id}
        for k, v in fields.items():
            if v is not None:
                set_parts.append(f"{k} = :{k}")
                params[k] = v

        if image is not None:
            image_url = _save_upload(image)
            set_parts.append("image_url = :image_url")
            params["image_url"] = image_url

        if not set_parts:
            row = db.execute(text("SELECT * FROM coffee WHERE id = :id"), {"id": coffee_id}).mappings().first()
            return CoffeeOut(**dict(row))

        sql = f"UPDATE coffee SET {', '.join(set_parts)} WHERE id = :id"
        db.execute(text(sql), params)
        db.commit()

        row = db.execute(text("SELECT * FROM coffee WHERE id = :id"), {"id": coffee_id}).mappings().first()
        return CoffeeOut(**dict(row))

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Coffee update failed: {e}")

@router.delete("/{coffee_id}", response_model=dict, summary="Delete Coffee")
def delete_coffee(
    coffee_id: int,
    db: Session = Depends(get_db),
    user = Depends(get_current_user),
):
    try:
        owner = db.execute(text("SELECT user_id FROM coffee WHERE id = :id"), {"id": coffee_id}).mappings().first()
        if not owner:
            raise HTTPException(status_code=404, detail="Coffee not found")
        if owner["user_id"] != user.id:
            raise HTTPException(status_code=403, detail="Forbidden: not owner")

        db.execute(text("DELETE FROM coffee WHERE id = :id"), {"id": coffee_id})
        db.commit()
        return {"ok": True, "deleted": coffee_id}
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Coffee delete failed: {e}")

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

        ca = d.get("created_at")
        if isinstance(ca, str):
            try:
                d["created_at"] = datetime.fromisoformat(ca)
            except Exception:
                try:
                    d["created_at"] = datetime.strptime(ca, "%Y-%m-%d %H:%M:%S")
                except Exception:
                    d["created_at"] = None

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
    
from fastapi import Query

@router.post("/recommend", summary="향 + 감각 점수로 추천", response_model=List[CoffeeOut])
def recommend(
    payload: RecommendIn,
    w_acid: float = Query(1.0, ge=0, description="acid 가중치"),
    w_sweet: float = Query(1.0, ge=0, description="sweet 가중치"),
    w_body: float  = Query(1.0, ge=0, description="body 가중치"),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
):
    """
    1) flavor_notes == cupnote 로 후보 선택
    2) (acid,sweet,body)와 목표값의 가중 유클리드 거리로 정렬
    3) CoffeeOut 리스트 반환 (id만 원하면 아래에서 ids만 뽑아서 반환해도 됨)
    """
    sql = f"""
        SELECT
            *,
            (
              {w_acid}  * POW(acid  - :acid,  2) +
              {w_sweet} * POW(sweet - :sweet, 2) +
              {w_body}  * POW(body  - :body,  2)
            ) AS dist2
        FROM coffee
        WHERE flavor_notes = :note
          AND acid IS NOT NULL AND sweet IS NOT NULL AND body IS NOT NULL
        ORDER BY dist2 ASC, created_at DESC
        LIMIT :limit OFFSET :offset
    """

    params = {
        "note": payload.cupnote,
        "acid": payload.acid,
        "sweet": payload.sweet,
        "body": payload.body,
        "limit": limit,
        "offset": offset,
    }

    rows = db.execute(text(sql), params).mappings().all()

    out: list[CoffeeOut] = []
    for r in rows:
        d = dict(r)
        ca = d.get("created_at")
        if isinstance(ca, str):
            try:
                d["created_at"] = datetime.fromisoformat(ca)
            except Exception:
                try:
                    d["created_at"] = datetime.strptime(ca, "%Y-%m-%d %H:%M:%S")
                except Exception:
                    d["created_at"] = None

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

        out.append(CoffeeOut(**d))
    return out
