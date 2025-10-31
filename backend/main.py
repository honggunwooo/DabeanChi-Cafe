from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from deps import get_db
from sqlalchemy import text
from dotenv import load_dotenv

# 라우터 import
from routes.health import router as health_router
from routes.auth import router as auth_router
from routes.profile import router as profile_router
from routes.coffees import router as coffees_router
from routes.recommend import router as recommend_router
from routes.analyze import router as analyze_router
from routes.favorites import router as favorites_router



app = FastAPI(
    title="Dabeanchi Cafe API",
    description="원두 추천 & 컵노트 분석 기반 커피 마켓 API",
    version="1.0.0"
)

# CORS 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],       # 배포 시 프론트 주소 넣기
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 연결 
app.include_router(auth_router)
app.include_router(health_router, prefix="/api/health")
app.include_router(auth_router, prefix="/api")
app.include_router(profile_router, prefix="/api")
app.include_router(coffees_router, prefix="/api")
app.include_router(recommend_router, prefix="/api")
app.include_router(analyze_router, prefix="/api")
app.include_router(favorites_router, prefix="/api")



@app.get("/")
def root():
    return {"message": "Dabeanchi Cafe API is running 🚀"}

@app.get("/db-test")
def db_test(db = Depends(get_db)):
    result = db.execute(text("SELECT 1 AS result")).mappings().first()
    return {"db_ok": result["result"] == 1}

@app.get("/.well-known/appspecific/com.chrome.devtools.json")
def chrome_probe_stub():
    # 크롬이 찾는 파일. 비어있는 JSON으로 응답
    return {}