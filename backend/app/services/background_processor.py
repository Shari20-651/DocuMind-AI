from app.services.supabase_service import supabase


def update_processing_status(document_id: str, status: str):
    print(f"Updating {document_id} -> {status}")

    supabase.table("documents").update(
        {
            "processing_status": status
        }
    ).eq(
        "id",
        document_id
    ).execute()


def process_document(
    document_id,
    extracted_text,
    document_type,
    ai_output,
):

    print("Background task started")

    update_processing_status(
        document_id,
        "Processing"
    )

    update_processing_status(
        document_id,
        "AI Extracting"
    )

    update_processing_status(
        document_id,
        "Generating Embeddings"
    )

    update_processing_status(
        document_id,
        "Indexed"
    )

    update_processing_status(
        document_id,
        "Completed"
    )

    print("Background task finished")