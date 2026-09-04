'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Sparkles, RotateCcw, MapPin, Building2, PhoneCall, FileText } from 'lucide-react'

const KB: Record<string, string> = {
  '📍 Head Office Address': "Trimity's **Head Office** is located at:\n\n📍 **Yash Anant, 1402-B, Ashram Road, Near Navrangpura Telephone Exchange, Navrangpura, Ahmedabad, Gujarat 380009, India**.\n\n📞 Phone: **+91 96624 74538**\n✉️ Email: **info@trimity.in**",
  '⚡ What services do you offer?': "Trimity provides end-to-end **MEPF** engineering & consulting:\n\n• **HVAC Design** (Chilled water plants, VRV/VRF, cleanroom ventilation)\n• **Electrical & Low Voltage** (Substations, Solar PV, CCTV, BMS)\n• **Plumbing & PHE** (Water supply, Drainage, STP/ETP recycling)\n• **Fire Fighting & Life Safety** (Sprinklers, Hydrants, Smoke extraction)\n• **BIM & 3D Coordination** (Revit 3D clash detection & BOQs)",
  '🏆 Experience & Projects': "With **18+ years** of excellence, Trimity has delivered **700+ landmark projects** across India (650+) and Africa (15+ international projects) spanning healthcare, hospitality, residential towers, commercial IT parks, and industrial factories.",
  '📄 Get RFP Quote': "Project consultancy fees depend on scope, built-up area, and required MEPF modules. Please submit your project details via our **Vendor & RFP** page or call our senior engineers directly at **+91 96624 74538**.",
}

const QUICK_SUGGESTIONS = [
  '📍 Head Office Address',
  '⚡ What services do you offer?',
  '🏆 Experience & Projects',
  '📄 Get RFP Quote',
]

interface Message { role: 'user' | 'ai'; text: string; typed?: boolean }

function Fmt({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <span className="whitespace-pre-wrap text-xs sm:text-sm leading-relaxed">
      {parts.map((p, i) => p.startsWith('**') && p.endsWith('**') ? <strong key={i} className="font-semibold text-white">{p.slice(2,-2)}</strong> : <span key={i}>{p}</span>)}
    </span>
  )
}

function TypedText({ text }: { text: string }) {
  const [d, setD] = useState('')
  const idx = useRef(0)
  useEffect(() => {
    idx.current = 0; setD('')
    const t = setInterval(() => { idx.current++; setD(text.slice(0, idx.current)); if (idx.current >= text.length) clearInterval(t) }, 10)
    return () => clearInterval(t)
  }, [text])
  return <Fmt text={d} />
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Welcome to Trimity Consultants! I am your AI MEPF Engineering assistant. Ask me about our Head Office, MEPF services, portfolio, or RFP quotes.", typed: true }
  ])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, thinking])

  const respond = async (q: string) => {
    if (thinking || !q.trim()) return
    const userQuery = q.trim()
    setInput('')
    setMessages(m => [...m, { role: 'user', text: userQuery }])
    setThinking(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userQuery }),
      })
      const data = await res.json()
      const ans = data.reply || KB[userQuery] || 'Please reach us at **+91 96624 74538** or email **info@trimity.in** for assistance.'
      setThinking(false)
      setMessages(m => [...m, { role: 'ai', text: ans, typed: true }])
    } catch {
      const ans = KB[userQuery] || 'Please reach us at **+91 96624 74538** or visit our Contact page for detailed information.'
      setThinking(false)
      setMessages(m => [...m, { role: 'ai', text: ans, typed: true }])
    }
  }

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setOpen(o => !o)}
          aria-label="Trimity AI Assistant"
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 text-white shadow-2xl flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X className="w-6 h-6" />
              </motion.span>
            ) : (
              <motion.span key="ai" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Sparkles className="w-6 h-6 animate-pulse" />
              </motion.span>
            )}
          </AnimatePresence>
          
          {/* Active online pulse ring */}
          {!open && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-900"></span>
            </span>
          )}
        </button>
      </div>

      {/* Chat Window Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[580px] max-h-[calc(100vh-8rem)] flex flex-col rounded-3xl overflow-hidden shadow-2xl border border-slate-700/60 bg-slate-950/95 backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800">
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg border border-white/20">
                <Sparkles className="w-5 h-5 text-white" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-900 rounded-full" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm tracking-wide">Trimity AI Assistant</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <p className="text-emerald-400 text-[11px] font-medium">Online • Head Office & MEPF Bot</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setMessages([{ role: 'ai', text: "Welcome to Trimity Consultants! Ask me about our Head Office, MEPF services, portfolio, or RFP quotes.", typed: true }])
                  setInput('')
                }}
                title="Reset Chat"
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5 scrollbar-thin scrollbar-thumb-slate-800">
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2.5`}>
                  {msg.role === 'ai' && (
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex-shrink-0 flex items-center justify-center mt-0.5 shadow-md">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-tr-xs shadow-lg' : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-xs shadow-md'}`}>
                    {msg.role === 'ai' && msg.typed && i === messages.length - 1 ? <TypedText text={msg.text} /> : <Fmt text={msg.text} />}
                  </div>
                </motion.div>
              ))}

              {thinking && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex-shrink-0 flex items-center justify-center shadow-md">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-slate-900/90 border border-slate-800 px-4 py-3 rounded-2xl rounded-tl-xs flex gap-1.5 items-center">
                    {[0, 0.15, 0.3].map(d => (
                      <motion.span key={d} className="w-2 h-2 block rounded-full bg-sky-400" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: d }} />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick Suggestion Pills */}
            <div className="px-4 pb-2 pt-1 flex flex-wrap gap-1.5 border-t border-slate-800/60 bg-slate-950/80">
              {QUICK_SUGGESTIONS.map(q => (
                <button
                  key={q}
                  onClick={() => respond(q)}
                  className="text-[11px] px-3 py-1.5 rounded-full border border-sky-500/30 text-sky-300 bg-sky-950/30 hover:bg-sky-500/20 hover:text-white transition-all cursor-pointer truncate max-w-full"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Box */}
            <div className="px-4 py-3 bg-slate-900 border-t border-slate-800 flex gap-2 items-center">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && respond(input)}
                placeholder="Ask about Head Office, services, or quotes..."
                className="flex-1 bg-slate-950 text-white placeholder-slate-400 text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-800 outline-none focus:border-sky-500 transition-all min-w-0"
              />
              <button
                onClick={() => respond(input)}
                disabled={!input.trim() || thinking}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center disabled:opacity-30 cursor-pointer flex-shrink-0 hover:brightness-110 active:scale-95 transition-all shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
