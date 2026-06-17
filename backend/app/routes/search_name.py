from fastapi import APIRouter
from app.services.supabase_service import supabase

router = APIRouter()

@router.get("/search/name")
def search_by_name(name: str):

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

        document_name = ai_output.get("name", "")

        if name.lower() in document_name.lower():
            matching_documents.append(doc)

    return matching_documents