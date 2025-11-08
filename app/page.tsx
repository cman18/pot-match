import Link from "next/link";

export default function Home() {
  return (
    <main className="space-y-4">
      <p>Start with a short survey, then enter your address to load your ballot contests</p>
      <div className="flex gap-3">
        <Link className="rounded bg-black text-white px-4 py-2" href="/survey">Start survey</Link>
        <Link className="rounded border px-4 py-2" href="/results">See results</Link>
      </div>
      <section className="mt-6">
        <h2 className="text-xl font-semibold">Privacy</h2>
        <p>Your answers stay on your device unless you opt in to sync later</p>
      </section>
    </main>
  );
}
