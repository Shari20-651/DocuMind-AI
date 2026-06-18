# DocuMind-AI API Documentation

## Base URL

https://YOUR-RAILWAY-URL

---

## Health Check

### GET /

Returns application status.

Response:

```json
{
  "message": "Welcome to DocuMind-AI"
}
```

---

## Upload Document

### POST /upload

Uploads and processes documents.

Supported:

- Resume (.docx)
- Invoice (.docx)

Response:

```json
{
  "filename": "resume.docx",
  "document_type": "resume",
  "ai_output": {}
}
```

---

## Semantic Search

### GET /semantic-search

Query:

```text
cloud engineer
```

Returns similar documents using vector embeddings.

---

## Job Match

### POST /job-match

Example:

```text
Python developer with SQL, FastAPI, REST APIs
```

Response:

```json
{
  "match_score": 79,
  "matched_skills": [],
  "missing_skills": []
}
```

---

## Recruiter Dashboard

### GET /recruiter-dashboard

Provides:

- Resume statistics
- Skills summary
- Candidate insights

---

## Platform Analytics

### GET /platform-analytics

Provides:

- Total documents
- Resume count
- Invoice count
- Skill trends