export default function MatchBars({ items }: { items: { name: string; party?: string; score: number }[] }) {
  return (
    <div className="space-y-3">
      {items.map(it => (
        <div key={it.name}>
          <div className="flex justify-between text-sm">
            <span className="font-medium">{it.name}{it.party ? ` (${it.party})` : ""}</span>
            <span>{Math.round((it.score + 1) * 50)}%</span>
          </div>
          <div className="h-2 bg-slate-200 rounded">
            <div className="h-2 rounded bg-slate-800" style={{ width: `${(it.score + 1) * 50}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
