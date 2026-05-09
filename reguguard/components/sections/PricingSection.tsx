"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

type PricingSectionProps = {
  billingCycle?: "monthly" | "yearly";
};

export default function PricingSection({ billingCycle = "monthly" }: PricingSectionProps) {
  const isYearly = billingCycle === "yearly";
  const plans = [
    {
      name: "Free",
      price: "₹0",
      isPopular: false,
      tone: "neutral",
      features: [
        "1 business profile",
        "3 regulation alerts per month",
        "PDF analyzer - 3 uploads/month",
        "Basic Future-Proof Score",
      ],
      cta: "Start Free",
    },
    {
      name: "Pro",
      price: isYearly ? "₹399" : "₹499",
      isPopular: true,
      tone: "brand",
      features: [
        "Up to 3 business profiles",
        "Unlimited regulation alerts",
        "Unlimited PDF analyzer",
        "Full score + 6-month history",
        "Deadline calendar",
        "Email alerts for new laws",
      ],
      cta: "Start Pro Trial",
    },
    {
      name: "Agency",
      price: isYearly ? "₹1,599" : "₹1,999",
      isPopular: false,
      tone: "neutral",
      features: [
        "Unlimited business profiles",
        "Everything in Pro",
        "Team member access",
        "Priority support",
        "API access",
        "White-label reports",
      ],
      cta: "Contact Us",
    },
  ] as const;

  return (
    <section id="pricing" className="bg-[#F8FAF9] py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <span className="mx-auto inline-flex rounded-full bg-[#E1F5EE] px-3 py-1 text-xs font-medium text-[#0F6E56]">
          Pricing
        </span>
        <h2 className="mt-4 text-center text-3xl font-bold text-gray-900">Simple, honest pricing</h2>
        <p className="mt-3 text-center text-[#5F5E5A]">No hidden fees. Cancel anytime.</p>

        <motion.div
          className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={{
                hidden: { opacity: 0, y: 16, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className={`relative rounded-2xl bg-white p-8 transition duration-200 hover:scale-[1.02] ${
                plan.isPopular ? "border-2 border-[#0F6E56]" : "border border-[#E2E8E5]"
              }`}
            >
              {plan.isPopular && (
                <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0F6E56] px-4 py-1 text-xs text-white">
                  Most Popular
                </span>
              )}
              <p className={`font-semibold ${plan.isPopular ? "text-[#0F6E56]" : "text-gray-500"}`}>{plan.name}</p>
              <div className="mt-2 flex items-end gap-1">
                <p className="text-5xl font-bold text-gray-900">{plan.price}</p>
                <p className="text-lg text-gray-400">/month</p>
              </div>
              {isYearly && plan.name !== "Free" && (
                <p className="mt-2 inline-flex rounded-full bg-[#E1F5EE] px-2 py-0.5 text-xs font-medium text-[#0F6E56]">
                  Save 20%
                </p>
              )}
              <div className="my-6 border-t border-[#E2E8E5]" />
              {plan.features.map((feature) => (
                <div key={feature} className="mb-3 flex items-center gap-3 text-sm text-gray-700">
                  <Check className="h-4 w-4 text-[#0F6E56]" />
                  <span>{feature}</span>
                </div>
              ))}
              <button
                type="button"
                className={`mt-8 w-full rounded-lg py-3 font-medium ${
                  plan.name === "Free"
                    ? "border border-[#0F6E56] text-[#0F6E56]"
                    : plan.name === "Pro"
                      ? "bg-[#0F6E56] text-white"
                      : "border border-gray-300 text-gray-600"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
