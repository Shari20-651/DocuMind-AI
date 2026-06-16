# DocuMind-AI

AI-powered document processing platform built with FastAPI, Supabase, and Google Gemini.

## Overview

DocuMind-AI is a cloud-native document intelligence platform that can:

* Upload documents
* Store files in Supabase Storage
* Extract document text
* Analyze content using Google Gemini
* Generate structured JSON outputs
* Store AI analysis results in Supabase Database

The platform is designed to support multiple document types such as resumes, invoices, contracts, reports, and research papers.

## Current Features

### Resume Processing Pipeline

* DOCX upload support
* Text extraction
* AI-powered resume analysis
* Structured data extraction:

  * Name
  * Email
  * Phone
  * Location
  * Skills
  * Education
  * Experience
* Storage of AI results in Supabase

### Backend Stack

* FastAPI
* Supabase Storage
* Supabase PostgreSQL
* Google Gemini
* Python

## Architecture

User Upload
↓
FastAPI API
↓
Supabase Storage
↓
Text Extraction
↓
Gemini Analysis
↓
Supabase Database

## Milestones Completed

* [x] Project Setup
* [x] GitHub Repository Setup
* [x] FastAPI Backend Structure
* [x] Supabase Integration
* [x] File Upload API
* [x] Text Extraction Engine
* [x] AI Resume Analysis
* [x] Database Persistence

## Upcoming Features

* Document Retrieval APIs
* Resume Search & Filtering
* Document Classification
* Invoice Analysis
* Contract Analysis
* Frontend Dashboard
* Semantic Search

## Status

MVP Progress: ~70%


