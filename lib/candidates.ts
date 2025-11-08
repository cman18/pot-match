import { IssueVector } from "./types";

export type CandidateVector = {
  id: string;
  name: string;
  party?: string;
  vec: IssueVector;
  coverage: Record<string, boolean>;
  sources: Record<string, string[]>;
};

export async function buildCandidateVectors(contestId: string): Promise<CandidateVector[]> {
  const demoA: IssueVector = {
    economy: 0.4, taxes: 0.6, healthcare: 0.8, abortion: 0.8, guns: 0.6, immigration: 0.6,
    climate: 0.8, energy: 0.6, education: 0.6, criminal_justice: 0.6,
    foreign_policy: 0.4, trade: 0.4, civil_rights: 0.8, voting_rights: 0.8, privacy: 0.4, infrastructure: 0.6
  };
  const demoB: IssueVector = {
    economy: -0.6, taxes: -0.8, healthcare: -0.6, abortion: -0.8, guns: -0.8, immigration: -0.6,
    climate: -0.8, energy: -0.6, education: -0.4, criminal_justice: -0.4,
    foreign_policy: -0.4, trade: -0.2, civil_rights: -0.6, voting_rights: -0.6, privacy: -0.2, infrastructure: -0.2
  };
  const keys = Object.keys(demoA);
  const coverageTrue = Object.fromEntries(keys.map(k => [k, true])) as Record<string, boolean>;
  return [
    { id: "cand1", name: "Sample Candidate A", party: "Democratic", vec: demoA, coverage: coverageTrue, sources: {} },
    { id: "cand2", name: "Sample Candidate B", party: "Republican", vec: demoB, coverage: coverageTrue, sources: {} }
  ];
}
