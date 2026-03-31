#!/bin/bash
cd backend
uvicorn app.main:app --reload --port 5000
