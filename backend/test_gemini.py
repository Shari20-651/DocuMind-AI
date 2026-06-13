from dotenv import load_dotenv
from google import genai
import os

# Load environment variables from .env
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=api_key)

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="""
    Extract the following invoice information and return JSON only:

    Invoice Number: INV-001
    Vendor: ABC Electronics
    Amount: 25000
    Date: 2025-01-15
    """
)

print(response.text)