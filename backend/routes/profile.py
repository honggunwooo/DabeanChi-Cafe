from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(tags=["profile"])

class TasteIn(BaseModel):
    taste: List[str] = []
    aroma: List[str] = []
    body: Optional[str] = None

@router.get("/profile")
def get_profile():
    return {"id": 1, "nickname": "홍박사", "role": "buyer"}

@router.get("/profile/taste")
def get_taste():
    return {"taste": [], "aroma": [], "body": None}

@router.post("/profile/taste")
def set_taste(pref: TasteIn):
    return {"saved": True, "pref": pref}