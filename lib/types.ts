export type IssueKey =
  | "economy"
  | "taxes"
  | "healthcare"
  | "abortion"
  | "guns"
  | "immigration"
  | "climate"
  | "energy"
  | "education"
  | "criminal_justice"
  | "foreign_policy"
  | "trade"
  | "civil_rights"
  | "voting_rights"
  | "privacy"
  | "infrastructure";

export type IssueVector = Record<IssueKey, number>;
export type WeightVector = Record<IssueKey, number>;

export type MatchResult = {
  candidateId: string;
  candidateName: string;
  party?: string;
  score: number;
  confidence: number;
  perIssue: { issue: IssueKey; alignment: number; weight: number; covered: boolean }[];
};
