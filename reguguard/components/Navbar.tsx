"use client";

import Link from "next/link";
import { Menu, Shield, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/demo", label: "Demo" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hash, setHash] = useState("");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    const onHashChange = () => setHash(window.location.hash);
    onScroll();
    onHashChange();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, hash]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" && hash !== "#how-it-works";
    if (href === "/#how-it-works") return pathname === "/" && hash === "#how-it-works";
    return pathname === href;
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b border-[#E2E8E5] transition-all ${
        isScrolled ? "bg-white/90 shadow-sm backdrop-blur-sm" : "bg-white"
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-[#0F6E56]" />
          <span className="font-semibold text-gray-900">ReguGuard</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm transition hover:text-[#0F6E56] ${
                isActive(link.href) ? "text-[#0F6E56]" : "text-gray-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            href="/pricing"
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

      <div
        className={`overflow-hidden border-t border-[#E2E8E5] bg-white transition-[max-height] duration-300 ease-out md:hidden ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="min-h-[calc(100vh-4rem)] px-6 py-8">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`rounded-lg px-4 py-4 text-lg transition ${
                  isActive(link.href)
                    ? "bg-[#E1F5EE] text-[#0F6E56]"
                    : "text-gray-700 hover:bg-gray-100 hover:text-[#0F6E56]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/pricing"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#1D9E75] px-5 py-3 text-base font-medium text-white transition hover:opacity-90"
              onClick={() => setIsOpen(false)}
            >
              Start Free
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
