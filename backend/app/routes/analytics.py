from fastapi import APIRouter

from app.services.supabase_service import (
    supabase
)

router = APIRouter()


@router.get("/platform-analytics")
def platform_analytics():
    response = (
        supabase
        .table("documents")
        .select("*, created_at")
        .execute()
    )

    documents = response.data or []

    documents = sorted(
    documents,
    key=lambda doc: doc.get("created_at", ""),
    reverse=True
)

    status_counts = {
    "Queued": 0,
    "Processing": 0,
    "AI Extracting": 0,
    "Generating Embeddings": 0,
    "Indexed": 0,
    "Completed": 0
}

    from collections import Counter
    from datetime import datetime

    total_documents = len(documents)

    resume_count = 0
    invoice_count = 0

    total_invoice_amount = 0

    skills = []
    upload_dates = []

    for doc in documents:
        created_at = doc.get("created_at")

        status = doc.get("processing_status")
        if status in status_counts:
            status_counts[status] += 1

        if created_at:
            # handle Zulu timezone suffix if present
            date = datetime.fromisoformat(created_at.replace("Z", "")).strftime("%Y-%m-%d")
            upload_dates.append(date)

        document_type = doc.get("document_type")

        ai_output = doc.get("ai_output") or {}

        if document_type == "resume":
            resume_count += 1

            skill_data = ai_output.get("skills", [])

            if isinstance(skill_data, list):
                skills.extend(skill_data)
            elif isinstance(skill_data, dict):
                skills.extend(skill_data.get("Programming Languages", []))

        elif document_type == "invoice":
            invoice_count += 1

            amount = ai_output.get("amount", "")

            try:
                amount = str(amount).replace("₹", "").replace(",", "").strip()
                total_invoice_amount += float(amount)
            except (ValueError, TypeError):
                pass

    skill_counter = Counter(skills)

    top_skills = [
    {
        "skill": skill,
        "count": count
    }
    for skill, count in skill_counter.most_common(5)
]

    upload_counter = Counter(upload_dates)

    upload_trends = [{"date": date, "count": upload_counter[date]} for date in sorted(upload_counter)]

    recent_documents = documents[:5]

    return {
    "total_documents": total_documents,
    "resume_count": resume_count,
    "invoice_count": invoice_count,
    "total_invoice_amount": total_invoice_amount,
    "top_skills": top_skills,
    "upload_trends": upload_trends,
    "status_counts": status_counts,
    "recent_documents": recent_documents
}