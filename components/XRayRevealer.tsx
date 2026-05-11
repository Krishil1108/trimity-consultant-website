'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, useSpring, useTransform } from 'framer-motion'
import { MoveRight, MoveLeft } from 'lucide-react'

export default function XRayRevealer({ imageSrc }: { imageSrc: string }) {
  const [position, setPosition] = useState(50) // Percentage
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Spring physics for smooth following
  const springPos = useSpring(50, { stiffness: 400, damping: 30 })

  useEffect(() => {
    springPos.set(position)
  }, [position, springPos])

  const handleInteract = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const percentage = (x / rect.width) * 100
    setPosition(percentage)
  }

  return (
    <div 
      className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9] rounded-[2rem] overflow-hidden cursor-ew-resize group shadow-2xl border border-gray-200 bg-gray-100"
      ref={containerRef}
      onMouseMove={(e) => handleInteract(e.clientX)}
      onTouchMove={(e) => handleInteract(e.touches[0].clientX)}
      onMouseLeave={() => setPosition(50)} // Snap back to center
    >
      {/* Base Layer: Finished Design */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={imageSrc}
          alt="Finished Construction"
          fill
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 1200px"
          quality={90}
          priority
        />
        {/* Label */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg select-none pointer-events-none transition-transform group-hover:scale-105">
          <span className="text-[10px] sm:text-xs font-bold tracking-widest text-gray-800 uppercase">Finished Reality</span>
        </div>
      </div>

      {/* Clipped Top Layer: Blueprint / MEP view */}
      <motion.div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ clipPath: useTransform(springPos, (p) => `inset(0 ${100 - p}% 0 0)`) }}
      >
        <Image
          src={imageSrc}
          alt="MEP Blueprint View"
          fill
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 1200px"
          quality={90}
          priority
          style={{
            // Creating a fake CAD/Blueprint look using CSS filters
            filter: "grayscale(1) invert(1) sepia(1) hue-rotate(180deg) saturate(3) brightness(0.8) contrast(1.5)"
          }}
        />
        {/* CAD Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-40 mix-blend-overlay"
          style={{ 
            backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }} 
        />
        {/* Fake MEP lines overlay for effect */}
        <div className="absolute inset-0 opacity-30 mix-blend-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-400 via-transparent to-transparent" />
        
        {/* Label */}
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-blue-900/90 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg border border-blue-400/30 select-none pointer-events-none transition-transform group-hover:scale-105">
          <span className="text-[10px] sm:text-xs font-bold tracking-widest text-blue-100 uppercase">MEP Blueprint</span>
        </div>
      </motion.div>

      {/* Interactive Slider Divider Line */}
      <motion.div 
        className="absolute top-0 bottom-0 w-[3px] sm:w-[4px] bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] cursor-ew-resize pointer-events-none z-10"
        style={{ left: useTransform(springPos, (p) => `calc(${p}% - 2px)`) }}
      >
        {/* Slider Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-transform group-hover:scale-110">
          <div className="flex gap-1 text-primary-600">
            <MoveLeft className="w-4 h-4 sm:w-5 sm:h-5 -mr-1.5" strokeWidth={3} />
            <MoveRight className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={3} />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
