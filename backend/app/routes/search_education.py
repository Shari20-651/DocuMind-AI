from fastapi import APIRouter
from app.services.supabase_service import supabase

router = APIRouter()

@router.get("/search/education")
def search_by_education(degree: str):

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

        education_list = ai_output.get("education", [])

        for education in education_list:

            education_degree = education.get("degree", "")

            if degree.lower() in education_degree.lower():
                matching_documents.append(doc)
                break

    return matching_documents