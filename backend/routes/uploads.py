# routes/uploads.py
from fastapi import APIRouter, UploadFile, File, HTTPException, Request
from fastapi.responses import JSONResponse
from pathlib import Path
import time, shutil

router = APIRouter()

BASE_DIR = Path(__file__).resolve().parent.parent
STATIC_DIR = BASE_DIR / "static"
UPLOADS_DIR = STATIC_DIR / "uploads"
UPLOADS_DIR.mkdir(parents=True, exist_ok=True)

@router.post("/image")
async def upload_image(
    request: Request,
    # 보수적으로: file 또는 image 둘 다 허용 (Postman에서 key를 잘못 줘도 방어)
    file: UploadFile | None = File(default=None),
    image: UploadFile | None = File(default=None),
):
    # ---- 진단 로그 (원인 모를 422 잡을 때 도움됨)
    if request.headers.get("content-type","").startswith("multipart/form-data") is False:
        raise HTTPException(status_code=415, detail="Content-Type must be multipart/form-data")

    up = file or image
    if up is None:
        # FastAPI 기본 422 대신, 이해하기 쉬운 에러를 준다
        raise HTTPException(status_code=422, detail="Missing file field. Use key 'file' in form-data.")

    # 간단한 확장자 검증
    name = (up.filename or "upload.bin")
    ext = name.split(".")[-1].lower()
    if ext not in {"jpg","jpeg","png","gif","webp","bmp"}:
        # 이미지 아니어도 저장은 할 수 있지만, 요구사항상 이미지로 제한
        raise HTTPException(status_code=400, detail="Unsupported file type")

    ts = int(time.time())
    safe_name = f"{ts}_{name.replace(' ', '_')}"
    dest_path = UPLOADS_DIR / safe_name

    try:
        with dest_path.open("wb") as out:
            shutil.copyfileobj(up.file, out)
    finally:
        await up.close()

    # 정적 경로로 접근 가능하도록 DB에는 이 경로를 저장
    public_url = f"/static/uploads/{safe_name}"
    return JSONResponse({"message":"Upload success", "image_url": public_url})