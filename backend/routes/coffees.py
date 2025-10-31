from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import List, Optional

from deps import get_db
from config import get_current_user           # JWT 사용자 확인
from schemas import CoffeeCreate, CoffeeUpdate, CoffeeOut

router = APIRouter(prefix="/coffees", tags=["coffees"])

# 목록 조회 (페이지네이션)
@router.get("", response_model=List[CoffeeOut])
def list_coffees(
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
):
    sql = text("""
        SELECT id, seller_id, name, origin, roast_level, blend_type, process, price, image_url, description
        FROM coffees
        ORDER BY id DESC
        LIMIT :limit OFFSET :offset
    """)
    rows = db.execute(sql, {"limit": limit, "offset": offset}).mappings().all()
    return rows

# 상세 조회
@router.get("/{coffee_id}", response_model=CoffeeOut)
def get_coffee(coffee_id: int, db: Session = Depends(get_db)):
    sql = text("""
        SELECT id, seller_id, name, origin, roast_level, blend_type, process, price, image_url, description
        FROM coffees WHERE id = :id
    """)
    row = db.execute(sql, {"id": coffee_id}).mappings().first()
    if not row:
        raise HTTPException(status_code=404, detail="Coffee not found")
    return row

# 등록 (판매자: 로그인 필요)
@router.post("", response_model=CoffeeOut, status_code=status.HTTP_201_CREATED)
def create_coffee(
    payload: CoffeeCreate,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    sql = text("""
        INSERT INTO coffees (seller_id, name, origin, roast_level, blend_type, process, price, image_url, description)
        VALUES (:seller_id, :name, :origin, :roast_level, :blend_type, :process, :price, :image_url, :description)
    """)
    params = {
        "seller_id": user["id"],
        "name": payload.name,
        "origin": payload.origin,
        "roast_level": payload.roast_level,
        "blend_type": payload.blend_type,
        "process": payload.process,
        "price": payload.price,
        "image_url": payload.image_url,
        "description": payload.description,
    }
    result = db.execute(sql, params)
    db.commit()
    new_id = result.lastrowid

    return get_coffee(new_id, db)

# 수정 (본인 소유만)
@router.put("/{coffee_id}", response_model=CoffeeOut)
def update_coffee(
    coffee_id: int,
    payload: CoffeeUpdate,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    owner_check = db.execute(text("SELECT seller_id FROM coffees WHERE id=:id"), {"id": coffee_id}).first()
    if not owner_check:
        raise HTTPException(status_code=404, detail="Coffee not found")
    if owner_check[0] != user["id"]:
        raise HTTPException(status_code=403, detail="Not your item")

    # 동적 업데이트
    fields = []
    params = {"id": coffee_id}
    for k, v in payload.model_dump(exclude_none=True).items():
        fields.append(f"{k} = :{k}")
        params[k] = v
    if not fields:
        return get_coffee(coffee_id, db)

    sql = text(f"UPDATE coffees SET {', '.join(fields)} WHERE id = :id")
    db.execute(sql, params)
    db.commit()
    return get_coffee(coffee_id, db)

# 삭제 (본인 소유만)
@router.delete("/{coffee_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_coffee(
    coffee_id: int,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    owner_check = db.execute(text("SELECT seller_id FROM coffees WHERE id=:id"), {"id": coffee_id}).first()
    if not owner_check:
        raise HTTPException(status_code=404, detail="Coffee not found")
    if owner_check[0] != user["id"]:
        raise HTTPException(status_code=403, detail="Not your item")

    db.execute(text("DELETE FROM coffees WHERE id=:id"), {"id": coffee_id})
    db.commit()
    return None