# backend/deps.py
from fastapi import Depends, HTTPException, Request
from sqlalchemy import text
from types import SimpleNamespace
import jwt

from config import settings, get_db  # get_db는 config.py에 있어야 함

def get_current_user(request: Request, db=Depends(get_db)):
    """
    Authorization: Bearer <JWT> 에서 토큰을 꺼내 디코드 후
    users 테이블에서 사용자 조회. 없으면 401.
    """
    auth = request.headers.get("Authorization")
    if not auth or not auth.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")

    token = auth.split(" ", 1)[1].strip()
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALG])
        user_id = int(payload.get("sub"))
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    row = db.execute(
        text("SELECT id, email, nickname FROM users WHERE id = :id"),
        {"id": user_id}
    ).first()
    if not row:
        raise HTTPException(status_code=401, detail="User not found")

    return SimpleNamespace(**row._asdict())