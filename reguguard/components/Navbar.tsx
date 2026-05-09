"use client";

import Link from "next/link";
import { Menu, Shield, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "#", label: "Home" },
  { href: "#", label: "Features" },
  { href: "#", label: "How It Works" },
  { href: "#", label: "Pricing" },
  { href: "#", label: "Demo" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E2E8E5] bg-white">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#" className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-[#0F6E56]" />
          <span className="font-semibold text-gray-900">ReguGuard</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-gray-600 transition hover:text-[#0F6E56]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            href="#"
            className="rounded-full bg-[#1D9E75] px-5 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            Start Free
          </Link>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-gray-700 md:hidden"
          aria-label="Toggle menu"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-[#E2E8E5] bg-white md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:px-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-gray-600 transition hover:text-[#0F6E56]"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#"
              className="mt-1 inline-flex w-fit rounded-full bg-[#1D9E75] px-5 py-2 text-sm font-medium text-white transition hover:opacity-90"
              onClick={() => setIsOpen(false)}
            >
              Start Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
