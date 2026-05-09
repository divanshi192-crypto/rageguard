/** Backend URL: local http://localhost:8000 — production https://reguguard-api.onrender.com (or your Render service URL). */
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export interface Alert {
  id: number
  title: string
  summary: string
  urgency: "HIGH" | "MEDIUM" | "LOW"
  deadline: string | null
  actions: string[]
  source: string
}

export interface AnalysisResult {
  summary: string
  urgency: "HIGH" | "MEDIUM" | "LOW"
  deadline: string | null
  actions: string[]
  score_impact: number
}

export interface ScoreResult {
  score: number
  level: string
  color: "danger" | "warning" | "success"
  tip: string
}

export interface Task {
  id: number
  task: string
  points: number
  category: string
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const error = (await res.json().catch(() => ({ detail: "Unknown error" }))) as {
      detail?: string
    }
    throw new Error(error.detail || `HTTP ${res.status}`)
  }
  return res.json()
}

export const api = {
  // GET /api/tasks?industry=X
  getTasks: async (industry: string): Promise<Task[]> => {
    const res = await fetch(
      `${API_BASE}/api/tasks?industry=${encodeURIComponent(industry)}`
    )
    const data = await handleResponse<{ tasks: Task[] }>(res)
    return data.tasks
  },

  // POST /api/alerts
  getAlerts: async (industry: string, location: string): Promise<Alert[]> => {
    const res = await fetch(`${API_BASE}/api/alerts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ industry, location }),
    })
    const data = await handleResponse<{ alerts: Alert[] }>(res)
    return data.alerts
  },

  // POST /api/analyze-pdf (FormData)
  analyzePDF: async (
    file: File,
    industry: string,
    location: string
  ): Promise<AnalysisResult> => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("industry", industry)
    formData.append("location", location)
    const res = await fetch(`${API_BASE}/api/analyze-pdf`, {
      method: "POST",
      body: formData,
    })
    return handleResponse<AnalysisResult>(res)
  },

  // POST /api/analyze-text (for sample or pasted text)
  analyzeText: async (
    text: string,
    industry: string,
    location: string
  ): Promise<AnalysisResult> => {
    const res = await fetch(`${API_BASE}/api/analyze-text`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, industry, location }),
    })
    return handleResponse<AnalysisResult>(res)
  },

  // POST /api/score
  getScore: async (
    completedTasks: number,
    totalTasks: number,
    industry: string
  ): Promise<ScoreResult> => {
    const res = await fetch(`${API_BASE}/api/score`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        completed_tasks: completedTasks,
        total_tasks: totalTasks,
        industry,
      }),
    })
    return handleResponse<ScoreResult>(res)
  },

  // GET /health
  healthCheck: async (): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/health`)
      return res.ok
    } catch {
      return false
    }
  },
}
