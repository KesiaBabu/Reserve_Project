"use client"

import { useEffect, useRef, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  targetX: number
  targetY: number
  size: number
  opacity: number
  color: string
}

export function MouseParticles() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const animationRef = useRef<number>()
  const idRef = useRef(0)

  useEffect(() => {
    // Initialize particles
    const initialParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      targetX: Math.random() * window.innerWidth,
      targetY: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.7 ? "#f7d354" : "#00d4ff",
    }))
    setParticles(initialParticles)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  useEffect(() => {
    const animate = () => {
      setParticles((prev) =>
        prev.map((particle) => {
          // Calculate distance to mouse
          const dx = mousePos.x - particle.x
          const dy = mousePos.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Gravitate toward mouse when within range
          const gravityRange = 200
          let newX = particle.x
          let newY = particle.y

          if (distance < gravityRange && distance > 0) {
            const force = (gravityRange - distance) / gravityRange
            newX += dx * force * 0.02
            newY += dy * force * 0.02
          } else {
            // Gentle drift when not near mouse
            newX += (particle.targetX - particle.x) * 0.005
            newY += (particle.targetY - particle.y) * 0.005

            // Update target randomly
            if (Math.random() < 0.01) {
              return {
                ...particle,
                x: newX,
                y: newY,
                targetX: Math.random() * window.innerWidth,
                targetY: Math.random() * window.innerHeight,
              }
            }
          }

          return { ...particle, x: newX, y: newY }
        }),
      )

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [mousePos])

  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            transform: "translate(-50%, -50%)",
            transition: "opacity 0.3s ease",
          }}
        />
      ))}
    </div>
  )
}
