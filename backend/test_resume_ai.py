from app.services.text_extraction_service import extract_text_from_docx
from app.services.gemini_service import analyze_resume

text = extract_text_from_docx(
    r"C:\Users\shari\Downloads\Sreehari_Resume_Docusign_SE.docx"
)

result = analyze_resume(text)

print(result)