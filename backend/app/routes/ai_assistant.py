from fastapi import APIRouter

from app.services.embedding_service import generate_embedding
from app.services.supabase_service import semantic_search
from app.services.gemini_service import generate_response

router = APIRouter()


@router.post("/ask")
def ask_ai(question: str):

    question_embedding = generate_embedding(
    question,
    task_type="retrieval_query"
)

    documents = semantic_search(
        question_embedding,
        match_count=5
    )

    context = ""

    for doc in documents:

        context += (
            doc.get("extracted_text", "")
            + "\n\n"
        )

    prompt = f"""
Answer the question using ONLY the context below.

Context:
{context}

Question:
{question}
"""

    try:
        answer = generate_response(prompt)
    except Exception as e:
        answer = f"Gemini quota exceeded: {str(e)}"

    return {
    "question": question,
    "answer": answer,
    "documents": documents
}