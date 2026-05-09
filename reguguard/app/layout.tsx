import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RouteProgress from "@/components/RouteProgress";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ReguGuard — AI Compliance Monitor for Small Businesses",
  description:
    "Never miss a law that could shut down your business. ReguGuard monitors regulations 24/7 and tells you exactly what to do.",
  openGraph: {
    title: "ReguGuard — AI Compliance Monitor for Small Businesses",
    description:
      "Never miss a law that could shut down your business. ReguGuard monitors regulations 24/7 and tells you exactly what to do.",
    images: [{ url: "https://placehold.co/1200x630/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} min-h-screen antialiased`}>
        <RouteProgress />
        <div className="flex min-h-screen flex-col font-sans">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
