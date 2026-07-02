# DocuMind-AI
### Cloud-Native AI Document Processing Platform

> Process, search and analyze enterprise documents using AI-powered extraction, semantic search, OCR and vector indexing.

---

## Live Demo

**Frontend:**  
https://docu-mind-ai-two-ashy.vercel.app

**Backend API:**  
https://documind-ai-backend-gbry.onrender.com

**API Documentation:**  
https://documind-ai-backend-gbry.onrender.com/docs

---

## Features

- 📄 Resume Parsing
- 🧾 Invoice Information Extraction
- 🤖 Google Gemini AI Integration
- 🔍 Semantic Document Search
- 🧠 Vector Embeddings (pgvector)
- 📊 Interactive Analytics Dashboard
- 📈 Upload Trends
- 📑 AI Document Viewer
- 📂 Secure File Storage
- 🐳 Dockerized Deployment
- ☁️ Cloud Native Architecture

---

# System Architecture

```
                React + Vite
                     │
                     │ REST API
                     ▼
               FastAPI Backend
                     │
         ┌───────────┴───────────┐
         │                       │
         ▼                       ▼
 Google Gemini AI        Supabase PostgreSQL
                                │
                                ▼
                            pgvector
```

---

# Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- Recharts
- Lucide Icons

## Backend

- FastAPI
- Python
- Uvicorn

## Database

- PostgreSQL
- Supabase
- pgvector

## AI

- Google Gemini
- Vector Embeddings
- Semantic Search

## DevOps

- Docker
- Docker Compose
- GitHub
- Render
- Vercel

---

# Project Screenshots

## Dashboard

![Dashboard](assets/dashboard.png)

---

## Upload Page

![Upload](assets/upload.png)

---

## Analytics

![Analytics](assets/analytics1.png)
![Analytics Charts](assets/analytics2.png)

---

## AI Search

![AI Search](assets/search.png)

---

## Document Details

![Resume Details](assets/documentdetails1.png)
![Invoice Details](assets/documentdetails2.png)

---

# Folder Structure

```
DocuMind-AI
│
├── backend
│   ├── app
│   ├── routes
│   ├── services
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   ├── Dockerfile
│   └── package.json
│
└── docker-compose.yml
```

---

# Installation

Clone repository

```bash
git clone https://github.com/YOUR_USERNAME/DocuMind-AI.git

cd DocuMind-AI
```

Backend

```bash
cd backend

python -m venv venv

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# Docker

```bash
docker compose up --build
```

---

# API Endpoints

| Endpoint | Description |
|----------|-------------|
| POST /upload | Upload Document |
| GET /documents | Get Documents |
| GET /documents/{id} | Document Details |
| GET /platform-analytics | Analytics |
| POST /ask | AI Search |

---

# AI Workflow

```
Upload Document

↓

Extract Text

↓

Generate Embeddings

↓

Store in Supabase

↓

Semantic Search

↓

Gemini Response

↓

Analytics Dashboard
```

---

# Future Enhancements

- Authentication
- Multi-user Support
- OCR for Scanned PDFs
- RAG Pipeline
- AWS S3 Storage
- Kubernetes Deployment
- CI/CD with GitHub Actions

---

# Resume Highlights

- Built a production-ready AI-powered document intelligence platform.
- Integrated Google Gemini for intelligent document understanding.
- Implemented semantic search using pgvector embeddings.
- Developed analytics dashboards with React and Recharts.
- Dockerized and deployed the application on Render and Vercel.
- Designed REST APIs with FastAPI and PostgreSQL.

---

# Author

**SREEHARI K P**

GitHub

https://github.com/Shari20-651

LinkedIn

www.linkedin.com/in/sreehari-k-p-1b032928a

---

⭐ If you found this project useful, please give it a star!
