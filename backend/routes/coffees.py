from fastapi import APIRouter, HTTPException

router = APIRouter(tags=["coffees"])

# 인메모리 더미
_COFFEES = {
    1: {"id":1, "name":"Demo Bean", "price":12000, "image_url":None, "flavor_json":{}}
}

@router.get("/coffees")
def list_coffees():
    return {"items": list(_COFFEES.values()), "total": len(_COFFEES)}

@router.get("/coffees/{coffee_id}")
def coffee_detail(coffee_id: int):
    c = _COFFEES.get(coffee_id)
    if not c:
        raise HTTPException(404, "coffee not found")
    return c

@router.get("/coffees/{coffee_id}/similar")
def similar(coffee_id: int, topk: int = 6):
    if coffee_id not in _COFFEES:
        raise HTTPException(404, "coffee not found")
    return []  # 스켈레톤