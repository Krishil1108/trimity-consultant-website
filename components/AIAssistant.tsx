'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Sparkles, RotateCcw } from 'lucide-react'

const KB: Record<string, string> = {
  'What services do you offer?': 'Trimity provides end-to-end **MEPF** consulting:\n\n HVAC Design & Coordination\n Electrical & Low Voltage Systems\n Plumbing & Drainage\n Fire Fighting & Detection\n Project Management & BIM',
  'How much experience do you have?': 'With **18+ years** of experience, Trimity has delivered **700+ projects** across India and Africa spanning hospitality, healthcare, residential, commercial, and industrial sectors.',
  'Do you work internationally?': 'Yes! Trimity operates across:\n\n India: 650+ projects across major cities\n Africa: 15+ international infrastructure projects',
  'How can I contact you?': 'Phone: **+91 96624 74538**\nEmail: **info@trimity.in**\nAddress: Yash Anant, 1402-B, Ashram Road, Navrangpura, Ahmedabad 380009',
  'What makes Trimity different?': 'Trimity stands out through:\n\n Single-point accountability across all MEPF services\n IGBC-certified sustainable design practices\n 100% client satisfaction track record\n BIM & coordination technology integration\n On-time delivery, every time',
}
const QUICK = Object.keys(KB)
interface Message { role: 'user' | 'ai'; text: string; typed?: boolean }

function Fmt({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <span className="whitespace-pre-wrap text-sm leading-relaxed">
      {parts.map((p, i) => p.startsWith('**') && p.endsWith('**') ? <strong key={i} className="font-semibold">{p.slice(2,-2)}</strong> : <span key={i}>{p}</span>)}
    </span>
  )
}

function TypedText({ text }: { text: string }) {
  const [d, setD] = useState('')
  const idx = useRef(0)
  useEffect(() => {
    idx.current = 0; setD('')
    const t = setInterval(() => { idx.current++; setD(text.slice(0, idx.current)); if (idx.current >= text.length) clearInterval(t) }, 12)
    return () => clearInterval(t)
  }, [text])
  return <Fmt text={d} />
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ role: 'ai', text: "Hi! I'm Trimity's AI assistant. Ask me anything about our services or how to reach us.", typed: true }])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, thinking])

  const respond = (q: string) => {
    if (thinking || !q.trim()) return
    setInput('')
    setMessages(m => [...m, { role: 'user', text: q.trim() }])
    setThinking(true)
    const ans = KB[q.trim()] ?? 'Please reach us at **+91 96624 74538** or visit our Contact page for detailed information.'
    setTimeout(() => { setThinking(false); setMessages(m => [...m, { role: 'ai', text: ans, typed: true }]) }, 800)
  }

  return (
    <>
      <div className="fixed bottom-8 left-6 z-50">
        <button
          onClick={() => setOpen(o => !o)}
          aria-label="AI Assistant"
          className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-blue-600 text-white shadow-2xl flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-transform"
          style={{ boxShadow: open ? undefined : '0 0 0 0 rgba(14,165,233,0.5)' }}
        >
          <AnimatePresence mode="wait">
            {open
              ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X className="w-6 h-6" /></motion.span>
              : <motion.span key="ai" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} transition={{ duration: 0.2 }}><Sparkles className="w-6 h-6" /></motion.span>}
          </AnimatePresence>
        </button>
        {!open && <span className="absolute inset-0 rounded-full glow-pulse pointer-events-none" />}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed bottom-28 left-4 sm:left-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] max-h-[560px] flex flex-col rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            style={{ background: 'linear-gradient(145deg,#0f172a 0%,#1e3a5f 100%)' }}
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-blue-500 flex items-center justify-center flex-shrink-0"><Sparkles className="w-5 h-5 text-white" /></div>
              <div className="flex-1 min-w-0"><p className="text-white font-bold text-sm">AI Assistant</p><p className="text-primary-300 text-xs">Powered by Trimity Intelligence</p></div>
              <button onClick={() => { setMessages([{ role: 'ai', text: "Hi! I'm Trimity's AI assistant. Ask me anything!", typed: true }]); setInput('') }} className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"><RotateCcw className="w-4 h-4" /></button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin">
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
                  {msg.role === 'ai' && <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-400 to-blue-500 flex-shrink-0 flex items-center justify-center mt-0.5"><Sparkles className="w-3 h-3 text-white" /></div>}
                  <div className={`max-w-[82%] px-4 py-2.5 rounded-2xl ${msg.role === 'user' ? 'bg-gradient-to-r from-primary-500 to-blue-500 text-white rounded-tr-sm' : 'bg-white/10 text-gray-200 rounded-tl-sm'}`}>
                    {msg.role === 'ai' && msg.typed && i === messages.length - 1 ? <TypedText text={msg.text} /> : <Fmt text={msg.text} />}
                  </div>
                </motion.div>
              ))}
              {thinking && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-400 to-blue-500 flex-shrink-0 flex items-center justify-center"><Sparkles className="w-3 h-3 text-white" /></div>
                  <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
                    {[0, 0.15, 0.3].map(d => <motion.span key={d} className="w-2 h-2 block rounded-full bg-primary-400" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.7, repeat: Infinity, delay: d }} />)}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {messages.length < 3 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {QUICK.slice(0, 3).map(q => <button key={q} onClick={() => respond(q)} className="text-xs px-3 py-1.5 rounded-full border border-primary-400/40 text-primary-300 hover:bg-primary-500/20 hover:text-white transition-all cursor-pointer">{q}</button>)}
              </div>
            )}

            <div className="px-4 py-3 border-t border-white/10 flex gap-2 items-center">
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && respond(input)} placeholder="Ask about our services" className="flex-1 bg-white/10 text-white placeholder-gray-400 text-sm px-4 py-2.5 rounded-xl outline-none focus:ring-1 focus:ring-primary-400 transition-all min-w-0" />
              <button onClick={() => respond(input)} disabled={!input.trim() || thinking} className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-blue-600 text-white flex items-center justify-center disabled:opacity-40 cursor-pointer flex-shrink-0 hover:brightness-110 transition-all active:scale-90">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
