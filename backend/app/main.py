from fastapi import FastAPI
from app.routes.upload import router as upload_router

app = FastAPI(
    title="DocuMind-AI",
    version="1.0.0"
)

app.include_router(upload_router)

@app.get("/")
def root():
    return {
        "message": "Welcome to DocuMind-AI"
    }