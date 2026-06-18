# DocuMind-AI Architecture

## Components

### Frontend

Future React Dashboard

### Backend

FastAPI

### AI Layer

Google Gemini API

### Database

Supabase PostgreSQL

### Vector Search

pgvector

### Deployment

Docker
Railway

---

## Workflow

User Uploads Document
        |
        V
FastAPI Upload Endpoint
        |
        V
Text Extraction
        |
        V
Document Classification
        |
        +---- Resume ----> Resume Analysis
        |
        +---- Invoice ---> Invoice Analysis
        |
        V
Generate Embeddings
        |
        V
Store in Supabase
        |
        V
Semantic Search / Analytics