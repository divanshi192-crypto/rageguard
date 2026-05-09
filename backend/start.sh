#!/bin/bash
set -e
cd "$(dirname "$0")"

echo "Installing dependencies..."
pip install -r requirements.txt
echo ""
echo "Starting ReguGuard API..."
echo "Docs available at: http://localhost:8000/docs"
echo ""
uvicorn main:app --reload --host 0.0.0.0 --port 8000
