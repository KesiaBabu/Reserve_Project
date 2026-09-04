import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type FmpEodRow = {
  date?: string;
  close?: number;
};

type ApiItem = {
  symbol: string; // UI label
  price: number | null;
  change: number | null;
  changePercent: number | null;
};

type ApiResponse = {
  ok: boolean;
  data: ApiItem[];
  updatedAt: string | null;
  error?: string;
  detail?: string;
};

// UI label -> FMP symbol (historical)
const SYMBOL_MAP: Record<string, string> = {
  "FTSE 100": "^FTSE",
  "S&P 500": "^GSPC",
  "NASDAQ": "^IXIC",
  "DAX": "^GDAXI",
  "EUR/USD": "EURUSD",
  "GBP/USD": "GBPUSD",
  "BTC/USD": "BTCUSD",
  "GOLD": "GCUSD",
};

// Keep your display order stable
const ORDER = [
  "FTSE 100",
  "S&P 500",
  "NASDAQ",
  "DAX",
  "EUR/USD",
  "GBP/USD",
  "BTC/USD",
  "GOLD",
];

// Simple server-side cache so you don’t hammer FMP if many users hit the page
const CACHE_MS = 23 * 60 * 60 * 1000; // 23h
let cache: { ts: number; payload: ApiResponse } | null = null;

function asNumber(v: any): number | null {
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}

// FMP can return different shapes across products; we handle common variants safely.
function extractEodRows(json: any): FmpEodRow[] {
  // Common shapes:
  // 1) [ {date, close, ...}, ... ]
  // 2) { historical: [ {date, close...}, ... ] }
  // 3) { data: [ ... ] }
  if (Array.isArray(json)) return json;
  if (Array.isArray(json?.historical)) return json.historical;
  if (Array.isArray(json?.data)) return json.data;
  return [];
}

async function fetchLastTwoCloses(symbol: string, apiKey: string): Promise<{ last: number | null; prev: number | null }> {
  const url = new URL("https://financialmodelingprep.com/stable/historical-price-eod/full");
  url.searchParams.set("symbol", symbol);
  url.searchParams.set("apikey", apiKey);

  // We only need the most recent 2 closes; some endpoints support `limit`.
  // If FMP ignores `limit`, we still slice locally.
  url.searchParams.set("limit", "2");

  const res = await fetch(url.toString(), {
    cache: "no-store",
    // hard timeout so it never hangs your loop
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) return { last: null, prev: null };

  const json = await res.json();
  const rows = extractEodRows(json);

  // Assume rows are sorted newest->oldest; if not, sort by date desc.
  const normalized = rows
    .map((r) => ({ date: r?.date, close: asNumber(r?.close) }))
    .filter((r) => r.close != null);

  normalized.sort((a, b) => String(b.date).localeCompare(String(a.date)));

  const last = normalized[0]?.close ?? null;
  const prev = normalized[1]?.close ?? null;
  return { last, prev };
}

// export async function GET() {
//   return NextResponse.json({
//     ok: false,
//     data: [],
//     updatedAt: null,
//     error: "Forced test failure",
//   });
// }

export async function GET() {
  const apiKey = process.env.FMP_API_KEY;

  if (!apiKey) {
    return NextResponse.json<ApiResponse>(
      {
        ok: false,
        data: [],
        updatedAt: null,
        error: "Missing FMP_API_KEY in .env",
      },
      { status: 200 }
    );
  }

  // Serve cached daily data if still fresh
  const now = Date.now();
  if (cache && now - cache.ts < CACHE_MS) {
    return NextResponse.json(cache.payload, { status: 200 });
  }

  try {
    const data: ApiItem[] = [];

    for (const label of ORDER) {
      const fmpSymbol = SYMBOL_MAP[label];
      const { last, prev } = await fetchLastTwoCloses(fmpSymbol, apiKey);

      if (last == null || prev == null || prev === 0) {
        data.push({ symbol: label, price: null, change: null, changePercent: null });
        continue;
      }

      const change = last - prev;
      const changePercent = (change / prev) * 100;

      data.push({
        symbol: label,
        price: last,
        change,
        changePercent,
      });
    }

    const ok = data.some((x) => typeof x.price === "number" && x.price !== null);

    const payload: ApiResponse = {
      ok,
      data,
      updatedAt: new Date().toISOString(),
    };

    cache = { ts: now, payload };

    return NextResponse.json(payload, { status: 200 });
  } catch (err: any) {
    const payload: ApiResponse = {
      ok: false,
      data: [],
      updatedAt: new Date().toISOString(),
      error: "FMP historical fetch failed",
      detail: String(err?.message ?? err),
    };

    // IMPORTANT: status 200 so client loop stays stable & can fall back gracefully
    cache = { ts: now, payload };
    return NextResponse.json(payload, { status: 200 });
  }
}
