import google.generativeai as genai
import os
import json
from dotenv import load_dotenv

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-2.5-flash")


def analyze_resume(resume_text):

    prompt = f"""
    Extract the following information from this resume.

    Return ONLY valid JSON.

    Fields:
    - name
    - email
    - phone
    - location
    - skills
    - education
    - experience

    Resume:
    {resume_text}
    """

    response = model.generate_content(prompt)

    clean_text = response.text.replace(
        "```json",
        ""
    ).replace(
        "```",
        ""
    ).strip()

    return json.loads(clean_text)
def generate_response(prompt):

    try:
        response = model.generate_content(prompt)
        return response.text

    except Exception as e:

        return f"AI service unavailable: {str(e)}"