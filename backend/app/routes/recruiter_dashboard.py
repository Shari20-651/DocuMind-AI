from fastapi import APIRouter
from app.services.supabase_service import supabase

router = APIRouter()

@router.get("/recruiter-dashboard")
def recruiter_dashboard():

    response = (
        supabase
        .table("documents")
        .select("*")
        .execute()
    )

    documents = response.data

    total_resumes = len(documents)

    vectorized_resumes = sum(
        1
        for doc in documents
        if doc.get("embedding")
    )

    skill_counts = {}

    top_candidates = []

    for doc in documents:

        ai_output = doc.get("ai_output") or {}

        name = ai_output.get("name")
        email = ai_output.get("email")

        if name:
            top_candidates.append(
                {
                    "name": name,
                    "email": email
                }
            )

        skills = ai_output.get("skills") or {}

        if isinstance(skills, dict):

            for category in skills.values():

                if isinstance(category, list):

                    for skill in category:

                        skill_counts[skill] = (
                            skill_counts.get(skill, 0) + 1
                        )

    top_skills = dict(
        sorted(
            skill_counts.items(),
            key=lambda x: x[1],
            reverse=True
        )[:10]
    )

    return {
        "total_resumes": total_resumes,
        "vectorized_resumes": vectorized_resumes,
        "top_skills": top_skills,
        "top_candidates": top_candidates[:5]
    }