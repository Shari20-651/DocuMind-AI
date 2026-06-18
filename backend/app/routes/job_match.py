from fastapi import APIRouter

from app.services.embedding_service import generate_embedding
from app.services.supabase_service import semantic_search
from app.services.job_match_service import compare_skills

router = APIRouter()


@router.post("/job-match")
def job_match(job_description: str):

    embedding = generate_embedding(
        job_description
    )

    results = semantic_search(
        embedding,
        match_count=10
    )

    top_resume = results[0]

    resume_skills = (
        top_resume["ai_output"]
        ["skills"]
        ["Programming Languages"]
    )

    matched, missing = compare_skills(
        job_description,
        resume_skills
    )

    score = round(
        top_resume["similarity"] * 100
    )

    return {
        "job_description": job_description,
        "match_score": score,
        "matched_skills": matched,
        "missing_skills": missing,
        "matches": results
    }