'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

interface Message { role: 'user' | 'assistant'; content: string }
type Mode = 'open' | 'saboteur' | 'grounding'

const S = { fontFamily: 'Inter, sans-serif' as const }
const M = { fontFamily: 'Montserrat, sans-serif' as const }
const B = { fontFamily: 'Bebas Neue, sans-serif' as const }

const MODE_INFO: Record<Mode, { label: string; blurb: string; opener: string }> = {
  open: {
    label: 'Open',
    blurb: 'Talk through anything on your mind.',
    opener: "Hey, I'm your Fortiva Mentor. Rough call, stuck in your head, or just need to talk it out? Type or tap the mic, and let's reset. What's going on?",
  },
  saboteur: {
    label: 'Saboteur',
    blurb: 'Find the block that keeps getting in your way.',
    opener: "Let's get under what's really stopping you. Tell me where you keep getting in your own way, the call you avoid, the thing you put off, the voice that says you're not cut out for this. What is it?",
  },
  grounding: {
    label: 'Grounding',
    blurb: 'Settle your body and reset your nervous system.',
    opener: "Let's get you settled. We can do this with your eyes open or closed. Tell me what you're feeling right now, in your body or your head, and we'll work with it. Or just say ready, and I'll walk you through a quick reset.",
  },
}

const CHIPS: Record<Mode, string[]> = {
  open: ['Just got rejected', "Can't pick up the phone", 'Comparing myself to everyone', 'Stuck in my head', 'Pre-call nerves'],
  saboteur: ['I keep avoiding my follow-ups', 'I freeze before I dial', 'I feel like a fraud', 'I self-sabotage when things go well'],
  grounding: ['Ready', "I'm tense before a call", 'Help me shake off a rough call', 'My mind is racing'],
}

const TONE_FREQ: Record<string, number> = { calm: 396, grounding: 432, manifestation: 528, clarity: 852 }
const TONE_LABEL: Record<string, string> = { calm: 'Calm', grounding: 'Grounding', manifestation: 'Manifestation', clarity: 'Clarity' }

export default function MentorPage() {
  const [mode, setMode] = useState<Mode>('open')
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: MODE_INFO.open.opener }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  // voice
  const [voiceOn, setVoiceOn] = useState(true)
  const [listening, setListening] = useState(false)
  const [sttSupported, setSttSupported] = useState(false)
  const [ttsSupported, setTtsSupported] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null)
  const transcriptRef = useRef('')
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null)
  const voiceOnRef = useRef(true)
  const sendRef = useRef<((t?: string) => void) | null>(null)

  // tones
  const [activeTone, setActiveTone] = useState<string | null>(null)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.05)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ctxRef = useRef<any>(null)
  const nodesRef = useRef<{ osc: OscillatorNode; gain: GainNode; lfo: OscillatorNode; lfoGain: GainNode } | null>(null)
  const activeToneRef = useRef<string | null>(null)
  const mutedRef = useRef(false)
  const volumeRef = useRef(0.05)
  const pendingStopRef = useRef(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const safetyRef = useRef<any>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])
  useEffect(() => { voiceOnRef.current = voiceOn }, [voiceOn])
  useEffect(() => { mutedRef.current = muted; applyGain() }, [muted])
  useEffect(() => { volumeRef.current = volume; applyGain() }, [volume])

  useEffect(() => {
    if (typeof window === 'undefined') return
    setTtsSupported(!!window.speechSynthesis)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SR) {
      setSttSupported(true)
      const rec = new SR()
      rec.lang = 'en-US'; rec.continuous = false; rec.interimResults = true
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rec.onresult = (e: any) => { let t = ''; for (let i = 0; i < e.results.length; i++) t += e.results[i][0].transcript; transcriptRef.current = t; setInput(t) }
      rec.onerror = () => setListening(false)
      rec.onend = () => { setListening(false); const t = transcriptRef.current.trim(); transcriptRef.current = ''; if (t) { setInput(''); sendRef.current?.(t) } }
      recognitionRef.current = rec
    }
    const synth = window.speechSynthesis
    if (synth) {
      const pick = () => {
        const voices = synth.getVoices()
        voiceRef.current =
          voices.find(v => /en-US/i.test(v.lang) && /natural|samantha|google us english|aria|jenny/i.test(v.name)) ||
          voices.find(v => /en-US/i.test(v.lang)) || voices.find(v => /^en/i.test(v.lang)) || null
      }
      pick(); synth.onvoiceschanged = pick
    }
    return () => {
      try { recognitionRef.current?.abort() } catch {}
      if (typeof window !== 'undefined') window.speechSynthesis?.cancel()
      stopTone()
      try { ctxRef.current?.close() } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ---------- audio engine ----------
  const ensureCtx = () => {
    if (typeof window === 'undefined') return null
    if (!ctxRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const AC = (window as any).AudioContext || (window as any).webkitAudioContext
      if (!AC) return null
      ctxRef.current = new AC()
    }
    if (ctxRef.current.state === 'suspended') { try { ctxRef.current.resume() } catch {} }
    return ctxRef.current
  }
  const applyGain = () => {
    const ctx = ctxRef.current, n = nodesRef.current
    if (!ctx || !n) return
    n.gain.gain.setTargetAtTime(mutedRef.current ? 0 : volumeRef.current, ctx.currentTime, 0.2)
  }
  const startTone = (name: string) => {
    const ctx = ensureCtx(); if (!ctx) return
    if (activeToneRef.current === name && nodesRef.current) return
    hardStopNodes()
    const osc = ctx.createOscillator(); osc.type = 'sine'; osc.frequency.value = TONE_FREQ[name] || 432
    const gain = ctx.createGain(); gain.gain.value = 0
    const lfo = ctx.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = 0.12
    const lfoGain = ctx.createGain(); lfoGain.gain.value = 0.012
    osc.connect(gain); gain.connect(ctx.destination); lfo.connect(lfoGain); lfoGain.connect(gain.gain)
    osc.start(); lfo.start()
    gain.gain.setTargetAtTime(mutedRef.current ? 0 : volumeRef.current, ctx.currentTime, 0.9)
    nodesRef.current = { osc, gain, lfo, lfoGain }
    activeToneRef.current = name; setActiveTone(name)
    if (safetyRef.current) clearTimeout(safetyRef.current)
    safetyRef.current = setTimeout(() => stopTone(), 180000)
  }
  const hardStopNodes = () => {
    const n = nodesRef.current
    if (n) { try { n.osc.stop() } catch {}; try { n.lfo.stop() } catch {} }
    nodesRef.current = null
  }
  const stopTone = () => {
    const ctx = ctxRef.current, n = nodesRef.current
    if (safetyRef.current) { clearTimeout(safetyRef.current); safetyRef.current = null }
    if (!ctx || !n) { activeToneRef.current = null; setActiveTone(null); return }
    const t = ctx.currentTime
    n.gain.gain.setTargetAtTime(0, t, 0.5)
    const { osc, lfo } = n
    setTimeout(() => { try { osc.stop() } catch {}; try { lfo.stop() } catch {} }, 1400)
    nodesRef.current = null; activeToneRef.current = null; setActiveTone(null)
  }

  // ---------- speech ----------
  const unlockTTS = () => {
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : null
    if (!synth) return
    const u = new SpeechSynthesisUtterance(' '); u.volume = 0
    try { synth.speak(u) } catch {}
  }
  const stopSpeaking = () => { if (typeof window !== 'undefined') window.speechSynthesis?.cancel() }
  const speak = (text: string, onEnd?: () => void) => {
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : null
    if (!voiceOnRef.current || !synth) { if (onEnd) setTimeout(onEnd, Math.min(8000, Math.max(1500, text.length * 55))); return }
    synth.cancel()
    const u = new SpeechSynthesisUtterance(text)
    if (voiceRef.current) u.voice = voiceRef.current
    u.rate = 0.97; u.pitch = 1
    if (onEnd) u.onend = onEnd
    synth.speak(u)
  }
  const toggleVoice = () => { setVoiceOn(v => { const nv = !v; if (nv) unlockTTS(); else stopSpeaking(); return nv }) }
  const toggleMic = () => {
    const rec = recognitionRef.current; if (!rec) return
    if (listening) { try { rec.stop() } catch {} }
    else { ensureCtx(); stopSpeaking(); transcriptRef.current = ''; setInput(''); try { rec.start(); setListening(true) } catch {} }
  }

  // ---------- tone parsing ----------
  const parseTone = (text: string) => {
    let start: string | null = null, stop = false
    const re = /\[\[tone:(calm|grounding|clarity|manifestation|stop)\]\]/g
    let m: RegExpExecArray | null
    while ((m = re.exec(text))) { if (m[1] === 'stop') stop = true; else start = m[1] }
    const clean = text.replace(re, '').replace(/\n{3,}/g, '\n\n').trim()
    return { clean, start, stop }
  }

  const switchMode = (m: Mode) => {
    if (m === mode) return
    stopTone(); stopSpeaking(); pendingStopRef.current = false
    setMode(m); setMessages([{ role: 'assistant', content: MODE_INFO[m].opener }]); setInput('')
  }

  const sendMessage = async (override?: string) => {
    const text = (override ?? input).trim()
    if (!text || loading) return
    ensureCtx(); unlockTTS()
    const newMessages: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(newMessages); setInput(''); setLoading(true)
    try {
      const res = await fetch('/api/mentor', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: newMessages, mode }) })
      const json = await res.json()
      if (json.error) throw new Error(json.error)
      const { clean, start, stop } = parseTone(json.reply || '')
      setMessages([...newMessages, { role: 'assistant', content: clean }])
      if (start) { startTone(start); pendingStopRef.current = !!stop } else if (stop) { stopTone() }
      speak(clean, () => { if (pendingStopRef.current) { pendingStopRef.current = false; stopTone() } })
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'I had trouble responding just then. Give it another try in a moment.' }])
    } finally { setLoading(false) }
  }

  sendRef.current = sendMessage
  const showChips = messages.length <= 1 && !loading

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 150px)' }}>
      <style>{`
@keyframes mentorBreath { 0%,100%{ transform:scale(0.7); opacity:.55 } 50%{ transform:scale(1.5); opacity:1 } }
@keyframes mentorBounce { 0%,80%,100%{ transform:translateY(0); opacity:.5 } 40%{ transform:translateY(-5px); opacity:1 } }
`}</style>

      {/* header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <Link href="/growth" style={{ ...S, fontSize: 12, color: 'rgba(199,205,214,0.5)', textDecoration: 'none' }}>‹ Personal Development</Link>
          <div style={{ ...B, fontSize: 11, letterSpacing: '0.25em', color: '#2563EB', marginTop: 6, marginBottom: 2 }}>FORTIVA</div>
          <h1 style={{ ...M, fontWeight: 900, fontSize: 26, letterSpacing: '0.04em', color: '#F8FAFC', lineHeight: 1 }}>MENTOR</h1>
        </div>
        {ttsSupported && (
          <button onClick={toggleVoice} aria-label="Toggle voice"
            style={{ fontSize: 16, lineHeight: 1, padding: '8px 12px', borderRadius: 10, cursor: 'pointer', background: voiceOn ? 'rgba(37,99,235,0.15)' : 'rgba(13,42,74,0.3)', color: voiceOn ? '#2563EB' : 'rgba(199,205,214,0.4)', border: `1px solid ${voiceOn ? 'rgba(37,99,235,0.3)' : 'rgba(199,205,214,0.12)'}` }}>
            {voiceOn ? '🔊' : '🔇'}
          </button>
        )}
      </div>

      {/* mode selector */}
      <div className="flex gap-2 mb-2">
        {(Object.keys(MODE_INFO) as Mode[]).map(m => {
          const on = mode === m
          return (
            <button key={m} onClick={() => switchMode(m)} style={{ flex: 1, padding: '8px 6px', borderRadius: 10, cursor: 'pointer', ...S, fontSize: 12, fontWeight: 700, background: on ? 'linear-gradient(135deg,#2563EB,#1d4ed8)' : 'rgba(13,42,74,0.4)', color: on ? '#fff' : 'rgba(199,205,214,0.6)', border: `1px solid ${on ? 'transparent' : 'rgba(199,205,214,0.12)'}` }}>
              {MODE_INFO[m].label}
            </button>
          )
        })}
      </div>
      <p style={{ ...S, fontSize: 11, color: 'rgba(199,205,214,0.4)', marginBottom: 10 }}>{MODE_INFO[mode].blurb}</p>

      {/* messages */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 pb-2">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="rounded-2xl px-4 py-3" style={{ maxWidth: '85%', whiteSpace: 'pre-wrap', background: m.role === 'user' ? 'linear-gradient(135deg,#2563EB,#1d4ed8)' : 'rgba(13,42,74,0.7)', border: m.role === 'assistant' ? '1px solid rgba(199,205,214,0.1)' : 'none', ...S, fontSize: 14, lineHeight: 1.6, color: '#F8FAFC' }}>
              {m.role === 'assistant' && <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(199,205,214,0.4)', marginBottom: 4 }}>Mentor</div>}
              {m.content}
            </div>
          </div>
        ))}
        {loading && <div className="flex justify-start"><div className="glass rounded-2xl px-4 py-3"><div className="flex gap-1">{[0, 1, 2].map(i => <div key={i} className="rounded-full" style={{ width: 8, height: 8, background: '#C7CDD6', animation: `mentorBounce 1.2s ${i * 0.15}s infinite` }} />)}</div></div></div>}
        <div ref={bottomRef} />
      </div>

      {/* quick-start chips */}
      {showChips && (
        <div className="flex flex-wrap gap-2 mb-2">
          {CHIPS[mode].map(c => (
            <button key={c} onClick={() => sendMessage(c)} style={{ ...S, fontSize: 12, padding: '7px 12px', borderRadius: 999, cursor: 'pointer', background: 'rgba(37,99,235,0.1)', color: '#C7CDD6', border: '1px solid rgba(37,99,235,0.25)' }}>{c}</button>
          ))}
        </div>
      )}

      {/* now playing / breathing pacer */}
      {activeTone && (
        <div className="glass rounded-xl px-3 py-2 mb-2 flex items-center gap-3">
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #60a5fa, #2563EB)', animation: 'mentorBreath 8s ease-in-out infinite', flexShrink: 0 }} />
          <div className="flex-1" style={{ minWidth: 0 }}>
            <div style={{ ...S, fontSize: 12, fontWeight: 600, color: '#F8FAFC' }}>{TONE_LABEL[activeTone] || 'Tone'} playing</div>
            <div style={{ ...S, fontSize: 10, color: 'rgba(199,205,214,0.45)' }}>Breathe with the circle</div>
          </div>
          <input type="range" min={0} max={0.12} step={0.01} value={volume} onChange={e => setVolume(parseFloat(e.target.value))} style={{ width: 70, accentColor: '#2563EB' }} aria-label="Tone volume" />
          <button onClick={() => setMuted(x => !x)} aria-label="Mute tone" style={{ fontSize: 14, padding: '4px 8px', borderRadius: 8, cursor: 'pointer', background: 'transparent', color: muted ? 'rgba(199,205,214,0.4)' : '#2563EB', border: '1px solid rgba(199,205,214,0.15)' }}>{muted ? '🔇' : '🔊'}</button>
          <button onClick={() => stopTone()} aria-label="Stop tone" style={{ ...S, fontSize: 11, padding: '5px 9px', borderRadius: 8, cursor: 'pointer', background: 'transparent', color: 'rgba(199,205,214,0.6)', border: '1px solid rgba(199,205,214,0.15)' }}>Stop</button>
        </div>
      )}

      {/* input */}
      <div className="glass rounded-2xl p-3 flex gap-2 items-end">
        <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={sttSupported ? 'Type, or tap 🎤 to talk...' : 'Type what is on your mind...'} rows={2}
          style={{ flex: 1, background: 'transparent', color: '#F8FAFC', ...S, fontSize: 14, resize: 'none', outline: 'none', lineHeight: 1.6 }}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }} />
        {sttSupported && (
          <button onClick={toggleMic} aria-label="Tap to talk"
            style={{ borderRadius: 10, padding: '10px 14px', fontSize: 14, cursor: 'pointer', whiteSpace: 'nowrap', background: listening ? 'rgba(239,68,68,0.9)' : 'rgba(37,99,235,0.15)', color: listening ? '#fff' : '#2563EB', border: `1px solid ${listening ? '#ef4444' : 'rgba(37,99,235,0.3)'}` }}>
            {listening ? '● Rec' : '🎤'}
          </button>
        )}
        <button onClick={() => sendMessage()} disabled={loading || !input.trim()} className="btn-primary" style={{ borderRadius: 10, padding: '10px 16px', fontSize: 13 }}>Send</button>
      </div>
      <p style={{ ...S, fontSize: 10, textAlign: 'center', color: 'rgba(199,205,214,0.25)', marginTop: 4 }}>
        A supportive coach, not a substitute for professional help. In a crisis, call or text 988 (US).
      </p>
    </div>
  )
}
