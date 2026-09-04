"use client"

import type React from "react"

import { useRef, useState, type ReactNode } from "react"

interface MagneticCardProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function MagneticCard({ children, className = "", strength = 0.3 }: MagneticCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength

    const rotateX = ((e.clientY - centerY) / rect.height) * -10
    const rotateY = ((e.clientX - centerX) / rect.width) * 10

    setTransform({ x: deltaX, y: deltaY, rotateX, rotateY })
  }

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0, rotateX: 0, rotateY: 0 })
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${transform.x}px, ${transform.y}px) perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
        transition: "transform 0.15s ease-out",
      }}
    >
      {children}
    </div>
  )
}
