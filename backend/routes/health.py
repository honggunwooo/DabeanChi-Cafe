# routes/health.py
from fastapi import APIRouter, Depends
from sqlalchemy import text
from deps import get_db

router = APIRouter(prefix="/health", tags=["health"])

@router.get("")
def ok():
    return {"status": "ok"}

@router.get("/db")
def db_ok(db = Depends(get_db)):
    db.execute(text("SELECT 1"))
    return {"db": "ok"}