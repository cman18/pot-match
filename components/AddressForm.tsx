"use client";
import { useState } from "react";

export default function AddressForm({ onLoaded }: { onLoaded: (data: any) => void }) {
  const [addr, setAddr] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function fetchBallot() {
    setLoading(true); setErr(null);
    try {
      const res = await fetch("/api/civic", {
        method: "POST",
        body: JSON.stringify({ address: addr }),
        headers: { "Content-Type": "application/json" }
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      onLoaded(data);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <input className="border rounded px-3 py-2 w-full" placeholder="Enter your street address, city, state"
             value={addr} onChange={e => setAddr(e.target.value)} />
      <button className="rounded bg-black text-white px-4 py-2" onClick={fetchBallot} disabled={loading}>
        {loading ? "Loading..." : "Load my ballot contests"}
      </button>
      {err && <p className="text-red-600 text-sm">{err}</p>}
    </div>
  );
}
