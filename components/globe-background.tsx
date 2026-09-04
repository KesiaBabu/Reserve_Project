"use client"

import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  phase: number
}

export function GlobeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.offsetWidth
        canvas.height = parent.offsetHeight
      }
    }

    resizeCanvas()

    // Initialize stars
    const initStars = () => {
      const starCount = Math.floor((canvas.width * canvas.height) / 8000) // Density based on area
      starsRef.current = []

      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random(),
          speed: Math.random() * 0.02 + 0.005, // Very slow twinkle
          phase: Math.random() * Math.PI * 2,
        })
      }
    }

    initStars()

    // Draw world map outline (simplified continents)
    const drawWorldMap = () => {
      ctx.strokeStyle = "rgba(0, 212, 255, 0.15)"
      ctx.lineWidth = 1
      ctx.beginPath()

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.min(canvas.width, canvas.height) * 0.35

      // Draw globe circle
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.stroke()

      // Draw latitude lines
      ctx.strokeStyle = "rgba(0, 212, 255, 0.08)"
      for (let i = 1; i < 6; i++) {
        const lat = (i / 6) * radius
        ctx.beginPath()
        ctx.ellipse(centerX, centerY, radius, lat, 0, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Draw longitude lines
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI
        ctx.beginPath()
        ctx.ellipse(centerX, centerY, radius * Math.sin(angle), radius, 0, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Draw simplified continent shapes with golden accent
      ctx.strokeStyle = "rgba(247, 211, 84, 0.2)"
      ctx.lineWidth = 1.5

      // North America
      ctx.beginPath()
      ctx.moveTo(centerX - radius * 0.6, centerY - radius * 0.3)
      ctx.quadraticCurveTo(
        centerX - radius * 0.4,
        centerY - radius * 0.5,
        centerX - radius * 0.2,
        centerY - radius * 0.35,
      )
      ctx.quadraticCurveTo(
        centerX - radius * 0.1,
        centerY - radius * 0.1,
        centerX - radius * 0.3,
        centerY + radius * 0.1,
      )
      ctx.stroke()

      // Europe/Africa
      ctx.beginPath()
      ctx.moveTo(centerX + radius * 0.05, centerY - radius * 0.3)
      ctx.quadraticCurveTo(
        centerX + radius * 0.15,
        centerY - radius * 0.1,
        centerX + radius * 0.1,
        centerY + radius * 0.4,
      )
      ctx.stroke()

      // Asia
      ctx.beginPath()
      ctx.moveTo(centerX + radius * 0.2, centerY - radius * 0.4)
      ctx.quadraticCurveTo(
        centerX + radius * 0.5,
        centerY - radius * 0.2,
        centerX + radius * 0.6,
        centerY + radius * 0.1,
      )
      ctx.stroke()
    }

    // Animation loop
    let time = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw globe
      drawWorldMap()

      // Draw and animate stars
      starsRef.current.forEach((star) => {
        // Calculate twinkling opacity
        const twinkle = Math.sin(time * star.speed + star.phase) * 0.5 + 0.5
        const currentOpacity = star.opacity * twinkle

        // Draw star with glow
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3)
        gradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`)
        gradient.addColorStop(0.3, `rgba(255, 255, 255, ${currentOpacity * 0.5})`)
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2)
        ctx.fill()

        // Draw star core
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Add some cyan-tinted stars
      starsRef.current.slice(0, Math.floor(starsRef.current.length * 0.2)).forEach((star) => {
        const twinkle = Math.sin(time * star.speed * 1.5 + star.phase) * 0.5 + 0.5
        ctx.fillStyle = `rgba(0, 212, 255, ${star.opacity * twinkle * 0.5})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * 0.8, 0, Math.PI * 2)
        ctx.fill()
      })

      // Add some golden-tinted stars
      starsRef.current
        .slice(Math.floor(starsRef.current.length * 0.2), Math.floor(starsRef.current.length * 0.35))
        .forEach((star) => {
          const twinkle = Math.sin(time * star.speed * 0.8 + star.phase + 1) * 0.5 + 0.5
          ctx.fillStyle = `rgba(247, 211, 84, ${star.opacity * twinkle * 0.4})`
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 0.7, 0, Math.PI * 2)
          ctx.fill()
        })

      time += 1
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      resizeCanvas()
      initStars()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.6 }} />
  )
}
