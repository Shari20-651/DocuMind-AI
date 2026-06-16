from fastapi import APIRouter, UploadFile, File
import tempfile
import os

from app.services.supabase_service import (
    upload_to_storage,
    save_document_data
)

from app.services.text_extraction_service import (
    extract_text_from_docx
)

from app.services.gemini_service import (
    analyze_resume
)

router = APIRouter()


@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    content = await file.read()

    upload_to_storage(
        file.filename,
        content
    )

    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".docx"
    ) as temp_file:

        temp_file.write(content)
        temp_path = temp_file.name

    extracted_text = extract_text_from_docx(
        temp_path
    )

    ai_output = analyze_resume(
        extracted_text
    )

    save_document_data(
        file.filename,
        extracted_text,
        ai_output
    )

    os.remove(temp_path)

    return {
        "message": "Resume processed successfully",
        "filename": file.filename,
        "ai_output": ai_output
    }