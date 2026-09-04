"use client"

import { useState } from "react"
import { TrendingUp, Shield, Brain, Activity } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

export function Features() {
  const [clickedCard, setClickedCard] = useState<number | null>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const features = [
    {
      icon: TrendingUp,
      title: "Own Capital",
      description:
        "We trade exclusively with company capital. No client funds, no external management, full accountability.",
      stat: "100%",
      statLabel: "Company Funded",
      showActive: true,
      activeColor: "yellow",
      activeLabel: "RISK MANAGED",
    },
    {
      icon: Brain,
      title: "Technology-Driven",
      description: "We integrate market data, news, and AI-driven research to enhance trading decisions.",
      stat: "99.9%",
      statLabel: "Uptime",
      showActive: true,
      activeColor: "green",
      activeLabel: "ACTIVE",
    },
    {
      icon: Shield,
      title: "Disciplined Trading",
      description: "Every trade is driven by quantitative research, risk management, and strict internal protocols.",
      stat: "24/7",
      statLabel: "Risk Monitoring",
      showActive: true,
      activeColor: "blue",
      activeLabel: "HEALTHY",
    },
  ]

  const handleClick = (index: number) => {
    setClickedCard(index)
    setTimeout(() => setClickedCard(null), 500)
  }

  return (
    <section
      id="features"
      className="relative py-20 md:py-28 lg:py-32 px-4 md:px-6 lg:px-8 bg-[#0a0a0f] overflow-x-hidden overflow-y-visible"
    >
      {/* Top shadow blend - lowered z-index to z-[1] so title badges can hover above */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0a0f] to-transparent pointer-events-none z-[1]" />
      {/* Bottom shadow blend */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none z-[1]" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00d4ff]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16 pt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 mb-6 cursor-pointer transition-all duration-300 hover:bg-[#00d4ff]/20 hover:border-[#00d4ff]/40 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:scale-105 active:bg-[#00d4ff]/20 active:border-[#00d4ff]/40 active:shadow-[0_0_20px_rgba(0,212,255,0.3)] active:scale-105 relative z-[60] hover:z-[100]">
              <Activity className="w-4 h-4 text-[#00d4ff]" />
              <span className="text-xs font-mono text-[#00d4ff]">LIVE SYSTEMS</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Insight That <span className="gradient-text-yellow">Matters</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-8 max-w-5xl md:max-w-4xl lg:max-w-5xl mx-auto px-4 md:px-2 lg:px-6 py-8 overflow-visible relative">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div className="relative overflow-visible">
                <div
                  onClick={() => handleClick(index)}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`group relative terminal-card p-6 md:p-5 lg:p-8 cursor-pointer min-h-[280px] md:min-h-[260px] lg:min-h-[280px] flex flex-col
                    transition-all duration-300 ease-out backdrop-blur-2xl bg-white/[0.02] overflow-visible
                    hover:shadow-[0_0_40px_rgba(0,212,255,0.3)] hover:border-[#00d4ff]/50 hover:bg-white/[0.05] hover:-translate-y-1 hover:z-30
                    active:shadow-[0_0_40px_rgba(0,212,255,0.3)] active:border-[#00d4ff]/50 active:bg-white/[0.05]
                    focus:shadow-[0_0_40px_rgba(0,212,255,0.3)] focus:border-[#00d4ff]/50 focus:bg-white/[0.05]
                    ${clickedCard === index ? "glow-cyan" : ""}`}
                >
                  {/* Animated border on hover/active */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 group-active:opacity-100 group-focus:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-lg border border-[#00d4ff]/50" />
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent" />
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Stat badge */}
                    <div className="flex items-center justify-between mb-6 md:mb-4 lg:mb-6">
                      <div className="w-12 h-12 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center group-hover:bg-[#00d4ff]/20 group-active:bg-[#00d4ff]/20 group-focus:bg-[#00d4ff]/20 transition-colors">
                        <feature.icon
                          className={`w-6 h-6 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#00d4ff] transition-all duration-500 ${
                            hoveredCard === index ? "scale-110 rotate-12" : ""
                          }`}
                        />
                      </div>
                      <div className="text-right">
                        <p className="text-xl md:text-lg lg:text-xl font-bold text-[#00ff88] font-mono">
                          {feature.stat}
                        </p>
                        <p className="text-[10px] md:text-[9px] lg:text-[10px] text-white/40 font-mono uppercase">
                          {feature.statLabel}
                        </p>
                      </div>
                    </div>

                    <h3 className="text-lg md:text-base lg:text-lg font-semibold mb-3 md:mb-2 lg:mb-3 text-white group-hover:text-[#00d4ff] group-active:text-[#00d4ff] group-focus:text-[#00d4ff] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm md:text-xs lg:text-sm text-white/50 leading-relaxed flex-1">
                      {feature.description}
                    </p>

                    <div className="mt-6 md:mt-4 lg:mt-6 pt-4 md:pt-3 lg:pt-4 border-t border-white/10 flex items-center gap-2">
                      {feature.showActive ? (
                        <>
                          <div
                            className={`w-2 h-2 rounded-full ${
                              feature.activeColor === "blue"
                                ? "bg-[#00d4ff] animate-pulse"
                                : feature.activeColor === "yellow"
                                  ? "bg-[#f7d354] animate-pulse"
                                  : "bg-[#00ff88] animate-pulse"
                            }`}
                          />
                          <span
                            className={`text-[10px] md:text-[9px] lg:text-[10px] font-mono ${
                              feature.activeColor === "blue"
                                ? "text-[#00d4ff]"
                                : feature.activeColor === "yellow"
                                  ? "text-[#f7d354]"
                                  : "text-[#00ff88]"
                            }`}
                          >
                            {feature.activeLabel}
                          </span>
                        </>
                      ) : (
                        <span className="text-[10px] font-mono text-white/30">—</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
