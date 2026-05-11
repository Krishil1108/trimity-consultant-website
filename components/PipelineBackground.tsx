'use client'

import { motion } from 'framer-motion'

export default function PipelineBackground() {
  // We are creating a subtle "living pipeline" background that stays fixed to the screen safely
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden opacity-[0.25]">
      {/* Left side vertical main pipe (Water/Plumbing) */}
      <div className="absolute left-4 sm:left-10 top-0 bottom-0 w-[2px] bg-slate-200">
        <motion.div
           className="absolute top-0 left-1/2 -translate-x-1/2 w-[4px] h-32 bg-gradient-to-b from-transparent via-cyan-400 to-transparent blur-[2px]"
           animate={{ top: ['-10%', '110%'] }}
           transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Right side vertical main pipe (Electrical) */}
      <div className="absolute right-4 sm:right-10 top-0 bottom-0 w-[2px] bg-slate-200">
        <motion.div
           className="absolute top-0 left-1/2 -translate-x-1/2 w-[4px] h-32 bg-gradient-to-b from-transparent via-amber-400 to-transparent blur-[2px]"
           animate={{ top: ['110%', '-10%'] }}
           transition={{ duration: 7, repeat: Infinity, ease: 'linear', delay: 2 }}
        />
      </div>

      {/* Horizontal crossing pipe (HVAC) */}
      <div className="absolute top-[30%] left-0 w-full h-[2px] bg-slate-200">
        <motion.div
           className="absolute left-0 top-1/2 -translate-y-1/2 h-[4px] w-48 bg-gradient-to-r from-transparent via-emerald-400 to-transparent blur-[2px]"
           animate={{ left: ['-10%', '110%'] }}
           transition={{ duration: 10, repeat: Infinity, ease: 'linear', delay: 1 }}
        />
      </div>

      {/* Second Horizontal crossing pipe (Fire safety) */}
      <div className="absolute top-[70%] left-0 w-full h-[2px] bg-slate-200">
        <motion.div
           className="absolute left-0 top-1/2 -translate-y-1/2 h-[4px] w-48 bg-gradient-to-r from-transparent via-red-400 to-transparent blur-[2px]"
           animate={{ left: ['110%', '-10%'] }}
           transition={{ duration: 8, repeat: Infinity, ease: 'linear', delay: 4 }}
        />
      </div>

      {/* Subtle nodes/junctions */}
      <div className="absolute left-4 sm:left-10 top-[30%] w-3 h-3 -translate-x-[5px] -translate-y-[5px] border-2 border-slate-300 rounded-full bg-white" />
      <div className="absolute left-4 sm:left-10 top-[70%] w-3 h-3 -translate-x-[5px] -translate-y-[5px] border-2 border-slate-300 rounded-full bg-white" />
      <div className="absolute right-4 sm:right-10 top-[30%] w-3 h-3 -translate-x-[5px] -translate-y-[5px] border-2 border-slate-300 rounded-full bg-white" />
      <div className="absolute right-4 sm:right-10 top-[70%] w-3 h-3 -translate-x-[5px] -translate-y-[5px] border-2 border-slate-300 rounded-full bg-white" />
    </div>
  )
}
