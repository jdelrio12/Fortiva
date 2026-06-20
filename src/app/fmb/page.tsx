'use client'
import { useState, useRef, useEffect } from 'react'

const TIMEFRAMES = ['90 Days', '6 Months', '1 Year']
const FOCUS = ['All', 'Final Expense', 'Mortgage Protection', 'Medicare', 'Life Insurance']

interface Milestone { label: string; target: string; detail: string }
interface Phase { phase: string; focus: string; actions: string[] }
interface Plan {
  northStar: string
  milestones: Milestone[]
  affirmations: string[]
  mindsetScript: string
  gamePlan: Phase[]
}
type Stage = 'setup' | 'generating' | 'result'

const S = { fontFamily: 'Inter, sans-serif' as const }
const M = { fontFamily: 'Montserrat, sans-serif' as const }
const B = { fontFamily: 'Bebas Neue, sans-serif' as const }

export default function FMBPage() {
  const [stage, setStage] = useState<Stage>('setup')
  const [form, setForm] = useState({ name: '', vision: '', incomeGoal: '', timeframe: '90 Days', focus: 'All', obstacle: '' })
  const [plan, setPlan] = useState<Plan | null>(null)
  const [error, setError] = useState('')

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const generate = async () => {
    setStage('generating'); setError(''); setPlan(null)
    try {
      const res = await fetch('/api/fmb', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ input: form }) })
      const json = await res.json()
      if (json.error) throw new Error(json.error)
      setPlan(json.plan)
      setStage('result')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
      setStage('setup')
    }
  }

  const speak = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text))
  }
  const copy = (text: string) => { if (typeof navigator !== 'undefined') navigator.clipboard?.writeText(text).catch(() => {}) }

  // ---- SETUP ----
  if (stage === 'setup') return (
    <div>
      <Header subtitle="The Fortiva Manifest Blueprint — your vision, milestones & daily mindset" />
      <div className="flex flex-col gap-5">
        <Block label="Your Name">
          <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="First name"
            style={inputStyle} />
        </Block>

        <Block label="What are you working toward?">
          <textarea value={form.vision} onChange={e => set('vision', e.target.value)} rows={3}
            placeholder="e.g. Buy my family a home, become the top producer, build real financial freedom…"
            style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }} />
        </Block>

        <Block label="Monthly Income Goal (optional)">
          <div className="flex items-center gap-2">
            <span style={{ ...M, fontSize: 18, color: '#C7CDD6' }}>$</span>
            <input value={form.incomeGoal} onChange={e => set('incomeGoal', e.target.value.replace(/[^0-9]/g, ''))} inputMode="numeric"
              placeholder="10000" style={inputStyle} />
          </div>
        </Block>

        <Block label="Timeframe">
          <div className="grid grid-cols-3 gap-2">
            {TIMEFRAMES.map(t => (
              <Choice key={t} active={form.timeframe === t} onClick={() => set('timeframe', t)}>{t}</Choice>
            ))}
          </div>
        </Block>

        <Block label="Product Focus (optional)">
          <div className="flex flex-wrap gap-2">
            {FOCUS.map(p => (
              <Choice key={p} active={form.focus === p} onClick={() => set('focus', p)} small>{p}</Choice>
            ))}
          </div>
        </Block>

        <Block label="Biggest obstacle right now? (optional)">
          <textarea value={form.obstacle} onChange={e => set('obstacle', e.target.value)} rows={2}
            placeholder="e.g. Staying consistent, handling rejection, getting through the day's dials…"
            style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }} />
        </Block>

        {error && <div style={{ ...S, fontSize: 13, color: '#ef4444' }}>{error}</div>}

        <button onClick={generate} className="btn-primary" style={{ width: '100%', padding: '16px', borderRadius: 14, fontSize: 15, letterSpacing: '0.06em' }}>
          GENERATE MY PATH →
        </button>
      </div>
    </div>
  )

  // ---- GENERATING ----
  if (stage === 'generating') return (
    <div>
      <Header subtitle="Building your blueprint…" />
      <div className="flex flex-col items-center gap-4 py-24">
        <div className="spinner" />
        <p style={{ ...S, color: '#C7CDD6', fontSize: 14 }}>Mapping out your milestones and mindset…</p>
      </div>
    </div>
  )

  // ---- RESULT ----
  return (
    <div>
      <div className="mb-6 flex justify-between items-start">
        <div>
          <div style={{ ...B, fontSize: 11, letterSpacing: '0.25em', color: '#2563EB', marginBottom: 4 }}>FORTIVA INSURANCE GROUP</div>
          <h1 style={{ ...M, fontWeight: 900, fontSize: 32, letterSpacing: '0.04em', color: '#F8FAFC', lineHeight: 1 }}>YOUR BLUEPRINT</h1>
          <p style={{ color: '#C7CDD6', fontSize: 13, marginTop: 6 }}>{form.name ? `${form.name} · ` : ''}{form.timeframe}{form.focus !== 'All' ? ` · ${form.focus}` : ''}</p>
        </div>
        <button onClick={() => setStage('setup')} style={{ ...S, fontSize: 12, border: '1px solid rgba(199,205,214,0.15)', borderRadius: 10, padding: '8px 16px', color: '#C7CDD6', background: 'transparent', cursor: 'pointer' }}>
          Start Over
        </button>
      </div>

      {plan && (
        <div className="flex flex-col gap-5 stagger">
          {/* North Star */}
          <div className="glass rounded-2xl p-5" style={{ borderColor: 'rgba(37,99,235,0.35)' }}>
            <div style={{ ...S, fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#60a5fa', marginBottom: 10 }}>★ Your North Star</div>
            <p style={{ ...M, fontWeight: 800, fontSize: 20, lineHeight: 1.35, color: '#F8FAFC' }}>{plan.northStar}</p>
            {form.incomeGoal && <p style={{ ...S, fontSize: 13, color: '#C7CDD6', marginTop: 10 }}>Target: ${Number(form.incomeGoal).toLocaleString()}/mo · {form.timeframe}</p>}
          </div>

          {/* Meditation Sounds */}
          <Section label="Meditation Sounds">
            <MeditationPlayer />
          </Section>

          {/* The Path (visual) */}
          <Section label="The Path">
            <div className="flex flex-col">
              {plan.milestones.map((m, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#2563EB', flexShrink: 0, marginTop: 18, boxShadow: '0 0 0 4px rgba(37,99,235,0.15)' }} />
                    {i < plan.milestones.length - 1 && <div style={{ width: 2, flex: 1, background: 'rgba(37,99,235,0.3)', marginTop: 4, marginBottom: 4 }} />}
                  </div>
                  <div className="glass rounded-xl p-4" style={{ flex: 1, marginBottom: 12 }}>
                    <div style={{ ...S, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#60a5fa' }}>{m.target}</div>
                    <div style={{ ...M, fontWeight: 700, fontSize: 15, color: '#F8FAFC', marginTop: 3 }}>{m.label}</div>
                    <div style={{ ...S, fontSize: 13, color: '#C7CDD6', marginTop: 4, lineHeight: 1.5 }}>{m.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Affirmations */}
          <Section label="Affirmations">
            <div className="flex flex-col gap-2">
              {plan.affirmations.map((a, i) => (
                <div key={i} className="glass rounded-xl p-4 flex gap-3 items-start">
                  <span style={{ ...M, fontWeight: 800, color: '#2563EB', fontSize: 13, marginTop: 1 }}>“</span>
                  <p style={{ ...S, fontSize: 14, color: '#F8FAFC', lineHeight: 1.55 }}>{a}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Daily Mindset Script */}
          <Section label="Daily Mindset Script">
            <div className="glass rounded-xl p-4">
              <p style={{ ...S, fontSize: 15, color: '#F8FAFC', lineHeight: 1.75, whiteSpace: 'pre-line' }}>{plan.mindsetScript}</p>
              <div className="flex gap-2 mt-4">
                <button onClick={() => speak(plan.mindsetScript)} style={miniBtn}>🔊 Read aloud</button>
                <button onClick={() => copy(plan.mindsetScript)} style={miniBtn}>Copy</button>
              </div>
            </div>
          </Section>

          {/* Meditation Sounds */}
          <Section label="Meditation Sounds">
            <SoundPlayer />
          </Section>

          {/* Game Plan */}
          <Section label="Game Plan">
            <div className="flex flex-col gap-3">
              {plan.gamePlan.map((p, i) => (
                <div key={i} className="glass rounded-xl p-4">
                  <div style={{ ...S, fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#60a5fa', marginBottom: 2 }}>Phase {i + 1}</div>
                  <div style={{ ...M, fontWeight: 700, fontSize: 15, color: '#F8FAFC' }}>{p.phase}</div>
                  <div style={{ ...S, fontSize: 13, color: '#C7CDD6', marginTop: 2, marginBottom: 10 }}>{p.focus}</div>
                  <div className="flex flex-col gap-2">
                    {p.actions.map((act, j) => (
                      <div key={j} className="flex gap-2 items-start">
                        <span style={{ color: '#2563EB', fontSize: 13, marginTop: 1 }}>✓</span>
                        <span style={{ ...S, fontSize: 14, color: '#F8FAFC', lineHeight: 1.5 }}>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <button onClick={generate} className="btn-primary" style={{ width: '100%', padding: '16px', borderRadius: 14, fontSize: 15, letterSpacing: '0.06em' }}>
            REGENERATE →
          </button>
        </div>
      )}
    </div>
  )
}

function Header({ subtitle }: { subtitle: string }) {
  return (
    <div className="mb-6">
      <div style={{ ...B, fontSize: 11, letterSpacing: '0.25em', color: '#2563EB', marginBottom: 4 }}>FORTIVA INSURANCE GROUP</div>
      <h1 style={{ ...M, fontWeight: 900, fontSize: 32, letterSpacing: '0.04em', color: '#F8FAFC', lineHeight: 1 }}>MANIFEST BLUEPRINT</h1>
      <p style={{ color: '#C7CDD6', fontSize: 13, marginTop: 6 }}>{subtitle}</p>
    </div>
  )
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl p-4">
      <div style={{ ...S, fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(199,205,214,0.4)', marginBottom: 12 }}>{label}</div>
      {children}
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ ...S, fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(199,205,214,0.45)', marginBottom: 10 }}>{label}</div>
      {children}
    </div>
  )
}

function Choice({ active, onClick, children, small }: { active: boolean; onClick: () => void; children: React.ReactNode; small?: boolean }) {
  return (
    <button onClick={onClick}
      style={{
        padding: small ? '8px 12px' : '10px',
        borderRadius: 10,
        border: `1px solid ${active ? '#2563EB' : 'rgba(199,205,214,0.1)'}`,
        color: active ? '#F8FAFC' : 'rgba(199,205,214,0.5)',
        background: active ? 'rgba(37,99,235,0.15)' : 'rgba(13,42,74,0.3)',
        cursor: 'pointer',
        fontFamily: 'Inter, sans-serif',
        fontSize: small ? 12 : 13,
        fontWeight: active ? 600 : 400,
        transition: 'all 0.2s',
        textAlign: 'center',
      }}>
      {children}
    </button>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  color: '#F8FAFC',
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  outline: 'none',
  border: 'none',
}

const miniBtn: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontSize: 12,
  padding: '7px 12px',
  borderRadius: 8,
  background: 'rgba(37,99,235,0.15)',
  color: '#2563EB',
  border: '1px solid rgba(37,99,235,0.3)',
  cursor: 'pointer',
}


type Preset = { id: string; name: string; best: string; tag: string; kind: 'binaural' | 'tone'; base?: number; beat?: number; freq?: number }
const PRESETS: Preset[] = [
  { id: 'deep',    name: 'Deep Calm',     best: 'Deep relaxation & meditation',         tag: 'Theta · use headphones', kind: 'binaural', base: 200, beat: 6 },
  { id: 'focus',   name: 'Focus Flow',    best: 'Calm, focused reading & visualizing',  tag: 'Alpha · use headphones', kind: 'binaural', base: 220, beat: 10 },
  { id: 'clarity', name: 'Clarity',       best: 'A bright, alert mental reset',          tag: 'High tone · 852 Hz',     kind: 'tone', freq: 852 },
  { id: 'ground',  name: 'Grounding Hum', best: 'Settling nerves before your dials',     tag: 'Low hum · 110 Hz',       kind: 'tone', freq: 110 },
  { id: 'warm',    name: 'Warm Tone',     best: 'General calm — no headphones needed',   tag: 'Soft tone · 432 Hz',     kind: 'tone', freq: 432 },
]

function MeditationPlayer() {
  const [active, setActive] = useState<string | null>(null)
  const [vol, setVol] = useState(0.15)
  const ctxRef = useRef<AudioContext | null>(null)
  const graphRef = useRef<{ master: GainNode; nodes: OscillatorNode[] } | null>(null)
  const volRef = useRef(0.15)
  volRef.current = vol

  const teardown = (fade = true) => {
    const ctx = ctxRef.current
    const g = graphRef.current
    if (!ctx || !g) return
    const { master, nodes } = g
    graphRef.current = null
    const t = ctx.currentTime
    try {
      master.gain.cancelScheduledValues(t)
      master.gain.setValueAtTime(master.gain.value, t)
      master.gain.linearRampToValueAtTime(0, t + (fade ? 0.5 : 0.01))
    } catch {}
    setTimeout(() => {
      nodes.forEach(n => { try { n.stop() } catch {}; try { n.disconnect() } catch {} })
      try { master.disconnect() } catch {}
    }, fade ? 600 : 50)
  }

  const play = async (p: Preset) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const AC: any = (window as any).AudioContext || (window as any).webkitAudioContext
    if (!AC) return
    if (!ctxRef.current) ctxRef.current = new AC()
    const ctx = ctxRef.current!
    if (ctx.state === 'suspended') { try { await ctx.resume() } catch {} }
    teardown(false)
    const master = ctx.createGain()
    master.gain.value = 0
    master.connect(ctx.destination)
    const nodes: OscillatorNode[] = []
    if (p.kind === 'binaural') {
      const lo = ctx.createOscillator(); lo.type = 'sine'; lo.frequency.value = p.base!
      const ro = ctx.createOscillator(); ro.type = 'sine'; ro.frequency.value = p.base! + (p.beat || 0)
      const lp = ctx.createStereoPanner(); lp.pan.value = -1
      const rp = ctx.createStereoPanner(); rp.pan.value = 1
      lo.connect(lp); lp.connect(master)
      ro.connect(rp); rp.connect(master)
      lo.start(); ro.start()
      nodes.push(lo, ro)
    } else {
      const o1 = ctx.createOscillator(); o1.type = 'sine'; o1.frequency.value = p.freq!
      const o2 = ctx.createOscillator(); o2.type = 'sine'; o2.frequency.value = p.freq! * 1.004
      const mix = ctx.createGain(); mix.gain.value = 0.6
      o1.connect(mix); o2.connect(mix); mix.connect(master)
      o1.start(); o2.start()
      nodes.push(o1, o2)
    }
    const t = ctx.currentTime
    master.gain.linearRampToValueAtTime(volRef.current, t + 0.8)
    graphRef.current = { master, nodes }
    setActive(p.id)
  }

  const toggle = (p: Preset) => {
    if (active === p.id) { teardown(true); setActive(null) }
    else { play(p) }
  }

  const onVol = (v: number) => {
    setVol(v); volRef.current = v
    const ctx = ctxRef.current, g = graphRef.current
    if (ctx && g) { try { g.master.gain.linearRampToValueAtTime(v, ctx.currentTime + 0.1) } catch {} }
  }

  useEffect(() => () => { teardown(false); try { ctxRef.current?.close() } catch {} }, [])

  return (
    <div className="flex flex-col gap-2">
      {PRESETS.map(p => {
        const on = active === p.id
        return (
          <button key={p.id} onClick={() => toggle(p)}
            className="glass rounded-xl p-4 text-left w-full flex items-center gap-3"
            style={{ cursor: 'pointer', border: `1px solid ${on ? '#2563EB' : 'rgba(199,205,214,0.1)'}`, background: on ? 'rgba(37,99,235,0.12)' : undefined }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: on ? '#2563EB' : 'rgba(37,99,235,0.15)', color: on ? '#fff' : '#2563EB', fontSize: 12 }}>
              {on ? '❚❚' : '▶'}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ ...M, fontWeight: 700, fontSize: 15, color: '#F8FAFC' }}>{p.name}</div>
              <div style={{ ...S, fontSize: 13, color: '#C7CDD6', marginTop: 1 }}>Best for: {p.best}</div>
              <div style={{ ...S, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(199,205,214,0.4)', marginTop: 4 }}>{p.tag}</div>
            </div>
          </button>
        )
      })}
      <div className="flex items-center gap-3 mt-1 px-1">
        <span style={{ ...S, fontSize: 11, color: 'rgba(199,205,214,0.5)' }}>Volume</span>
        <input type="range" min={0} max={0.4} step={0.01} value={vol} onChange={e => onVol(parseFloat(e.target.value))}
          style={{ flex: 1, accentColor: '#2563EB' }} />
      </div>
      <p style={{ ...S, fontSize: 11, color: 'rgba(199,205,214,0.35)', marginTop: 2, lineHeight: 1.5 }}>
        Start the volume low. The headphone presets play a slightly different pitch in each ear, so they only work with headphones. Skip these if any sound bothers your ears.
      </p>
    </div>
  )
}


interface Sound { id: string; name: string; best: string; type: 'binaural' | 'tone'; base?: number; beat?: number; freq?: number; needsHeadphones?: boolean }

const SOUNDS: Sound[] = [
  { id: 'calm',     name: 'Deep Calm',              best: 'Meditation & decompressing after a tough call', type: 'binaural', base: 200, beat: 6,  needsHeadphones: true },
  { id: 'focus',    name: 'Focus',                  best: 'Getting in the zone before your dials',         type: 'binaural', base: 200, beat: 10, needsHeadphones: true },
  { id: 'energize', name: 'Energize',               best: 'A lift right before you pick up the phone',     type: 'binaural', base: 210, beat: 16, needsHeadphones: true },
  { id: 'manifest', name: 'Manifestation · 528 Hz', best: 'Intention-setting while you read your blueprint', type: 'tone', freq: 528 },
  { id: 'ground',   name: 'Grounding · 432 Hz',     best: 'Steady, calm background on any device',          type: 'tone', freq: 432 },
  { id: 'clarity',  name: 'Clarity · 852 Hz',       best: 'Clearing a busy mind — higher, brighter tone',   type: 'tone', freq: 852 },
]

function SoundPlayer() {
  const [active, setActive] = useState<string | null>(null)
  const [vol, setVol] = useState(0.15)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ctxRef = useRef<any>(null)
  const nodesRef = useRef<{ osc: OscillatorNode[]; gain: GainNode } | null>(null)
  const volRef = useRef(0.15)
  volRef.current = vol

  const stop = () => {
    const ctx = ctxRef.current, nodes = nodesRef.current
    if (ctx && nodes) {
      const now = ctx.currentTime
      try {
        nodes.gain.gain.cancelScheduledValues(now)
        nodes.gain.gain.setValueAtTime(nodes.gain.gain.value, now)
        nodes.gain.gain.linearRampToValueAtTime(0, now + 0.3)
        nodes.osc.forEach(o => { try { o.stop(now + 0.35) } catch {} })
      } catch {}
    }
    nodesRef.current = null
  }

  const play = (s: Sound) => {
    if (typeof window === 'undefined') return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const AC = window.AudioContext || (window as any).webkitAudioContext
    if (!AC) return
    let ctx = ctxRef.current
    if (!ctx) { ctx = new AC(); ctxRef.current = ctx }
    if (ctx.state === 'suspended') ctx.resume()
    if (nodesRef.current) stop()
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(volRef.current, ctx.currentTime + 0.6)
    gain.connect(ctx.destination)
    const oscs: OscillatorNode[] = []
    if (s.type === 'binaural') {
      const panL = ctx.createStereoPanner(); panL.pan.value = -1; panL.connect(gain)
      const panR = ctx.createStereoPanner(); panR.pan.value = 1;  panR.connect(gain)
      const oL = ctx.createOscillator(); oL.type = 'sine'; oL.frequency.value = s.base!; oL.connect(panL); oL.start()
      const oR = ctx.createOscillator(); oR.type = 'sine'; oR.frequency.value = s.base! + (s.beat || 0); oR.connect(panR); oR.start()
      oscs.push(oL, oR)
    } else {
      const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = s.freq!; o.connect(gain); o.start()
      const o2 = ctx.createOscillator(); o2.type = 'sine'; o2.frequency.value = s.freq!; o2.detune.value = 4
      const g2 = ctx.createGain(); g2.gain.value = 0.6; o2.connect(g2); g2.connect(gain); o2.start()
      oscs.push(o, o2)
    }
    nodesRef.current = { osc: oscs, gain }
  }

  const toggle = (s: Sound) => {
    if (active === s.id) { stop(); setActive(null) }
    else { play(s); setActive(s.id) }
  }

  useEffect(() => {
    const nodes = nodesRef.current, ctx = ctxRef.current
    if (nodes && ctx) { try { nodes.gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.1) } catch {} }
  }, [vol])

  useEffect(() => () => { try { stop(); ctxRef.current?.close() } catch {} }, [])

  return (
    <div className="flex flex-col gap-2">
      {SOUNDS.map(s => {
        const on = active === s.id
        return (
          <button key={s.id} onClick={() => toggle(s)} className="glass rounded-xl p-4 text-left w-full"
            style={{ cursor: 'pointer', border: `1px solid ${on ? 'rgba(37,99,235,0.5)' : 'rgba(199,205,214,0.1)'}`, background: on ? 'rgba(37,99,235,0.12)' : 'rgba(13,42,74,0.3)', transition: 'all 0.2s' }}>
            <div className="flex justify-between items-center">
              <div style={{ ...M, fontWeight: 700, fontSize: 15, color: '#F8FAFC' }}>{s.name}</div>
              <span style={{ ...S, fontSize: 12, fontWeight: 600, color: on ? '#2563EB' : 'rgba(199,205,214,0.4)' }}>{on ? '■ Stop' : '▶ Play'}</span>
            </div>
            <div style={{ ...S, fontSize: 13, color: '#C7CDD6', marginTop: 4, lineHeight: 1.5 }}>Best for: {s.best}</div>
            {s.needsHeadphones && <div style={{ ...S, fontSize: 11, color: 'rgba(199,205,214,0.4)', marginTop: 4 }}>🎧 Use headphones</div>}
          </button>
        )
      })}
      <div className="glass rounded-xl p-4 flex items-center gap-3">
        <span style={{ ...S, fontSize: 12, color: 'rgba(199,205,214,0.5)' }}>Volume</span>
        <input type="range" min={0} max={0.4} step={0.01} value={vol} onChange={e => setVol(parseFloat(e.target.value))} style={{ flex: 1 }} />
      </div>
      <p style={{ ...S, fontSize: 11, color: 'rgba(199,205,214,0.35)', lineHeight: 1.5 }}>
        Start at a low volume. These tones are a calm-and-focus aid, not medical treatment — skip them if you have hearing sensitivity.
      </p>
    </div>
  )
}
