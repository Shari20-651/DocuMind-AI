from dotenv import load_dotenv
from supabase import create_client
import os

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(
    SUPABASE_URL,
    SUPABASE_KEY
)

def upload_to_storage(file_name, file_content):
    response = (
        supabase
        .storage
        .from_("document-uploads")
        .upload(
            file_name,
            file_content,
            {"upsert": "true"}
        )
    )

    return response

def save_document_data(
    filename,
    extracted_text,
    ai_output
):
    response = (
        supabase.table("documents")
        .insert(
            {
                "filename": filename,
                "extracted_text": extracted_text,
                "ai_output": ai_output
            }
        )
        .execute()
    )

    return response

def update_embedding(
    document_id,
    embedding
):
    response = (
        supabase
        .table("documents")
        .update(
            {
                "embedding": embedding
            }
        )
        .eq("id", document_id)
        .execute()
    )

    return response