"""
ReguGuard Backend — Setup & Run

1. Navigate to backend folder:
   cd backend

2. Create virtual environment:
   python -m venv venv
   source venv/bin/activate   (Mac/Linux)
   venv/Scripts/activate        (Windows)

3. Install dependencies:
   pip install -r requirements.txt

4. Add your API key to .env:
   ANTHROPIC_API_KEY=sk-ant-...

5. Run the server:
   python main.py
   OR
   uvicorn main:app --reload --port 8000

6. Test it's working:
   curl http://localhost:8000/health

7. In your Next.js project:
   - lib/api.ts is already set up to call this backend
   - Import: import { api } from "@/lib/api"
   - Usage: const alerts = await api.getAlerts("Coffee Shop", "Bangalore")

API Endpoints:
  GET  /health                — health check
  GET  /api/tasks?industry=X — get 10 compliance tasks
  POST /api/alerts            — get 3 regulation alerts
  POST /api/analyze-pdf       — analyze uploaded PDF law
  POST /api/analyze-text      — analyze text or sample law
  POST /api/score             — calculate Future-Proof Score
"""

import os

from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

load_dotenv()

from routes import alerts, analyzer, score, tasks

app = FastAPI(
    title="ReguGuard API",
    description="AI-powered compliance monitoring for small businesses",
    version="1.0.0",
)

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")


def _cors_allow_origins() -> list[str]:
    """Comma-separated FRONTEND_URL for production + Vercel preview, plus local dev."""
    parts = [o.strip() for o in FRONTEND_URL.split(",") if o.strip()]
    defaults = ["http://localhost:3000", "http://localhost:3001"]
    seen: set[str] = set()
    out: list[str] = []
    for o in parts + defaults:
        if o not in seen:
            seen.add(o)
            out.append(o)
    return out


_cors_regex = os.getenv("CORS_ORIGIN_REGEX", r"https://.*\.vercel\.app").strip()
_cors_kwargs: dict = {
    "allow_origins": _cors_allow_origins(),
    "allow_credentials": True,
    "allow_methods": ["*"],
    "allow_headers": ["*"],
}
if _cors_regex:
    _cors_kwargs["allow_origin_regex"] = _cors_regex

app.add_middleware(CORSMiddleware, **_cors_kwargs)

app.include_router(alerts.router, prefix="/api", tags=["Alerts"])
app.include_router(analyzer.router, prefix="/api", tags=["Analyzer"])
app.include_router(score.router, prefix="/api", tags=["Score"])
app.include_router(tasks.router, prefix="/api", tags=["Tasks"])


@app.exception_handler(RequestValidationError)
async def validation_error_handler(request: Request, exc: RequestValidationError):
    errors = []
    for error in exc.errors():
        errors.append({
            "field": " -> ".join(str(x) for x in error["loc"]),
            "message": error["msg"],
        })
    return JSONResponse(
        status_code=422,
        content={"detail": "Validation failed", "errors": errors},
    )


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    if isinstance(exc, StarletteHTTPException):
        detail = exc.detail
        if not isinstance(detail, str):
            detail = str(detail)
        return JSONResponse(status_code=exc.status_code, content={"detail": detail})
    print(f"[ERROR] {request.url.path}: {type(exc).__name__}: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": f"Server error: {str(exc)}"},
    )


@app.get("/")
def root():
    return {
        "status": "ok",
        "message": "ReguGuard API is running",
        "docs": "/docs",
        "version": "1.0.0",
    }


@app.get("/health")
def health():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn

    print("=" * 50)
    print("  ReguGuard API — Starting...")
    print(f"  CORS allowed for: {FRONTEND_URL}")
    print("  Docs: http://localhost:8000/docs")
    print("=" * 50)
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
