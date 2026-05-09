export default function FinalCta() {
  return (
    <section className="bg-[#0F6E56] py-24 text-center">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white">Your next fine could be your last warning.</h2>
        <p className="mt-4 text-xl text-green-100">
          Start monitoring regulations free today - no credit card needed.
        </p>
        <button
          type="button"
          className="mt-8 rounded-lg bg-white px-8 py-4 font-semibold text-[#0F6E56] transition hover:bg-green-50"
        >
          Get My Free Score →
        </button>
        <p className="mt-4 text-sm text-green-200">Takes 2 minutes. Free forever for 1 business.</p>
      </div>
    </section>
  );
}
