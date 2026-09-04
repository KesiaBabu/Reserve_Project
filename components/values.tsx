"use client"

import { useState, useEffect, useRef } from "react"
import { Sparkles } from "lucide-react"

export function Values() {
  const [clickedCard, setClickedCard] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const values = [
    {
      number: "01",
      title: "Integrity",
      description:
        "We operate with honesty and clarity, ensuring all trading decisions are guided by ethical practices and accountability.",
    },
    {
      number: "02",
      title: "Innovation",
      description:
        "We develop in-house tools and employ inventive methodologies to enhance analytics, research, and internal trading decisions.",
    },
    {
      number: "03",
      title: "Discipline",
      description:
        "Every trade is guided by structured procedures, risk management, and rigorous assessment protocols that ensure consistency in our operations.",
    },
    {
      number: "04",
      title: "Objectivity",
      description:
        "We rely on clear analysis and structured logic, executing decisions with precision confidence while remaining free from emotion.",
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

  const handleClick = (index: number) => {
    setClickedCard(index)
    setTimeout(() => setClickedCard(null), 500)
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-32 px-4 md:px-6 lg:px-8 bg-[#0a0a0f] overflow-x-hidden overflow-y-visible"
    >
      {/* Top shadow blend - lowered z-index to z-[1] */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0a0f] to-transparent pointer-events-none z-[1]" />
      {/* Bottom shadow blend */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none z-[1]" />

      {/* Background glow - wrapped in overflow-hidden container */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#f7d354]/5 rounded-full blur-[150px] pointer-events-none" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16 pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f7d354]/10 border border-[#f7d354]/20 mb-6 transition-all duration-300 hover:bg-[#f7d354]/20 hover:border-[#f7d354]/50 hover:shadow-[0_0_20px_rgba(247,211,84,0.3)] hover:scale-105 active:bg-[#f7d354]/20 active:border-[#f7d354]/50 active:shadow-[0_0_20px_rgba(247,211,84,0.3)] active:scale-105 cursor-pointer relative z-[60]">
            <Sparkles className="w-4 h-4 text-[#f7d354]" />
            <span className="text-xs font-mono text-[#f7d354]">CORE PRINCIPLES</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Our <span className="gradient-text-yellow">Values</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto px-4 md:px-6 py-4 overflow-visible">
          {values.map((value, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`group relative terminal-card p-6 cursor-pointer transition-all duration-200 backdrop-blur-2xl bg-white/[0.02]
                hover:border-[#f7d354]/50 hover:shadow-[0_0_40px_rgba(247,211,84,0.3)] hover:bg-white/[0.05]
                active:border-[#f7d354]/50 active:shadow-[0_0_40px_rgba(247,211,84,0.3)] active:bg-white/[0.05]
                focus:border-[#f7d354]/50 focus:shadow-[0_0_40px_rgba(247,211,84,0.3)] focus:bg-white/[0.05]
                ${clickedCard === index ? "glow-yellow-intense border-[#f7d354]/50" : ""} 
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Glowing number */}
              <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-[#0a0a0f] border border-[#f7d354]/30 flex items-center justify-center group-hover:border-[#f7d354] group-active:border-[#f7d354] group-focus:border-[#f7d354] group-hover:shadow-[0_0_20px_rgba(247,211,84,0.3)] group-active:shadow-[0_0_20px_rgba(247,211,84,0.3)] group-focus:shadow-[0_0_20px_rgba(247,211,84,0.3)] transition-all duration-200">
                <span className="font-mono text-sm font-bold text-[#f7d354]">{value.number}</span>
              </div>

              <h3 className="text-lg font-semibold mb-3 text-white group-hover:text-[#f7d354] group-active:text-[#f7d354] group-focus:text-[#f7d354] transition-colors duration-200">
                {value.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">{value.description}</p>

              {/* Hover indicator line */}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f7d354] group-hover:w-full group-active:w-full group-focus:w-full transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
