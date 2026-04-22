export const metadata = {
  title: "Privacy Policy | NovaAxis Labs",
  description: "Privacy policy for the NovaAxis Labs website.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-16 text-slate-100">
      <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Privacy</p>
      <h1 className="mt-3 text-4xl font-semibold text-white">Privacy Policy</h1>
      <p className="mt-6 text-sm leading-7 text-slate-300">
        We collect the minimum information required to operate this site and respond to inquiries.
        If you submit a contact form, we store the details you provide and may email you to follow
        up. We don&apos;t sell personal data.
      </p>
      <p className="mt-4 text-sm leading-7 text-slate-300">
        Basic analytics may be used to understand performance and improve user experience. You can
        request deletion of inquiry data by emailing us.
      </p>
    </main>
  );
}

