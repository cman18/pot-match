import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { memberId } = await req.json();
  const key = process.env.DATA_GOV_API_KEY;
  if (!key) return NextResponse.json({ error: "Missing Data.gov key" }, { status: 500 });

  const base = "https://api.congress.gov/v3";
  const res = await fetch(`${base}/member/${memberId}/votes?api_key=${key}`);
  const data = await res.json();
  const votes = (data?.votes || []).slice(0, 50).map((v: any) => ({
    question: v.question, result: v.result, position: v.position, date: v.date, bill: v.bill?.number,
    policyArea: v.bill?.policyArea?.name
  }));
  return NextResponse.json({ votes });
}
