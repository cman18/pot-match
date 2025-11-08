import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { q } = await req.json();
  const key = process.env.OPENFEC_API_KEY;
  if (!key) return NextResponse.json({ error: "Missing OpenFEC key" }, { status: 500 });

  const params = new URLSearchParams({ api_key: key });
  if (q?.fecId) params.set("candidate_id", q.fecId);
  if (q?.name) params.set("q", q.name);

  const res = await fetch(`https://api.open.fec.gov/v1/candidates/search/?${params.toString()}`);
  const data = await res.json();
  const first = data?.results?.[0];
  if (!first) return NextResponse.json({ results: [] });

  const totalsRes = await fetch(
    `https://api.open.fec.gov/v1/candidate/${first.candidate_id}/totals/?cycle=${first.cycle || new Date().getFullYear()}&api_key=${key}`
  );
  const totals = await totalsRes.json();

  return NextResponse.json({ candidate: first, totals: totals?.results?.[0] || null });
}
