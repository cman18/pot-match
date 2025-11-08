import { IssueKey } from "./types";

export const ISSUES: { key: IssueKey; prompt: string }[] = [
  { key: "economy", prompt: "Government should prioritize job growth even if it increases short term deficits" },
  { key: "taxes", prompt: "High earners should pay higher marginal tax rates to fund public services" },
  { key: "healthcare", prompt: "The federal government should guarantee universal health coverage" },
  { key: "abortion", prompt: "Abortion should remain legal in most cases" },
  { key: "guns", prompt: "Background checks and waiting periods should be expanded" },
  { key: "immigration", prompt: "Undocumented residents who meet conditions should have a path to citizenship" },
  { key: "climate", prompt: "Federal action on climate change should be more aggressive" },
  { key: "energy", prompt: "Oil and gas production should be limited in favor of renewables" },
  { key: "education", prompt: "Public funding should expand for early childhood and college affordability" },
  { key: "criminal_justice", prompt: "Reduce incarceration with sentencing reform and rehabilitation programs" },
  { key: "foreign_policy", prompt: "The US should prioritize alliances and multilateral institutions" },
  { key: "trade", prompt: "Prefer free trade agreements over tariffs" },
  { key: "civil_rights", prompt: "Federal protections for LGBTQ and minority rights should be expanded" },
  { key: "voting_rights", prompt: "Voting access should be expanded with national standards" },
  { key: "privacy", prompt: "Stronger federal privacy rules should limit government and corporate data use" },
  { key: "infrastructure", prompt: "Increase federal infrastructure spending even if it raises taxes" }
];
