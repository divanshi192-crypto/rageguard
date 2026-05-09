"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Building2,
  FileText,
  LayoutDashboard,
  Loader2,
  Shield,
  UploadCloud,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { api, type AnalysisResult, type Alert as ApiAlert } from "@/lib/api";

type ActiveView = "dashboard" | "upload-law" | "my-score";

type DashboardAlert = {
  id: string;
  level: string;
  border: string;
  badge: string;
  title: string;
  deadline: string;
  deadlineTone: string;
  actions: string[];
  source?: string;
};

const navItems: { id: ActiveView; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "upload-law", label: "Upload Law", icon: FileText },
  { id: "my-score", label: "My Score", icon: BarChart3 },
];

function mapApiAlertToUi(a: ApiAlert): DashboardAlert {
  const u = a.urgency.toUpperCase();
  let level: string;
  let border: string;
  let badge: string;
  let deadlineTone: string;
  if (u === "HIGH") {
    level = "HIGH";
    border = "border-[#A32D2D]";
    badge = "bg-red-100 text-[#A32D2D]";
    deadlineTone = "text-[#A32D2D]";
  } else if (u === "MEDIUM") {
    level = "MEDIUM";
    border = "border-[#BA7517]";
    badge = "bg-amber-100 text-[#BA7517]";
    deadlineTone = "text-[#BA7517]";
  } else {
    level = "INFO";
    border = "border-gray-300";
    badge = "bg-gray-200 text-gray-600";
    deadlineTone = "text-gray-500";
  }
  return {
    id: String(a.id),
    level,
    border,
    badge,
    title: a.title,
    deadline: a.deadline ? `Deadline: ${a.deadline}` : "No immediate deadline",
    deadlineTone,
    actions: a.actions.length ? a.actions : ["Review this alert with your team."],
    source: a.source,
  };
}

function mapUrgencyBadge(u: string) {
  const up = u.toUpperCase();
  if (up === "HIGH") return "bg-red-100 text-[#A32D2D]";
  if (up === "MEDIUM") return "bg-amber-100 text-[#BA7517]";
  return "bg-gray-200 text-gray-600";
}

export default function DemoPage() {
  const [activeView, setActiveView] = useState<ActiveView>("dashboard");
  const [industry, setIndustry] = useState("Coffee Shop");
  const [location, setLocation] = useState("Bangalore, India");
  const [toastMessage, setToastMessage] = useState("");
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);
  const [alerts, setAlerts] = useState<DashboardAlert[]>([]);
  const [alertsLoading, setAlertsLoading] = useState(true);
  const [alertsError, setAlertsError] = useState<string | null>(null);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);

  const [isDragActive, setIsDragActive] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [tasks, setTasks] = useState<{ id: string; label: string; done: boolean }[]>([]);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [tasksError, setTasksError] = useState<string | null>(null);
  const [scoreTip, setScoreTip] = useState<string | null>(null);
  const [animatedScore, setAnimatedScore] = useState(0);

  const score = useMemo(() => {
    if (!tasks.length) return 0;
    const checkedCount = tasks.filter((task) => task.done).length;
    return Math.round((checkedCount / tasks.length) * 100);
  }, [tasks]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const ok = await api.healthCheck();
      if (!cancelled) setApiOnline(ok);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const id = setTimeout(() => setToastMessage(""), 2200);
    return () => clearTimeout(id);
  }, [toastMessage]);

  useEffect(() => {
    let cancelled = false;
    setAlertsLoading(true);
    setAlertsError(null);
    (async () => {
      try {
        const list = await api.getAlerts(industry, location);
        if (cancelled) return;
        setAlerts(list.map(mapApiAlertToUi));
      } catch (e) {
        if (!cancelled) {
          setAlertsError(e instanceof Error ? e.message : "Could not load alerts");
          setAlerts([]);
        }
      } finally {
        if (!cancelled) setAlertsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [industry, location]);

  useEffect(() => {
    let cancelled = false;
    setTasksLoading(true);
    setTasksError(null);
    (async () => {
      try {
        const list = await api.getTasks(industry);
        if (cancelled) return;
        setTasks(list.map((t) => ({ id: String(t.id), label: t.task, done: false })));
      } catch (e) {
        if (!cancelled) {
          setTasksError(e instanceof Error ? e.message : "Could not load tasks");
          setTasks([]);
        }
      } finally {
        if (!cancelled) setTasksLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [industry]);

  useEffect(() => {
    if (!tasks.length) {
      setScoreTip(null);
      return;
    }
    let cancelled = false;
    const completed = tasks.filter((t) => t.done).length;
    const total = tasks.length;
    (async () => {
      try {
        const res = await api.getScore(completed, total, industry);
        if (!cancelled) setScoreTip(res.tip);
      } catch {
        if (!cancelled) setScoreTip(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [tasks, industry]);

  useEffect(() => {
    let frame: number;
    const step = () => {
      setAnimatedScore((prev) => {
        if (prev === score) return prev;
        const delta = score > prev ? 1 : -1;
        return prev + delta;
      });
      frame = window.setTimeout(step, 12);
    };
    step();
    return () => window.clearTimeout(frame);
  }, [score]);

  const scoreColor =
    score < 40 ? "text-[#A32D2D]" : score <= 70 ? "text-[#BA7517]" : "text-[#0F6E56]";

  const handleLoadDemoData = () => {
    setIndustry("Coffee Shop");
    setLocation("Bangalore, India");
    setActiveView("dashboard");
  };

  const runPdfAnalysis = useCallback(
    async (file: File) => {
      setFileName(file.name);
      setShowAnalysis(false);
      setAnalysisResult(null);
      setAnalysisError(null);
      setIsAnalyzing(true);
      try {
        const result = await api.analyzePDF(file, industry, location);
        setAnalysisResult(result);
      } catch (e) {
        setAnalysisError(e instanceof Error ? e.message : "Analysis failed");
      } finally {
        setIsAnalyzing(false);
        setShowAnalysis(true);
      }
    },
    [industry, location],
  );

  const runSampleAnalysis = useCallback(async () => {
    setFileName("sample-dpdp-act.pdf");
    setShowAnalysis(false);
    setAnalysisResult(null);
    setAnalysisError(null);
    setIsAnalyzing(true);
    try {
      const result = await api.analyzeText("sample", industry, location);
      setAnalysisResult(result);
    } catch (e) {
      setAnalysisError(e instanceof Error ? e.message : "Analysis failed");
    } finally {
      setIsAnalyzing(false);
      setShowAnalysis(true);
    }
  }, [industry, location]);

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(false);
    const dropped = event.dataTransfer.files?.[0];
    if (dropped?.type === "application/pdf" || dropped.name.toLowerCase().endsWith(".pdf")) {
      void runPdfAnalysis(dropped);
    } else if (dropped) {
      setAnalysisError("Please drop a PDF file.");
      setShowAnalysis(true);
    }
  };

  const mergeAnalysisIntoTasks = () => {
    if (!analysisResult?.actions.length) return;
    setTasks((prev) => {
      const existing = new Set(prev.map((t) => t.label));
      const toAdd = analysisResult.actions
        .filter((a) => !existing.has(a))
        .map((label, i) => ({
          id: `ai-${Date.now()}-${i}`,
          label,
          done: false,
        }));
      return [...prev, ...toAdd];
    });
    setToastMessage(`${analysisResult.actions.length} tasks added to your score checklist`);
    setActiveView("my-score");
  };

  return (
    <div className="bg-[#F8FAF9]">
      {apiOnline === false && (
        <div className="fixed left-0 right-0 top-0 z-50 bg-amber-100 px-4 py-2 text-center text-sm text-amber-900">
          API not reachable at <code className="rounded bg-amber-200 px-1">localhost:8000</code>. Start
          the backend, then refresh.
        </div>
      )}

      <aside className="fixed left-0 top-0 hidden min-h-screen w-64 bg-[#0F6E56] text-white md:block">
        <div className="px-6 pt-6">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <span className="font-semibold">ReguGuard</span>
          </div>
        </div>

        <p className="mt-8 px-6 text-xs text-green-300">YOUR BUSINESS</p>
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="mx-4 mt-2 w-[calc(100%-2rem)] rounded-lg border border-green-700 bg-[#0a5040] px-3 py-2 text-sm text-white outline-none focus-visible:ring-2 focus-visible:ring-green-200"
        >
          <option>Coffee Shop</option>
          <option>Restaurant</option>
          <option>Retail Store</option>
          <option>SaaS Company</option>
          <option>Gym</option>
          <option>Clinic</option>
        </select>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mx-4 mt-2 w-[calc(100%-2rem)] rounded-lg border border-green-700 bg-[#0a5040] px-3 py-2 text-sm text-white placeholder:text-green-300 outline-none focus-visible:ring-2 focus-visible:ring-green-200"
        />
        <button
          type="button"
          onClick={handleLoadDemoData}
          className="mx-4 mt-3 w-[calc(100%-2rem)] rounded-lg bg-[#1D9E75] py-2 text-sm text-white transition hover:opacity-95 focus-visible:ring-2 focus-visible:ring-green-200"
        >
          Load Demo Data
        </button>

        <div className="mx-4 mt-6 border-t border-green-700" />

        <p className="mt-6 px-6 text-xs text-green-300">NAVIGATE</p>
        <nav className="mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveView(item.id)}
                className={`flex w-full items-center gap-3 px-6 py-3 text-left text-sm ${
                  isActive ? "border-l-2 border-white bg-[#0a5040]" : "hover:bg-[#0a5040]/70"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="min-h-screen flex-1 bg-[#F8FAF9] p-4 pb-24 md:ml-64 md:p-8">
        {activeView === "dashboard" && (
          <div className="mx-auto w-full max-w-5xl rounded-2xl border border-[#E2E8E5] bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard · {industry}</h1>
                <p className="mt-1 text-sm text-[#5F5E5A]">
                  Track every new regulation and deadline for {location}.
                </p>
              </div>
              <span className="rounded-full bg-[#E1F5EE] px-3 py-1 text-xs font-medium text-[#0F6E56]">
                {reviewedCount} reviewed
              </span>
            </div>

            {alertsLoading && (
              <div className="flex items-center gap-2 rounded-lg border border-[#9FE1CB] bg-[#E1F5EE] p-4 text-sm text-[#0F6E56]">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading alerts from API…
              </div>
            )}
            {alertsError && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                {alertsError}
              </div>
            )}

            <AnimatePresence mode="popLayout">
              {!alertsLoading &&
                alerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -26 }}
                    className={`mb-3 rounded-lg border-l-4 ${alert.border} bg-gray-50 p-4`}
                  >
                    <span className={`rounded px-2 py-0.5 text-xs font-medium ${alert.badge}`}>
                      {alert.level}
                    </span>
                    <p className="mt-2 font-medium text-gray-900">{alert.title}</p>
                    {alert.source && (
                      <p className="mt-1 text-xs text-gray-500">Source: {alert.source}</p>
                    )}
                    <p className={`mt-1 text-xs ${alert.deadlineTone}`}>{alert.deadline}</p>
                    <button
                      type="button"
                      className="mt-3 rounded-md bg-white px-3 py-1 text-xs font-medium text-[#0F6E56] ring-1 ring-[#0F6E56]/30 transition hover:bg-[#E1F5EE] focus-visible:ring-2 focus-visible:ring-[#0F6E56]"
                      onClick={() => setExpandedAlert((prev) => (prev === alert.id ? null : alert.id))}
                    >
                      What do I do?
                    </button>

                    {expandedAlert === alert.id && (
                      <div className="mt-2 rounded-lg border border-[#9FE1CB] bg-[#E1F5EE] p-4">
                        <ul className="space-y-2 text-sm text-gray-700">
                          {alert.actions.map((item) => (
                            <li key={item} className="flex gap-2">
                              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#0F6E56]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        <button
                          type="button"
                          onClick={() => {
                            setAlerts((prev) => prev.filter((entry) => entry.id !== alert.id));
                            setReviewedCount((prev) => prev + 1);
                            setExpandedAlert(null);
                          }}
                          className="mt-3 rounded-md bg-[#0F6E56] px-3 py-1.5 text-xs font-medium text-white transition hover:opacity-95 focus-visible:ring-2 focus-visible:ring-[#0F6E56]"
                        >
                          Mark as reviewed
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
            </AnimatePresence>
            {!alertsLoading && alerts.length === 0 && !alertsError && (
              <div className="rounded-lg border border-[#9FE1CB] bg-[#E1F5EE] p-4 text-sm text-[#0F6E56]">
                All current alerts reviewed. Great work.
              </div>
            )}
          </div>
        )}

        {activeView === "upload-law" && (
          <div className="mx-auto w-full max-w-5xl rounded-2xl border border-[#E2E8E5] bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900">Upload Law · {industry}</h1>
            <p className="mt-1 text-sm text-[#5F5E5A]">
              Upload legal documents and get a plain-English action summary instantly.
            </p>
            <div className="mt-6">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragActive(true);
                }}
                onDragLeave={() => setIsDragActive(false)}
                onDrop={handleFileDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition ${
                  isDragActive
                    ? "border-[#0F6E56] bg-[#E1F5EE]"
                    : "border-[#E2E8E5] bg-transparent hover:bg-gray-50"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,application/pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void runPdfAnalysis(file);
                  }}
                />
                <UploadCloud className="mx-auto h-10 w-10 text-gray-300" />
                <p className="mt-3 text-gray-400">
                  {fileName ? `Selected: ${fileName}` : "Drop a regulation PDF here"}
                </p>
                <p className="text-xs text-gray-300">or click to browse</p>
              </div>
              <button
                type="button"
                className="mt-3 text-sm font-medium text-[#0F6E56] hover:underline"
                onClick={() => void runSampleAnalysis()}
              >
                Try a sample PDF
              </button>

              {isAnalyzing && (
                <div className="mt-4 flex items-center gap-2 rounded-lg border border-[#9FE1CB] bg-[#E1F5EE] p-4 text-sm text-[#0F6E56]">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  AI is analyzing your file…
                </div>
              )}

              {analysisError && !isAnalyzing && (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                  {analysisError}
                </div>
              )}

              <AnimatePresence>
                {showAnalysis && !isAnalyzing && analysisResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="mt-4 rounded-xl border border-[#9FE1CB] bg-[#E1F5EE] p-5"
                  >
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded px-2 py-0.5 text-xs font-medium ${mapUrgencyBadge(analysisResult.urgency)}`}
                      >
                        {analysisResult.urgency}
                      </span>
                      {analysisResult.deadline && (
                        <span className="text-xs text-gray-600">Due: {analysisResult.deadline}</span>
                      )}
                      <span className="text-xs text-gray-600">Score impact: +{analysisResult.score_impact}</span>
                    </div>
                    <p className="mb-3 text-sm text-gray-800">{analysisResult.summary}</p>
                    <p className="mb-3 text-xs font-medium text-[#0F6E56]">Suggested actions</p>
                    <div className="space-y-3">
                      {analysisResult.actions.map((item, index) => (
                        <div key={`${item}-${index}`} className="flex gap-2">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0F6E56] text-xs text-white">
                            {index + 1}
                          </span>
                          <p className="text-sm text-gray-700">{item}</p>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={mergeAnalysisIntoTasks}
                      className="mt-4 text-sm font-medium text-[#0F6E56] hover:underline"
                    >
                      Add all to my task list →
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {activeView === "my-score" && (
          <div className="mx-auto w-full max-w-5xl rounded-2xl border border-[#E2E8E5] bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900">My Score · {industry}</h1>
            <p className="mt-1 text-sm text-[#5F5E5A]">
              See your live compliance score and complete tasks that raise it fastest.
            </p>
            <div className="mt-6">
              {tasksLoading && (
                <div className="mb-4 flex items-center gap-2 text-sm text-[#0F6E56]">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading tasks…
                </div>
              )}
              {tasksError && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                  {tasksError}
                </div>
              )}
              <div className="text-center">
                <p className={`text-7xl font-bold transition-colors ${scoreColor}`}>{animatedScore}</p>
                <p className="mt-1 text-gray-500">Future-Proof Score</p>
                {scoreTip && (
                  <p className="mx-auto mt-3 max-w-lg text-sm text-[#5F5E5A]">{scoreTip}</p>
                )}
                <div className="mt-4 h-3 w-full rounded-full bg-gray-100">
                  <div
                    className="h-3 rounded-full bg-[#1D9E75] transition-all duration-500"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>

              <div className="mt-6">
                {tasks.map((task) => (
                  <label
                    key={task.id}
                    className="flex cursor-pointer items-center gap-3 border-b border-[#E2E8E5] py-3 text-sm text-gray-700"
                  >
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() =>
                        setTasks((prev) =>
                          prev.map((entry) =>
                            entry.id === task.id ? { ...entry, done: !entry.done } : entry,
                          ),
                        )
                      }
                      className="h-4 w-4 accent-[#0F6E56]"
                    />
                    <span>{task.label}</span>
                  </label>
                ))}
              </div>

              {tasks.length > 0 && tasks.every((task) => task.done) && (
                <div className="mt-4 rounded-lg border border-[#9FE1CB] bg-[#E1F5EE] p-3 text-sm font-medium text-[#0F6E56]">
                  You&apos;re fully compliant!
                </div>
              )}
            </div>
          </div>
        )}

        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="fixed right-4 top-20 z-50 rounded-lg border border-[#9FE1CB] bg-[#E1F5EE] px-4 py-3 text-sm font-medium text-[#0F6E56]"
            >
              {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#E2E8E5] bg-white md:hidden">
        <div className="grid grid-cols-4">
          {[...navItems, { id: "business", label: "Business", icon: Building2 }].map((item) => {
            const Icon = item.icon;
            const active = item.id === activeView;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (item.id === "business") {
                    handleLoadDemoData();
                    return;
                  }
                  setActiveView(item.id as ActiveView);
                }}
                className={`flex flex-col items-center gap-1 py-2 text-xs ${
                  active ? "text-[#0F6E56]" : "text-gray-500"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
