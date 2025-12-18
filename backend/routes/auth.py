from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import text

from config import pwd_ctx, create_token, get_current_user   
from database import get_db
from schemas import UserCreate, UserOut, LoginRequest, Token

router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/register", response_model=UserOut)
def register(payload: UserCreate, db=Depends(get_db)):
    try:
        # 이메일 중복 체크
        exists = db.execute(
            text("SELECT id FROM users WHERE email = :email"),
            {"email": payload.email},
        ).first()
        if exists:
            raise HTTPException(status_code=400, detail="Email already registered")

        # 비밀번호 해시 (bcrypt_sha256 사용 권장)
        hashed_pw = pwd_ctx.hash(payload.password)

        # 사용자 생성
        db.execute(
            text("""
                INSERT INTO users (email, password_hash, nickname)
                VALUES (:email, :password_hash, :nickname)
            """),
            {"email": payload.email, "password_hash": hashed_pw, "nickname": payload.nickname},
        )
        db.commit()

        # 방금 만든 사용자 조회
        row = db.execute(
            text("SELECT id, email, nickname, created_at FROM users WHERE email = :email"),
            {"email": payload.email},
        ).first()
        return UserOut.model_validate(dict(row._mapping))

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        # 개발 중에는 원인 노출이 디버깅에 유리
        raise HTTPException(status_code=400, detail=f"Registration failed: {e!s}")

@router.post("/login", response_model=Token)
def login(payload: LoginRequest, db=Depends(get_db)):
    try:
        row = db.execute(
            text("SELECT id, email, password_hash FROM users WHERE email = :email"),
            {"email": payload.email},
        ).first()
        if not row:
            raise HTTPException(status_code=401, detail="Invalid credentials")

        stored_hash = row.password_hash
        # 비밀번호 검증
        if not pwd_ctx.verify(payload.password, stored_hash):
            raise HTTPException(status_code=401, detail="Invalid credentials")

        # 필요 시 해시 업그레이드
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
        raise HTTPException(status_code=400, detail=f"Login failed: {e!s}")


# 내 프로필 + 찜 목록
@router.get("/me", summary="내 프로필")
def me(
    db=Depends(get_db),
    user=Depends(get_current_user),
    fav_limit: int = Query(12, ge=1, le=100),
    fav_offset: int = Query(0, ge=0),
):
    """
    - 프로필 기본정보만 반환
    """
    # 프로필 정보
    profile = {
        "id": user.id,
        "email": getattr(user, "email", None),
        "nickname": getattr(user, "nickname", None),
        "created_at": getattr(user, "created_at", None),
    }

    return {
        "profile": profile
    }
