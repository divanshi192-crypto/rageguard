import { Calendar, CheckCircle2, Circle, UploadCloud } from "lucide-react";

export function DashboardView() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Regulation Alerts</h3>
        <span className="rounded-full bg-[#E1F5EE] px-3 py-1 text-xs font-medium text-[#0F6E56]">
          3 new
        </span>
      </div>

      <div className="mb-3 rounded-lg border-l-4 border-[#A32D2D] bg-gray-50 p-4">
        <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-[#A32D2D]">HIGH</span>
        <p className="mt-2 font-medium text-gray-900">DPDP Act 2025 - Privacy Policy Update Required</p>
        <div className="mt-2 flex items-center gap-2 text-xs text-[#A32D2D]">
          <Calendar className="h-3.5 w-3.5" />
          <span>Deadline: Sep 1, 2025</span>
        </div>
        <p className="mt-1 text-xs text-gray-500">3 actions required</p>
      </div>

      <div className="mb-3 rounded-lg border-l-4 border-[#BA7517] bg-gray-50 p-4">
        <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-[#BA7517]">
          MEDIUM
        </span>
        <p className="mt-2 font-medium text-gray-900">GST Filing Rule Change - New Format Required</p>
        <div className="mt-2 flex items-center gap-2 text-xs text-[#BA7517]">
          <Calendar className="h-3.5 w-3.5" />
          <span>Deadline: Jul 15, 2025</span>
        </div>
        <p className="mt-1 text-xs text-gray-500">1 action required</p>
      </div>

      <div className="rounded-lg border-l-4 border-gray-300 bg-gray-50 p-4">
        <span className="rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">INFO</span>
        <p className="mt-2 font-medium text-gray-900">MSME Registration Update 2025</p>
        <p className="mt-1 text-xs text-gray-500">No immediate action required</p>
      </div>
    </div>
  );
}

export function LawAnalyzerView() {
  return (
    <div>
      <div className="rounded-xl border-2 border-dashed border-[#E2E8E5] p-8 text-center">
        <UploadCloud className="mx-auto h-10 w-10 text-gray-300" />
        <p className="mt-3 text-gray-400">Drop a regulation PDF here</p>
        <p className="text-xs text-gray-300">or click to browse</p>
      </div>

      <div className="mt-4 rounded-xl border border-[#9FE1CB] bg-[#E1F5EE] p-5">
        <p className="mb-3 text-xs font-medium text-[#0F6E56]">AI Analysis - DPDP Act for Coffee Shop</p>
        <div className="space-y-3">
          <div className="flex gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0F6E56] text-xs text-white">
              1
            </span>
            <p className="text-sm text-gray-700">Display a privacy notice at your counter or checkout by Sep 1</p>
          </div>
          <div className="flex gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0F6E56] text-xs text-white">
              2
            </span>
            <p className="text-sm text-gray-700">Stop storing customer phone numbers without written consent</p>
          </div>
          <div className="flex gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0F6E56] text-xs text-white">
              3
            </span>
            <p className="text-sm text-gray-700">
              Appoint a data officer - this can be yourself, no qualification needed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ScoreView() {
  return (
    <div>
      <div className="text-center">
        <p className="text-7xl font-bold text-[#0F6E56]">72</p>
        <p className="mt-1 text-gray-500">Future-Proof Score</p>
        <div className="mt-4 h-3 w-full rounded-full bg-gray-100">
          <div className="h-3 w-[72%] rounded-full bg-[#1D9E75]" />
        </div>
        <p className="mt-2 text-sm text-[#5F5E5A]">Good - 3 tasks left to reach 100%</p>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-3 border-b border-[#E2E8E5] py-3 text-sm text-gray-700">
          <CheckCircle2 className="h-5 w-5 text-[#0F6E56]" />
          <span>Privacy policy updated</span>
        </div>
        <div className="flex items-center gap-3 border-b border-[#E2E8E5] py-3 text-sm text-gray-700">
          <CheckCircle2 className="h-5 w-5 text-[#0F6E56]" />
          <span>Employee contracts reviewed</span>
        </div>
        <div className="flex items-center gap-3 border-b border-[#E2E8E5] py-3 text-sm text-gray-700">
          <CheckCircle2 className="h-5 w-5 text-[#0F6E56]" />
          <span>GST registration current</span>
        </div>
        <div className="flex items-center gap-3 border-b border-[#E2E8E5] py-3 text-sm text-gray-700">
          <Circle className="h-5 w-5 text-gray-400" />
          <span>Data backup policy documented</span>
          <span className="rounded bg-amber-100 px-2 py-0.5 text-xs text-[#BA7517]">
            Add this → score jumps to 85
          </span>
        </div>
      </div>
    </div>
  );
}
