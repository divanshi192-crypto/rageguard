from pydantic import BaseModel
from typing import Optional


class BusinessProfile(BaseModel):
    industry: str
    location: str


class AlertsRequest(BaseModel):
    industry: str
    location: str


class ScoreRequest(BaseModel):
    completed_tasks: int
    total_tasks: int
    industry: str


class TextAnalysisRequest(BaseModel):
    text: str
    industry: str
    location: str


class TaskCompletionRequest(BaseModel):
    task_ids: list[int]
    industry: str


class AlertAction(BaseModel):
    id: int
    title: str
    summary: str
    urgency: str  # HIGH, MEDIUM, LOW
    deadline: Optional[str]
    actions: list[str]
    source: str


class AlertsResponse(BaseModel):
    alerts: list[AlertAction]


class AnalysisResponse(BaseModel):
    summary: str
    urgency: str
    deadline: Optional[str]
    actions: list[str]
    score_impact: int


class ScoreResponse(BaseModel):
    score: int
    level: str
    color: str  # danger, warning, success
    tip: str


class Task(BaseModel):
    id: int
    task: str
    points: int
    category: str


class TasksResponse(BaseModel):
    tasks: list[Task]
