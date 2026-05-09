from fastapi import APIRouter, File, Form, HTTPException, UploadFile

from models.schemas import AnalysisResponse, TextAnalysisRequest
from services.claude_service import call_claude_json
from services.pdf_service import extract_text_from_pdf

router = APIRouter()

SAMPLE_LAW_TEXT = """
The Digital Personal Data Protection Act 2025 requires all businesses 
operating in India that collect, store, or process personal data of customers 
to: maintain a written privacy policy publicly accessible on their premises or 
website, obtain explicit written or digital consent before collecting any 
personal data, appoint a Data Fiduciary who is responsible for data compliance 
(this can be the business owner themselves), delete or anonymize customer data 
within 30 days of a customer's request, and report any data breach to the 
Data Protection Board within 72 hours of discovery. 
Non-compliance penalties start at Rs 50 crore for first offence.
"""


def _normalize_analysis(result: dict, industry: str) -> AnalysisResponse:
    """Map model JSON (including alternate shapes) to AnalysisResponse."""
    actions_raw = result.get("actions", [])
    actions: list[str] = []
    for item in actions_raw if isinstance(actions_raw, list) else []:
        if isinstance(item, str):
            actions.append(item)
        elif isinstance(item, dict):
            action_text = item.get("action") or item.get("title") or item.get("description")
            if action_text:
                actions.append(str(action_text))
    if len(actions) < 3:
        actions.extend(
            [
                f"Review how this rule applies to your {industry} operations.",
                "Document current practices and gaps in one page.",
                "Set a calendar reminder to re-check compliance in 30 days.",
            ]
        )
    actions = actions[:3]

    urgency = str(result.get("urgency", "MEDIUM")).upper()
    if urgency not in {"HIGH", "MEDIUM", "LOW"}:
        urgency = "MEDIUM"

    score_raw = result.get("score_impact", 15)
    if isinstance(score_raw, dict):
        nums = [v for v in score_raw.values() if isinstance(v, (int, float))]
        score_impact = int(round(sum(nums) / len(nums))) if nums else 15
    else:
        score_impact = int(score_raw)
    score_impact = max(5, min(25, score_impact))

    deadline = result.get("deadline")
    if deadline is not None:
        deadline = str(deadline)

    return AnalysisResponse(
        summary=str(result.get("summary", "No summary available.")),
        urgency=urgency,
        deadline=deadline,
        actions=actions,
        score_impact=score_impact,
    )


def analyze_law_text(text: str, industry: str, location: str) -> AnalysisResponse:
    """
    Core logic: send law text to Claude and get structured analysis.
    """
    prompt = f"""You are a compliance expert. Analyze this regulation for a 
{industry} business in {location}.

Regulation text:
{text}

Respond ONLY with valid JSON, no markdown, no explanation:
{{
  "summary": "2-3 sentence plain English explanation of what this law means",
  "urgency": "HIGH or MEDIUM or LOW based on penalty severity and deadline proximity",
  "deadline": "specific deadline date as string, or null if no deadline",
  "actions": [
    "Specific action item 1 written for a {industry} owner",
    "Specific action item 2 written for a {industry} owner",
    "Specific action item 3 written for a {industry} owner"
  ],
  "score_impact": a number between 5 and 25 representing compliance points
}}

Rules:
- Actions must be specific to a {industry}, not generic
- Use plain English, no legal jargon
- score_impact should be higher for more critical regulations
- urgency HIGH = fines over Rs 1L or deadline within 60 days
- urgency MEDIUM = moderate penalties or deadline within 6 months
- urgency LOW = informational or deadline over 6 months away"""

    raw = call_claude_json(prompt, max_tokens=800)
    return _normalize_analysis(raw if isinstance(raw, dict) else {}, industry)


@router.post("/analyze-pdf", response_model=AnalysisResponse)
async def analyze_pdf(
    industry: str = Form(...),
    location: str = Form(...),
    file: UploadFile = File(...),
):
    """
    Accept a PDF upload, extract text, analyze with Claude.
    """
    print(
        f"[/api/analyze-pdf] industry={industry}, location={location}, "
        f"file={file.filename}"
    )

    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are accepted")

    try:
        pdf_bytes = await file.read()
        text = extract_text_from_pdf(pdf_bytes)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e)) from e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF processing failed: {str(e)}") from e

    try:
        return analyze_law_text(text, industry, location)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI analysis failed: {str(e)}") from e


@router.post("/analyze-text", response_model=AnalysisResponse)
async def analyze_text(request: TextAnalysisRequest):
    """
    Analyze plain text (or use built-in sample if text == 'sample').
    Used by the frontend's 'Try a sample law' button.
    """
    print(
        f"[/api/analyze-text] industry={request.industry}, "
        f"location={request.location}"
    )

    text = SAMPLE_LAW_TEXT if request.text.strip() == "sample" else request.text

    if len(text.strip()) < 50:
        raise HTTPException(
            status_code=400,
            detail="Text too short. Please provide more content.",
        )

    try:
        return analyze_law_text(text, request.industry, request.location)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI analysis failed: {str(e)}") from e
