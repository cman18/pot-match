"use client";
import { useEffect, useState } from "react";
import AddressForm from "@/components/AddressForm";
import MatchBars from "@/components/MatchBars";
import ConfidenceBadge from "@/components/ConfidenceBadge";
import { scoreMatch } from "@/lib/similarity";
import { buildCandidateVectors } from "@/lib/candidates";
import { IssueVector, WeightVector } from "@/lib/types";

export default function ResultsPage() {
  const [ballot, setBallot] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [user, setUser] = useState<IssueVector | null>(null);
  const [weights, setWeights] = useState<WeightVector | null>(null);

  useEffect(() => {
    const a = localStorage.getItem("answers");
    const w = localStorage.getItem("weights");
    if (a && w) {
      setUser(JSON.parse(a));
      setWeights(JSON.parse(w));
    }
  }, []);

  async function compute(contestId: string) {
    if (!user || !weights) return;
    const cands = await buildCandidateVectors(contestId);
    const scored = cands.map(c =>
      scoreMatch(user, weights, { id: c.id, name: c.name, party: c.party, vec: c.vec, coverage: c.coverage })
    ).sort((a, b) => b.score - a.score);
    setMatches(scored);
  }

  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold">Results</h2>
      {!ballot && <AddressForm onLoaded={(data) => { setBallot(data); }} />}
      {ballot && (
        <>
          <div className="border rounded p-4">
            <h3 className="font-semibold text-lg">Contests</h3>
            <ul className="list-disc pl-5">
              {(ballot.contests || []).map((c: any) => (
                <li key={c.id}>
                  <button className="underline" onClick={() => compute(c.id)}>
                    {(c.office || c.type || "Contest") + " in " + (c.jurisdiction || "your area")}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {matches.length > 0 && (
            <div className="border rounded p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Top matches</h3>
                <ConfidenceBadge c={matches[0].confidence} />
              </div>
              <MatchBars items={matches.map(m => ({ name: m.candidateName, party: m.party, score: m.score }))} />
              <details className="mt-4">
                <summary className="cursor-pointer">Per issue breakdown</summary>
                <div className="mt-3 space-y-2">
                  {matches[0].perIssue.map((pi: any) => (
                    <div key={pi.issue} className="text-sm flex justify-between">
                      <span>{pi.issue}</span>
                      <span>{Math.round((pi.alignment + 1) * 50)}% match · wt {pi.weight} · {pi.covered ? "evidence" : "missing"}</span>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          )}
        </>
      )}
    </main>
  );
}
