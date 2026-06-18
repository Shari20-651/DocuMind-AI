from app.services.classification_service import (
    classify_document
)

sample_text = """
John Doe
Python Developer
Skills:
Python
SQL
AWS
"""

result = classify_document(
    sample_text
)

print(result)