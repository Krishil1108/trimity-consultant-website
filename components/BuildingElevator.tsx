'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Wind, Zap, Droplets, ShieldCheck, ArrowRight, Activity, CheckCircle2, ChevronRight } from 'lucide-react'

interface SystemFloor {
  id: string
  floorNum: string
  floorLabel: string
  title: string
  subtitle: string
  desc: string
  image: string
  themeColor: string
  accentBorder: string
  glowColor: string
  badgeGradient: string
  specs: { label: string; value: string }[]
  systems: string[]
}

const SYSTEM_FLOORS: SystemFloor[] = [
  {
    id: 'hvac',
    floorNum: '03',
    floorLabel: 'Roof Level',
    title: 'HVAC & Climate Control',
    subtitle: 'Centralized Thermal Architecture',
    desc: 'High-efficiency magnetic bearing chillers, modular cooling towers, and intelligent air handling units engineered to maintain pristine indoor air quality and temperature precision across thousands of square meters.',
    image: '/systems/hvac.jpg',
    themeColor: 'text-sky-400',
    accentBorder: 'border-sky-500/40',
    glowColor: 'rgba(56, 189, 248, 0.25)',
    badgeGradient: 'from-sky-500 to-blue-600',
    specs: [
      { label: 'Cooling Capacity', value: '1,200+ TR Centralized' },
      { label: 'Air Filtration', value: 'MERV 13 & HEPA Standard' },
      { label: 'Energy Standard', value: 'ASHRAE 90.1 / IGBC Gold' },
      { label: 'Automation', value: 'Dynamic BMS VAV Modulation' },
    ],
    systems: [
      'Magnetic Bearing Chillers',
      'Variable Air Volume (VAV)',
      'Cleanroom Pressurization',
      'Energy Recovery Wheels',
    ],
  },
  {
    id: 'electrical',
    floorNum: '02',
    floorLabel: 'Mid Levels',
    title: 'Electrical & Fire Safety',
    subtitle: 'High-Voltage Power & Life Safety Core',
    desc: 'The vital nervous system of the tower. Redundant transformer substations, smart busbar trunking, emergency generator switchgear, and NFPA-compliant automated fire suppression protecting life and continuous operations.',
    image: '/systems/electrical.jpg',
    themeColor: 'text-amber-400',
    accentBorder: 'border-amber-500/40',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    badgeGradient: 'from-amber-500 to-orange-600',
    specs: [
      { label: 'Substation Voltage', value: '11kV / 415V Redundant' },
      { label: 'Backup Generation', value: '100% Emergency DG Sync' },
      { label: 'Fire Compliance', value: 'NBC Part 4 & NFPA 13/20' },
      { label: 'Clean Agent', value: 'FM-200 Server Protection' },
    ],
    systems: [
      'Smart Switchgear Panels',
      'Dual Busbar Power Risers',
      'Addressable Fire Detection',
      'Staircase Pressurization',
    ],
  },
  {
    id: 'plumbing',
    floorNum: '01',
    floorLabel: 'Basement Core',
    title: 'Plumbing & Pump Core',
    subtitle: 'Hydraulic Distribution & Water Treatment',
    desc: 'Massive hydro-pneumatic pumping stations, pressure-zoned water delivery manifolds, wastewater recycling STP plants, and rainwater harvesting infrastructure designed for net-zero water sustainability.',
    image: '/systems/plumbing.jpg',
    themeColor: 'text-cyan-400',
    accentBorder: 'border-cyan-500/40',
    glowColor: 'rgba(34, 211, 238, 0.25)',
    badgeGradient: 'from-cyan-500 to-teal-600',
    specs: [
      { label: 'Pumping Technology', value: 'Hydro-Pneumatic Multi-Stage' },
      { label: 'Water Treatment', value: 'Tertiary Filtration & UV' },
      { label: 'Zero Liquid Discharge', value: '100% Greywater Recycled' },
      { label: 'Rainwater Storage', value: 'High-Capacity Recharge Wells' },
    ],
    systems: [
      'Variable Speed Booster Pumps',
      'Sewage Treatment Plant (STP)',
      'Zero Liquid Discharge System',
      'Automated Valve Manifolds',
    ],
  },
]

export default function BuildingElevator() {
  const [activeFloorIndex, setActiveFloorIndex] = useState(0)
  const activeFloor = SYSTEM_FLOORS[activeFloorIndex]
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-slate-950 py-16 md:py-24 border-y border-slate-800/80 overflow-hidden"
    >
      {/* Subtle blueprint grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Ambient background glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-20 transition-all duration-700"
        style={{ backgroundColor: activeFloor.glowColor }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-semibold text-sky-400 tracking-wider uppercase mb-3 shadow-inner">
              <Activity className="w-3.5 h-3.5 animate-pulse text-sky-400" />
              Interactive Building Core
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Inside The Engineering Core
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Explore the critical MEPF infrastructure engineered by Trimity—from rooftop thermal regulation to high-voltage substations and basement hydraulic lifelines.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="hidden lg:flex items-center gap-4 bg-slate-900/90 border border-slate-800 px-5 py-3 rounded-2xl shadow-xl">
            <div className="text-right">
              <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">Engineering Status</p>
              <p className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 justify-end">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                All Systems Operational
              </p>
            </div>
          </div>
        </div>

        {/* Floor Navigation Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8 sm:mb-12">
          {SYSTEM_FLOORS.map((floor, idx) => {
            const isSelected = idx === activeFloorIndex
            return (
              <button
                key={floor.id}
                onClick={() => setActiveFloorIndex(idx)}
                className={`group relative flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer text-left ${
                  isSelected
                    ? 'bg-slate-900 border-slate-600 shadow-xl shadow-black/60 ring-1 ring-white/10'
                    : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-mono font-bold text-xs sm:text-sm transition-all ${
                      isSelected
                        ? `bg-gradient-to-br ${floor.badgeGradient} text-white shadow-md`
                        : 'bg-slate-800 text-slate-400 group-hover:text-white'
                    }`}
                  >
                    {floor.floorNum}
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs font-mono uppercase text-slate-400 tracking-wider block">
                      {floor.floorLabel}
                    </span>
                    <span className={`text-xs sm:text-base font-bold transition-colors line-clamp-1 ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {floor.title.split('&')[0].trim()}
                    </span>
                  </div>
                </div>

                {isSelected && (
                  <div className="hidden sm:flex items-center text-xs font-semibold text-emerald-400 gap-1 mt-1 sm:mt-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>Active</span>
                  </div>
                )}

                {/* Bottom Active Indicator Line */}
                {isSelected && (
                  <motion.div
                    layoutId="activeFloorIndicator"
                    className={`absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r ${floor.badgeGradient}`}
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Main Floor Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFloor.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="grid lg:grid-cols-12 gap-8 items-center bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-md"
          >
            {/* Visual Media Column (7 Cols) - 100% Clean & Unobstructed 3D Render */}
            <div className="lg:col-span-7 relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60 group">
              <Image
                src={activeFloor.image}
                alt={activeFloor.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 700px"
                className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

              {/* Minimal Sleek Top Badge */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-lg bg-gradient-to-r ${activeFloor.badgeGradient}`}>
                  Floor {activeFloor.floorNum} • {activeFloor.floorLabel}
                </span>
              </div>
            </div>

            {/* Description & Technical Specs Column (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className={`text-xs font-mono font-bold tracking-widest uppercase ${activeFloor.themeColor} mb-1 sm:mb-2 block`}>
                  {activeFloor.subtitle}
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight mb-2 sm:mb-3">
                  {activeFloor.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-6">
                  {activeFloor.desc}
                </p>

                {/* Monitored Active Systems Tags - Clean & Fully Visible */}
                <div className="mb-4 sm:mb-6">
                  <p className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <Activity className="w-3 h-3 text-sky-400 animate-pulse" />
                    Monitored Core Systems
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {activeFloor.systems.map((sys) => (
                      <span 
                        key={sys}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-200 text-[11px] sm:text-xs font-medium shadow-sm"
                      >
                        <CheckCircle2 className={`w-3 h-3 ${activeFloor.themeColor} flex-shrink-0`} />
                        <span>{sys}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Technical Specifications Grid */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {activeFloor.specs.map((spec) => (
                    <div 
                      key={spec.label} 
                      className="bg-slate-950/70 border border-slate-800/80 p-3.5 rounded-xl shadow-inner"
                    >
                      <span className="text-[11px] text-slate-400 font-mono block mb-1">
                        {spec.label}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-white tracking-tight block">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800/80">
                <Link
                  href="/services"
                  className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-lg bg-gradient-to-r ${activeFloor.badgeGradient} hover:brightness-110 active:scale-95 transition-all`}
                >
                  View All MEPF Services
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/vendor-rfp"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  Request RFP
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
