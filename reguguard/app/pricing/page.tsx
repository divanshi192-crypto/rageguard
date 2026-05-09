"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PricingSection from "@/components/sections/PricingSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.45, ease: "easeOut" as const },
  };

  return (
    <div className="bg-[#F8FAF9]">
      <motion.section {...fadeUp} className="px-4 pb-12 pt-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
          Simple pricing for every business size
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-[#5F5E5A]">
          Choose monthly for flexibility or yearly for better value.
        </p>

        <div className="mx-auto mt-8 inline-flex rounded-full border border-[#E2E8E5] bg-white p-1">
          <button
            type="button"
            onClick={() => setBillingCycle("monthly")}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              billingCycle === "monthly" ? "bg-[#0F6E56] text-white" : "text-gray-600"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle("yearly")}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              billingCycle === "yearly" ? "bg-[#0F6E56] text-white" : "text-gray-600"
            }`}
          >
            Yearly
          </button>
        </div>
      </motion.section>

      <motion.div {...fadeUp}>
        <PricingSection billingCycle={billingCycle} />
      </motion.div>

      <motion.section {...fadeUp} className="bg-white py-20">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900">Frequently asked questions</h2>

          <div className="mt-10 rounded-xl border border-[#E2E8E5] bg-[#F8FAF9] px-6">
            <Accordion type="single" collapsible defaultValue="q1">
              <AccordionItem value="q1">
                <AccordionTrigger>Is the free plan really free forever?</AccordionTrigger>
                <AccordionContent>
                  Yes. No credit card needed. 1 business, 3 alerts per month, always free.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger>Can I cancel my Pro plan anytime?</AccordionTrigger>
                <AccordionContent>
                  Yes. Cancel from your dashboard anytime. No questions asked.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger>What kinds of laws does ReguGuard cover?</AccordionTrigger>
                <AccordionContent>
                  Labor laws, GST/tax rules, data protection (DPDP, GDPR), food safety,
                  environmental, MSME regulations, and more - filtered by your industry.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q4">
                <AccordionTrigger>Do I need any legal knowledge to use it?</AccordionTrigger>
                <AccordionContent>
                  None at all. Everything is written in plain English. If you can read a WhatsApp
                  message, you can understand a ReguGuard alert.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q5">
                <AccordionTrigger>How accurate is the AI analysis?</AccordionTrigger>
                <AccordionContent>
                  Our AI is trained on legal documents and government sources. We always recommend
                  using ReguGuard as your early warning system and consulting a lawyer for major
                  decisions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
