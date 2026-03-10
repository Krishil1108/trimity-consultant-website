'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProjectCarouselProps {
  images: string[]
  title: string
  autoPlayInterval?: number
}

export default function ProjectCarousel({ images, title, autoPlayInterval = 3500 }: ProjectCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const go = useCallback(
    (idx: number) => {
      setDirection(idx > current ? 1 : -1)
      setCurrent((idx + images.length) % images.length)
    },
    [current, images.length],
  )

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((c: number) => (c + 1) % images.length)
  }, [images.length])

  // Auto-play
  useEffect(() => {
    timerRef.current = setInterval(next, autoPlayInterval)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [next, autoPlayInterval])

  const pause = () => { if (timerRef.current) clearInterval(timerRef.current) }
  const resume = () => { timerRef.current = setInterval(next, autoPlayInterval) }

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  }

  return (
    <div className="w-full" onMouseEnter={pause} onMouseLeave={resume}>
      {/* Slide viewport */}
      <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-[16/9] bg-gray-900 select-none">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            src={`/${images[current]}`}
            alt={`${title} — view ${current + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            draggable={false}
          />
        </AnimatePresence>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Prev / Next */}
        <button
          onClick={() => go(current - 1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 transition-colors z-10"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => go(current + 1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 transition-colors z-10"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Counter badge */}
        <span className="absolute bottom-3 right-4 text-white/80 text-xs font-medium bg-black/40 px-2 py-0.5 rounded-full">
          {current + 1} / {images.length}
        </span>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'bg-primary-600 w-5 h-2'
                : 'bg-gray-300 hover:bg-gray-400 w-2 h-2'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
