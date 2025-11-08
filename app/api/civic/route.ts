import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { address } = await req.json();
    const key = process.env.GOOGLE_CIVIC_API_KEY;
    if (!key) return NextResponse.json({ error: "Missing Google Civic key" }, { status: 500 });

    const electionsRes = await fetch(`https://civicinfo.googleapis.com/civicinfo/v2/elections?key=${key}`);
    const elections = await electionsRes.json();
    const electionId = elections?.elections?.[0]?.id;

    const voterRes = await fetch(`https://civicinfo.googleapis.com/civicinfo/v2/voterinfo?key=${key}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address, electionId })
    });
    const voter = await voterRes.json();

    const contests = (voter.contests || []).map((c: any, idx: number) => ({
      id: `${electionId}-${idx}`,
      office: c.office,
      type: c.type,
      jurisdiction: voter?.normalizedInput?.city || voter?.normalizedInput?.state,
      candidates: (c.candidates || []).map((x: any) => ({ name: x.name, party: x.party }))
    }));

    return NextResponse.json({ electionId, contests });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
