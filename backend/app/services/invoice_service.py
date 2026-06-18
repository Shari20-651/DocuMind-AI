from app.services.gemini_service import model
import json

def analyze_invoice(text):

    prompt = f"""
    Extract invoice information and return ONLY valid JSON.

    {{
        "invoice_number": "",
        "vendor": "",
        "invoice_date": "",
        "amount": ""
    }}

    Invoice Text:

    {text[:5000]}
    """

    response = model.generate_content(
    prompt
    )

    text = response.text

    text = text.replace(
    "```json",
    ""
    )

    text = text.replace(
    "```",
    ""
    )

    text = text.strip()

    try:
       return json.loads(text)

    except Exception:

        return {
        "raw_output": text
        }