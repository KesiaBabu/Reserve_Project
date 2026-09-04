"use client";

import { useEffect, useState } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";

interface TickerItem {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

const initialData: TickerItem[] = [
  { symbol: "FTSE 100", price: 8234.56, change: 45.23, changePercent: 0.55 },
  { symbol: "S&P 500", price: 5892.34, change: -12.45, changePercent: -0.21 },
  { symbol: "NASDAQ", price: 18756.89, change: 89.12, changePercent: 0.48 },
  { symbol: "DAX", price: 19234.67, change: 123.45, changePercent: 0.65 },
  { symbol: "EUR/USD", price: 1.0856, change: 0.0023, changePercent: 0.21 },
  { symbol: "GBP/USD", price: 1.2734, change: -0.0045, changePercent: -0.35 },
  { symbol: "BTC/USD", price: 104234.56, change: 1234.56, changePercent: 1.2 },
  { symbol: "GOLD", price: 2645.78, change: 15.34, changePercent: 0.58 },
];

type ApiResponse = {
  ok?: boolean;
  data?: Array<{
    symbol: string;
    price: number | null;
    change: number | null;
    changePercent: number | null;
  }>;
  updatedAt?: string | null;
  error?: string;
  detail?: string;
};

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export function LiveTicker() {
  const [data, setData] = useState<TickerItem[]>(initialData);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    let alive = true;

    const fallbackToStatic = () => {
      setIsLive(false);
      setData(initialData);
      console.warn("[MarketTicker] Live update FAILED — using static values");
    };

    const load = async () => {
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 8000);

      try {
        const res = await fetch(`/api/market-ticker?t=${Date.now()}`, {
          cache: "no-store",
          signal: controller.signal,
        });

        const json = (await res.json()) as ApiResponse;

        // ✅ console confirmation (no UI time)
        console.log("ticker updated:", json?.updatedAt, "ok:", json?.ok);

        if (!alive) return;

        if (!json?.ok || !Array.isArray(json?.data) || json.data.length === 0) {
          fallbackToStatic();
          return;
        }

        const hasAtLeastOnePrice = json.data.some((x) => typeof x.price === "number" && x.price !== null);
        if (!hasAtLeastOnePrice) {
          fallbackToStatic();
          return;
        }

        const liveBySymbol = new Map(json.data.map((x) => [x.symbol, x]));

        // Merge live values; if a symbol is missing/null, keep your static one
        const merged: TickerItem[] = initialData.map((staticItem) => {
          const live = liveBySymbol.get(staticItem.symbol);
          if (!live || live.price == null || live.change == null || live.changePercent == null) return staticItem;

          return {
            symbol: staticItem.symbol,
            price: live.price,
            change: live.change,
            changePercent: live.changePercent,
          };
        });

        setIsLive(true);
        setData(merged);
        console.log("[MarketTicker] Live update OK");
      } catch {
        if (!alive) return;
        fallbackToStatic();
      } finally {
        window.clearTimeout(timeoutId);
      }
    };

    load(); // initial load on mount
    const id = window.setInterval(load, ONE_DAY_MS); // ✅ daily fetch

    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, []);

  const formatPrice = (price: number, symbol: string) => {
    if (symbol.includes("/")) return price.toFixed(4);
    if (price > 10000)
      return price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return price.toFixed(2);
  };

  const tickerItems = [...data, ...data, ...data];

  return (
    <div className="fixed top-16 lg:top-20 left-0 right-0 z-40 bg-[#050508] border-b border-white/5 overflow-hidden">
      {!isLive && (
        <div className="relative z-50 bg-yellow-500/15 text-yellow-200 border-b border-yellow-500/30 px-4 py-2 text-xs">
          No live price. Showing static values.
        </div>
      )}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.03)_0%,transparent_70%)]" />

      <div className="relative animate-ticker flex whitespace-nowrap py-3">
        {tickerItems.map((item, index) => (
          <div key={`${item.symbol}-${index}`} className="inline-flex items-center gap-4 px-8 border-r border-white/5">
            <span className="text-xs font-medium text-white/60 font-mono">{item.symbol}</span>
            <span className="text-sm font-semibold text-white font-mono stat-number">
              {formatPrice(item.price, item.symbol)}
            </span>
            <span
              className={`flex items-center gap-1 text-xs font-mono ${
                item.change >= 0 ? "text-[#00ff88]" : "text-[#ff4757]"
              }`}
            >
              {item.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {item.changePercent >= 0 ? "+" : ""}
              {item.changePercent.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
