from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import text

from config import pwd_ctx, create_token  # settings not needed here
from database import get_db
from schemas import UserCreate, UserOut, LoginRequest, Token

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/register", response_model=UserOut)
def register(payload: UserCreate, db=Depends(get_db)):
    try:
        exists = db.execute(
            text("SELECT id FROM users WHERE email = :email"), {"email": payload.email}
        ).first()
        if exists:
            raise HTTPException(status_code=400, detail="Email already registered")

        hashed_pw = pwd_ctx.hash(payload.password)  # bcrypt_sha256 적용
        db.execute(
            text(
                """
                INSERT INTO users (email, password_hash, nickname)
                VALUES (:email, :password_hash, :nickname)
                """
            ),
            {"email": payload.email, "password_hash": hashed_pw, "nickname": payload.nickname},
        )
        db.commit()

        db.commit()
        row = db.execute(
            text("SELECT id, email, nickname, created_at FROM users WHERE email = :email"),
            {"email": payload.email},
        ).first()
        return UserOut.model_validate(row._asdict())

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()

        # SQLAlchemy 2.0 Row -> use _mapping
        return UserOut.model_validate(dict(row._mapping))
    except HTTPException:
        raise
    except Exception:
        db.rollback()
        raise HTTPException(status_code=400, detail="Registration failed")

@router.post("/login", response_model=Token)
def login(payload: LoginRequest, db=Depends(get_db)):
    try:
        row = db.execute(
            text("SELECT id, email, password_hash FROM users WHERE email = :email"),
            {"email": payload.email},
        ).first()
        if not row:
            raise HTTPException(status_code=401, detail="Invalid credentials (no user)")

        stored_hash = row.password_hash

        if not pwd_ctx.verify(payload.password, stored_hash):
            raise HTTPException(status_code=401, detail="Invalid credentials (bad password)")

        if pwd_ctx.needs_update(stored_hash):
            new_hash = pwd_ctx.hash(payload.password)
            db.execute(
                text("UPDATE users SET password_hash = :h WHERE id = :id"),
                {"h": new_hash, "id": row.id},
            )
            db.commit()

        token = create_token({"sub": str(row.id)})
        return {"access_token": token, "token_type": "bearer"}

    except HTTPException:
        raise
    except Exception as e:
        # 🔎 임시: 에러 원인 그대로 노출
        raise HTTPException(status_code=400, detail=f"Login failed: {e!s}")