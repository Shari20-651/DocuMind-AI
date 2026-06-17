from fastapi import APIRouter
from fastapi import Query
from app.services.supabase_service import supabase

router = APIRouter()


@router.get("/documents")
def get_documents():

    response = (
        supabase
        .table("documents")
        .select("*")
        .execute()
    )

    return response.data


@router.get("/documents/{document_id}")
def get_document(document_id: str):

    response = (
        supabase
        .table("documents")
        .select("*")
        .eq("id", document_id)
        .execute()
    )

    return response.data
@router.get("/search")
def search_documents(filename: str = Query(...)):

    response = (
        supabase
        .table("documents")
        .select("*")
        .ilike("filename", f"%{filename}%")
        .execute()
    )

    return response.data

@router.get("/search/skill")
def search_by_skill(skill: str):

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

        skills = ai_output.get("skills", [])

        for s in skills:
            if skill.lower() in s.lower():
                matching_documents.append(doc)
                break

    return matching_documents