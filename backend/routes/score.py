from fastapi import APIRouter, HTTPException

from models.schemas import ScoreRequest, ScoreResponse
from services.claude_service import call_claude

router = APIRouter()


@router.post("/score", response_model=ScoreResponse)
async def calculate_score(request: ScoreRequest):
    """
    Calculate Future-Proof Score and get an AI tip.
    """
    print(
        f"[/api/score] industry={request.industry}, "
        f"completed={request.completed_tasks}/{request.total_tasks}"
    )

    if request.total_tasks == 0:
        raise HTTPException(status_code=400, detail="total_tasks cannot be zero")

    score = round((request.completed_tasks / request.total_tasks) * 100)

    if score < 40:
        level = "At Risk"
        color = "danger"
    elif score < 70:
        level = "Needs Work"
        color = "warning"
    else:
        level = "Compliant"
        color = "success"

    try:
        tip_prompt = f"""A {request.industry} business has completed 
{request.completed_tasks} out of {request.total_tasks} compliance tasks.
Their score is {score}/100 — status: {level}.

Give ONE specific, practical tip in under 25 words to improve their compliance.
Write directly to the business owner. No quotes, no intro, just the tip."""

        tip = call_claude(tip_prompt, max_tokens=100).strip()
        # Clean up if model adds quotes
        tip = tip.strip('"').strip("'")

    except Exception as e:
        print(f"[/api/score] Claude tip failed: {e}")
        tips = {
            "danger": (
                "Start with your privacy policy — it's the quickest win "
                "and affects every customer interaction."
            ),
            "warning": (
                "Focus on deadline-sensitive tasks first. "
                "Check your alert dashboard for items due this month."
            ),
            "success": (
                "Great work! Review your alerts weekly to maintain "
                "your score as new regulations pass."
            ),
        }
        tip = tips[color]

    return {
        "score": score,
        "level": level,
        "color": color,
        "tip": tip,
    }
