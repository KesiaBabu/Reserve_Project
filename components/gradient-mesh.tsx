"use client"

import { useEffect, useRef } from "react"

export function GradientMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener("resize", resize)

    const blobs = [
      { x: 0.3, y: 0.3, radius: 0.4, color: "rgba(0, 212, 255, 0.15)", speed: 0.0003 },
      { x: 0.7, y: 0.6, radius: 0.35, color: "rgba(247, 211, 84, 0.1)", speed: 0.0004 },
      { x: 0.5, y: 0.8, radius: 0.3, color: "rgba(0, 255, 136, 0.08)", speed: 0.0002 },
    ]

    const animate = () => {
      time++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      blobs.forEach((blob, i) => {
        const x = canvas.width * (blob.x + Math.sin(time * blob.speed + i) * 0.1)
        const y = canvas.height * (blob.y + Math.cos(time * blob.speed * 0.7 + i) * 0.1)
        const radius = Math.min(canvas.width, canvas.height) * blob.radius

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, blob.color)
        gradient.addColorStop(1, "transparent")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[0]" style={{ filter: "blur(80px)" }} />
}
