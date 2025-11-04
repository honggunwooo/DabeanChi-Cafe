from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from deps import get_db
from sqlalchemy import text
from fastapi.staticfiles import StaticFiles
from pathlib import Path
import os

# 라우터 import
from routes.health import router as health_router
from routes.auth import router as auth_router
from routes.profile import router as profile_router
from routes.coffees import router as coffees_router
from routes.recommend import router as recommend_router
from routes.analyze import router as analyze_router
from routes.favorites import router as favorites_router
from routes.uploads import router as upload_router


app = FastAPI(
    title="Dabeanchi Cafe API",
    description="원두 추천 & 컵노트 분석 기반 커피 마켓 API",
    version="1.0.0"
)

# === Static files (absolute path) ===
BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"
UPLOADS_DIR = STATIC_DIR / "uploads"

STATIC_DIR.mkdir(parents=True, exist_ok=True)
UPLOADS_DIR.mkdir(parents=True, exist_ok=True)


# === CORS ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],       # 배포 시 프론트 주소로 변경
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(coffees_router)
app.include_router(upload_router, prefix="/api/upload")
app.include_router(health_router)
app.include_router(auth_router)
app.include_router(profile_router)
app.include_router(recommend_router)
app.include_router(analyze_router)
app.include_router(favorites_router)
app.include_router(upload_router)


@app.get("/api/debug/static")
def debug_static():
    try:
        files = sorted(os.listdir(UPLOADS_DIR))
    except:
        files = []
    return {
        "base_dir": str(BASE_DIR),
        "static_dir": str(STATIC_DIR),
        "uploads_dir": str(UPLOADS_DIR),
        "uploads": files,
    }


@app.get("/")
def root():
    return {"message": "Dabeanchi Cafe API is running 🚀"}


@app.get("/api/db-test")
def db_test(db = Depends(get_db)):
    result = db.execute(text("SELECT 1 AS result")).mappings().first()
    return {"db_ok": result["result"] == 1}

@app.get("/api/debug/routes")
def debug_routes():
    return {"routes": [f"{r.path} [{','.join(r.methods or [])}]" for r in app.routes]}

@app.get("/")
def root():
    return {"message": "server ok"}