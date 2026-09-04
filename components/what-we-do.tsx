"use client"

import { useEffect, useRef, useState } from "react"
import { Search, BarChart3, Wallet, Briefcase } from "lucide-react"

export function WhatWeDo() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeService, setActiveService] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const services = [
    {
      icon: Search,
      title: "Research for Resilience",
      description:
        "Our research focuses entirely on enhancing internal strategies, helping us respond effectively to changing market conditions.",
      color: "cyan",
    },
    {
      icon: BarChart3,
      title: "Developing Financial Analytics",
      description:
        "We build in-house platforms that integrate market data, news, sentiment, and internal signals to support informed decision-making.",
      color: "cyan",
    },
    {
      icon: Wallet,
      title: "Trading with Our Own Capital",
      description:
        "All trading activity is funded solely by the company. We do not handle external funds, manage client accounts, or provide investment services.",
      color: "cyan",
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [services.length])

  return (
    <section
      ref={sectionRef}
      id="what-we-do"
      className="relative py-20 md:py-28 lg:py-32 px-4 md:px-6 lg:px-8 min-h-[700px] overflow-x-hidden overflow-y-visible bg-[#0a0a0f]"
    >
      {/* Top shadow blend - lowered z-index to z-[1] */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0a0f] to-transparent pointer-events-none z-[1]" />
      {/* Bottom shadow blend */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none z-[1]" />

      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/dark-trading-floor-with-screens.jpg"
          alt="Trading floor background"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        {/* Dark overlay with color tint */}
        <div className="absolute inset-0 bg-[#0a0a0f]/60" />

        <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/10 via-transparent to-[#00d4ff]/5" />

        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/50 via-transparent to-[#0a0a0f]/70" />
      </div>

      {/* Content overlay */}
      <div className="container mx-auto relative z-10 max-w-full">
        <div className="text-center mb-12 md:mb-16 pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 mb-4 transition-all duration-300 hover:bg-[#00d4ff]/20 hover:border-[#00d4ff]/50 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:scale-105 active:bg-[#00d4ff]/20 active:border-[#00d4ff]/50 active:shadow-[0_0_20px_rgba(0,212,255,0.3)] active:scale-105 cursor-pointer relative z-[60]">
            <Briefcase className="w-4 h-4 text-[#00d4ff]" />
            <span className="text-xs font-mono text-[#00d4ff] uppercase tracking-wider">Our Services</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            What we <span className="gradient-text-cyan">do</span>
          </h2>
        </div>

        <div className="max-w-2xl mx-auto space-y-4 px-4 md:px-6 py-4 overflow-visible">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => setActiveService(index)}
              className={`p-5 cursor-pointer transition-all duration-500 rounded-xl
                backdrop-blur-2xl bg-white/[0.03] border border-white/10
                hover:shadow-[0_0_40px_rgba(0,212,255,0.3)] hover:border-[#00d4ff]/50 hover:bg-white/[0.05]
                active:shadow-[0_0_40px_rgba(0,212,255,0.3)] active:border-[#00d4ff]/50 active:bg-white/[0.05]
                focus:shadow-[0_0_40px_rgba(0,212,255,0.3)] focus:border-[#00d4ff]/50 focus:bg-white/[0.05]
                ${
                  activeService === index
                    ? service.color === "cyan"
                      ? "border-[#00d4ff]/50 bg-[#00d4ff]/[0.03] shadow-[0_0_40px_rgba(0,212,255,0.3)]"
                      : "border-[#00d4ff]/50 bg-[#00d4ff]/[0.03] shadow-[0_0_40px_rgba(0,212,255,0.3)]"
                    : ""
                } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 backdrop-blur-sm ${
                    service.color === "cyan"
                      ? "bg-[#00d4ff]/10 border border-[#00d4ff]/20"
                      : "bg-[#00d4ff]/10 border border-[#00d4ff]/20"
                  }`}
                >
                  <service.icon
                    className={`w-5 h-5 transition-transform duration-300 hover:scale-110 ${service.color === "cyan" ? "text-[#00d4ff]" : "text-[#00d4ff]"}`}
                  />
                </div>
                <div className="flex-1">
                  <h3
                    className={`font-semibold mb-2 ${service.color === "cyan" ? "text-[#00d4ff]" : "text-white"} ${activeService === index && service.color !== "cyan" ? "text-[#00d4ff]" : ""}`}
                  >
                    {service.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
