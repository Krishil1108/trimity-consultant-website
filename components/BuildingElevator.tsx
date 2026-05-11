'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useRef } from 'react'

// --- Custom Animated SVG Visuals for Each Floor --- 

const HVACVisual = () => (
  <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-900 pointer-events-none">
    <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
      <defs>
        {/* Realistic Metallic Gradients for Ductwork */}
        <linearGradient id="duct-h" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="15%" stopColor="#94a3b8" />
          <stop offset="40%" stopColor="#f8fafc" />
          <stop offset="70%" stopColor="#e2e8f0" />
          <stop offset="90%" stopColor="#475569" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="duct-v" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="15%" stopColor="#94a3b8" />
          <stop offset="40%" stopColor="#f8fafc" />
          <stop offset="70%" stopColor="#e2e8f0" />
          <stop offset="90%" stopColor="#475569" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        
        {/* Industrial Grille / Louver texture */}
        <pattern id="louvers" width="10" height="20" patternUnits="userSpaceOnUse">
          <rect width="10" height="20" fill="#0f172a" />
          <rect y="4" width="10" height="12" fill="#334155" />
          <rect y="16" width="10" height="4" fill="#020617" />
        </pattern>
        
        {/* Copper Cooling Coils Gradient */}
        <linearGradient id="copper" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#78350f" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#451a03" />
        </linearGradient>

        {/* Freon / Cold Air Aura */}
        <radialGradient id="cold-aura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Main AHU (Air Handling Unit) Body */}
      <rect x="40" y="40" width="320" height="200" fill="url(#duct-h)" rx="10" stroke="#1e293b" strokeWidth="4" />
      
      {/* Side Louvered Intakes revealing internal cooling components */}
      <rect x="60" y="60" width="80" height="160" fill="url(#louvers)" stroke="#1e293b" strokeWidth="6" rx="4" />
      <rect x="260" y="60" width="80" height="160" fill="url(#louvers)" stroke="#1e293b" strokeWidth="6" rx="4" />

      {/* Copper Evaporator Coils looping inside the side intakes */}
      {[...Array(6)].map((_, i) => (
        <g key={`copper-left-${i}`}>
          <path d={`M65 ${80 + i * 25} Q 100 ${65 + i * 25} 135 ${80 + i * 25}`} fill="none" stroke="url(#copper)" strokeWidth="6" style={{ filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.7))' }} />
        </g>
      ))}
      {[...Array(6)].map((_, i) => (
        <g key={`copper-right-${i}`}>
          <path d={`M265 ${80 + i * 25} Q 300 ${65 + i * 25} 335 ${80 + i * 25}`} fill="none" stroke="url(#copper)" strokeWidth="6" style={{ filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.7))' }} />
        </g>
      ))}

      {/* Central Blower / Turbine Housing */}
      <circle cx="200" cy="140" r="85" fill="#0f172a" stroke="#334155" strokeWidth="8" style={{ filter: 'drop-shadow(inset 0 10px 25px rgba(0,0,0,0.9))' }} />
      {/* Ambient cold glow originating from behind the fan */}
      <circle cx="200" cy="140" r="80" fill="url(#cold-aura)" />
      
      {/* High-Performance 8-Blade Spinning Fan */}
      <motion.g animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }} style={{ transformOrigin: '200px 140px' }}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <path key={deg} d="M200 140 Q 250 60 265 140 Q 240 160 200 140" fill="url(#duct-h)" transform={`rotate(${deg} 200 140)`} stroke="#1e293b" strokeWidth="2" style={{ filter: 'drop-shadow(0 5px 5px rgba(0,0,0,0.5))' }} />
        ))}
        {/* Heavy Duty Motor Hub */}
        <circle cx="200" cy="140" r="25" fill="url(#duct-h)" stroke="#1e293b" strokeWidth="2" />
        <circle cx="200" cy="140" r="12" fill="#0f172a" />
        {/* Hub Bolts */}
        {[0, 120, 240].map(deg => (
          <circle key={`bolt-${deg}`} cx="200" cy="125" r="3" fill="#cbd5e1" transform={`rotate(${deg} 200 140)`} />
        ))}
      </motion.g>

      {/* Safety Grille over the fan */}
      <circle cx="200" cy="140" r="85" fill="none" stroke="#64748b" strokeWidth="2" />
      {[...Array(6)].map((_, i) => (
        <line key={`grill-h-${i}`} x1="125" y1={80 + i * 24} x2="275" y2={80 + i * 24} stroke="#64748b" strokeWidth="1" opacity="0.5" />
      ))}
      {[...Array(6)].map((_, i) => (
        <line key={`grill-v-${i}`} x1="140 + i * 24" y1="65" x2="140 + i * 24" y2="215" stroke="#64748b" strokeWidth="1" opacity="0.5" />
      ))}

      {/* Massive Corrugated Output Duct */}
      <rect x="130" y="255" width="140" height="160" fill="url(#duct-v)" />
      
      {/* Heavy Flange connecting AHU to Duct */}
      <rect x="120" y="240" width="160" height="20" fill="#334155" rx="3" stroke="#0f172a" strokeWidth="3" style={{ filter: 'drop-shadow(0 5px 5px rgba(0,0,0,0.6))' }} />
      {/* Hex bolts along the flange */}
      {[130, 155, 180, 205, 230, 255].map(x => (
        <polygon key={`flange-bolt-${x}`} points={`${x},245 ${x+4},247 ${x+4},253 ${x},255 ${x-4},253 ${x-4},247`} fill="#cbd5e1" />
      ))}

      {/* 3D Corrugation Ridges on Lower Duct */}
      {[280, 310, 340, 370, 400].map(y => (
        <g key={`corrugation-${y}`}>
          {/* Highlight */}
          <line x1="130" y1={y-2} x2="270" y2={y-2} stroke="#f8fafc" strokeWidth="3" opacity="0.5" />
          {/* Shadow */}
          <line x1="130" y1={y+2} x2="270" y2={y+2} stroke="#020617" strokeWidth="4" opacity="0.7" />
        </g>
      ))}

      {/* Multi-layered Intelligent Thermal Airflow Strings */}
      {[...Array(7)].map((_, i) => (
        <motion.path 
          key={`air-${i}`}
          d={`M${150 + i * 16} 140 Q ${130 + (i % 3) * 20} 300 ${150 + i * 16} 450`} 
          fill="none" 
          stroke="#7dd3fc" 
          strokeWidth={4 + (i % 3)} 
          strokeDasharray="20 50" 
          strokeLinecap="round"
          animate={{ strokeDashoffset: [-150, 150] }} 
          transition={{ repeat: Infinity, duration: 1.5 + (i * 0.2), ease: "linear" }} 
          style={{ filter: 'drop-shadow(0 0 8px #38bdf8)', opacity: 0.9 }} 
        />
      ))}
      
      {/* Condensation / Sub-zero ice particles falling rapidly */}
      {[...Array(20)].map((_, i) => (
        <motion.circle
          key={`frost-${i}`}
          cx={140 + Math.random() * 120}
          cy={240 + Math.random() * 160}
          r={Math.random() * 2.5 + 1}
          fill="#e0f2fe"
          animate={{ 
            y: [0, 100 + Math.random() * 50], 
            x: [0, Math.sin(i) * 15], 
            opacity: [0, 1, 0],
            scale: [1, 1.5, 0.5]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1 + Math.random() * 1.5, 
            ease: "easeIn",
            delay: Math.random() * 2
          }}
          style={{ filter: 'drop-shadow(0 0 5px #bae6fd)' }}
        />
      ))}
    </svg>
  </div>
)

const ElectricalFireVisual = () => (
  <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-950 pointer-events-none">
    <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
      <defs>
        {/* Realistic Pipe Gradient */}
        <linearGradient id="fire-pipe" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7f1d1d" />
          <stop offset="20%" stopColor="#ef4444" />
          <stop offset="40%" stopColor="#fca5a5" />
          <stop offset="60%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#450a0a" />
        </linearGradient>

        <linearGradient id="metal-conduit" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="20%" stopColor="#64748b" />
          <stop offset="50%" stopColor="#cbd5e1" />
          <stop offset="80%" stopColor="#475569" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        
        {/* Danger Stripes */}
        <pattern id="danger-stripes" width="20" height="20" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#eab308" />
          <rect width="10" height="20" fill="#111827" />
        </pattern>

        {/* gradients for wires to make them perfectly bright Red, Green, Yellow, Blue */}
        <linearGradient id="wire-r" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#991b1b" /><stop offset="50%" stopColor="#ef4444" /><stop offset="100%" stopColor="#7f1d1d" />
        </linearGradient>
        <linearGradient id="wire-y" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a16207" /><stop offset="50%" stopColor="#eab308" /><stop offset="100%" stopColor="#713f12" />
        </linearGradient>
        <linearGradient id="wire-g" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#166534" /><stop offset="50%" stopColor="#22c55e" /><stop offset="100%" stopColor="#14532d" />
        </linearGradient>
        <linearGradient id="wire-b" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1e40af" /><stop offset="50%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
      </defs>

      {/* Background Mounting Rails */}
      <rect x="100" y="0" width="20" height="400" fill="#0f172a" stroke="#1e293b" />
      <rect x="280" y="0" width="20" height="400" fill="#0f172a" stroke="#1e293b" />

      {/* Main Fire Pipe (Realistic) */}
      <rect x="-50" y="60" width="500" height="30" fill="url(#fire-pipe)" style={{ filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.5))' }} />
      {/* Pipe Clamps */}
      <rect x="95" y="55" width="30" height="40" fill="url(#metal-conduit)" rx="4" />
      <circle cx="110" cy="60" r="2" fill="#0f172a" />
      <circle cx="110" cy="90" r="2" fill="#0f172a" />
      <rect x="275" y="55" width="30" height="40" fill="url(#metal-conduit)" rx="4" />
      <circle cx="290" cy="60" r="2" fill="#0f172a" />
      <circle cx="290" cy="90" r="2" fill="#0f172a" />

      {/* Sprinkler 1 */}
      {/* Stem */}
      <rect x="145" y="90" width="10" height="15" fill="url(#metal-conduit)" />
      {/* Threads */}
      <line x1="143" y1="93" x2="157" y2="93" stroke="#475569" strokeWidth="2" />
      <line x1="143" y1="97" x2="157" y2="97" stroke="#475569" strokeWidth="2" />
      {/* Glass Bulb (Red) */}
      <rect x="147" y="105" width="6" height="18" fill="#ef4444" rx="3" style={{ filter: 'drop-shadow(0 0 4px #ef4444)' }} />
      {/* Deflector */}
      <path d="M135 123 L165 123 L158 128 L142 128 Z" fill="url(#metal-conduit)" />
      <path d="M135 123 Q 150 110 165 123" fill="none" stroke="url(#metal-conduit)" strokeWidth="3" />

      {/* Sprinkler 2 */}
      <rect x="245" y="90" width="10" height="15" fill="url(#metal-conduit)" />
      <line x1="243" y1="93" x2="257" y2="93" stroke="#475569" strokeWidth="2" />
      <line x1="243" y1="97" x2="257" y2="97" stroke="#475569" strokeWidth="2" />
      <rect x="247" y="105" width="6" height="18" fill="#ef4444" rx="3" style={{ filter: 'drop-shadow(0 0 4px #ef4444)' }} />
      <path d="M235 123 L265 123 L258 128 L242 128 Z" fill="url(#metal-conduit)" />
      <path d="M235 123 Q 250 110 265 123" fill="none" stroke="url(#metal-conduit)" strokeWidth="3" />

      <text x="200" y="45" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle" letterSpacing="4" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))' }}>FIRE SUPPRESSION MAIN</text>

      {/* Electrical Conduit Base (Realistic) - Solid Main Pipe in the middle */}
      <rect x="40" y="180" width="320" height="80" fill="url(#metal-conduit)" rx="6" style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.8))' }} />
      {/* Conduit Ribs */}
      {[60, 100, 140, 260, 300, 340].map(x => (
        <rect key={x} x={x-2} y="180" width="4" height="80" fill="#0f172a" opacity="0.4" />
      ))}
      {/* Danger Strip Panel */}
      <rect x="130" y="200" width="140" height="40" fill="url(#danger-stripes)" rx="2" stroke="#111827" strokeWidth="2" />
      {/* Warning Label Base */}
      <rect x="140" y="205" width="120" height="30" fill="#111827" rx="2" />
      <text x="200" y="225" fill="#eab308" fontSize="12" fontWeight="bold" textAnchor="middle" letterSpacing="2">HIGH VOLTAGE</text>
      
      {/* Screws on Conduit */}
      <circle cx="50" cy="190" r="3" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
      <circle cx="350" cy="190" r="3" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
      <circle cx="50" cy="250" r="3" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
      <circle cx="350" cy="250" r="3" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />

      {/* Exposed RGB Wires - Exiting from sides of the conduit, running down and out over edge */}
      <path d="M 40 220 Q -10 220, -10 300 T -50 350" fill="none" stroke="url(#wire-r)" strokeWidth="12" strokeLinecap="round" style={{ filter: 'drop-shadow(2px 3px 3px rgba(0,0,0,0.5))' }} />
      <path d="M 40 240 Q 10 240, 10 320 T -50 400" fill="none" stroke="url(#wire-y)" strokeWidth="12" strokeLinecap="round" style={{ filter: 'drop-shadow(2px 3px 3px rgba(0,0,0,0.5))' }} />
      
      <path d="M 360 220 Q 410 220, 410 300 T 450 350" fill="none" stroke="url(#wire-b)" strokeWidth="12" strokeLinecap="round" style={{ filter: 'drop-shadow(-2px 3px 3px rgba(0,0,0,0.5))' }} />
      <path d="M 360 240 Q 390 240, 390 320 T 450 400" fill="none" stroke="url(#wire-g)" strokeWidth="12" strokeLinecap="round" style={{ filter: 'drop-shadow(-2px 3px 3px rgba(0,0,0,0.5))' }} />

      {/* Energy Pulses Running Through Wires */}
      <motion.path d="M 40 220 Q -10 220, -10 300 T -50 350" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="10 100" animate={{ strokeDashoffset: [110, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} style={{ filter: 'drop-shadow(0 0 6px #ef4444)' }} />
      <motion.path d="M 40 240 Q 10 240, 10 320 T -50 400" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="10 100" animate={{ strokeDashoffset: [110, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }} style={{ filter: 'drop-shadow(0 0 6px #fef08a)' }} />
      <motion.path d="M 360 220 Q 410 220, 410 300 T 450 350" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="10 100" animate={{ strokeDashoffset: [110, 0] }} transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }} style={{ filter: 'drop-shadow(0 0 6px #93c5fd)' }} />
      <motion.path d="M 360 240 Q 390 240, 390 320 T 450 400" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="10 100" animate={{ strokeDashoffset: [110, 0] }} transition={{ repeat: Infinity, duration: 2.0, ease: "linear" }} style={{ filter: 'drop-shadow(0 0 6px #6ee7b7)' }} />

    </svg>
  </div>
)

const PlumbingVisual = () => (
  <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-900 pointer-events-none overflow-hidden">
    <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
      <defs>
        <linearGradient id="pvc" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="40%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <linearGradient id="trimity-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
      </defs>
      
      {/* Left Broken PVC Pipe */}
      <rect x="-50" y="150" width="220" height="100" fill="url(#pvc)" />
      {/* Right Broken PVC Pipe */}
      <rect x="230" y="150" width="220" height="100" fill="url(#pvc)" />
      
      {/* Leaking Water Drops (Hide when fixed) */}
      <motion.g animate={{ opacity: [1, 1, 0, 0, 1] }} transition={{ duration: 6, repeat: Infinity, times: [0, 0.45, 0.451, 0.9, 1] }}>
        <motion.path d="M 180 240 Q 180 250 175 255 A 8 8 0 0 0 185 255 Q 180 250 180 240" fill="#38bdf8" 
           animate={{ y: [0, 150], opacity: [1, 0], scale: [1, 1.5] }} transition={{ repeat: Infinity, duration: 0.5 }} style={{ filter: 'drop-shadow(0 0 8px #38bdf8)' }} />
        <motion.path d="M 215 220 Q 215 230 210 235 A 8 8 0 0 0 220 235 Q 215 230 215 220" fill="#38bdf8" 
           animate={{ y: [0, 150], opacity: [1, 0], scale: [1, 1.3] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} style={{ filter: 'drop-shadow(0 0 8px #38bdf8)' }} />
        <motion.path d="M 195 200 Q 195 210 190 215 A 8 8 0 0 0 200 215 Q 195 210 195 200" fill="#38bdf8" 
           animate={{ y: [0, 180], opacity: [1, 0], scale: [1, 1.8] }} transition={{ repeat: Infinity, duration: 0.7, delay: 0.4 }} style={{ filter: 'drop-shadow(0 0 8px #38bdf8)' }} />
      </motion.g>

      {/* The Fix: Trimity Joint */}
      <motion.g 
        animate={{ 
          y: [-250, 0, 0, -250],
          opacity: [0, 1, 1, 0]
        }} 
        transition={{ duration: 6, repeat: Infinity, times: [0, 0.3, 0.9, 1], ease: "easeInOut" }}
      >
        {/* Joint Body */}
        <rect x="150" y="130" width="100" height="140" fill="url(#trimity-gold)" rx="8" stroke="#bae6fd" strokeWidth="2" />
        <rect x="160" y="130" width="80" height="140" fill="#0f172a" opacity="0.6" />
        {/* Trimity Text Brand */}
        <text x="200" y="190" fill="#f0f9ff" fontSize="16" fontWeight="bold" fontFamily="monospace" textAnchor="middle" letterSpacing="2">TRIMITY</text>
        <text x="200" y="210" fill="#7dd3fc" fontSize="10" fontWeight="bold" textAnchor="middle" letterSpacing="1">CONSULTANTS</text>
        <text x="200" y="235" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">✔ FIXED</text>
        
        {/* Flanges / Clamps */}
        <rect x="140" y="125" width="20" height="150" fill="url(#trimity-gold)" rx="4" />
        <rect x="240" y="125" width="20" height="150" fill="url(#trimity-gold)" rx="4" />
        {/* Bolts */}
        <circle cx="150" cy="140" r="3" fill="#0f172a" />
        <circle cx="150" cy="260" r="3" fill="#0f172a" />
        <circle cx="250" cy="140" r="3" fill="#0f172a" />
        <circle cx="250" cy="260" r="3" fill="#0f172a" />
      </motion.g>

      {/* Smooth Flowing Water line inside (visible only when fixed) */}
      <motion.g animate={{ opacity: [0, 0, 1, 1, 0] }} transition={{ duration: 6, repeat: Infinity, times: [0, 0.45, 0.451, 0.9, 1] }}>
        <rect x="-50" y="180" width="500" height="40" fill="#38bdf8" opacity="0.2" />
        <motion.path 
          d="M -50 200 L 450 200" 
          stroke="#e0f2fe" strokeWidth="6" strokeDasharray="30 40" 
          strokeLinecap="round"
          fill="none" 
          animate={{ strokeDashoffset: [0, -140] }} 
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} 
        />
        <motion.path 
          d="M -50 210 L 450 210" 
          stroke="#7dd3fc" strokeWidth="4" strokeDasharray="20 40" 
          strokeLinecap="round"
          fill="none" 
          animate={{ strokeDashoffset: [0, -120] }} 
          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }} 
        />
      </motion.g>

    </svg>
  </div>
)

const floors = [
  {
    id: 'roof',
    title: 'Roof Level',
    subtitle: 'HVAC & Climate Control',
    desc: 'Massive chillers and air handling units breathe life into the building, maintaining perfect climate control across hundreds of rooms.',
    color: 'from-slate-400 to-slate-600',
    glow: 'shadow-slate-500/30',
    VisualComponent: HVACVisual,
    systems: ['Air Handling Units', 'Cooling Towers', 'Exhaust Fans', 'Duct Networks']
  },
  {
    id: 'middle',
    title: 'Mid Levels',
    subtitle: 'Electrical & Fire Safety',
    desc: 'The nervous system of the tower. Kilometers of precise wiring and advanced fire suppression networks working silently to keep occupants safe and powered.',
    color: 'from-amber-500 to-red-600',
    glow: 'shadow-amber-500/30',
    VisualComponent: ElectricalFireVisual,
    systems: ['Power Distribution', 'Lighting Control', 'Sprinkler Grids', 'Alarm Systems']
  },
  {
    id: 'basement',
    title: 'Basement',
    subtitle: 'Plumbing & Pump Core',
    desc: 'The deep core. Heavy-duty pumps, pressure boosters, and water filtration systems push life-giving water hundreds of feet vertically.',
    color: 'from-cyan-500 to-blue-600',
    glow: 'shadow-cyan-500/30',
    VisualComponent: PlumbingVisual,
    systems: ['Water Filtration', 'Sewage Treatment', 'Booster Pumps', 'Water Heaters']
  }
]

export default function BuildingElevator() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Track scroll over the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Map scroll progress tracking down the entire 300vh section
  const elevatorTop = useTransform(scrollYProgress, [0, 1], ["0%", "90%"]) // Max 90% so it doesn't fall out bottom

  return (
    <section ref={containerRef} className="relative w-full bg-slate-900 flex flex-col">
      {/* Global Shared Elevator Shaft across all floors */}
      <div className="absolute left-2 sm:left-4 lg:left-16 top-0 bottom-0 w-16 md:w-24 bg-slate-900 border-l border-r border-slate-700 z-30 hidden sm:block overflow-hidden shadow-inner pointer-events-none">
        
        {/* Metallic Cross Bracing / Truss Pattern */}
        <div className="absolute inset-0 opacity-40 mix-blend-overlay"
             style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #475569 10px, #475569 12px), repeating-linear-gradient(-45deg, transparent, transparent 10px, #475569 10px, #475569 12px)' }} />
        
        {/* Moving Construction Elevator Cabin - Position driven exactly by cursor scroll via top absolutely */}
        <motion.div 
          className="absolute left-[2px] right-[2px] h-20 md:h-28 bg-yellow-500 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-2 border-yellow-600 flex flex-col p-1 z-20 pointer-events-auto"
          style={{ top: elevatorTop }}
        >
          {/* Roof/Hoist Motor */}
          <div className="h-2 w-full bg-slate-800 rounded-sm mb-1" />
          {/* Internal Cage / Glass */}
          <div className="flex-1 w-full bg-slate-900 grid grid-cols-2 gap-1 p-1 border-y-2 border-slate-800">
            <div className="bg-slate-700 w-full h-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
            </div>
            <div className="bg-slate-700 w-full h-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
            </div>
          </div>
          {/* Base/Floor */}
          <div className="h-2 w-full bg-slate-800 rounded-sm mt-1 flex justify-center items-center">
            <div className="w-6 h-0.5 bg-yellow-400" />
          </div>
        </motion.div>
      </div>

      {floors.map((floor, index) => (
        <div 
          key={floor.id} 
          className="sticky top-0 min-h-screen w-full flex flex-col items-center justify-center overflow-hidden border-b border-slate-800 py-16 sm:py-24"
          style={{
            backgroundColor: '#0f172a',
            zIndex: index + 10 // ensures stacking cleanly
          }}
        >
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 opacity-20 pointer-events-none"
               style={{ backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 lg:gap-12 items-center relative z-20">
            {/* Custom Visual/SVG Side */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className={`relative w-full aspect-square md:aspect-auto md:h-[500px] rounded-3xl overflow-hidden border border-slate-700/50 bg-slate-800/80 shadow-2xl ${floor.glow} flex flex-col group`}
            >
              <floor.VisualComponent />
              
              {/* Active Systems Overlay on SVG */}
              <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 bg-gradient-to-t from-slate-950 via-slate-900/90 to-transparent z-20">
                <h4 className="font-mono text-[10px] md:text-sm text-slate-400 mb-3 tracking-widest uppercase truncate">Active Systems</h4>
                <ul className="grid grid-cols-2 gap-2 text-slate-300">
                  {floor.systems.map(sys => (
                    <li key={sys} className="flex items-center gap-2 bg-slate-900/60 px-2 py-1.5 rounded-md border border-slate-700/50 text-[10px] sm:text-xs shadow-inner backdrop-blur-sm">
                      <div className={`w-1.5 h-1.5 flex-shrink-0 rounded-full bg-gradient-to-r ${floor.color} animate-pulse`} />
                      <span className="truncate">{sys}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Text / Info Side */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-10 flex flex-col justify-center gap-1.5 sm:gap-2"
            >
              <div className="flex items-center gap-3 mb-2 sm:mb-5">
                <span className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-gradient-to-r ${floor.color} text-white shadow-lg`}>
                  <ArrowDown className="w-3 h-3 mr-1 animate-bounce" />
                  {floor.title}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2 sm:mb-4 lg:mb-6 leading-tight">
                {floor.subtitle}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed">
                {floor.desc}
              </p>
            </motion.div>
          </div>
        </div>
      ))}
    </section>
  )
}
