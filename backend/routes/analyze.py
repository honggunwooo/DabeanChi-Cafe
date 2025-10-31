from fastapi import APIRouter
router = APIRouter(tags=["analyze"])

@router.post("/analyze")
def analyze(data: dict):
    description = data.get("description", "")
    # 모델 붙기 전 스텁
    return {"flavor_profile": {}, "description": description}