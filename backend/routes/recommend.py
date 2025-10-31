from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional, Dict, Any

router = APIRouter(tags=["recommend"])

class RecommendIn(BaseModel):
    taste: List[str] = []
    aroma: List[str] = []
    body: Optional[str] = None
    filters: Dict[str, Any] = {}
    topk: int = 8

@router.post("/recommend")
def recommend(payload: RecommendIn):
    return {"items": [], "criteria": payload}