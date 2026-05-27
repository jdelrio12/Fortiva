'use client'
import { useState, useRef, useEffect } from 'react'

const PROSPECT_TYPES = [
  'Skeptical Senior',
  'Busy Professional',
  'Price-Sensitive Family',
  'Already Has Coverage',
  'Undecided Spouse',
]
const PRODUCT_TYPES = ['Final Expense', 'Mortgage Protection', 'Medicare', 'Life Insurance']
const DIFFICULTIES = ['easy', 'medium', 'hard'] as const

interface Message { role: 'user' | 'assistant'; content: string }
interface Coaching {
  score: number; grade: string; summary: string
  strengths: string[]; improvements: string[]; keyMoment: string; tipForNextTime: string
}
type Phase = 'setup' | 'playing' | 'coaching'

export default function RolePlayPage() {
  const [phase, setPhase] = useState<Phase>('setup')
  const [config, setConfig] = useState({ prospectType: 'Skeptical Senior', productType: 'Final Expense', difficulty: 'medium' as typeof DIFFICULTIES[number] })
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [coaching, setCoaching] = useState<Coaching | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])

  const startSession = async () => {
    setMessages([]); setCoaching(null); setPhase('playing'); setLoading(true)
    try {
      const res = await fetch('/api/roleplay', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ config, messages: [{ role: 'user', content: 'Hello?' }], requestCoaching: false }) })
      const json = await res.json()
      if (json.error) throw new Error(json.error)
      setMessages([{ role: 'assistant', content: json.reply }])
    } catch (e: unknown) { setMessages([{ role: 'assistant', content: e instanceof Error ? e.message : 'Error' }]) }
    finally { setLoading(false) }
  }

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg: Message = { role: 'user', content: input.trim() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages); setInput(''); setLoading(true)
    try {
      const res = await fetch('/api/roleplay', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ config, messages: newMessages, requestCoaching: false }) })
      const json = await res.json()
      if (json.error) throw new Error(json.error)
      setMessages([...newMessages, { role: 'assistant', content: json.reply }])
    } catch { setMessages([...newMessages, { role: 'assistant', content: 'Error — check API key.' }]) }
    finally { setLoading(false) }
  }

  const endAndCoach = async () => {
    setLoading(true); setPhase('coaching')
    try {
      const res = await fetch('/api/roleplay', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ config, messages, requestCoaching: true }) })
      const json = await res.json()
      if (json.error) throw new Error(json.error)
      setCoaching(json.coaching)
    } catch { setCoaching(null) }
    finally { setLoading(false) }
  }

  const scoreColor = (s: number) => s >= 80 ? '#2563EB' : s >= 60 ? '#C7CDD6' : '#ef4444'

  const S = { fontFamily: 'Inter, sans-serif' }
  const M = { fontFamily: 'Montserrat, sans-serif' }
  const B = { fontFamily: 'Bebas Neue, sans-serif' }

  if (phase === 'setup') return (
    <div>
      <div className="mb-6">
        <div style={{ ...B, fontSize: 11, letterSpacing: '0.25em', color: '#2563EB', marginBottom: 4 }}>FORTIVA INSURANCE GROUP</div>
        <h1 style={{ ...M, fontWeight: 900, fontSize: 32, letterSpacing: '0.04em', color: '#F8FAFC', lineHeight: 1 }}>AI ROLE PLAY</h1>
        <p style={{ color: '#C7CDD6', fontSize: 13, marginTop: 6 }}>Practice your pitch with a realistic AI prospect</p>
      </div>
      <div className="flex flex-col gap-5">
        <ConfigBlock label="Prospect Type">
          <div className="flex flex-col gap-2">
            {PROSPECT_TYPES.map(p => (
              <button key={p} onClick={() => setConfig(c => ({ ...c, prospectType: p }))}
                style={{ textAlign: 'left', padding: '12px 16px', borderRadius: 10, border: `1px solid ${config.prospectType === p ? '#2563EB' : 'rgba(199,205,214,0.1)'}`, color: config.prospectType === p ? '#F8FAFC' : 'rgba(199,205,214,0.5)', background: config.prospectType === p ? 'rgba(37,99,235,0.15)' : 'rgba(13,42,74,0.3)', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: config.prospectType === p ? 600 : 400, transition: 'all 0.2s' }}>
                {p}
              </button>
            ))}
          </div>
        </ConfigBlock>
        <ConfigBlock label="Product Type">
          <div className="grid grid-cols-2 gap-2">
            {PRODUCT_TYPES.map(p => (
              <button key={p} onClick={() => setConfig(c => ({ ...c, productType: p }))}
                style={{ padding: '10px', borderRadius: 10, border: `1px solid ${config.productType === p ? '#2563EB' : 'rgba(199,205,214,0.1)'}`, color: config.productType === p ? '#F8FAFC' : 'rgba(199,205,214,0.5)', background: config.productType === p ? 'rgba(37,99,235,0.15)' : 'rgba(13,42,74,0.3)', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: config.productType === p ? 600 : 400, transition: 'all 0.2s', textAlign: 'center' }}>
                {p}
              </button>
            ))}
          </div>
        </ConfigBlock>
        <ConfigBlock label="Difficulty">
          <div className="grid grid-cols-3 gap-2">
            {DIFFICULTIES.map(d => {
              const dc: Record<string,string> = { easy: '#22c55e', medium: '#C7CDD6', hard: '#ef4444' }
              const active = config.difficulty === d
              return (
                <button key={d} onClick={() => setConfig(c => ({ ...c, difficulty: d }))}
                  style={{ padding: '10px', borderRadius: 10, border: `1px solid ${active ? dc[d] : 'rgba(199,205,214,0.1)'}`, color: active ? dc[d] : 'rgba(199,205,214,0.4)', background: active ? `${dc[d]}18` : 'rgba(13,42,74,0.3)', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'all 0.2s' }}>
                  {d}
                </button>
              )
            })}
          </div>
        </ConfigBlock>
        <button onClick={startSession} className="btn-primary" style={{ width: '100%', padding: '16px', borderRadius: 14, fontSize: 15, letterSpacing: '0.06em' }}>
          START ROLE PLAY →
        </button>
      </div>
    </div>
  )

  if (phase === 'coaching') return (
    <div>
      <div className="mb-6 flex justify-between items-start">
        <div>
          <div style={{ ...B, fontSize: 11, letterSpacing: '0.25em', color: '#2563EB', marginBottom: 4 }}>FORTIVA INSURANCE GROUP</div>
          <h1 style={{ ...M, fontWeight: 900, fontSize: 32, letterSpacing: '0.04em', color: '#F8FAFC', lineHeight: 1 }}>COACHING REPORT</h1>
          <p style={{ color: '#C7CDD6', fontSize: 13, marginTop: 6 }}>{config.prospectType} · {config.productType}</p>
        </div>
        <button onClick={() => setPhase('setup')} style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, border: '1px solid rgba(199,205,214,0.15)', borderRadius: 10, padding: '8px 16px', color: '#C7CDD6', background: 'transparent', cursor: 'pointer' }}>
          New Session
        </button>
      </div>
      {loading && <div className="flex flex-col items-center gap-4 py-20"><div className="spinner" /><p style={{ ...S, color: '#C7CDD6', fontSize: 14 }}>Claude is reviewing your call…</p></div>}
      {coaching && (
        <div className="flex flex-col gap-4 stagger">
          <div className="glass rounded-2xl p-5 flex justify-between items-center" style={{ borderColor: `${scoreColor(coaching.score)}30` }}>
            <div>
              <div style={{ ...S, fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(199,205,214,0.5)', marginBottom: 6 }}>Performance Score</div>
              <div style={{ ...M, fontWeight: 900, fontSize: 52, color: scoreColor(coaching.score), lineHeight: 1 }}>
                {coaching.score}<span style={{ fontSize: 22, color: 'rgba(199,205,214,0.3)' }}>/100</span>
              </div>
              <p style={{ ...S, fontSize: 14, color: '#C7CDD6', marginTop: 8, lineHeight: 1.5 }}>{coaching.summary}</p>
            </div>
            <div style={{ ...B, fontSize: 72, color: scoreColor(coaching.score), opacity: 0.85 }}>{coaching.grade}</div>
          </div>
          <CoachCard emoji="✅" color="#2563EB" label="Strengths">{coaching.strengths.map((s,i) => <div key={i} className="flex gap-2 text-sm" style={{ color: '#F8FAFC' }}><span style={{ color: '#2563EB' }}>•</span><span>{s}</span></div>)}</CoachCard>
          <CoachCard emoji="📈" color="#C7CDD6" label="Areas to Improve">{coaching.improvements.map((s,i) => <div key={i} className="flex gap-2 text-sm" style={{ color: '#F8FAFC' }}><span style={{ color: '#C7CDD6' }}>•</span><span>{s}</span></div>)}</CoachCard>
          <CoachCard emoji="🎯" color="#60a5fa" label="Key Moment"><p style={{ ...S, fontSize: 14, color: '#F8FAFC', lineHeight: 1.6 }}>{coaching.keyMoment}</p></CoachCard>
          <CoachCard emoji="⚡" color="#94a3b8" label="Tip For Next Time"><p style={{ ...S, fontSize: 14, color: '#F8FAFC', lineHeight: 1.6 }}>{coaching.tipForNextTime}</p></CoachCard>
          <button onClick={() => setPhase('setup')} className="btn-primary" style={{ width: '100%', padding: '16px', borderRadius: 14, fontSize: 15, letterSpacing: '0.06em' }}>PRACTICE AGAIN →</button>
        </div>
      )}
    </div>
  )

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 160px)' }}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(199,205,214,0.4)' }}>{config.prospectType} · {config.difficulty}</div>
          <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 14, color: '#F8FAFC' }}>{config.productType}</div>
        </div>
        <button onClick={endAndCoach} style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', padding: '8px 16px', borderRadius: 10, background: 'rgba(37,99,235,0.15)', color: '#2563EB', border: '1px solid rgba(37,99,235,0.3)', cursor: 'pointer' }}>
          END & GET COACHING
        </button>
      </div>
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 pb-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-2xl px-4 py-3`} style={{ maxWidth: '85%', background: m.role === 'user' ? 'linear-gradient(135deg,#2563EB,#1d4ed8)' : 'rgba(13,42,74,0.7)', border: m.role === 'assistant' ? '1px solid rgba(199,205,214,0.1)' : 'none', fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.6, color: '#F8FAFC' }}>
              {m.role === 'assistant' && <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(199,205,214,0.4)', marginBottom: 4 }}>{config.prospectType}</div>}
              {m.content}
            </div>
          </div>
        ))}
        {loading && <div className="flex justify-start"><div className="glass rounded-2xl px-4 py-3"><div className="flex gap-1">{[0,1,2].map(i => <div key={i} className="rounded-full" style={{ width: 8, height: 8, background: '#C7CDD6', animation: 'bounce 1s infinite', animationDelay: `${i*0.15}s` }} />)}</div></div></div>}
        <div ref={bottomRef} />
      </div>
      <div className="glass rounded-2xl p-3 flex gap-3 items-end">
        <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Type your response…" rows={2}
          style={{ flex: 1, background: 'transparent', color: '#F8FAFC', fontFamily: 'Inter, sans-serif', fontSize: 14, resize: 'none', outline: 'none', lineHeight: 1.6 }}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }} />
        <button onClick={sendMessage} disabled={loading || !input.trim()} className="btn-primary" style={{ borderRadius: 10, padding: '10px 16px', fontSize: 13 }}>Send</button>
      </div>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, textAlign: 'center', color: 'rgba(199,205,214,0.2)', marginTop: 4 }}>Enter to send · Shift+Enter for new line</p>
    </div>
  )
}

function ConfigBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl p-4">
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(199,205,214,0.4)', marginBottom: 12 }}>{label}</div>
      {children}
    </div>
  )
}

function CoachCard({ emoji, color, label, children }: { emoji: string; color: string; label: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl p-4" style={{ borderColor: `${color}20` }}>
      <div className="flex items-center gap-2 mb-3">
        <span>{emoji}</span>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color }}>{label}</span>
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  )
}
