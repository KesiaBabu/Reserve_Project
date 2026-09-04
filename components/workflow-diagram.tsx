"use client"

import { useEffect, useRef, useState } from "react"
import { Database, BarChart3, LineChart, Brain, TrendingUp, Target, Settings, GitBranch } from "lucide-react"

export function WorkflowDiagram() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [activeNodes, setActiveNodes] = useState<Set<string>>(new Set())
  const [activeOutputNodes, setActiveOutputNodes] = useState<Set<string>>(new Set())

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
    if (!isVisible) return

    // Pairs: [topNode, bottomNode]
    const nodePairs = [
      ["market", "execution"],
      ["reports", "alerts"],
      ["news", "analytics"],
    ]

    const animatePair = (pairIndex: number) => {
      const [topNode, bottomNode] = nodePairs[pairIndex]

      // Activate top node with blue shadow
      setActiveNodes((prev) => new Set([...prev, topNode]))

      // After delay, activate core
      setTimeout(() => {
        setActiveNodes((prev) => new Set([...prev, "core"]))
      }, 400)

      setTimeout(() => {
        setActiveNodes((prev) => new Set([...prev, bottomNode]))
        setActiveOutputNodes((prev) => new Set([...prev, bottomNode]))
      }, 800)

      setTimeout(() => {
        setActiveNodes((prev) => {
          const next = new Set(prev)
          next.delete(topNode)
          next.delete("core")
          return next
        })
      }, 1500)

      setTimeout(() => {
        setActiveNodes((prev) => {
          const next = new Set(prev)
          next.delete(bottomNode)
          return next
        })
        setActiveOutputNodes((prev) => {
          const next = new Set(prev)
          next.delete(bottomNode)
          return next
        })
      }, 2300)
    }

    // Stagger animations for each pair
    const interval = setInterval(() => {
      nodePairs.forEach((_, index) => {
        setTimeout(() => {
          animatePair(index)
        }, index * 2000)
      })
    }, 7000)

    // Initial animation
    nodePairs.forEach((_, index) => {
      setTimeout(() => {
        animatePair(index)
      }, index * 2000)
    })

    return () => {
      clearInterval(interval)
    }
  }, [isVisible])

  const leftNodes = [
    { id: "market", icon: Database, label: "Market Data", sublabel: "Real-time feeds" },
    { id: "reports", icon: BarChart3, label: "Reports", sublabel: "Analysis docs" },
    { id: "news", icon: LineChart, label: "News", sublabel: "Market news" },
  ]

  const rightNodes = [
    { id: "execution", icon: TrendingUp, label: "Execution", sublabel: "Trade orders" },
    { id: "alerts", icon: Target, label: "Alerts", sublabel: "Notifications" },
    { id: "analytics", icon: Settings, label: "Reports", sublabel: "Analytics" },
  ]

  const pairMap: Record<string, string> = {
    market: "execution",
    reports: "alerts",
    news: "analytics",
    execution: "market",
    alerts: "reports",
    analytics: "news",
  }

  const isLeftHighlighted = (index: number) => {
    const nodeId = leftNodes[index].id
    if (hoveredNode === "core") return true
    if (hoveredNode === nodeId) return true
    if (hoveredNode && pairMap[hoveredNode] === nodeId) return true
    return false
  }

  const isRightHighlighted = (index: number) => {
    const nodeId = rightNodes[index].id
    if (hoveredNode === "core") return true
    if (hoveredNode === nodeId) return true
    if (hoveredNode && pairMap[hoveredNode] === nodeId) return true
    return false
  }

  const isOutputActive = (nodeId: string) => {
    return activeOutputNodes.has(nodeId)
  }

  const isInputActive = (nodeId: string) => {
    return activeNodes.has(nodeId) && !["execution", "alerts", "analytics"].includes(nodeId)
  }

  return (
    <section
      id="workflow"
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-32 px-4 md:px-6 lg:px-8 overflow-x-hidden overflow-y-visible"
    >
      {/* Top shadow blend - lowered z-index to z-[1] */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0a0f] to-transparent pointer-events-none z-[1]" />
      {/* Bottom shadow blend */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none z-[1]" />

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00d4ff]/3 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16 pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 mb-6 cursor-pointer transition-all duration-300 hover:bg-[#00d4ff]/20 hover:border-[#00d4ff]/40 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:scale-105 active:bg-[#00d4ff]/20 active:border-[#00d4ff]/40 active:shadow-[0_0_20px_rgba(0,212,255,0.3)] active:scale-105 relative z-[60]">
            <GitBranch className="w-4 h-4 text-[#00d4ff]" />
            <span className="text-xs font-mono text-[#00d4ff]">DATA PIPELINE</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            How We Turn <span className="gradient-text-cyan">Data</span> into{" "}
            <span className="gradient-text-yellow">Decisions</span>
          </h2>
        </div>

        {/* Desktop Horizontal Workflow - only on lg and above */}
        <div className="hidden lg:block relative max-w-5xl mx-auto">
          {/* Labels */}
          <div className="flex justify-between mb-4 px-4">
            <p className="text-xs text-[#00d4ff] font-mono tracking-widest uppercase w-[180px] text-center">
              DATA COLLECTION
            </p>
            <p className="text-xs text-[#f7d354] font-mono tracking-widest uppercase w-[180px] text-center">OUTPUT</p>
          </div>

          {/* Main workflow container with fixed height for proper SVG alignment */}
          <div className="relative h-[320px] flex items-center justify-between">
            {/* Left Cards */}
            <div className="flex flex-col justify-between h-full w-[180px] py-2 relative z-10">
              {leftNodes.map((node, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`terminal-card rounded-xl p-4 text-center transition-all duration-500 cursor-pointer h-[88px] flex flex-col justify-center ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                  } ${hoveredNode === node.id || (hoveredNode && pairMap[hoveredNode] === node.id) ? "border-[#00d4ff]/50 shadow-[0_0_20px_rgba(0,212,255,0.3)]" : ""} ${
                    isInputActive(node.id)
                      ? "border-[#00d4ff] shadow-[0_0_30px_rgba(0,212,255,0.5)] bg-[#00d4ff]/10"
                      : ""
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`w-9 h-9 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center mx-auto mb-2 transition-all duration-300 ${
                      isInputActive(node.id) ? "bg-[#00d4ff]/30 scale-110" : ""
                    }`}
                  >
                    <node.icon className="w-5 h-5 text-[#00d4ff]" />
                  </div>
                  <p className="text-sm font-medium text-white">{node.label}</p>
                </div>
              ))}
            </div>

            {/* SVG Connectors - Left to Center */}
            <svg
              className="absolute left-[180px] top-0 h-full w-[calc(50%-140px)] z-0"
              viewBox="0 0 200 320"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="flowGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(0, 212, 255, 0)" />
                  <stop offset="50%" stopColor="rgba(0, 212, 255, 1)" />
                  <stop offset="100%" stopColor="rgba(0, 212, 255, 0)" />
                  <animate attributeName="x1" values="-100%;100%" dur="5s" repeatCount="indefinite" />
                  <animate attributeName="x2" values="0%;200%" dur="5s" repeatCount="indefinite" />
                </linearGradient>
                <filter id="glow1" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Top S-curve */}
              <path
                id="pathTop"
                d="M 0 53 C 80 53, 120 160, 200 160"
                fill="none"
                stroke={isLeftHighlighted(0) ? "rgba(0, 212, 255, 0.6)" : "rgba(0, 212, 255, 0.2)"}
                strokeWidth="2"
                className="transition-all duration-500"
              />
              <path d="M 0 53 C 80 53, 120 160, 200 160" fill="none" stroke="url(#flowGradient1)" strokeWidth="2" />

              {/* Middle straight line */}
              <path
                id="pathMid"
                d="M 0 160 L 200 160"
                fill="none"
                stroke={isLeftHighlighted(1) ? "rgba(0, 212, 255, 0.6)" : "rgba(0, 212, 255, 0.2)"}
                strokeWidth="2"
                className="transition-all duration-500"
              />
              <path d="M 0 160 L 200 160" fill="none" stroke="url(#flowGradient1)" strokeWidth="2" />

              {/* Bottom S-curve */}
              <path
                id="pathBot"
                d="M 0 267 C 80 267, 120 160, 200 160"
                fill="none"
                stroke={isLeftHighlighted(2) ? "rgba(0, 212, 255, 0.6)" : "rgba(0, 212, 255, 0.2)"}
                strokeWidth="2"
                className="transition-all duration-500"
              />
              <path d="M 0 267 C 80 267, 120 160, 200 160" fill="none" stroke="url(#flowGradient1)" strokeWidth="2" />

              {/* Animated particles */}
              <circle r="5" fill="#00d4ff" filter="url(#glow1)">
                <animateMotion dur="5s" repeatCount="indefinite">
                  <mpath href="#pathTop" />
                </animateMotion>
              </circle>
              <circle r="5" fill="#00d4ff" filter="url(#glow1)">
                <animateMotion dur="4s" repeatCount="indefinite">
                  <mpath href="#pathMid" />
                </animateMotion>
              </circle>
              <circle r="5" fill="#00d4ff" filter="url(#glow1)">
                <animateMotion dur="5s" repeatCount="indefinite" begin="0.5s">
                  <mpath href="#pathBot" />
                </animateMotion>
              </circle>

              {/* Second wave */}
              <circle r="5" fill="#00d4ff" filter="url(#glow1)">
                <animateMotion dur="5s" repeatCount="indefinite" begin="2.5s">
                  <mpath href="#pathTop" />
                </animateMotion>
              </circle>
              <circle r="5" fill="#00d4ff" filter="url(#glow1)">
                <animateMotion dur="4s" repeatCount="indefinite" begin="2s">
                  <mpath href="#pathMid" />
                </animateMotion>
              </circle>
              <circle r="5" fill="#00d4ff" filter="url(#glow1)">
                <animateMotion dur="5s" repeatCount="indefinite" begin="3s">
                  <mpath href="#pathBot" />
                </animateMotion>
              </circle>
            </svg>

            {/* Center Core */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div
                onMouseEnter={() => setHoveredNode("core")}
                onMouseLeave={() => setHoveredNode(null)}
                className={`w-[140px] h-[140px] rounded-full terminal-card bg-[#0a1628] border-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-700 ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                } ${
                  hoveredNode === "core"
                    ? "border-[#00d4ff] shadow-[0_0_50px_rgba(0,212,255,0.5)]"
                    : "border-[#00d4ff]/50"
                } ${activeNodes.has("core") ? "border-[#00d4ff] shadow-[0_0_60px_rgba(0,212,255,0.6)] bg-[#00d4ff]/10" : ""}`}
              >
                <Brain
                  className={`w-12 h-12 text-[#00d4ff] mb-2 transition-transform duration-500 ${hoveredNode === "core" ? "scale-110" : ""}`}
                />
                <p className="text-sm font-bold text-white">CORE</p>
                <p className="text-[10px] text-white/50 font-mono">AI ENGINE</p>
              </div>
            </div>

            {/* SVG Connectors - Center to Right */}
            <svg
              className="absolute right-[180px] top-0 h-full w-[calc(50%-140px)] z-0"
              viewBox="0 0 200 320"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="flowGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(247, 211, 84, 0)" />
                  <stop offset="50%" stopColor="rgba(247, 211, 84, 1)" />
                  <stop offset="100%" stopColor="rgba(247, 211, 84, 0)" />
                  <animate attributeName="x1" values="-100%;100%" dur="5s" repeatCount="indefinite" />
                  <animate attributeName="x2" values="0%;200%" dur="5s" repeatCount="indefinite" />
                </linearGradient>
                <filter id="glow2" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Top S-curve */}
              <path
                id="pathTopR"
                d="M 0 160 C 80 160, 120 53, 200 53"
                fill="none"
                stroke={isRightHighlighted(0) ? "rgba(247, 211, 84, 0.6)" : "rgba(247, 211, 84, 0.2)"}
                strokeWidth="2"
                className="transition-all duration-500"
              />
              <path d="M 0 160 C 80 160, 120 53, 200 53" fill="none" stroke="url(#flowGradient2)" strokeWidth="2" />

              {/* Middle straight */}
              <path
                id="pathMidR"
                d="M 0 160 L 200 160"
                fill="none"
                stroke={isRightHighlighted(1) ? "rgba(247, 211, 84, 0.6)" : "rgba(247, 211, 84, 0.2)"}
                strokeWidth="2"
                className="transition-all duration-500"
              />
              <path d="M 0 160 L 200 160" fill="none" stroke="url(#flowGradient2)" strokeWidth="2" />

              {/* Bottom S-curve */}
              <path
                id="pathBotR"
                d="M 0 160 C 80 160, 120 267, 200 267"
                fill="none"
                stroke={isRightHighlighted(2) ? "rgba(247, 211, 84, 0.6)" : "rgba(247, 211, 84, 0.2)"}
                strokeWidth="2"
                className="transition-all duration-500"
              />
              <path d="M 0 160 C 80 160, 120 267, 200 267" fill="none" stroke="url(#flowGradient2)" strokeWidth="2" />

              {/* Animated particles */}
              <circle r="5" fill="#f7d354" filter="url(#glow2)">
                <animateMotion dur="5s" repeatCount="indefinite">
                  <mpath href="#pathTopR" />
                </animateMotion>
              </circle>
              <circle r="5" fill="#f7d354" filter="url(#glow2)">
                <animateMotion dur="4s" repeatCount="indefinite">
                  <mpath href="#pathMidR" />
                </animateMotion>
              </circle>
              <circle r="5" fill="#f7d354" filter="url(#glow2)">
                <animateMotion dur="5s" repeatCount="indefinite" begin="0.5s">
                  <mpath href="#pathBotR" />
                </animateMotion>
              </circle>

              {/* Second wave */}
              <circle r="5" fill="#f7d354" filter="url(#glow2)">
                <animateMotion dur="5s" repeatCount="indefinite" begin="2.5s">
                  <mpath href="#pathTopR" />
                </animateMotion>
              </circle>
              <circle r="5" fill="#f7d354" filter="url(#glow2)">
                <animateMotion dur="4s" repeatCount="indefinite" begin="2s">
                  <mpath href="#pathMidR" />
                </animateMotion>
              </circle>
              <circle r="5" fill="#f7d354" filter="url(#glow2)">
                <animateMotion dur="5s" repeatCount="indefinite" begin="3s">
                  <mpath href="#pathBotR" />
                </animateMotion>
              </circle>
            </svg>

            {/* Right Cards - Use output-card class for consistent yellow styling */}
            <div className="flex flex-col justify-between h-full w-[180px] py-2 relative z-10">
              {rightNodes.map((node, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`output-card rounded-xl p-4 text-center transition-all duration-500 cursor-pointer h-[88px] flex flex-col justify-center ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                  } ${hoveredNode === node.id || (hoveredNode && pairMap[hoveredNode] === node.id) ? "border-[#f7d354]/60 shadow-[0_0_20px_rgba(247,211,84,0.3)]" : ""} ${
                    isOutputActive(node.id)
                      ? "border-[#f7d354] shadow-[0_0_30px_rgba(247,211,84,0.5)] bg-[#f7d354]/10"
                      : ""
                  }`}
                  style={{ transitionDelay: `${index * 100 + 300}ms` }}
                >
                  <div
                    className={`w-9 h-9 rounded-lg bg-[#f7d354]/10 border border-[#f7d354]/30 flex items-center justify-center mx-auto mb-2 transition-all duration-300 ${
                      isOutputActive(node.id) ? "bg-[#f7d354]/30 scale-110" : ""
                    }`}
                  >
                    <node.icon className="w-5 h-5 text-[#f7d354]" />
                  </div>
                  <p className="text-sm font-medium text-white">{node.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* End Desktop View */}

        {/* Mobile & Tablet View (below lg) */}
        <div className="block lg:hidden relative max-w-sm sm:max-w-md md:max-w-lg mx-auto px-4 sm:px-6">
          {/* Top section label */}
          <p className="text-xs sm:text-sm text-[#00d4ff] font-mono tracking-widest uppercase mb-4 text-center">
            DATA COLLECTION
          </p>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-0 relative z-10 overflow-visible py-2 px-2">
            {leftNodes.map((node, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className={`terminal-card rounded-lg p-3 sm:p-4 text-center transition-all duration-500 cursor-pointer overflow-visible ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                } ${hoveredNode === node.id || (hoveredNode && pairMap[hoveredNode] === node.id) ? "border-[#00d4ff]/60 shadow-[0_0_20px_rgba(0,212,255,0.3)]" : ""} ${
                  isInputActive(node.id) ? "border-[#00d4ff] shadow-[0_0_20px_rgba(0,212,255,0.5)] bg-[#00d4ff]/10" : ""
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center mx-auto mb-2 ${
                    isInputActive(node.id) ? "bg-[#00d4ff]/30" : ""
                  }`}
                >
                  <node.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#00d4ff]" />
                </div>
                <p className="text-xs sm:text-sm font-medium text-white leading-tight">{node.label}</p>
              </div>
            ))}
          </div>

          <svg className="w-full h-[80px] sm:h-[100px] relative z-0" viewBox="0 0 300 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="mFlowDown1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(0, 212, 255, 0)" />
                <stop offset="50%" stopColor="rgba(0, 212, 255, 1)" />
                <stop offset="100%" stopColor="rgba(0, 212, 255, 0)" />
                <animate attributeName="y1" values="-100%;100%" dur="5s" repeatCount="indefinite" />
                <animate attributeName="y2" values="0%;200%" dur="5s" repeatCount="indefinite" />
              </linearGradient>
              <filter id="mGlow1" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Left S-curve - x=50 is 16.67% of 300 */}
            <path d="M 50 0 C 50 50, 150 50, 150 100" fill="none" stroke="rgba(0, 212, 255, 0.2)" strokeWidth="2" />
            <path
              d="M 50 0 C 50 50, 150 50, 150 100"
              fill="none"
              stroke="url(#mFlowDown1)"
              strokeWidth="2"
              filter="url(#mGlow1)"
            />
            <circle r="4" fill="#00d4ff" filter="url(#mGlow1)">
              <animateMotion dur="5s" repeatCount="indefinite" path="M 50 0 C 50 50, 150 50, 150 100" />
            </circle>

            {/* Center straight line - x=150 is 50% of 300 */}
            <path d="M 150 0 L 150 100" fill="none" stroke="rgba(0, 212, 255, 0.2)" strokeWidth="2" />
            <path d="M 150 0 L 150 100" fill="none" stroke="url(#mFlowDown1)" strokeWidth="2" filter="url(#mGlow1)" />
            <circle r="4" fill="#00d4ff" filter="url(#mGlow1)">
              <animateMotion dur="5s" repeatCount="indefinite" path="M 150 0 L 150 100" begin="0.5s" />
            </circle>

            {/* Right S-curve - x=250 is 83.33% of 300 */}
            <path d="M 250 0 C 250 50, 150 50, 150 100" fill="none" stroke="rgba(0, 212, 255, 0.2)" strokeWidth="2" />
            <path
              d="M 250 0 C 250 50, 150 50, 150 100"
              fill="none"
              stroke="url(#mFlowDown1)"
              strokeWidth="2"
              filter="url(#mGlow1)"
            />
            <circle r="4" fill="#00d4ff" filter="url(#mGlow1)">
              <animateMotion dur="5s" repeatCount="indefinite" path="M 250 0 C 250 50, 150 50, 150 100" begin="1s" />
            </circle>
          </svg>

          {/* CORE Box */}
          <div className="flex justify-center my-0 relative z-10">
            <div
              className={`w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-2xl bg-gradient-to-br from-[#0a1628] to-[#0d1117] border border-[#00d4ff]/30 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(0,212,255,0.2)] transition-all duration-500 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-[#00d4ff] mb-1" />
              <span className="text-white font-bold text-sm sm:text-base">CORE</span>
            </div>
          </div>

          <svg className="w-full h-[80px] sm:h-[100px] relative z-0" viewBox="0 0 300 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="mFlowDown2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(247, 211, 84, 0)" />
                <stop offset="50%" stopColor="rgba(247, 211, 84, 1)" />
                <stop offset="100%" stopColor="rgba(247, 211, 84, 0)" />
                <animate attributeName="y1" values="-100%;100%" dur="5s" repeatCount="indefinite" />
                <animate attributeName="y2" values="0%;200%" dur="5s" repeatCount="indefinite" />
              </linearGradient>
              <filter id="mGlow2" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Left S-curve - x=50 is 16.67% of 300 */}
            <path d="M 150 0 C 150 50, 50 50, 50 100" fill="none" stroke="rgba(247, 211, 84, 0.2)" strokeWidth="2" />
            <path
              d="M 150 0 C 150 50, 50 50, 50 100"
              fill="none"
              stroke="url(#mFlowDown2)"
              strokeWidth="2"
              filter="url(#mGlow2)"
            />
            <circle r="4" fill="#f7d354" filter="url(#mGlow2)">
              <animateMotion dur="5s" repeatCount="indefinite" path="M 150 0 C 150 50, 50 50, 50 100" />
            </circle>

            {/* Center straight line - x=150 is 50% of 300 */}
            <path d="M 150 0 L 150 100" fill="none" stroke="rgba(247, 211, 84, 0.2)" strokeWidth="2" />
            <path d="M 150 0 L 150 100" fill="none" stroke="url(#mFlowDown2)" strokeWidth="2" filter="url(#mGlow2)" />
            <circle r="4" fill="#f7d354" filter="url(#mGlow2)">
              <animateMotion dur="5s" repeatCount="indefinite" path="M 150 0 L 150 100" begin="0.5s" />
            </circle>

            {/* Right S-curve - x=250 is 83.33% of 300 */}
            <path d="M 150 0 C 150 50, 250 50, 250 100" fill="none" stroke="rgba(247, 211, 84, 0.2)" strokeWidth="2" />
            <path
              d="M 150 0 C 150 50, 250 50, 250 100"
              fill="none"
              stroke="url(#mFlowDown2)"
              strokeWidth="2"
              filter="url(#mGlow2)"
            />
            <circle r="4" fill="#f7d354" filter="url(#mGlow2)">
              <animateMotion dur="5s" repeatCount="indefinite" path="M 150 0 C 150 50, 250 50, 250 100" begin="1s" />
            </circle>
          </svg>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mt-0 relative z-10 overflow-visible py-4 px-4">
            {rightNodes.map((node, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className={`output-card rounded-lg p-3 sm:p-4 text-center transition-all duration-500 cursor-pointer overflow-visible ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                } ${hoveredNode === node.id || (hoveredNode && pairMap[hoveredNode] === node.id) ? "border-[#f7d354]/60 shadow-[0_0_20px_rgba(247,211,84,0.3)]" : ""} ${
                  isOutputActive(node.id)
                    ? "border-[#f7d354] shadow-[0_0_20px_rgba(247,211,84,0.5)] bg-[#f7d354]/10"
                    : ""
                }`}
                style={{ transitionDelay: `${index * 100 + 300}ms` }}
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#f7d354]/10 border border-[#f7d354]/30 flex items-center justify-center mx-auto mb-2 ${
                    isOutputActive(node.id) ? "bg-[#f7d354]/30" : ""
                  }`}
                >
                  <node.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#f7d354]" />
                </div>
                <p className="text-xs sm:text-sm font-medium text-white leading-tight">{node.label}</p>
              </div>
            ))}
          </div>

          {/* Bottom section label */}
          <p className="text-xs sm:text-sm text-[#f7d354] font-mono tracking-widest uppercase mt-4 text-center">
            OUTPUT
          </p>
        </div>
      </div>
    </section>
  )
}
