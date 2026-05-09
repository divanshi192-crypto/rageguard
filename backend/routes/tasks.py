from copy import deepcopy

from fastapi import APIRouter

from models.schemas import Task, TaskCompletionRequest, TasksResponse

router = APIRouter()

BASE_TASKS = [
    {
        "id": 1,
        "task": "Update privacy policy on website or premises",
        "points": 10,
        "category": "Data & Privacy",
    },
    {
        "id": 2,
        "task": "Review and update employee contracts",
        "points": 10,
        "category": "Labor",
    },
    {
        "id": 3,
        "task": "Verify GST registration is current and active",
        "points": 10,
        "category": "Tax",
    },
    {
        "id": 4,
        "task": "Document your data backup and storage policy",
        "points": 10,
        "category": "Data & Privacy",
    },
    {
        "id": 5,
        "task": "Display all required business licenses visibly",
        "points": 10,
        "category": "Licensing",
    },
    {
        "id": 6,
        "task": "File annual compliance and financial reports",
        "points": 10,
        "category": "Regulatory",
    },
    {
        "id": 7,
        "task": "Update terms and conditions document",
        "points": 10,
        "category": "Legal",
    },
    {
        "id": 8,
        "task": "Review and update data retention policy",
        "points": 10,
        "category": "Data & Privacy",
    },
    {
        "id": 9,
        "task": "Conduct employee compliance awareness training",
        "points": 10,
        "category": "Labor",
    },
    {
        "id": 10,
        "task": "Register or renew with local business authority",
        "points": 10,
        "category": "Licensing",
    },
]

FOOD_TASKS = [
    {"id": 3, "task": "Renew FSSAI food safety license", "points": 10, "category": "Food Safety"},
    {
        "id": 5,
        "task": "Display FSSAI certificate and hygiene rating",
        "points": 10,
        "category": "Food Safety",
    },
    {
        "id": 9,
        "task": "Conduct food handler hygiene and safety training",
        "points": 10,
        "category": "Food Safety",
    },
]

HEALTH_TASKS = [
    {"id": 1, "task": "Implement HIPAA/health data protection policy", "points": 10, "category": "Health Data"},
    {"id": 4, "task": "Secure storage system for patient records", "points": 10, "category": "Health Data"},
    {
        "id": 8,
        "task": "Patient data access and deletion request process",
        "points": 10,
        "category": "Health Data",
    },
]

SAAS_TASKS = [
    {
        "id": 1,
        "task": "Update privacy policy and cookie consent banner",
        "points": 10,
        "category": "Data & Privacy",
    },
    {
        "id": 2,
        "task": "Document subprocessors and data processing agreements (DPA)",
        "points": 10,
        "category": "Data & Privacy",
    },
    {
        "id": 7,
        "task": "Publish SLA, uptime, and security practices in terms of service",
        "points": 10,
        "category": "Legal",
    },
]


def _merge_industry_tasks(industry: str) -> list[dict]:
    """Start from BASE_TASKS and overlay industry-specific rows by id."""
    by_id = {t["id"]: deepcopy(t) for t in BASE_TASKS}
    low = industry.lower()

    overlays: list[dict] = []
    if any(k in low for k in ("food", "restaurant", "cafe", "coffee", "bakery", "kitchen")):
        overlays = FOOD_TASKS
    elif any(k in low for k in ("health", "medical", "clinic", "hospital", "patient", "pharma")):
        overlays = HEALTH_TASKS
    elif any(k in low for k in ("saas", "software", "app", "platform", "cloud")):
        overlays = SAAS_TASKS

    for row in overlays:
        by_id[row["id"]] = deepcopy(row)

    return [by_id[i] for i in sorted(by_id.keys())]


@router.get("/tasks", response_model=TasksResponse)
async def get_tasks(industry: str = "Small Business"):
    rows = _merge_industry_tasks(industry)
    return TasksResponse(tasks=[Task(**t) for t in rows])


@router.post("/tasks/complete")
def complete_tasks(payload: TaskCompletionRequest) -> dict:
    all_tasks = _merge_industry_tasks(payload.industry)
    id_to_task = {t["id"]: t for t in all_tasks}
    completed_points = sum(
        id_to_task[task_id]["points"]
        for task_id in payload.task_ids
        if task_id in id_to_task
    )

    return {
        "status": "ok",
        "completed_tasks": len(payload.task_ids),
        "points_earned": completed_points,
        "message": f"{len(payload.task_ids)} task(s) marked complete for {payload.industry}.",
    }
