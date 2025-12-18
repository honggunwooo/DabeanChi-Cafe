# routes/favorites.py
from fastapi import APIRouter, Depends, HTTPException, Path, Query
from sqlalchemy import text
from database import get_db
from config import get_current_user   # 토큰 → 사용자

router = APIRouter(prefix="/api/favorites", tags=["favorites"])

@router.post("/{coffee_id}", status_code=201, summary="찜 추가")
def add_favorite(
    coffee_id: int = Path(..., ge=1),
    db=Depends(get_db),
    user=Depends(get_current_user),
):
    # 원두 존재 체크
    exists = db.execute(
        text("SELECT id FROM coffee WHERE id = :cid"),
        {"cid": coffee_id},
    ).first()
    if not exists:
        raise HTTPException(404, "Coffee not found")

    try:
        # 중복이면 타임스탬프만 최신화
        db.execute(
            text("""
                INSERT INTO favorites (user_id, coffee_id)
                VALUES (:uid, :cid)
                ON DUPLICATE KEY UPDATE created_at = CURRENT_TIMESTAMP
            """),
            {"uid": user.id, "cid": coffee_id},
        )
        db.commit()
        return {"ok": True, "coffee_id": coffee_id}
    except Exception as e:
        db.rollback()
        raise HTTPException(400, f"Add favorite failed: {e!s}")

@router.delete("/{coffee_id}", status_code=204, summary="찜 삭제")
def remove_favorite(
    coffee_id: int = Path(..., ge=1),
    db=Depends(get_db),
    user=Depends(get_current_user),
):
    res = db.execute(
        text("DELETE FROM favorites WHERE user_id=:uid AND coffee_id=:cid"),
        {"uid": user.id, "cid": coffee_id},
    )
    db.commit()
    if res.rowcount == 0:
        # 이미 없는 경우
        raise HTTPException(404, "Favorite not found")
    return  # 204 No Content

@router.get("", summary="내 찜 목록")
def list_favorites(
    limit: int = Query(12, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db=Depends(get_db),
    user=Depends(get_current_user),
):
    rows = db.execute(
        text("""
            SELECT c.id, c.name, c.image_url, c.roastery,
                   c.price_krw, c.weight_grams, c.roast_level,
                   c.country, c.region, c.created_at
            FROM favorites f
            JOIN coffee c ON c.id = f.coffee_id
            WHERE f.user_id = :uid
            ORDER BY f.created_at DESC
            LIMIT :limit OFFSET :offset
        """),
        {"uid": user.id, "limit": limit, "offset": offset},
    ).mappings().all()

    items = []
    for r in rows:
        d = dict(r)
        d["price_krw"] = int(d.get("price_krw") or 0)
        d["weight_grams"] = int(d.get("weight_grams") or 0)
        d["created_at"] = d["created_at"].isoformat() if d.get("created_at") else None
        items.append(d)

    total = db.execute(
        text("SELECT COUNT(*) FROM favorites WHERE user_id=:uid"),
        {"uid": user.id},
    ).scalar()

    return {"items": items, "count": len(items), "total": total, "limit": limit, "offset": offset}