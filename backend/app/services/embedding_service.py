from dotenv import load_dotenv
import google.generativeai as genai
import os

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

def generate_embedding(
    text,
    task_type="retrieval_document"
):

    result = genai.embed_content(
        model="models/gemini-embedding-001",
        content=text,
        task_type=task_type
    )

    return result["embedding"]