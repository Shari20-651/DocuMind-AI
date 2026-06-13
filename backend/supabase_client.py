from dotenv import load_dotenv
from supabase import create_client
import os

load_dotenv()

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

supabase = create_client(url, key)

data = {
    "filename": "test_invoice.pdf",
    "extracted_text": "Invoice Number INV-001"
}

response = (
    supabase
    .table("documents")
    .insert(data)
    .execute()
)

print("Insert successful!")
print(response)