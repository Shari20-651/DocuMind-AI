from docx import Document

def extract_text_from_docx(file_path):
    doc = Document(file_path)

    text = []

    for paragraph in doc.paragraphs:
        text.append(paragraph.text)

    return "\n".join(text)