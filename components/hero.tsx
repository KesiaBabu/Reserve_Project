"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useRef, useEffect, useState, useMemo } from "react"

function createSeededRandom(seed: number) {
  let value = seed

  return () => {
    value = (value * 1664525 + 1013904223) >>> 0
    return value / 4294967296
  }
}

function CandlestickChart() {
  const [candles, setCandles] = useState(() => {
    const random = createSeededRandom(42)
    const initial: any[] = []
    let prevClose = 50
    for (let i = 0; i < 60; i++) {
      const change = (random() - 0.48) * 8
      const open = prevClose
      const close = open + change
      const high = Math.max(open, close) + random() * 4
      const low = Math.min(open, close) - random() * 4
      initial.push({
        open,
        close,
        high,
        low,
        isGreen: close >= open,
        id: i,
      })
      prevClose = close
    }
    return initial
  })

  const nextIdRef = useRef(60)

  // (Leave chart logic as-is — no changes here)

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 flex items-end transition-transform duration-700 ease-linear">
        {candles.map((candle, i) => {
          const bodyTop = Math.max(candle.open, candle.close)
          const bodyBottom = Math.min(candle.open, candle.close)
          const bodyHeight = Math.max(bodyTop - bodyBottom, 1)

          return (
            <div
              key={candle.id}
              className="relative flex flex-col items-center flex-shrink-0 transition-all duration-500 ease-linear"
              style={{
                height: "100%",
                width: `${100 / 60}%`,
              }}
            >
              {/* Wick */}
              <div
                className={`absolute w-px ${candle.isGreen ? "bg-[#00ff88]/50" : "bg-[#ff4757]/50"}`}
                style={{
                  height: `${candle.high - candle.low}%`,
                  top: `${100 - candle.high}%`,
                }}
              />
              {/* Body with glow */}
              <div
                className={`absolute rounded-sm ${
                  candle.isGreen
                    ? "bg-[#00ff88] shadow-[0_0_8px_rgba(0,255,136,0.5)]"
                    : "bg-[#ff4757] shadow-[0_0_8px_rgba(255,71,87,0.5)]"
                }`}
                style={{
                  width: "60%",
                  maxWidth: "6px",
                  height: `${bodyHeight}%`,
                  bottom: `${bodyBottom}%`,
                  opacity: 0.4 + (i / candles.length) * 0.5,
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Floating numbers animation
function FloatingNumbers() {
  const numbers = useMemo(
    () => {
      const random = createSeededRandom(2026)

      return Array.from({ length: 15 }, (_, i) => ({
        id: i,
        value: (random() * 1000).toFixed(2),
        x: random() * 100,
        y: random() * 100,
        delay: random() * 5,
        duration: 10 + random() * 10,
        opacity: 0.05 + random() * 0.1,
      }))
    },
    [],
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {numbers.map((num) => (
        <div
          key={num.id}
          className="absolute text-[#00d4ff] font-mono text-xs animate-float"
          style={{
            left: `${num.x}%`,
            top: `${num.y}%`,
            animationDelay: `${num.delay}s`,
            animationDuration: `${num.duration}s`,
            opacity: num.opacity,
          }}
        >
          {num.value}
        </div>
      ))}
    </div>
  )
}

type MarketTickerApiResponse = {
  ok?: boolean
  data?: Array<{
    symbol: string
    price: number | null
    change: number | null
    changePercent: number | null
  }>
  updatedAt?: string | null
}

// ✅ DAILY interval
const ONE_DAY_MS = 24 * 60 * 60 * 1000

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentPrice, setCurrentPrice] = useState(5823.45)
  const [priceChange, setPriceChange] = useState(1.24)

  // LIVE vs NO LIVE (minimal addition)
  const [isLive, setIsLive] = useState(true)

  // ✅ ONLY CHANGE: fetch FTSE 100 values; set LIVE/NO LIVE based on availability
  useEffect(() => {
    setIsLoaded(true)

    let alive = true

    const loadFtse = async () => {
      const controller = new AbortController()
      const timeoutId = window.setTimeout(() => controller.abort(), 8000)

      try {
        const res = await fetch(`/api/market-ticker?t=${Date.now()}`, {
          cache: "no-store",
          signal: controller.signal,
        })
        const json = (await res.json()) as MarketTickerApiResponse

        // Console confirmation (kept)
        console.log("ticker updated:", json?.updatedAt, "ok:", json?.ok)

        if (!alive) return

        // If API not OK or missing data -> NO LIVE (but keep existing price display)
        if (!json?.ok || !Array.isArray(json?.data)) {
          setIsLive(false)
          return
        }

        // FTSE 100 (your requirement)
        const ftse = json.data.find((x) => x.symbol === "S&P 500")

        // If FTSE missing/invalid -> NO LIVE
        if (!ftse || ftse.price == null || ftse.changePercent == null) {
          setIsLive(false)
          return
        }

        // Live FTSE present -> LIVE
        setIsLive(true)
        setCurrentPrice(ftse.price)
        setPriceChange(ftse.changePercent)
      } catch {
        // Network/API failure -> NO LIVE
        if (!alive) return
        setIsLive(false)
      } finally {
        window.clearTimeout(timeoutId)
      }
    }

    loadFtse() // initial load

    // ✅ DAILY fetch (only change from previous minute-based version)
    const id = window.setInterval(loadFtse, ONE_DAY_MS)

    return () => {
      alive = false
      window.clearInterval(id)
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-visible pt-28 md:pt-32"
    >
      <div className="absolute inset-0 bg-[#0a0a0f]" />

      <div className="absolute inset-0 z-[1] overflow-hidden">
        <CandlestickChart />
      </div>

      <FloatingNumbers />

      {/* Gradient overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/70 via-[#0a0a0f]/30 to-[#0a0a0f]/80 z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/40 via-transparent to-[#0a0a0f]/40 z-[2]" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00d4ff]/10 rounded-full blur-[120px] pointer-events-none z-[1]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#f7d354]/5 rounded-full blur-[120px] pointer-events-none z-[1]" />

      {/* Content */}
      <div className="container mx-auto relative z-10 px-4 md:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Live price indicator */}
          <div
            className={`flex justify-center mb-4 md:mb-8 py-4 overflow-visible transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative hover:z-10 overflow-visible terminal-card px-4 md:px-6 py-2 md:py-3 flex items-center gap-2 md:gap-4 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,136,0.3)] hover:border-[#00ff88]/50 hover:scale-105 active:shadow-[0_0_30px_rgba(0,212,255,0.4)]">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isLive ? "bg-[#00ff88] animate-pulse" : "bg-[#ff4757]"}`} />
                <span className="text-xs text-white/50 font-mono">{isLive ? "LIVE" : "NO LIVE"}</span>
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div className="flex items-center gap-2 md:gap-3">
                <span className="text-xs md:text-sm text-white/60 font-mono">INDEX</span>
                <span className="text-base md:text-lg font-bold text-white font-mono stat-number">
                  {currentPrice.toFixed(2)}
                </span>
                <span
                  className={`text-xs md:text-sm font-mono ${
                    priceChange >= 0 ? "text-[#00ff88]" : "text-[#ff4757]"
                  }`}
                >
                  {priceChange >= 0 ? "+" : ""}
                  {priceChange.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>

          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 md:mb-6 text-center leading-tight transition-all duration-1000 delay-100 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-white">Transforming </span>
            <span className="gradient-text-cyan">Data</span>
            <span className="text-white"> into</span>
            <br />
            <span className="gradient-text-yellow">Intelligent Decisions</span>
          </h1>

          <p
            className={`text-sm md:text-lg lg:text-xl text-white/50 mb-6 md:mb-10 max-w-3xl mx-auto leading-relaxed text-center transition-all duration-1000 delay-200 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Reserve Financial Services Ltd combines cutting-edge technology, real-time data analytics, and disciplined
            methodology to support internal trading decisions. We trade exclusively with company capital.
          </p>

          {/* CTA buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 transition-all duration-1000 delay-300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("workflow")}
              className="group bg-[#00d4ff] hover:bg-[#00d4ff]/90 text-[#0a0a0f] font-semibold px-6 md:px-8 py-5 md:py-6 text-sm md:text-base rounded-lg transition-all hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
            >
              Explore Our Approach
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("what-we-do")}
              className="bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-white/40 px-6 md:px-8 py-5 md:py-6 text-sm md:text-base rounded-lg"
            >
              View Our Process
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent z-[3]" />
    </section>
  )
}
