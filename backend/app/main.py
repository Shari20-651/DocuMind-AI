from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.upload import router as upload_router
from app.routes.analytics import router as analytics_router
from app.routes.search_name import router as search_name_router
from app.routes.documents import router as documents_router
from app.routes.search_email import router as search_email_router
from app.routes.search_education import router as search_education_router
from app.routes.semantic_search import router as semantic_search_router
from app.routes.job_match import router as job_match_router
from app.routes.recruiter_dashboard import (
    router as recruiter_dashboard_router
)
from app.routes.platform_analytics import (
    router as platform_analytics_router
)

app = FastAPI(
    title="DocuMind-AI",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://documind-ai-production-a6d5.up.railway.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("CORS MIDDLEWARE LOADED")

app.include_router(upload_router)
app.include_router(documents_router)
app.include_router(analytics_router)
app.include_router(search_name_router)
app.include_router(search_email_router)
app.include_router(search_education_router)
app.include_router(semantic_search_router)
app.include_router(job_match_router)
app.include_router(recruiter_dashboard_router)
app.include_router(platform_analytics_router)

@app.get("/")
def root():
    return {
        "message": "Welcome to DocuMind-AI"
    }

@app.get("/test")
def test():
    return {
        "message": "cors working"
    }