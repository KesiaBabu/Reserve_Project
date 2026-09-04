"use client"

import { useEffect, useRef, useState } from "react"
import { Target, Compass, TrendingUp, Shield, Users } from "lucide-react"

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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
      id="about"
      className="relative py-20 md:py-28 lg:py-32 px-4 md:px-6 lg:px-8 bg-[#0a0a0f] overflow-x-hidden overflow-y-visible"
    >
      {/* Top shadow blend - lowered z-index to z-[1] */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0a0f] to-transparent pointer-events-none z-[1]" />
      {/* Bottom shadow blend */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none z-[1]" />

      {/* Background elements - wrapped in overflow-hidden container */}
      <div className="absolute inset-0 overflow-hidden z-[0]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f7d354]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00d4ff]/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto relative z-30 max-w-full">
        {/* Section Header - Added pt-8 for extra space above title */}
        <div className="text-center mb-12 md:mb-16 pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 mb-4 transition-all duration-300 hover:bg-[#00d4ff]/20 hover:border-[#00d4ff]/50 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:scale-105 active:bg-[#00d4ff]/20 active:border-[#00d4ff]/50 active:shadow-[0_0_20px_rgba(0,212,255,0.3)] active:scale-105 cursor-pointer relative z-[60]">
            <Users className="w-4 h-4 text-[#00d4ff]" />
            <span className="text-xs font-mono text-[#00d4ff] uppercase tracking-wider">About Us</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            We are Committed, Focused
            <br />
            and <span className="gradient-text-yellow">Disciplined</span>
          </h2>
        </div>

        {/* Main content - Added py-4 for glow room at top and bottom */}
        <div className="max-w-4xl mx-auto mb-16 px-4 md:px-6 py-4 overflow-visible">
          <div
            className={`terminal-card p-6 md:p-8 lg:p-10 transition-all duration-700 backdrop-blur-2xl bg-white/[0.02]
              hover:shadow-[0_0_40px_rgba(0,212,255,0.3)] hover:border-[#00d4ff]/50 hover:bg-white/[0.05]
              active:shadow-[0_0_40px_rgba(0,212,255,0.3)] active:border-[#00d4ff]/50 active:bg-white/[0.05]
              focus:shadow-[0_0_40px_rgba(0,212,255,0.3)] focus:border-[#00d4ff]/50 focus:bg-white/[0.05]
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <p className="text-white/70 text-base md:text-lg leading-relaxed text-center">
              Reserve Financial Services Ltd was established in the United Kingdom to participate in financial markets
              using only company capital. Guided by disciplined research and in-house tools, our trading is internal and
              systematically managed.{" "}
              <span className="text-[#f7d354]">
                We do not manage client funds or provide investment advice, focusing entirely on our own operations.
              </span>
            </p>
          </div>
        </div>

        {/* Vision & Mission Cards - Added py-2 and overflow-visible for glow room */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto px-4 md:px-6 pt-4 pb-2 overflow-visible">
          {/* Vision - Added glass effect */}
          <div
            className={`terminal-card p-6 md:p-8 group transition-all duration-500 backdrop-blur-2xl bg-white/[0.02]
              hover:border-[#f7d354]/50 hover:shadow-[0_0_40px_rgba(247,211,84,0.3)] hover:bg-white/[0.05]
              active:border-[#f7d354]/50 active:shadow-[0_0_40px_rgba(247,211,84,0.3)] active:bg-white/[0.05]
              focus:border-[#f7d354]/50 focus:shadow-[0_0_40px_rgba(247,211,84,0.3)] focus:bg-white/[0.05]
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#f7d354]/10 border border-[#f7d354]/30 flex items-center justify-center group-hover:bg-[#f7d354]/20 group-active:bg-[#f7d354]/20 group-focus:bg-[#f7d354]/20 transition-colors">
                <Target className="w-6 h-6 text-[#f7d354] group-hover:scale-110 group-active:scale-110 group-focus:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-semibold text-[#f7d354]">Our Vision</h3>
            </div>
            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              To transform data into direction, intelligence into insight, and risk into disciplined control in
              unpredictable markets.
            </p>
          </div>

          {/* Mission - Added glass effect */}
          <div
            className={`terminal-card p-6 md:p-8 group transition-all duration-500 backdrop-blur-2xl bg-white/[0.02]
              hover:border-[#00d4ff]/50 hover:shadow-[0_0_40px_rgba(0,212,255,0.3)] hover:bg-white/[0.05]
              active:border-[#00d4ff]/50 active:shadow-[0_0_40px_rgba(0,212,255,0.3)] active:bg-white/[0.05]
              focus:border-[#00d4ff]/50 focus:shadow-[0_0_40px_rgba(0,212,255,0.3)] focus:bg-white/[0.05]
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center group-hover:bg-[#00d4ff]/20 group-active:bg-[#00d4ff]/20 group-focus:bg-[#00d4ff]/20 transition-colors">
                <Compass className="w-6 h-6 text-[#00d4ff] group-hover:scale-110 group-active:scale-110 group-focus:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-semibold text-[#00d4ff]">Our Mission</h3>
            </div>
            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              To combine technology, research, and disciplined execution to build a resilient trading operation,
              continually adapting to evolving market conditions.
            </p>
          </div>
        </div>

        {/* Key metrics - Added py-2 and overflow-visible for glow room */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12 px-4 md:px-6 py-2 overflow-visible transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "400ms" }}
        >
          {[
            { value: "UK", label: "Based", icon: Shield },
            { value: "100%", label: "Own Capital", icon: TrendingUp },
            { value: "24/7", label: "Market Watch", icon: Target },
            { value: "0", label: "Client Funds", icon: Compass },
          ].map((metric, i) => (
            <div
              key={i}
              className="text-center p-4 rounded-lg bg-white/[0.02] border border-white/5
                hover:border-[#00d4ff]/30 hover:shadow-[0_0_20px_rgba(0,212,255,0.2)]
                active:border-[#00d4ff]/30 active:shadow-[0_0_20px_rgba(0,212,255,0.2)]
                transition-all duration-300"
            >
              <p className="text-2xl md:text-3xl font-bold font-mono text-[#00d4ff] mb-1">{metric.value}</p>
              <p className="text-xs text-white/40 uppercase tracking-wider">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
