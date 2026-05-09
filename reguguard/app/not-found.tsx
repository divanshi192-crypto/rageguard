import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-20">
      <div className="text-center">
        <p className="text-7xl font-bold text-[#0F6E56]">404</p>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Page not found</h1>
        <p className="mt-2 text-[#5F5E5A]">Looks like this regulation doesn&apos;t exist.</p>
        <Link href="/" className="mt-6 inline-block font-medium text-[#0F6E56] hover:underline">
          ← Back to ReguGuard
        </Link>
      </div>
    </div>
  );
}
