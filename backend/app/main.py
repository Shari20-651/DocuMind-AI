from fastapi import FastAPI

from app.routes.upload import router as upload_router
from app.routes.analytics import router as analytics_router
from app.routes.search_name import router as search_name_router
from app.routes.documents import router as documents_router
from app.routes.search_email import router as search_email_router
from app.routes.search_education import router as search_education_router

app = FastAPI(
    title="DocuMind-AI",
    version="1.0.0"
)

app.include_router(upload_router)
app.include_router(documents_router)
app.include_router(analytics_router)
app.include_router(search_name_router)
app.include_router(search_email_router)
app.include_router(search_education_router)

@app.get("/")
def root():
    return {
        "message": "Welcome to DocuMind-AI"
    }