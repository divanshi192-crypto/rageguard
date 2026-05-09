import Link from "next/link";
import { BriefcaseBusiness, Code2, Send, Shield } from "lucide-react";

const productLinks = ["Features", "Pricing", "Demo", "How It Works"];
const companyLinks = ["About", "Blog", "Careers"];
const legalLinks = ["Privacy Policy", "Terms of Service"];

export default function Footer() {
  return (
    <footer className="border-t border-[#E2E8E5] bg-[#F8FAF9]">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link href="#" className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-[#0F6E56]" />
            <span className="font-semibold text-gray-900">ReguGuard</span>
          </Link>
          <p className="mt-3 text-sm text-[#5F5E5A]">Stay compliant. Stay open.</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900">Product</h3>
          <ul className="mt-3 space-y-2">
            {productLinks.map((item) => (
              <li key={item}>
                <Link href="#" className="text-sm text-gray-600 transition hover:text-[#0F6E56]">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900">Company</h3>
          <ul className="mt-3 space-y-2">
            {companyLinks.map((item) => (
              <li key={item}>
                <Link href="#" className="text-sm text-gray-600 transition hover:text-[#0F6E56]">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900">Legal</h3>
          <ul className="mt-3 space-y-2">
            {legalLinks.map((item) => (
              <li key={item}>
                <Link href="#" className="text-sm text-gray-600 transition hover:text-[#0F6E56]">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[#E2E8E5]">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-sm text-[#5F5E5A]">© 2025 ReguGuard. All rights reserved.</p>
          <div className="flex items-center gap-4 text-gray-500">
            <Link href="#" aria-label="Twitter" className="transition hover:text-[#0F6E56]">
              <Send className="h-4 w-4" />
            </Link>
            <Link href="#" aria-label="LinkedIn" className="transition hover:text-[#0F6E56]">
              <BriefcaseBusiness className="h-4 w-4" />
            </Link>
            <Link href="#" aria-label="GitHub" className="transition hover:text-[#0F6E56]">
              <Code2 className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
