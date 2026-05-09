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
import { useEffect, useMemo, useRef, useState } from "react";

type ActiveView = "dashboard" | "upload-law" | "my-score";

const navItems: { id: ActiveView; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "upload-law", label: "Upload Law", icon: FileText },
  { id: "my-score", label: "My Score", icon: BarChart3 },
];

export default function DemoPage() {
  const [activeView, setActiveView] = useState<ActiveView>("dashboard");
  const [industry, setIndustry] = useState("Coffee Shop");
  const [location, setLocation] = useState("Bangalore, India");
  const [toastMessage, setToastMessage] = useState("");
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);
  const [alerts, setAlerts] = useState([
    {
      id: "dpdp",
      level: "HIGH",
      border: "border-[#A32D2D]",
      badge: "bg-red-100 text-[#A32D2D]",
      title: "DPDP Act 2025 - Privacy Policy Update Required",
      deadline: "Deadline: Sep 1, 2025",
      deadlineTone: "text-[#A32D2D]",
      actions: [
        "Update your public privacy notice with consent language.",
        "Collect explicit consent before storing customer numbers.",
        "Assign a person responsible for data access requests.",
      ],
    },
    {
      id: "gst",
      level: "MEDIUM",
      border: "border-[#BA7517]",
      badge: "bg-amber-100 text-[#BA7517]",
      title: "GST Filing Rule Change - New Format Required",
      deadline: "Deadline: Jul 15, 2025",
      deadlineTone: "text-[#BA7517]",
      actions: [
        "Switch your filing sheet to the new GST template.",
        "Reconcile missing invoice fields in current month data.",
        "Submit a test filing before final submission date.",
      ],
    },
    {
      id: "msme",
      level: "INFO",
      border: "border-gray-300",
      badge: "bg-gray-200 text-gray-600",
      title: "MSME Registration Update 2025",
      deadline: "No immediate deadline",
      deadlineTone: "text-gray-500",
      actions: [
        "Review current MSME registration profile details.",
        "Prepare updated ownership and contact details.",
        "Schedule profile refresh this quarter.",
      ],
    },
  ]);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [isDragActive, setIsDragActive] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [tasks, setTasks] = useState([
    { id: "privacy", label: "Privacy policy updated", done: true },
    { id: "contracts", label: "Employee contracts reviewed", done: true },
    { id: "gst", label: "GST registration current", done: true },
    { id: "backup", label: "Data backup policy documented", done: false },
  ]);
  const [animatedScore, setAnimatedScore] = useState(0);

  const score = useMemo(() => {
    const checkedCount = tasks.filter((task) => task.done).length;
    return Math.round((checkedCount / tasks.length) * 100);
  }, [tasks]);

  useEffect(() => {
    const id = setTimeout(() => setToastMessage(""), 2200);
    return () => clearTimeout(id);
  }, [toastMessage]);

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

  const triggerAnalysis = (selectedFileName: string) => {
    setFileName(selectedFileName);
    setShowAnalysis(false);
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowAnalysis(true);
    }, 1500);
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(false);
    const dropped = event.dataTransfer.files?.[0];
    if (dropped) triggerAnalysis(dropped.name);
  };

  return (
    <div className="bg-[#F8FAF9]">
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
            <AnimatePresence mode="popLayout">
              {alerts.map((alert) => (
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
            {alerts.length === 0 && (
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
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) triggerAnalysis(file.name);
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
                onClick={() => {
                  setFileName("sample-dpdp-act.pdf");
                  setIsAnalyzing(false);
                  setShowAnalysis(true);
                }}
              >
                Try a sample PDF
              </button>

              {isAnalyzing && (
                <div className="mt-4 flex items-center gap-2 rounded-lg border border-[#9FE1CB] bg-[#E1F5EE] p-4 text-sm text-[#0F6E56]">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  AI is analyzing your file...
                </div>
              )}

              <AnimatePresence>
                {showAnalysis && !isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="mt-4 rounded-xl border border-[#9FE1CB] bg-[#E1F5EE] p-5"
                  >
                    <p className="mb-3 text-xs font-medium text-[#0F6E56]">
                      AI Analysis - DPDP Act for {industry}
                    </p>
                    <div className="space-y-3">
                      {[
                        "Display a privacy notice at your counter or checkout by Sep 1",
                        "Stop storing customer phone numbers without written consent",
                        "Appoint a data officer - this can be yourself, no qualification needed",
                      ].map((item, index) => (
                        <div key={item} className="flex gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0F6E56] text-xs text-white">
                            {index + 1}
                          </span>
                          <p className="text-sm text-gray-700">{item}</p>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setToastMessage("3 tasks added to your score checklist")}
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
              <div className="text-center">
                <p className={`text-7xl font-bold transition-colors ${scoreColor}`}>{animatedScore}</p>
                <p className="mt-1 text-gray-500">Future-Proof Score</p>
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

              {tasks.every((task) => task.done) && (
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
