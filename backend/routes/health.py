# backend/routes/health.py
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from sqlalchemy import text
from backend.database import engine

router = APIRouter()

@router.get("/db")
def db_health():
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return {"ok": True}
    except Exception as e:
        return JSONResponse(status_code=500, content={"ok": False, "error": str(e)})