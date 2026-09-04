import { NextResponse } from "next/server"

interface TickerItem {
  symbol: string
  price: number
  change: number
  changePercent: number
}

const fallbackData: TickerItem[] = [
  { symbol: "FTSE 100", price: 8234.56, change: 45.23, changePercent: 0.55 },
  { symbol: "S&P 500", price: 5892.34, change: -12.45, changePercent: -0.21 },
  { symbol: "NASDAQ", price: 18756.89, change: 89.12, changePercent: 0.48 },
  { symbol: "DAX", price: 19234.67, change: 123.45, changePercent: 0.65 },
  { symbol: "EUR/USD", price: 1.0856, change: 0.0023, changePercent: 0.21 },
  { symbol: "GBP/USD", price: 1.2734, change: -0.0045, changePercent: -0.35 },
  { symbol: "BTC/USD", price: 104234.56, change: 1234.56, changePercent: 1.2 },
  { symbol: "GOLD", price: 2645.78, change: 15.34, changePercent: 0.58 },
]

async function fetchAlphaVantageData(): Promise<TickerItem[] | null> {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY
  if (!apiKey) return null

  try {
    const symbols = ["SPY", "QQQ"]
    const results: TickerItem[] = []

    for (const symbol of symbols) {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`,
        { next: { revalidate: 60 } },
      )
      const data = await response.json()

      if (data["Global Quote"]) {
        const quote = data["Global Quote"]
        results.push({
          symbol: symbol === "SPY" ? "S&P 500" : "NASDAQ",
          price: Number.parseFloat(quote["05. price"]),
          change: Number.parseFloat(quote["09. change"]),
          changePercent: Number.parseFloat(quote["10. change percent"]?.replace("%", "") || "0"),
        })
      }
    }

    return results.length > 0 ? results : null
  } catch (error) {
    console.error("Alpha Vantage API error:", error)
    return null
  }
}

async function fetchFinnhubData(): Promise<TickerItem[] | null> {
  const apiKey = process.env.FINNHUB_API_KEY
  if (!apiKey) return null

  try {
    const symbols = [
      { api: "SPY", display: "S&P 500" },
      { api: "QQQ", display: "NASDAQ" },
    ]
    const results: TickerItem[] = []

    for (const { api, display } of symbols) {
      const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${api}&token=${apiKey}`, {
        next: { revalidate: 60 },
      })
      const data = await response.json()

      if (data.c && data.c > 0) {
        results.push({
          symbol: display,
          price: data.c,
          change: data.d || 0,
          changePercent: data.dp || 0,
        })
      }
    }

    return results.length > 0 ? results : null
  } catch (error) {
    console.error("Finnhub API error:", error)
    return null
  }
}

export async function GET() {
  // Try Alpha Vantage first
  let liveData = await fetchAlphaVantageData()

  // If Alpha Vantage fails, try Finnhub
  if (!liveData) {
    liveData = await fetchFinnhubData()
  }

  // Merge live data with fallback
  if (liveData && liveData.length > 0) {
    const mergedData = fallbackData.map((item) => {
      const liveItem = liveData!.find((l) => l.symbol === item.symbol)
      return liveItem || item
    })
    return NextResponse.json({ data: mergedData, isLive: true })
  }

  // Return fallback data
  return NextResponse.json({ data: fallbackData, isLive: false })
}
