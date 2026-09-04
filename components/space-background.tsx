"use client"

import { useEffect, useRef } from "react"

export function SpaceBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const starCount = 100
    const container = containerRef.current

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div")
      star.className = "absolute rounded-full bg-white"

      const size = Math.random() * 2 + 0.5
      star.style.width = `${size}px`
      star.style.height = `${size}px`
      star.style.left = `${Math.random() * 100}%`
      star.style.top = `${Math.random() * 100}%`
      star.style.opacity = `${Math.random() * 0.4 + 0.1}`
      star.style.animation = `twinkle ${Math.random() * 4 + 3}s ease-in-out infinite`
      star.style.animationDelay = `${Math.random() * 4}s`

      container.appendChild(star)
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true" />
  )
}
