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
        .select("*")
        .execute()
    )

    documents = response.data

    total_documents = len(documents)

    resume_count = 0
    invoice_count = 0

    total_invoice_amount = 0

    skills = []

    for doc in documents:

        document_type = doc.get(
            "document_type"
        )

        ai_output = doc.get(
            "ai_output"
        ) or {}

        if document_type == "resume":

            resume_count += 1

            skill_data = ai_output.get(
                "skills",
                []
            )

            if isinstance(skill_data, list):

                skills.extend(skill_data)

            elif isinstance(skill_data, dict):

                skills.extend(
                    skill_data.get(
                        "Programming Languages",
                        []
                    )
                )

        elif document_type == "invoice":

            invoice_count += 1

            amount = ai_output.get(
                "amount",
                ""
            )

            try:

                amount = (
                    str(amount)
                    .replace("₹", "")
                    .replace(",", "")
                    .strip()
                )

                total_invoice_amount += float(
                    amount
                )

            except:
                pass

    from collections import Counter

    top_skills = [
        skill
        for skill, count in
        Counter(skills).most_common(5)
    ]

    return {
        "total_documents": total_documents,
        "resume_count": resume_count,
        "invoice_count": invoice_count,
        "total_invoice_amount": total_invoice_amount,
        "top_skills": top_skills
    }