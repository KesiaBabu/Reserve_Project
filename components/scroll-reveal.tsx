"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
}

export function ScrollReveal({ children, delay = 0, direction = "up", className = "" }: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const getTransform = () => {
    switch (direction) {
      case "up":
        return "translateY(40px)"
      case "down":
        return "translateY(-40px)"
      case "left":
        return "translateX(40px)"
      case "right":
        return "translateX(-40px)"
      default:
        return "translateY(40px)"
    }
  }

  return (
    <div
      ref={ref}
      className={`overflow-visible ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate(0)" : getTransform(),
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
