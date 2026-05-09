from fastapi import APIRouter

from models.schemas import AlertsRequest, AlertsResponse
from services.claude_service import call_claude_json

router = APIRouter()

FALLBACK_ALERTS = {
    "alerts": [
        {
            "id": 1,
            "title": "Digital Personal Data Protection Act 2025",
            "summary": "All businesses collecting customer data must update privacy policy",
            "urgency": "HIGH",
            "deadline": "September 1, 2025",
            "actions": [
                "Display a privacy notice at your counter or checkout",
                "Obtain written consent before storing customer phone numbers",
                "Appoint a Data Fiduciary (can be yourself)",
            ],
            "source": "Ministry of Electronics and IT",
        },
        {
            "id": 2,
            "title": "GST Filing Format Change — GSTR-3B Update",
            "summary": "New HSN code requirements mandatory for all GST-registered businesses",
            "urgency": "MEDIUM",
            "deadline": "July 15, 2025",
            "actions": [
                "Update your GST filing software to latest version",
                "Add HSN codes to all product/service invoices",
            ],
            "source": "GST Council of India",
        },
        {
            "id": 3,
            "title": "MSME Udyam Registration Portal Update",
            "summary": "Existing MSME registrations require re-verification by December 2025",
            "urgency": "LOW",
            "deadline": "December 31, 2025",
            "actions": [
                "Log in to udyamregistration.gov.in and verify your details",
            ],
            "source": "Ministry of MSME",
        },
    ]
}


@router.post("/alerts", response_model=AlertsResponse)
async def get_alerts(request: AlertsRequest):
    """
    Generate 3 realistic regulation alerts for the given business type and location.
    Falls back to hardcoded alerts if Claude API fails.
    """
    print(f"[/api/alerts] industry={request.industry}, location={request.location}")

    try:
        prompt = f"""Generate 3 realistic, current regulation alerts for a 
{request.industry} business operating in {request.location}.

Make them specific and realistic for that industry and location.
Include actual government body names relevant to that location.

Respond ONLY with valid JSON, no explanation, no markdown:
{{
  "alerts": [
    {{
      "id": 1,
      "title": "exact regulation or law name",
      "summary": "one sentence describing the business impact",
      "urgency": "HIGH",
      "deadline": "specific date like June 30, 2025 or null",
      "actions": [
        "Specific action step 1",
        "Specific action step 2",
        "Specific action step 3"
      ],
      "source": "name of the government body or official source"
    }},
    {{
      "id": 2,
      "urgency": "MEDIUM",
      "title": "...",
      "summary": "...",
      "deadline": "...",
      "actions": ["...", "..."],
      "source": "..."
    }},
    {{
      "id": 3,
      "urgency": "LOW",
      "title": "...",
      "summary": "...",
      "deadline": null,
      "actions": ["..."],
      "source": "..."
    }}
  ]
}}"""

        result = call_claude_json(prompt)

        # Validate structure
        if "alerts" not in result or len(result["alerts"]) == 0:
            raise ValueError("Invalid response structure")

        return result

    except Exception as e:
        print(f"[/api/alerts] Claude failed: {e}. Using fallback.")
        return FALLBACK_ALERTS
