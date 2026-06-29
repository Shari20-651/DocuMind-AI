from fastapi import APIRouter

from app.services.embedding_service import (
    generate_embedding
)

from app.services.supabase_service import (
    semantic_search
)

router = APIRouter()

@router.get("/semantic-search")
def search(query: str):

    query_embedding = generate_embedding(
    query,
    task_type="retrieval_query"
)

    results = semantic_search(
        query_embedding
    )

    return results

