'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

interface PulseStream {
  axis: 'h' | 'v'
  posRatio: number // position across screen (0 to 1)
  progress: number // animation progress (0 to 1)
  speed: number
  color: string
}

export default function UnifiedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const pulsesRef = useRef<PulseStream[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const frameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize 40 ambient node particles
    const particleCount = 40
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.25 + 0.15,
    }))

    // Initialize 4 MEP engineering pulse streams (Water, Electrical, HVAC, Fire Safety)
    pulsesRef.current = [
      { axis: 'v', posRatio: 0.04, progress: 0, speed: 0.0018, color: 'rgba(34, 211, 238, 0.6)' }, // Cyan Water
      { axis: 'v', posRatio: 0.96, progress: 0.5, speed: 0.0015, color: 'rgba(251, 191, 36, 0.6)' }, // Amber Electrical
      { axis: 'h', posRatio: 0.30, progress: 0.2, speed: 0.0012, color: 'rgba(52, 211, 153, 0.6)' }, // Emerald HVAC
      { axis: 'h', posRatio: 0.72, progress: 0.7, speed: 0.0014, color: 'rgba(248, 113, 113, 0.6)' }, // Red Fire Safety
    ]

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 1. Draw subtle engineering blueprint grid
      const gridSpacing = 60
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.035)'
      ctx.lineWidth = 0.5
      for (let x = 0; x < canvas.width; x += gridSpacing) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += gridSpacing) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // 2. Draw MEP engineering pulse streams
      pulsesRef.current.forEach((pulse) => {
        pulse.progress = (pulse.progress + pulse.speed) % 1

        if (pulse.axis === 'v') {
          const x = canvas.width * pulse.posRatio
          const y = pulse.progress * (canvas.height + 200) - 100
          
          // Guideline
          ctx.strokeStyle = 'rgba(226, 232, 240, 0.4)'
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, canvas.height)
          ctx.stroke()

          // Pulse glow
          const grad = ctx.createLinearGradient(x, y - 60, x, y + 60)
          grad.addColorStop(0, 'rgba(255, 255, 255, 0)')
          grad.addColorStop(0.5, pulse.color)
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)')
          ctx.strokeStyle = grad
          ctx.lineWidth = 3
          ctx.beginPath()
          ctx.moveTo(x, y - 60)
          ctx.lineTo(x, y + 60)
          ctx.stroke()
        } else {
          const y = canvas.height * pulse.posRatio
          const x = pulse.progress * (canvas.width + 200) - 100

          // Guideline
          ctx.strokeStyle = 'rgba(226, 232, 240, 0.4)'
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(canvas.width, y)
          ctx.stroke()

          // Pulse glow
          const grad = ctx.createLinearGradient(x - 60, y, x + 60, y)
          grad.addColorStop(0, 'rgba(255, 255, 255, 0)')
          grad.addColorStop(0.5, pulse.color)
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)')
          ctx.strokeStyle = grad
          ctx.lineWidth = 3
          ctx.beginPath()
          ctx.moveTo(x - 60, y)
          ctx.lineTo(x + 60, y)
          ctx.stroke()
        }
      })

      // 3. Draw particle nodes & inter-connections
      particlesRef.current.forEach((particle, i) => {
        // Mouse repulsion
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 120) {
          const force = (120 - distance) / 120
          particle.vx -= (dx / distance) * force * 0.12
          particle.vy -= (dy / distance) * force * 0.12
        }

        particle.x += particle.vx
        particle.y += particle.vy

        // Damping
        particle.vx *= 0.985
        particle.vy *= 0.985

        // Screen boundary bounced
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Render particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`
        ctx.fill()

        // Render particle connections
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const other = particlesRef.current[j]
          const pdx = particle.x - other.x
          const pdy = particle.y - other.y
          const pDist = Math.sqrt(pdx * pdx + pdy * pdy)

          if (pDist < 110) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = `rgba(59, 130, 246, ${(1 - pDist / 110) * 0.12})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      })

      frameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Ambient gradient background blur */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-blue-200/20 to-primary-300/20 blur-3xl"
        animate={{
          x: [0, 80, 0],
          y: [0, -80, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-primary-200/20 to-blue-300/20 blur-3xl"
        animate={{
          x: [0, -60, 0],
          y: [0, 60, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
    </div>
  )
}
