export default function ConfidenceBadge({ c }: { c: number }) {
  const pct = Math.round(c * 100);
  return <span className="inline-block text-xs px-2 py-1 rounded bg-slate-100 border">{pct}% data coverage</span>;
}
