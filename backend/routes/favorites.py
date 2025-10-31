from fastapi import APIRouter

router = APIRouter(tags=["favorites"])

# 인메모리
_FAVS = set()

@router.get("/favorites")
def list_favs():
    return {"items": list(_FAVS)}

@router.post("/favorites/{coffee_id}/toggle")
def toggle_fav(coffee_id: int):
    if coffee_id in _FAVS:
        _FAVS.remove(coffee_id)
        return {"status":"removed"}
    _FAVS.add(coffee_id)
    return {"status":"added"}