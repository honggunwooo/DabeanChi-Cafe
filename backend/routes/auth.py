# routes/auth.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import text
from passlib.context import CryptContext

from deps import get_db
from schemas import UserCreate, UserOut, LoginRequest, Token
from config import create_token, get_current_user

router = APIRouter(prefix="/auth", tags=["auth"])
pwd_ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")


@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register(payload: UserCreate, db: Session = Depends(get_db)):
    # 1) 중복 이메일 확인
    exists = db.execute(
        text("SELECT id FROM users WHERE email = :email"),
        {"email": payload.email},
    ).first()
    if exists:
        raise HTTPException(status_code=409, detail="Email already registered")

    # 2) 비밀번호 해시
    # 72자 제한 주의 → 긴 비번은 잘라서 해시 (passlib bcrypt 제약)
    pw = payload.password
    if len(pw) > 72:
        pw = pw[:72]
    hashed = pwd_ctx.hash(pw)

    # 3) INSERT
    db.execute(
        text("""
            INSERT INTO users (email, password_hash, nickname)
            VALUES (:email, :password_hash, :nickname)
        """),
        {"email": payload.email, "password_hash": hashed, "nickname": payload.nickname},
    )
    db.commit()

    # 4) 방금 가입한 유저 조회 후 반환
    row = db.execute(
        text("SELECT id, email, nickname FROM users WHERE email = :email"),
        {"email": payload.email},
    ).first()

    return {"id": row.id, "email": row.email, "nickname": row.nickname}


@router.post("/login", response_model=Token)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    row = db.execute(
        text("SELECT id, email, password_hash FROM users WHERE email = :email"),
        {"email": payload.email},
    ).first()

    if not row:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # bcrypt 72바이트 이슈 동일 처리
    pw = payload.password
    if len(pw) > 72:
        pw = pw[:72]

    if not pwd_ctx.verify(pw, row.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_token({"sub": str(row.id)})
    return {"access_token": token, "token_type": "bearer"}


@router.get("/me", response_model=UserOut)
def me(current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    # get_current_user가 user_id를 넘겨주도록 되어 있음
    user_id = current_user.id if hasattr(current_user, "id") else current_user
    row = db.execute(
        text("SELECT id, email, nickname FROM users WHERE id = :id"),
        {"id": user_id},
    ).first()
    if not row:
        raise HTTPException(status_code=404, detail="User not found")

    return {"id": row.id, "email": row.email, "nickname": row.nickname}