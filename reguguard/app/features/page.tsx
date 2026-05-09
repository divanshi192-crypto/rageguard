"use client";

import Link from "next/link";
import { Check, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import FinalCta from "@/components/sections/FinalCta";
import { LawAnalyzerView, ScoreView } from "@/components/previews/DemoViews";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, ease: "easeOut" as const },
};

export default function FeaturesPage() {
  return (
    <div className="bg-[#F8FAF9]">
      <motion.section {...fadeUp} className="px-4 pb-10 pt-20 text-center sm:px-6 lg:px-8">
        <span className="inline-flex rounded-full bg-[#E1F5EE] px-3 py-1 text-xs font-medium text-[#0F6E56]">
          Features
        </span>
        <h1 className="mt-4 text-4xl font-bold text-gray-900 sm:text-5xl">
          Every tool your business needs to stay compliant
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[#5F5E5A]">
          From regulation alerts to action checklists, ReguGuard keeps your business compliant
          without legal complexity.
        </p>
      </motion.section>

      <motion.section
        {...fadeUp}
        className="mx-auto grid w-full max-w-6xl items-center gap-16 px-4 py-20 md:grid-cols-2 sm:px-6 lg:px-8"
      >
        <div className="order-2 md:order-1">
          <span className="inline-flex rounded-full bg-[#E1F5EE] px-3 py-1 text-xs font-medium text-[#0F6E56]">
            Feature 01
          </span>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Know about new laws the same day they pass</h2>
          <p className="mt-4 text-[#5F5E5A]">
            Most small businesses find out about new regulations when they get fined. ReguGuard
            monitors government websites, official gazettes, and legal news sources every single
            day - filtered for your exact industry and location.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Monitors 50+ government and legal news sources",
              "Filters by your industry and state/country",
              "Plain-English alert in your dashboard within 24 hours",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                <Check className="mt-0.5 h-4 w-4 text-[#0F6E56]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link href="/demo" className="mt-6 inline-block font-medium text-[#0F6E56]">
            See how alerts work →
          </Link>
        </div>
        <div className="order-1 min-h-[280px] rounded-2xl border border-[#E2E8E5] bg-white p-6 shadow-sm md:order-2">
          <div className="mb-3 rounded-lg border-l-4 border-[#A32D2D] bg-gray-50 p-4">
            <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-[#A32D2D]">HIGH</span>
            <p className="mt-2 text-sm font-medium text-gray-900">DPDP Act 2025 - Policy Update Required</p>
            <p className="mt-1 text-xs text-[#A32D2D]">Deadline: Sep 1, 2025</p>
          </div>
          <div className="rounded-lg border-l-4 border-[#BA7517] bg-gray-50 p-4">
            <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-[#BA7517]">
              MEDIUM
            </span>
            <p className="mt-2 text-sm font-medium text-gray-900">GST Filing Rule Change</p>
            <p className="mt-1 text-xs text-[#BA7517]">Deadline: Jul 15, 2025</p>
          </div>
        </div>
      </motion.section>

      <motion.section
        {...fadeUp}
        className="mx-auto grid w-full max-w-6xl items-center gap-16 px-4 py-20 md:grid-cols-2 sm:px-6 lg:px-8"
      >
        <div className="order-1 min-h-[280px] rounded-2xl border border-[#E2E8E5] bg-white p-6 shadow-sm md:order-1">
          <LawAnalyzerView />
        </div>
        <div className="order-2 md:order-2">
          <span className="inline-flex rounded-full bg-[#E1F5EE] px-3 py-1 text-xs font-medium text-[#0F6E56]">
            Feature 02
          </span>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            Upload any law PDF. Understand it in 10 seconds.
          </h2>
          <p className="mt-4 text-[#5F5E5A]">
            Government documents are written for lawyers, not business owners. Paste the text or
            upload the PDF of any regulation and our AI will tell you exactly what it means for
            your specific type of business - with action steps.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Works with any government PDF or gazette notification",
              "Tailored explanation based on your industry",
              "Generates a numbered action checklist automatically",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                <Check className="mt-0.5 h-4 w-4 text-[#0F6E56]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      <motion.section
        {...fadeUp}
        className="mx-auto grid w-full max-w-6xl items-center gap-16 px-4 py-20 md:grid-cols-2 sm:px-6 lg:px-8"
      >
        <div className="order-2 md:order-1">
          <span className="inline-flex rounded-full bg-[#E1F5EE] px-3 py-1 text-xs font-medium text-[#0F6E56]">
            Feature 03
          </span>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Your compliance health score, always up to date</h2>
          <p className="mt-4 text-[#5F5E5A]">
            The Future-Proof Score is a single number from 0-100 that tells you how compliant your
            business is right now. Every task you complete raises it. Every new law that requires
            action lowers it until you act.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Score updates automatically as new laws pass",
              "See exactly which tasks will raise your score the most",
              "Track your compliance history over 6 months (Pro)",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                <Check className="mt-0.5 h-4 w-4 text-[#0F6E56]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="order-1 min-h-[280px] rounded-2xl border border-[#E2E8E5] bg-white p-6 shadow-sm md:order-2">
          <ScoreView />
        </div>
      </motion.section>

      <motion.section
        {...fadeUp}
        className="mx-auto grid w-full max-w-6xl items-center gap-16 px-4 py-20 md:grid-cols-2 sm:px-6 lg:px-8"
      >
        <div className="order-1 min-h-[280px] rounded-2xl border border-[#E2E8E5] bg-white p-6 shadow-sm md:order-1">
          <h3 className="mb-4 text-sm font-semibold text-gray-900">Upcoming Deadlines</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-red-50 p-3">
              <span className="text-sm text-gray-800">Privacy policy update</span>
              <span className="rounded bg-red-100 px-2 py-0.5 text-xs text-[#A32D2D]">Urgent</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-amber-50 p-3">
              <span className="text-sm text-gray-800">GST filing format migration</span>
              <span className="rounded bg-amber-100 px-2 py-0.5 text-xs text-[#BA7517]">Medium</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-green-50 p-3">
              <span className="text-sm text-gray-800">MSME profile refresh</span>
              <span className="rounded bg-green-100 px-2 py-0.5 text-xs text-[#0F6E56]">On track</span>
            </div>
          </div>
        </div>
        <div className="order-2 md:order-2">
          <span className="inline-flex rounded-full bg-[#E1F5EE] px-3 py-1 text-xs font-medium text-[#0F6E56]">
            Feature 04
          </span>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Never miss a compliance deadline again</h2>
          <p className="mt-4 text-[#5F5E5A]">
            Every regulation we detect gets turned into a dated action item. You see exactly what
            needs to be done and by when - all in one place.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Auto-extracted deadlines from every law summary",
              "Color-coded by urgency: red, amber, green",
              "Export to Google Calendar or download as PDF",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                <Check className="mt-0.5 h-4 w-4 text-[#0F6E56]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      <motion.section
        {...fadeUp}
        className="mx-auto grid w-full max-w-6xl items-center gap-16 px-4 py-20 md:grid-cols-2 sm:px-6 lg:px-8"
      >
        <div className="order-2 md:order-1">
          <span className="inline-flex rounded-full bg-[#E1F5EE] px-3 py-1 text-xs font-medium text-[#0F6E56]">
            Feature 05
          </span>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Laws differ by location. So do your alerts.</h2>
          <p className="mt-4 text-[#5F5E5A]">
            A restaurant in Maharashtra faces different regulations than one in Karnataka.
            ReguGuard knows the difference and only shows you what&apos;s relevant to your exact
            location.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Covers all Indian states + central government laws",
              "International coverage for 12 countries (Pro)",
              "Set multiple locations for multiple branches",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                <Check className="mt-0.5 h-4 w-4 text-[#0F6E56]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="order-1 min-h-[280px] rounded-2xl border border-[#E2E8E5] bg-white p-6 shadow-sm md:order-2">
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-[#E1F5EE] px-3 py-2 text-sm text-[#0F6E56]">
            <MapPin className="h-4 w-4" />
            <span>Bangalore, Karnataka</span>
          </div>
          <div className="space-y-3">
            <div className="rounded-lg border border-[#E2E8E5] p-3 text-sm text-gray-700">
              Karnataka Shops & Establishments update
            </div>
            <div className="rounded-lg border border-[#E2E8E5] p-3 text-sm text-gray-700">
              BBMP waste compliance filing reminder
            </div>
            <div className="rounded-lg border border-[#E2E8E5] p-3 text-sm text-gray-700">
              Karnataka professional tax return update
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        {...fadeUp}
        className="mx-auto grid w-full max-w-6xl items-center gap-16 px-4 py-20 md:grid-cols-2 sm:px-6 lg:px-8"
      >
        <div className="order-1 min-h-[280px] rounded-2xl border border-[#E2E8E5] bg-white p-6 shadow-sm md:order-1">
          <div className="space-y-3">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-start gap-3 rounded-lg border border-[#9FE1CB] bg-[#F3FCF8] p-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0F6E56] text-xs text-white">
                  {step}
                </span>
                <p className="text-sm text-gray-700">
                  {step === 1 && "Update website privacy policy with consent clause"}
                  {step === 2 && "Add consent checkbox to customer intake form"}
                  {step === 3 && "Document data retention timeline for contact details"}
                  {step === 4 && "Assign compliance owner and review monthly"}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="order-2 md:order-2">
          <span className="inline-flex rounded-full bg-[#E1F5EE] px-3 py-1 text-xs font-medium text-[#0F6E56]">
            Feature 06
          </span>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">From law to checklist in seconds</h2>
          <p className="mt-4 text-[#5F5E5A]">
            Knowing about a law is useless if you don&apos;t know what to do about it. ReguGuard
            doesn&apos;t just alert you - it generates a specific, ordered action plan written for
            your type of business.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Numbered steps ranked by importance",
              "Written in plain English, zero legal jargon",
              "One-click to add any step to your task list",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                <Check className="mt-0.5 h-4 w-4 text-[#0F6E56]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      <motion.div {...fadeUp}>
        <FinalCta />
      </motion.div>
    </div>
  );
}
