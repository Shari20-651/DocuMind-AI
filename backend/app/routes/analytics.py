from fastapi import APIRouter
from app.services.supabase_service import supabase

router = APIRouter()

@router.get("/analytics")
def analytics():

    response = (
        supabase
        .table("documents")
        .select("*")
        .execute()
    )

    documents = response.data

    total_documents = len(documents)

    resumes = 0
    invoices = 0

    for doc in documents:

        if doc.get("ai_output"):
            resumes += 1
        else:
            invoices += 1

    return {
        "total_documents": total_documents,
        "resumes": resumes,
        "invoices": invoices
    }