from fastapi import APIRouter
from app.services.supabase_service import supabase

router = APIRouter()

@router.get("/search/email")
def search_by_email(email: str):

    response = (
        supabase
        .table("documents")
        .select("*")
        .execute()
    )

    matching_documents = []

    for doc in response.data:

        ai_output = doc.get("ai_output")

        if not ai_output:
            continue

        document_email = ai_output.get("email", "")

        if email.lower() in document_email.lower():
            matching_documents.append(doc)

    return matching_documents