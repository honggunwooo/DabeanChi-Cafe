# config.py
import os
from datetime import datetime, timedelta
from jose import jwt, JWTError
from dotenv import load_dotenv
from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from passlib.context import CryptContext
from sqlalchemy import text
from database import get_db
from schemas import UserOut

# 비밀번호 해시 설정: bcrypt 72바이트 제한 회피용으로 bcrypt_sha256 사용
pwd_ctx = CryptContext(schemes=["bcrypt_sha256"], deprecated="auto")

# .env 로드
load_dotenv()

# 환경변수 래퍼
class Settings:
    JWT_SECRET = os.getenv("JWT_SECRET", "super-secret-change-me")
    JWT_ALG = os.getenv("JWT_ALG", "HS256")
    JWT_EXPIRE_MIN = int(os.getenv("JWT_EXPIRE_MIN", "60"))

settings = Settings()

# Authorization: Bearer <token>
security = HTTPBearer(auto_error=True)


def create_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.JWT_EXPIRE_MIN)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.JWT_SECRET, algorithm=settings.JWT_ALG)


# 토큰 → 사용자 조회 (UserOut 반환)
# 라우트에서: `user = Depends(get_current_user)` 로 주입

def get_current_user(
    creds: HTTPAuthorizationCredentials = Depends(security),
    db = Depends(get_db),
) -> UserOut:
    token = creds.credentials
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALG])
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    row = db.execute(
        text("SELECT id, email, nickname, created_at FROM users WHERE id = :id"),
        {"id": int(user_id)},
    ).first()
    if not row:
        raise HTTPException(status_code=401, detail="User not found")

    return UserOut.model_validate(dict(row._mapping))