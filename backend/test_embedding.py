from app.services.embedding_service import generate_embedding

embedding = generate_embedding(
    "Python developer with AWS cloud experience"
)

print(type(embedding))
print(len(embedding))