from app.services.text_extraction_service import extract_text_from_docx

text = extract_text_from_docx(
    r"C:\Users\shari\Downloads\Sreehari_Resume_Docusign_SE.docx"
)

print(text)