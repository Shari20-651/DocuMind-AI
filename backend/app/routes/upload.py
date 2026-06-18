from app.services.embedding_service import generate_embedding
from app.services.supabase_service import update_embedding
from fastapi import APIRouter, UploadFile, File
from app.services.classification_service import (
    classify_document
)
from app.services.invoice_service import (
    analyze_invoice
)
from app.services.pdf_extraction_service import (
    extract_text_from_pdf
)
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
        suffix=os.path.splitext(
    file.filename
)[1]
    ) as temp_file:

        temp_file.write(content)
        temp_path = temp_file.name

    if file.filename.endswith(".pdf"):

       extracted_text = extract_text_from_pdf(
        temp_path
    )

    else:

        extracted_text = extract_text_from_docx(
        temp_path
    )

    document_type = classify_document(
        extracted_text
    )

    if document_type == "resume":

        ai_output = analyze_resume(
            extracted_text
        )

    elif document_type == "invoice":

        ai_output = analyze_invoice(
            extracted_text
        )

    else:

        ai_output = {
            "message": "No extractor available"
        }

    saved_doc = save_document_data(
        file.filename,
        extracted_text,
        ai_output,
        document_type
    )

    embedding = generate_embedding(
        extracted_text[:8000]
    )

    document_id = saved_doc.data[0]["id"]

    update_embedding(
        document_id,
        embedding
    )

    os.remove(temp_path)

    return {
        "message": "Document processed successfully",
        "filename": file.filename,
        "document_type": document_type,
        "ai_output": ai_output
    }