import { IssueVector, WeightVector, MatchResult } from "./types";

export function cosine(a: number[], b: number[]) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  if (na === 0 || nb === 0) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

export function scoreMatch(
  user: IssueVector,
  weights: WeightVector,
  candidate: { vec: IssueVector; coverage: Record<string, boolean>; name: string; id: string; party?: string }
): MatchResult {
  const issues = Object.keys(user) as (keyof IssueVector)[];
  const userArr = issues.map(k => user[k] ?? 0);
  const candArr = issues.map(k => candidate.vec[k] ?? 0);
  const wArr = issues.map(k => weights[k] ?? 0);

  const weightedUser = userArr.map((v, i) => v * wArr[i]);
  const weightedCand = candArr.map((v, i) => v * wArr[i]);
  const base = cosine(weightedUser, weightedCand);

  const coveredCount = issues.filter(k => candidate.coverage[k as string]).length;
  const coverage = coveredCount / issues.length;

  const penalty = 0.2 * (1 - coverage);
  const score = Math.max(-1, Math.min(1, base - penalty));

  return {
    candidateId: candidate.id,
    candidateName: candidate.name,
    party: candidate.party,
    score,
    confidence: coverage,
    perIssue: issues.map((k, i) => ({
      issue: k,
      alignment: cosine([userArr[i]], [candArr[i]]),
      weight: wArr[i],
      covered: !!candidate.coverage[k as string]
    }))
  };
}
