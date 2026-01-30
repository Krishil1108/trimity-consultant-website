'use client'

import { useEffect, useState, ReactNode } from 'react'

interface MouseParallaxProps {
  children: ReactNode
  strength?: number
  className?: string
}

export default function MouseParallax({ children, strength = 20, className = '' }: MouseParallaxProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * strength
      const y = (e.clientY / window.innerHeight - 0.5) * strength
      setPosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [strength])

  return (
    <div
      className={className}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.3s ease-out'
      }}
    >
      {children}
    </div>
  )
}
