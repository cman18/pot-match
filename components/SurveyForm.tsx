"use client";
import { useState } from "react";
import { ISSUES } from "@/lib/issues";
import { likertToScore, percentToWeight } from "@/lib/normalize";

export default function SurveyForm() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [weights, setWeights] = useState<Record<string, number>>({});

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        const vec = Object.fromEntries(
          ISSUES.map(i => [i.key, likertToScore(answers[i.key] ?? 3)])
        );
        const w = Object.fromEntries(
          ISSUES.map(i => [i.key, percentToWeight(weights[i.key] ?? 50)])
        );
        localStorage.setItem("answers", JSON.stringify(vec));
        localStorage.setItem("weights", JSON.stringify(w));
        window.location.href = "/results";
      }}
    >
      {ISSUES.map(({ key, prompt }) => (
        <div key={key} className="border rounded p-4">
          <div className="font-medium">{prompt}</div>
          <label className="block mt-2 text-sm">Agreement 1 to 5</label>
          <input type="range" min={1} max={5} defaultValue={3}
                 onChange={(e) => setAnswers(a => ({ ...a, [key]: Number(e.target.value) }))} />
          <label className="block mt-2 text-sm">Importance 0 to 100</label>
          <input type="range" min={0} max={100} defaultValue={50}
                 onChange={(e) => setWeights(w => ({ ...w, [key]: Number(e.target.value) }))} />
        </div>
      ))}
      <button className="rounded bg-black text-white px-4 py-2" type="submit">Save and continue</button>
    </form>
  );
}
