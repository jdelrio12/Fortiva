'use client'
import { useState, useRef, useEffect } from 'react'

const S = { fontFamily: 'Inter, sans-serif' as const }
const M = { fontFamily: 'Montserrat, sans-serif' as const }
const B = { fontFamily: 'Bebas Neue, sans-serif' as const }

type Form = { name: string; category: string; conviction: number; [k: string]: string | number }

interface Field { key: string; label: string; ph: string; type: 'number' | 'text' | 'textarea' }
interface Built { statement: string; haveIt: string; oldThought: string; newThought: string; actions: string[]; physical: string; gratitude: string; scene: string }
interface Cat { id: string; label: string; emoji: string; fields: Field[]; build: (f: Form) => Built }

const v = (f: Form, k: string) => String(f[k] || '').trim()

const CONFIG: Record<string, Cat> = {
  money: {
    id: 'money', label: 'Money & Income', emoji: '💰',
    fields: [
      { key: 'amount', label: 'How much money do you want to receive? ($)', ph: 'e.g. 10000', type: 'number' },
      { key: 'byWhen', label: 'By when?', ph: 'e.g. by December 31st, 2025', type: 'text' },
      { key: 'whatFor', label: 'What is this money for?', ph: 'e.g. pay off my debt and invest in my business', type: 'text' },
      { key: 'howChange', label: 'How will having this money change your life?', ph: "e.g. I'll have financial freedom and focus on what matters most", type: 'textarea' },
    ],
    build: (f) => {
      const amt = v(f, 'amount') ? Number(v(f, 'amount')).toLocaleString() : '___'
      const forWhat = v(f, 'whatFor') || 'live the life I want'
      return {
        statement: `I am so happy and grateful now that $${amt} flows into my life, allowing me to ${forWhat}. Money comes to me easily and frequently.`,
        haveIt: `I have this money in my life, and the freedom it brings is real. Abundance flows to me naturally and I am financially free.`,
        oldThought: `I desperately need this money. I don't have enough. Something is wrong with my finances.`,
        newThought: `Money flows to me naturally. I am already abundant in so many ways. This money is simply on its way — there is nothing to worry about.`,
        actions: [
          `Take one action today that a wealthy version of you would take — reach out to someone, sharpen one skill, or open that account.`,
          `Review your income and find one place you could add value and earn more within the next 30 days.`,
          `Write down 10 ways this money could reach you — from expected to wildly unexpected — and stay open to all of them.`,
        ],
        physical: `The specific amount — $${amt} — arriving in your account, a check, or a deal. The exact number that unlocks your next level.`,
        gratitude: `Spend 5 minutes each morning feeling grateful for every dollar you already have — every bill you can pay, every small purchase. Treat each win as evidence more is coming.`,
        scene: `See yourself opening your account and seeing that exact number. Feel the relief, the pride, the freedom. Picture what you do first — who you call, where you go.`,
      }
    },
  },
  career: {
    id: 'career', label: 'Career & Purpose', emoji: '🚀',
    fields: nonMoneyFields('e.g. lead a creative team doing work I love'),
    build: (f) => generic(f, 'Opportunities aligned with my purpose flow to me easily and at the perfect time.',
      `I am doing work that lights me up, and it feels completely natural. I am exactly where I'm meant to be, growing every day.`,
      `I'm stuck. I'm running out of time. I'll never find work that actually matters to me.`,
      `The right path is unfolding for me. I am capable, and aligned opportunities are already on their way.`,
      [`Take one action today the fulfilled version of you would take — reach out, apply, create, or learn.`,
       `Pick one skill or relationship to invest in this month that moves you toward this.`,
       `Write down 5 ways this could come to you — expected and unexpected — and stay open to all of them.`],
      `Spend 5 minutes each morning grateful for the talents, people, and chances you already have. Treat each small win as proof you're on your way.`,
      `See yourself in that role or moment. Feel the pride and the ease of it. Picture what you do first and who you tell.`),
  },
  relationships: {
    id: 'relationships', label: 'Relationships', emoji: '❤️',
    fields: nonMoneyFields('e.g. a loving, supportive partnership'),
    build: (f) => generic(f, 'Love and genuine connection flow to me easily and naturally.',
      `I am surrounded by love and real connection, and it feels completely natural. I am worthy of being loved exactly as I am.`,
      `I'm always alone. The right people never show up for me. Something is wrong with me.`,
      `I am worthy of love, and the right people are finding their way to me. Connection flows to me naturally.`,
      [`Do one thing today the loved, connected version of you would do — reach out, show up, or open up.`,
       `Give the kind of connection you want to receive to someone this week.`,
       `Write down 5 ways this connection could come into your life and stay open to all of them.`],
      `Spend 5 minutes each morning grateful for the love already in your life — friends, family, small kindnesses. Treat each as proof more is coming.`,
      `See the moment you feel truly seen and loved. Feel the warmth of it. Picture exactly where you are and who is there.`),
  },
  health: {
    id: 'health', label: 'Health & Body', emoji: '💪',
    fields: nonMoneyFields('e.g. feel strong, energized, and confident in my body'),
    build: (f) => generic(f, 'My body grows stronger and healthier every single day.',
      `I am strong, healthy, and full of energy, and it feels completely natural. I treat my body like something I love.`,
      `I'll never get there. My body is working against me. It's too late for me.`,
      `My body is capable and resilient. Every day I'm getting stronger, and it's getting easier.`,
      [`Do one thing today the healthy version of you would do — move, hydrate, rest, or nourish yourself well.`,
       `Pick one small habit to repeat daily this week that compounds toward this.`,
       `Write down 5 signs your body is already supporting you and notice them all day.`],
      `Spend 5 minutes each morning grateful for what your body already does for you. Treat every good choice as evidence it's working.`,
      `See yourself moving with energy and ease. Feel the strength and lightness. Picture the moment you realize you've changed.`),
  },
  home: {
    id: 'home', label: 'Home & Lifestyle', emoji: '🏡',
    fields: nonMoneyFields('e.g. own a calm, beautiful home near the water'),
    build: (f) => generic(f, 'The life I have imagined flows to me easily and feels completely natural.',
      `I am living in the home and lifestyle I pictured, and it feels completely natural. I belong here.`,
      `I'll never afford it. This isn't for people like me. It's out of reach.`,
      `The life I want is on its way to me. I can picture it clearly, and it feels natural and close.`,
      [`Take one action today the future version of you would take in this home or life.`,
       `Identify one concrete step this month that moves you toward it.`,
       `Write down 5 ways this could come to you and stay open to all of them.`],
      `Spend 5 minutes each morning grateful for the comfort you already have. Treat each one as proof more is coming.`,
      `See yourself walking through that space, settling in. Feel the ease and the pride. Picture what you do first.`),
  },
  custom: {
    id: 'custom', label: 'Custom Goal', emoji: '✨',
    fields: nonMoneyFields('e.g. publish my first book'),
    build: (f) => generic(f, 'What I desire flows to me easily and at the perfect time.',
      `I have what I set out for, and it feels completely natural. I am exactly where I'm meant to be.`,
      `It's too far away. It probably won't happen for me. I'm running out of time.`,
      `What's meant for me is already on its way. I am capable, and the path is unfolding.`,
      [`Take one action today the version of you who already has this would take.`,
       `Pick one step this month that moves you meaningfully closer.`,
       `Write down 5 ways this could come to you — expected and unexpected — and stay open.`],
      `Spend 5 minutes each morning grateful for how far you've already come. Treat each small win as proof more is coming.`,
      `See the moment it's real. Feel the pride and relief. Picture what you do first and who you tell.`),
  },
}

function nonMoneyFields(goalPh: string): Field[] {
  return [
    { key: 'goal', label: 'What do you want? Be specific.', ph: goalPh, type: 'text' },
    { key: 'byWhen', label: 'By when?', ph: 'e.g. by the end of this year', type: 'text' },
    { key: 'whatFor', label: 'Why does this matter to you?', ph: 'e.g. so I can feel free and fully present', type: 'text' },
    { key: 'howChange', label: 'How will achieving this change your life?', ph: 'e.g. I will feel proud, calm, and fully alive', type: 'textarea' },
  ]
}

function generic(f: Form, flow: string, haveIt: string, oldT: string, newT: string, actions: string[], gratitude: string, scene: string): Built {
  const goal = v(f, 'goal') || 'what I truly desire'
  return {
    statement: `I am so happy and grateful now that ${goal} is mine. ${flow}`,
    haveIt, oldThought: oldT, newThought: newT, actions, gratitude, scene,
    physical: `${goal} — real, present, and specific. Picture the exact moment it becomes true.`,
  }
}

type Stage = 'clarity' | 'conviction' | 'process'

export default function FMBPage() {
  const [stage, setStage] = useState<Stage>('clarity')
  const [form, setForm] = useState<Form>({ name: '', category: '', conviction: 7 })

  const set = (k: string, val: string | number) => setForm(f => ({ ...f, [k]: val }))
  const cfg = form.category ? CONFIG[form.category] : null
  const built = cfg ? cfg.build(form) : null
  const primaryKey = form.category === 'money' ? 'amount' : 'goal'
  const hasEnough = !!form.category && (!!v(form, primaryKey) || !!v(form, 'whatFor'))

  // ---------- STEP 1 — CLARITY ----------
  if (stage === 'clarity') return (
    <Shell step={1}>
      <SectionTitle title="Get clear on what you want" sub="Manifestation begins with absolute clarity. Pick a category, fill in your details, and we'll build your personalized statement." />
      <Block label="Your Name">
        <input value={String(form.name)} onChange={e => set('name', e.target.value)} placeholder="Enter your name" style={inputStyle} />
      </Block>
      <Block label="What do you want to manifest?">
        <div className="grid grid-cols-3 gap-2">
          {Object.values(CONFIG).map(c => {
            const on = form.category === c.id
            return (
              <button key={c.id} onClick={() => set('category', c.id)}
                style={{ padding: '14px 8px', borderRadius: 12, border: `1px solid ${on ? '#2563EB' : 'rgba(199,205,214,0.12)'}`, background: on ? 'rgba(37,99,235,0.18)' : 'rgba(13,42,74,0.3)', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center' }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{c.emoji}</div>
                <div style={{ ...S, fontSize: 12, fontWeight: on ? 700 : 500, color: on ? '#F8FAFC' : 'rgba(199,205,214,0.7)' }}>{c.label}</div>
              </button>
            )
          })}
        </div>
      </Block>

      {cfg && (
        <Block label={`${cfg.label} Details`}>
          <div className="flex flex-col gap-4">
            {cfg.fields.map(fl => (
              <div key={fl.key}>
                <div style={{ ...S, fontSize: 12, fontWeight: 600, color: '#C7CDD6', marginBottom: 6 }}>{fl.label}</div>
                {fl.type === 'textarea'
                  ? <textarea value={String(form[fl.key] || '')} onChange={e => set(fl.key, e.target.value)} rows={2} placeholder={fl.ph} style={{ ...fieldStyle, resize: 'none', lineHeight: 1.6 }} />
                  : <input value={String(form[fl.key] || '')} onChange={e => set(fl.key, fl.type === 'number' ? e.target.value.replace(/[^0-9]/g, '') : e.target.value)} inputMode={fl.type === 'number' ? 'numeric' : undefined} placeholder={fl.ph} style={fieldStyle} />}
              </div>
            ))}
          </div>
        </Block>
      )}

      {hasEnough && built && (
        <div className="rounded-2xl p-5" style={{ background: '#081F3A', border: '1px solid rgba(37,99,235,0.4)' }}>
          <div style={{ ...B, fontSize: 11, letterSpacing: '0.2em', color: '#EAB308', marginBottom: 8 }}>YOUR STATEMENT</div>
          <p style={{ ...M, fontWeight: 700, fontStyle: 'italic', fontSize: 16, lineHeight: 1.5, color: '#F8FAFC' }}>{built.statement}</p>
        </div>
      )}

      <button onClick={() => setStage('conviction')} disabled={!v(form, 'name') || !hasEnough} className="btn-primary"
        style={{ width: '100%', padding: '16px', borderRadius: 14, fontSize: 15, letterSpacing: '0.06em', opacity: (!v(form, 'name') || !hasEnough) ? 0.5 : 1 }}>
        TEST YOUR CONVICTION →
      </button>
    </Shell>
  )

  // ---------- STEP 2 — CONVICTION ----------
  if (stage === 'conviction') return (
    <Shell step={2}>
      <SectionTitle title="Conviction Test" sub="Your belief determines your results. Rate how convinced you are that this will happen for you." />
      {built && (
        <div className="rounded-2xl p-5" style={{ background: '#081F3A', border: '1px solid rgba(37,99,235,0.4)' }}>
          <p style={{ ...M, fontWeight: 700, fontStyle: 'italic', fontSize: 16, lineHeight: 1.5, color: '#F8FAFC' }}>{built.statement}</p>
        </div>
      )}
      <div>
        <div style={{ ...M, fontWeight: 700, fontSize: 15, color: '#F8FAFC', textAlign: 'center' }}>How convinced are you this will happen?</div>
        <div style={{ ...S, fontSize: 12, color: 'rgba(199,205,214,0.5)', textAlign: 'center', marginTop: 4 }}>1 = Not at all  ·  10 = Absolutely certain</div>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {Array.from({ length: 10 }, (_, i) => i + 1).map(n => {
            const on = form.conviction === n
            return (
              <button key={n} onClick={() => set('conviction', n)}
                style={{ width: 44, height: 44, borderRadius: 12, ...M, fontWeight: 800, fontSize: 15, cursor: 'pointer', transition: 'all 0.15s',
                  border: `1px solid ${on ? '#EAB308' : 'rgba(199,205,214,0.15)'}`,
                  background: on ? 'rgba(234,179,8,0.15)' : 'rgba(13,42,74,0.3)',
                  color: on ? '#EAB308' : 'rgba(199,205,214,0.6)' }}>
                {n}
              </button>
            )
          })}
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setStage('clarity')} style={{ ...S, fontSize: 14, padding: '14px 18px', borderRadius: 14, border: '1px solid rgba(199,205,214,0.15)', color: '#C7CDD6', background: 'transparent', cursor: 'pointer' }}>← Back</button>
        <button onClick={() => setStage('process')} className="btn-primary" style={{ flex: 1, padding: '16px', borderRadius: 14, fontSize: 15, letterSpacing: '0.06em' }}>SEE YOUR PROCESS →</button>
      </div>
    </Shell>
  )

  // ---------- STEP 3 — YOUR PROCESS ----------
  const p = built!
  const stmt = p.statement
  return (
    <Shell step={3}>
      <div className="mb-2 flex justify-between items-center">
        <p style={{ ...S, fontSize: 13, color: '#C7CDD6' }}>{v(form, 'name') ? `${v(form, 'name')} · ` : ''}{cfg?.label}</p>
        <button onClick={() => setStage('clarity')} style={{ ...S, fontSize: 12, border: '1px solid rgba(199,205,214,0.15)', borderRadius: 10, padding: '8px 16px', color: '#C7CDD6', background: 'transparent', cursor: 'pointer' }}>Start Over</button>
      </div>

      {/* Meditation audio — front and center */}
      <div className="glass rounded-2xl p-5" style={{ borderColor: 'rgba(37,99,235,0.35)' }}>
        <div style={{ ...M, fontWeight: 800, fontSize: 17, color: '#F8FAFC' }}>🎧 Get centered first</div>
        <p style={{ ...S, fontSize: 13, color: '#C7CDD6', marginTop: 4, lineHeight: 1.5, marginBottom: 12 }}>Press play, settle into a calm state, then move through your process. Pick whatever helps you focus.</p>
        <SoundPlayer />
      </div>

      <ProcessStep n={1} title="Know What You Want">
        <Para>The first step in manifestation is absolute clarity. When your desire is vague, you get vague results. You've declared exactly what you want:</Para>
        <Quote>{stmt}</Quote>
        <Para>Say it. Mean it. This is the seed everything else grows from.</Para>
      </ProcessStep>

      <ProcessStep n={2} title="You Already Have It">
        <Para>The most powerful shift is moving from <em>wanting</em> to <em>having</em>. Your brain can't fully tell the difference between a vividly imagined experience and a real one. Speak and think as if this is already true:</Para>
        <Quote>{p.haveIt}</Quote>
        <Para>Write this statement by hand every morning before your day starts. Speak it aloud with full feeling. The more emotion you attach to it, the more powerfully it anchors in.</Para>
      </ProcessStep>

      <ProcessStep n={3} title="Your Visualization Practice">
        <Para>Visualization isn't daydreaming — it's deliberate mental rehearsal. Your brain fires the same pathways whether you live something or vividly imagine it.</Para>
        <Para><strong style={{ color: '#F8FAFC' }}>The most powerful technique:</strong> picture someone you deeply love looking you in the eyes and congratulating you for achieving exactly this. Hear their voice. See the pride on their face. Feel the warmth of that moment. Emotion is the engine.</Para>
        <Para><strong style={{ color: '#F8FAFC' }}>Your scene:</strong> {p.scene} Make it vivid, colorful, and emotional. Practice 5–10 minutes every morning right after waking, when your mind is most receptive.</Para>
      </ProcessStep>

      <ProcessStep n={4} title="Get Into Your Frequency">
        <Para>You don't attract what you want — you attract what you are. Gratitude, joy, and confidence align you with the outcomes you're after.</Para>
        <Para><strong style={{ color: '#F8FAFC' }}>Your ritual:</strong> {p.gratitude}</Para>
        <Para>Protect your energy. Limit time with people, content, or situations that drain you — your frequency is your most important asset.</Para>
      </ProcessStep>

      <ProcessStep n={5} title="Lower the Importance">
        <Para>The more desperate you are, the more you push it away. The goal is to want this fully without <em>needing</em> it for your happiness.</Para>
        <Para style={{ color: 'rgba(199,205,214,0.5)' }}><strong>Old thought:</strong> “{p.oldThought}”</Para>
        <Quote>“{p.newThought}”</Quote>
      </ProcessStep>

      <ProcessStep n={6} title="Your Inspired Actions">
        <Para>Manifestation without action is fantasy. But inspired action comes from alignment, not desperation. Your three:</Para>
        {p.actions.map((a, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span style={{ ...M, fontWeight: 800, color: '#60a5fa', fontSize: 14 }}>{i + 1}</span>
            <span style={{ ...S, fontSize: 14, color: '#F8FAFC', lineHeight: 1.55 }}>{a}</span>
          </div>
        ))}
        <Para>Act on at least one within 24 hours. Motion creates momentum.</Para>
      </ProcessStep>

      <ProcessStep n={7} title="The Underlying Feeling">
        <Para>You're not really manifesting a thing — you're manifesting a feeling. The goal, the money, the relationship — they're vehicles for an emotional state you want to live in: freedom, security, confidence, peace.</Para>
        <Para><strong style={{ color: '#F8FAFC' }}>The loop technique:</strong></Para>
        <Para>1. Get completely calm — meditate 5–30 minutes until your mind is a still lake. Don't rush this.<br />2. Choose someone you deeply love as your anchor.<br />3. Picture them looking you in the eyes, congratulating you on the exact realization of this. Hear their voice, see their face, feel the joy.<br />4. Loop that same scene continuously — don't switch, don't add new scenes.<br />5. Keep going until it feels almost overwhelming — that emotional saturation is the signal. Then stop.</Para>
        <Para>It should feel effortless. If it feels forced, you haven't reached deep enough calm — return to the meditation and try again. The calm state is everything.</Para>
      </ProcessStep>

      <ProcessStep n={8} title="The Physical Manifestation">
        <Para>This is what you're calling into reality — not just an idea, but a real, specific outcome:</Para>
        <Quote>{p.physical}</Quote>
        <Para>Get as specific as possible. The subconscious loves detail. Write it down, find a photo, make it real in your mind first.</Para>
      </ProcessStep>

      <ProcessStep n={9} title="Release & Trust">
        <Para>This is the step most people skip — and where it lives or dies. After the inner work, let go of the <em>how</em>. There are more pathways to your desire than your mind can conceive. Signs of attachment: constantly checking for results, worrying about timing, forcing outcomes.</Para>
        <Quote>“I have planted the seed. I water it with belief, gratitude, and action. I trust the harvest to arrive at exactly the right time.”</Quote>
      </ProcessStep>

      <div className="glass rounded-2xl p-5">
        <div style={{ ...M, fontWeight: 800, fontSize: 18, color: '#F8FAFC', marginBottom: 4 }}>Your Daily Protocol</div>
        <Para>Manifestation is a daily practice, not a one-time event. Consistency is the whole game.</Para>
        <div style={{ marginTop: 12 }}>
          <ProtoHead>Every Morning (15–40 min)</ProtoHead>
          <Para>Speak your statement aloud before you touch your phone. Meditate to stillness (5–30 min). Run the visualization loop until it feels emotionally full, then stop. Hand-write your “I have it” statement once, slowly, with feeling.</Para>
          <ProtoHead>Throughout the Day</ProtoHead>
          <Para>Catch desperate thinking and return to: “{p.newThought}” Take one inspired action from alignment. Celebrate every small related win as evidence it's in motion.</Para>
          <ProtoHead>Every Evening</ProtoHead>
          <Para>Write 3 gratitudes tied to your desire. Plan tomorrow's one step. Close with: “I've done my work today. I trust it is enough. I release the outcome and I rest.”</Para>
        </div>
        <Para style={{ marginTop: 10, color: 'rgba(199,205,214,0.6)' }}>Follow this for at least 30 consecutive days. Don't evaluate results before then — just show up and trust the process.</Para>
      </div>

      <p style={{ ...S, fontSize: 11, color: 'rgba(199,205,214,0.35)', lineHeight: 1.5, textAlign: 'center' }}>A mindset and focus practice — for reflection and motivation, not a guarantee of outcomes.</p>
    </Shell>
  )
}

// ---------- Layout ----------
function Shell({ step, children }: { step: number; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-5">
        <div style={{ ...B, fontSize: 11, letterSpacing: '0.25em', color: '#2563EB', marginBottom: 4 }}>FORTIVA</div>
        <h1 style={{ ...M, fontWeight: 900, fontSize: 30, letterSpacing: '0.04em', color: '#F8FAFC', lineHeight: 1 }}>MANIFEST BLUEPRINT</h1>
      </div>
      <Stepper step={step} />
      <div className="flex flex-col gap-5">{children}</div>
    </div>
  )
}

function Stepper({ step }: { step: number }) {
  const steps = ['Clarity', 'Conviction', 'Your Process']
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {steps.map((label, i) => {
        const n = i + 1, active = n === step, done = n < step
        return (
          <div key={label} className="flex items-center gap-2">
            <div className="flex flex-col items-center" style={{ minWidth: 72 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', ...M, fontWeight: 800, fontSize: 13,
                background: active || done ? '#2563EB' : 'rgba(199,205,214,0.1)', color: active || done ? '#fff' : 'rgba(199,205,214,0.5)', border: active ? '2px solid #60a5fa' : 'none' }}>
                {done ? '✓' : n}
              </div>
              <div style={{ ...S, fontSize: 10, marginTop: 4, color: active ? '#F8FAFC' : 'rgba(199,205,214,0.4)', textAlign: 'center' }}>{label}</div>
            </div>
            {i < steps.length - 1 && <div style={{ width: 24, height: 1, background: 'rgba(199,205,214,0.2)', marginBottom: 16 }} />}
          </div>
        )
      })}
    </div>
  )
}

function SectionTitle({ title, sub }: { title: string; sub: string }) {
  return (
    <div>
      <h2 style={{ ...M, fontWeight: 800, fontSize: 20, color: '#F8FAFC', lineHeight: 1.2 }}>{title}</h2>
      <p style={{ ...S, fontSize: 13, color: '#C7CDD6', marginTop: 6, lineHeight: 1.5 }}>{sub}</p>
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

function ProcessStep({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-3">
        <div style={{ width: 30, height: 30, borderRadius: '50%', flexShrink: 0, background: 'rgba(37,99,235,0.15)', color: '#60a5fa', display: 'flex', alignItems: 'center', justifyContent: 'center', ...M, fontWeight: 800, fontSize: 14, border: '1px solid rgba(37,99,235,0.3)' }}>{n}</div>
        <div style={{ ...M, fontWeight: 800, fontSize: 17, color: '#F8FAFC' }}>{title}</div>
      </div>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  )
}

function Para({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <p style={{ ...S, fontSize: 14, color: '#C7CDD6', lineHeight: 1.65, ...style }}>{children}</p>
}

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-4" style={{ background: 'rgba(8,31,58,0.6)', border: '1px solid rgba(37,99,235,0.3)' }}>
      <p style={{ ...S, fontSize: 15, color: '#F8FAFC', lineHeight: 1.6, fontStyle: 'italic' }}>{children}</p>
    </div>
  )
}

function ProtoHead({ children }: { children: React.ReactNode }) {
  return <div style={{ ...S, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#60a5fa', marginTop: 14, marginBottom: 4 }}>{children}</div>
}

const inputStyle: React.CSSProperties = { width: '100%', background: 'transparent', color: '#F8FAFC', fontFamily: 'Inter, sans-serif', fontSize: 14, outline: 'none', border: 'none' }
const fieldStyle: React.CSSProperties = { width: '100%', background: 'rgba(13,42,74,0.4)', color: '#F8FAFC', fontFamily: 'Inter, sans-serif', fontSize: 14, outline: 'none', border: '1px solid rgba(199,205,214,0.12)', borderRadius: 10, padding: '10px 12px' }

// ---------- Meditation sound player (free, browser Web Audio) ----------
interface Sound { id: string; name: string; best: string; type: 'binaural' | 'tone'; base?: number; beat?: number; freq?: number; needsHeadphones?: boolean }

const SOUNDS: Sound[] = [
  { id: 'calm', name: 'Deep Calm', best: 'Meditation & getting still', type: 'binaural', base: 200, beat: 6, needsHeadphones: true },
  { id: 'focus', name: 'Focus', best: 'Centering your mind', type: 'binaural', base: 200, beat: 10, needsHeadphones: true },
  { id: 'energize', name: 'Energize', best: 'A confident, high-frequency lift', type: 'binaural', base: 210, beat: 16, needsHeadphones: true },
  { id: 'manifest', name: 'Manifestation · 528 Hz', best: 'Intention-setting & visualization', type: 'tone', freq: 528 },
  { id: 'ground', name: 'Grounding · 432 Hz', best: 'Steady, calm background on any device', type: 'tone', freq: 432 },
  { id: 'clarity', name: 'Clarity · 852 Hz', best: 'Clearing a busy mind — higher, brighter tone', type: 'tone', freq: 852 },
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
      const panR = ctx.createStereoPanner(); panR.pan.value = 1; panR.connect(gain)
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
          <button key={s.id} onClick={() => toggle(s)} className="rounded-xl p-3 text-left w-full"
            style={{ cursor: 'pointer', border: `1px solid ${on ? 'rgba(37,99,235,0.5)' : 'rgba(199,205,214,0.1)'}`, background: on ? 'rgba(37,99,235,0.15)' : 'rgba(13,42,74,0.3)', transition: 'all 0.2s' }}>
            <div className="flex justify-between items-center">
              <div style={{ ...M, fontWeight: 700, fontSize: 14, color: '#F8FAFC' }}>{s.name}</div>
              <span style={{ ...S, fontSize: 12, fontWeight: 600, color: on ? '#2563EB' : 'rgba(199,205,214,0.4)' }}>{on ? '■ Stop' : '▶ Play'}</span>
            </div>
            <div style={{ ...S, fontSize: 12, color: '#C7CDD6', marginTop: 3, lineHeight: 1.5 }}>Best for: {s.best}{s.needsHeadphones ? '  ·  🎧 headphones' : ''}</div>
          </button>
        )
      })}
      <div className="flex items-center gap-3 mt-1">
        <span style={{ ...S, fontSize: 12, color: 'rgba(199,205,214,0.5)' }}>Volume</span>
        <input type="range" min={0} max={0.4} step={0.01} value={vol} onChange={e => setVol(parseFloat(e.target.value))} style={{ flex: 1 }} />
      </div>
    </div>
  )
}
