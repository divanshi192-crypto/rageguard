# ReguGuard

AI-assisted compliance demo for small businesses: **Next.js** marketing site + interactive **demo** wired to a **FastAPI** backend (Groq/optional Claude).

## Repository layout

| Path | Role |
|------|------|
| `reguguard/` | Next.js 14 app (App Router): `/`, `/demo`, `/pricing`, `/features`, `not-found` |
| `backend/` | FastAPI app: `main.py`, `routes/`, `services/`, `models/` |
| `render.yaml` | Render Blueprint: Docker web service → `backend/Dockerfile` |
| `.python-version` | `3.12.11` (local/tooling hint) |
| `START-PRESENTATION.bat` / `START-FRONTEND.bat` | Windows helpers (optional) |

## Frontend (`reguguard/`)

| Item | Detail |
|------|--------|
| Runtime | Node.js; **Next.js `14.2.35`**, **React `^18`** |
| Language | **TypeScript `^5`** (strict) |
| Styling | **Tailwind CSS `3.4.1`**, `tailwind-merge`, `tw-animate-css` |
| UI | **Radix** (`@radix-ui/react-tabs`, `react-accordion`), **@base-ui/react**, **shadcn**-style pieces (`components/ui/*`, `components.json`) |
| Motion | **Framer Motion `^12.38.0`** |
| Icons | **lucide-react** |
| Config | `next.config.mjs`, `postcss.config.mjs`, `tailwind.config.ts`, `tsconfig.json` (`@/*` → `./*`) |
| API client | `lib/api.ts` — `fetch` to `NEXT_PUBLIC_API_URL` (default `http://localhost:8000`) |
| Demo | `app/demo/page.tsx` — dashboard / upload law / score; calls backend APIs |
| Deploy | **Vercel**: set **Root Directory** to `reguguard`; **Output Directory** must stay **empty** (Next default). `vercel.json`: `framework: nextjs`, `regions: [iad1]` |

**Scripts:** `npm run dev` · `npm run build` · `npm run start` · `npm run lint`

## Backend (`backend/`)

| Item | Detail |
|------|--------|
| Runtime | **Python 3.12.x** (Dockerfile: `python:3.12.11-slim-bookworm`) |
| Framework | **FastAPI `0.115.0`**, **Starlette** (via FastAPI) |
| Server | **Uvicorn `[standard]` `0.30.0`** |
| Validation | **Pydantic `2.9.0`** |
| AI | **Groq** OpenAI-compatible API (`httpx`, env `GROQ_*`); optional **Anthropic** (`anthropic` SDK) if `GROQ_API_KEY` unset |
| PDF | **PyPDF2 `3.0.1`** (`services/pdf_service.py`) |
| Uploads | **python-multipart `0.0.12`** |
| Config | **python-dotenv `1.0.0`** |

**Entry:** `uvicorn main:app --host 0.0.0.0 --port $PORT` (Render sets `PORT`; local: `python main.py` or same uvicorn command).

**Modules:**

- `routes/alerts.py` — `POST /api/alerts`
- `routes/analyzer.py` — `POST /api/analyze-text`, `POST /api/analyze-pdf` (multipart `file` + form `industry`, `location`)
- `routes/score.py` — `POST /api/score`
- `routes/tasks.py` — `GET /api/tasks`, `POST /api/tasks/complete`
- `services/claude_service.py` — `call_claude`, `call_claude_json` (Groq-first, then Anthropic)
- `models/schemas.py` — Pydantic request/response models

**Errors:** `main.py` registers `RequestValidationError` → `422` JSON `{ detail, errors[] }`; broad `Exception` → `500` (with `HTTPException` passthrough).

**CORS:** `FRONTEND_URL` comma-separated origins + localhost defaults; optional `CORS_ORIGIN_REGEX` (default allows `https://.*\.vercel\.app`).

## HTTP API (prefix `/api` from `main.py`)

| Method | Path | Body / params |
|--------|------|----------------|
| `GET` | `/` | API metadata |
| `GET` | `/health` | Liveness |
| `GET` | `/api/tasks` | `?industry=` |
| `POST` | `/api/tasks/complete` | JSON `task_ids`, `industry` |
| `POST` | `/api/alerts` | JSON `industry`, `location` |
| `POST` | `/api/analyze-text` | JSON `text`, `industry`, `location` (`text`=`"sample"` uses built-in sample) |
| `POST` | `/api/analyze-pdf` | `multipart/form-data`: `file`, `industry`, `location` |
| `POST` | `/api/score` | JSON `completed_tasks`, `total_tasks`, `industry` |

OpenAPI: `/docs` (Swagger).

## Environment variables

**Backend** (copy `backend/.env.example` → `.env`; never commit `.env`):

- **`GROQ_API_KEY`** — required for live AI (empty → fallbacks / errors on AI routes as implemented).
- **`FRONTEND_URL`** — browser origins for CORS (comma-separated). Needed for production frontend host(s).
- **`GROQ_MODEL`**, **`GROQ_BASE_URL`** — optional; defaults in `claude_service.py`.
- **`ANTHROPIC_API_KEY`** — optional; used if Groq not configured.
- **`CORS_ORIGIN_REGEX`** — optional; set empty to disable Vercel-preview regex.

**Frontend** (`reguguard/.env.example` → `.env.local`):

- **`NEXT_PUBLIC_API_URL`** — backend base URL (no trailing slash), e.g. `http://localhost:8000` or `https://<render-service>.onrender.com`.

## Local development

```bash
# Backend
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate  |  Unix: source .venv/bin/activate
pip install -r requirements.txt
# Set GROQ_API_KEY in .env
python main.py
```

```bash
# Frontend
cd reguguard
npm install
npm run dev
```

- Site: `http://localhost:3000` (or next free port).
- API: `http://localhost:8000` · Docs: `http://localhost:8000/docs`
- Demo: `/demo`

## Docker (backend)

```bash
cd backend
docker build -t reguguard-api .
docker run -p 8000:8000 -e PORT=8000 --env-file .env reguguard-api
```

`.dockerignore` excludes `.venv`, `.env`, caches.

## Deploy

| Target | Notes |
|--------|--------|
| **Render** | `render.yaml`: `runtime: docker`, `dockerfilePath: ./backend/Dockerfile`, `dockerContext: ./backend`, `buildFilter: backend/**`. Set `GROQ_API_KEY`, `FRONTEND_URL` in dashboard. URL: `https://<service-name>.onrender.com`. |
| **Vercel** | Import repo; **Root Directory = `reguguard`**. **Do not set Output Directory** to any text. Add `NEXT_PUBLIC_API_URL` = Render URL. |

## Security

- Keep **API keys** only in `.env` / host dashboards; `.gitignore` covers `.env`, `.env.*`, allows `**/.env.example`.
- Rotate any key that was ever committed or leaked.

## License / status

Private demo project; adjust as needed for your org.
