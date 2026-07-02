from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.upload import router as upload_router
from app.routes.analytics import router as analytics_router
from app.routes.search_name import router as search_name_router
from app.routes.documents import router as documents_router
from app.routes.search_email import router as search_email_router
from app.routes.semantic_search import router as semantic_search_router
from app.routes.ai_assistant import router as ai_router

app = FastAPI(
    title="DocuMind-AI",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://docu-mind-ai-two-ashy.vercel.app",
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
app.include_router(semantic_search_router)
app.include_router(ai_router)

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