from fastapi import APIRouter

from app.services.embedding_service import generate_embedding
from app.services.supabase_service import semantic_search

router = APIRouter()


@router.post("/resume-ranking")
def resume_ranking(job_description: str):

    embedding = generate_embedding(
        job_description
    )

    results = semantic_search(
        embedding,
        match_count=50
    )

    print(results)

    ranked_resumes = []

    for resume in results:
        filename = resume.get(
            "filename",
            ""
        ).lower()

        if "resume" not in filename:
            continue

        ranked_resumes.append(
    {
        "id": resume["id"],
        "filename": resume["filename"],
        "candidate": resume["ai_output"].get(
            "name",
            "Unknown"
        ),
        "score": round(
            resume["similarity"] * 100
        )
    }
)

    ranked_resumes.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return ranked_resumes