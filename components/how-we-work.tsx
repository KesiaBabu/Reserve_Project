"use client"

import { useEffect, useRef, useState } from "react"
import { Database, Layers, Cpu, Shield, Zap } from "lucide-react"

export function HowWeWork() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const methods = [
    {
      icon: Database,
      title: "Data-Driven Insights",
      description:
        "Global prices, news, and sentiment are integrated into a signal framework, helping us assess opportunities and risks with confidence.",
      color: "cyan",
      stat: "1M+",
      statLabel: "Data Points/Day",
    },
    {
      icon: Layers,
      title: "Layered Analysis",
      description:
        "We combine short-term signals, long-term patterns, and behavioural indicators to create a multi-dimensional perspective.",
      color: "cyan",
      stat: "360°",
      statLabel: "Analysis Layers",
    },
    {
      icon: Cpu,
      title: "Intelligent Tools",
      description:
        "Machine-assisted processes filter vast data and detect emerging signals, enhancing human judgement without replacing it.",
      color: "yellow",
      stat: "24/7",
      statLabel: "Processing",
    },
    {
      icon: Shield,
      title: "Risk and Discipline",
      description:
        "Position sizing, exposure limits, and risk parameters are carefully defined to maintain control and consistency across all operations.",
      color: "yellow",
      stat: "±",
      statLabel: "Risk Managed",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      className="relative py-20 md:py-28 lg:py-32 px-4 md:px-6 lg:px-8 bg-[#0a0a0f] overflow-x-hidden overflow-y-visible"
    >
      {/* Top shadow blend - lowered z-index to z-[1] */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0a0f] to-transparent pointer-events-none z-[1]" />
      {/* Bottom shadow blend */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none z-[1]" />

      {/* Background - wrapped in overflow-hidden container */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#f7d354]/5 rounded-full blur-[150px]" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#00d4ff]/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-8 md:mb-12 pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d4ff]/15 border border-[#00d4ff]/30 mb-6 cursor-pointer transition-all duration-300 hover:bg-[#00d4ff]/25 hover:border-[#00d4ff]/50 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:scale-105 active:bg-[#00d4ff]/25 active:border-[#00d4ff]/50 active:shadow-[0_0_20px_rgba(0,212,255,0.3)] active:scale-105 relative z-[60]">
            <Zap className="w-4 h-4 text-[#00d4ff]" />
            <span className="text-xs font-mono text-[#00d4ff]">METHODOLOGY</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            How we <span className="gradient-text-yellow">work</span>
          </h2>
        </div>

        <p className="text-center text-white/50 text-base max-w-3xl mx-auto mb-12 md:mb-16 leading-relaxed">
          At Reserve Financial Services Ltd, our approach is grounded in disciplined research and technology. We
          integrate market experience with in-house analytics to guide internal trading decisions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto px-4 md:px-6 py-4 overflow-visible">
          {methods.map((method, index) => (
            <div
              key={index}
              className={`terminal-card p-6 group transition-all duration-500 cursor-pointer backdrop-blur-2xl bg-white/[0.02]
                hover:shadow-[0_0_40px_rgba(0,212,255,0.3)] hover:border-[#00d4ff]/30 hover:bg-white/[0.05]
                active:shadow-[0_0_40px_rgba(0,212,255,0.3)] active:border-[#00d4ff]/30 active:bg-white/[0.05]
                focus:shadow-[0_0_40px_rgba(0,212,255,0.3)] focus:border-[#00d4ff]/30 focus:bg-white/[0.05]
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    method.color === "yellow"
                      ? "bg-[#f7d354]/10 border border-[#f7d354]/30"
                      : "bg-[#00d4ff]/10 border border-[#00d4ff]/30"
                  }`}
                >
                  <method.icon
                    className={`w-6 h-6 ${method.color === "yellow" ? "text-[#f7d354]" : "text-[#00ff88]"} transition-transform duration-300 group-hover:scale-110 group-active:scale-110 group-focus:scale-110`}
                  />
                </div>
                <div className="text-right">
                  <p
                    className={`font-bold font-mono ${method.color === "yellow" ? "text-[#f7d354]" : "text-[#00ff88]"} ${method.stat === "±" ? "text-3xl" : "text-xl"}`}
                  >
                    {method.stat}
                  </p>
                  <p className="text-[10px] text-white/40 font-mono uppercase">{method.statLabel}</p>
                </div>
              </div>

              <h3
                className={`text-lg font-semibold mb-2 ${method.color === "yellow" ? "text-[#f7d354]" : "text-white"}`}
              >
                {method.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed min-h-[60px]">{method.description}</p>

              {/* Progress bar indicator */}
              <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${method.color === "yellow" ? "bg-[#f7d354]" : "bg-[#00d4ff]"}`}
                  style={{ width: isVisible ? "100%" : "0%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
