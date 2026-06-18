from app.services.gemini_service import model

def classify_document(text):

    prompt = f"""
    Classify this document into ONE of the following categories:

    resume
    invoice
    contract
    report
    other

    Return ONLY the category name.

    Document:

    {text[:3000]}
    """

    response = model.generate_content(
        prompt
    )

    return response.text.strip().lower()