export const metadata = {
  title: "Terms | NovaAxis Labs",
  description: "Terms of use for the NovaAxis Labs website.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-16 text-slate-100">
      <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Terms</p>
      <h1 className="mt-3 text-4xl font-semibold text-white">Terms of Use</h1>
      <p className="mt-6 text-sm leading-7 text-slate-300">
        This website is provided for informational purposes. Content is subject to change. By using
        this site, you agree not to misuse it, attempt unauthorized access, or interfere with its
        operation.
      </p>
      <p className="mt-4 text-sm leading-7 text-slate-300">
        Project engagements are governed by a separate signed agreement that defines scope,
        timelines, pricing, and IP ownership.
      </p>
    </main>
  );
}

