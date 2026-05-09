"use client";

import Link from "next/link";
import { Bell, Calendar, CheckSquare, FileText, MapPin, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <section className="bg-white pb-16 pt-24">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="inline-flex rounded-full bg-[#E1F5EE] px-3 py-1 text-xs font-medium text-[#0F6E56]">
              AI-Powered Compliance
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
              Never miss a law that could shut you down
            </h1>
            <p className="mt-4 max-w-lg text-xl text-[#5F5E5A]">
              ReguGuard monitors new regulations 24/7 and tells your small business exactly what
              to do - before the deadline hits.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="#"
                className="rounded-lg bg-[#0F6E56] px-6 py-3 font-medium text-white transition hover:opacity-95"
              >
                Get My Free Score →
              </Link>
              <Link
                href="#"
                className="rounded-lg border border-[#0F6E56] px-6 py-3 font-medium text-[#0F6E56] transition hover:bg-[#0F6E56]/5"
              >
                Watch Demo
              </Link>
            </div>

            <p className="mt-4 text-sm text-[#5F5E5A]">
              ✓ Free for 1 business &nbsp; ✓ No credit card &nbsp; ✓ 2 min setup
            </p>
          </div>

          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-xl border-l-4 border-[#A32D2D] bg-white p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-[#FDECEC] px-3 py-1 text-xs font-semibold text-[#A32D2D]">
                HIGH PRIORITY
              </span>
              <Bell className="h-5 w-5 text-[#A32D2D]" />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-gray-900">New Law Detected</h2>
            <p className="mt-2 text-sm text-gray-600">
              India&apos;s Digital Personal Data Protection Act requires all businesses collecting
              customer data to update their privacy policy by September 1, 2025.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-[#A32D2D]">
              <Calendar className="h-4 w-4" />
              <span>Deadline: Sep 1, 2025</span>
            </div>
            <button type="button" className="mt-3 text-sm font-medium text-[#0F6E56]">
              See what to do →
            </button>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-[#E2E8E5] bg-[#F8FAF9] py-8">
        <div className="mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500">Trusted by businesses featured in</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {["TechCrunch", "YC Backed", "Forbes", "Economic Times"].map((item) => (
              <span
                key={item}
                className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold text-gray-900">
            Small businesses get fined. Not because they break laws. Because they never heard
            about them.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-[#F09595] bg-[#FFF8F8] p-8 text-center">
              <p className="text-4xl font-bold text-[#A32D2D]">₹10L+</p>
              <p className="mt-2 text-sm text-gray-500">Average fine for non-compliance in India</p>
            </div>
            <div className="rounded-xl border border-[#FAC775] bg-[#FAEEDA] p-8 text-center">
              <p className="text-4xl font-bold text-[#BA7517]">73%</p>
              <p className="mt-2 text-sm text-gray-500">
                Of SMBs unaware of new regulations affecting them
              </p>
            </div>
            <div className="rounded-xl border border-[#9FE1CB] bg-[#E1F5EE] p-8 text-center">
              <p className="text-4xl font-bold text-[#0F6E56]">48hrs</p>
              <p className="mt-2 text-sm text-gray-500">
                Average time to understand what a new law means for you
              </p>
            </div>
          </div>

          <p className="mt-8 text-center text-lg font-semibold text-[#0F6E56]">
            ReguGuard fixes all three.
          </p>
        </div>
      </section>

      <section id="features" className="bg-[#F8FAF9] py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="mx-auto inline-flex rounded-full bg-[#E1F5EE] px-3 py-1 text-xs font-medium text-[#0F6E56]">
            Features
          </span>
          <h2 className="mt-4 text-center text-3xl font-bold text-gray-900">
            Everything you need to stay compliant
          </h2>
          <p className="mt-3 text-center text-lg text-[#5F5E5A]">
            Built specifically for small business owners with no legal background.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-[#E2E8E5] bg-white p-6 transition hover:border-[#1D9E75] hover:shadow-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E1F5EE]">
                <Bell className="h-5 w-5 text-[#0F6E56]" />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">Real-time regulation alerts</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5F5E5A]">
                We monitor government sites, news, and legal databases 24/7 for your industry and
                location. You get alerted the same day.
              </p>
            </div>

            <div className="rounded-xl border border-[#E2E8E5] bg-white p-6 transition hover:border-[#1D9E75] hover:shadow-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E1F5EE]">
                <FileText className="h-5 w-5 text-[#0F6E56]" />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">Plain-English law summaries</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5F5E5A]">
                Upload any PDF law document. AI explains what it means for your specific business
                in plain English - in under 10 seconds.
              </p>
            </div>

            <div className="rounded-xl border border-[#E2E8E5] bg-white p-6 transition hover:border-[#1D9E75] hover:shadow-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E1F5EE]">
                <CheckSquare className="h-5 w-5 text-[#0F6E56]" />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">Future-Proof Score</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5F5E5A]">
                A live compliance score from 0-100. See exactly where you stand and which tasks
                will raise your score the most.
              </p>
            </div>

            <div className="rounded-xl border border-[#E2E8E5] bg-white p-6 transition hover:border-[#1D9E75] hover:shadow-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E1F5EE]">
                <Calendar className="h-5 w-5 text-[#0F6E56]" />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">Deadline tracker</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5F5E5A]">
                Never miss a compliance deadline. Action items with due dates are auto-generated
                from every new regulation we detect.
              </p>
            </div>

            <div className="rounded-xl border border-[#E2E8E5] bg-white p-6 transition hover:border-[#1D9E75] hover:shadow-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E1F5EE]">
                <MapPin className="h-5 w-5 text-[#0F6E56]" />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">Location-aware monitoring</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5F5E5A]">
                Laws differ by state and country. ReguGuard filters alerts specifically for your
                business&apos;s city and region.
              </p>
            </div>

            <div className="rounded-xl border border-[#E2E8E5] bg-white p-6 transition hover:border-[#1D9E75] hover:shadow-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E1F5EE]">
                <Zap className="h-5 w-5 text-[#0F6E56]" />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">Instant action plan</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5F5E5A]">
                Don&apos;t just get informed - get a numbered checklist of exactly what to do,
                written for your specific business type.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="mx-auto inline-flex rounded-full bg-[#E1F5EE] px-3 py-1 text-xs font-medium text-[#0F6E56]">
            How It Works
          </span>
          <h2 className="mt-4 text-center text-3xl font-bold text-gray-900">
            From signup to compliant in 3 steps
          </h2>

          <div className="relative mt-12">
            <div className="absolute left-1/4 right-1/4 top-8 hidden h-px border-t-2 border-dashed border-[#E2E8E5] md:block" />

            <div className="grid gap-10 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#0F6E56] text-2xl font-bold text-white">
                  01
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900">Tell us about your business</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm text-[#5F5E5A]">
                  Enter your industry type and location. Takes 60 seconds.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#0F6E56] text-2xl font-bold text-white">
                  02
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900">We monitor everything for you</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm text-[#5F5E5A]">
                  Our AI scans news feeds, government sites, and legal databases every day.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#0F6E56] text-2xl font-bold text-white">
                  03
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900">
                  Act on clear, simple guidance
                </h3>
                <p className="mx-auto mt-2 max-w-xs text-sm text-[#5F5E5A]">
                  Receive alerts, plain-English summaries, and step-by-step task lists.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="#"
              className="inline-flex rounded-lg bg-[#0F6E56] px-8 py-3 font-medium text-white transition hover:opacity-95"
            >
              Start monitoring free →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
