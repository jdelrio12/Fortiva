'use client'
import { useState } from 'react'

const PRODUCT_TYPES = ['Final Expense', 'Mortgage Protection', 'Medicare', 'Life Insurance']
const COMMON_OBJECTIONS = [
  "I can't afford it right now.",
  "I need to talk to my spouse.",
  "I already have insurance.",
  "I'm not interested.",
  "Just send me something in the mail.",
  "I need to think about it.",
  "I don't believe in life insurance.",
  "I'm too healthy to need this.",
]

interface Result {
  bestRebuttal: string
  whyItWorks: string
  alternateRebuttal: string
  followUpClose: string
}

export default function ObjectionsPage() {
  const [objection, setObjection] = useState('')
  const [product, setProduct] = useState('Final Expense')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const [error, setError] = useState<string | null>(null)

  const submit = async () => {
    if (!objection.trim()) return
    setLoading(true); setResult(null); setError(null)
    try {
      const res = await fetch('/api/objection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ objection, productType: product }),
      })
      const json = await res.json()
      if (json.error) throw new Error(json.error)
      setResult(json)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 11, letterSpacing: '0.25em', color: '#2563EB', marginBottom: 4 }}>FORTIVA INSURANCE GROUP</div>
        <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 32, letterSpacing: '0.04em', color: '#F8FAFC', lineHeight: 1 }}>OBJECTION TRAINER</h1>
        <p style={{ color: '#C7CDD6', fontSize: 13, marginTop: 6 }}>Type any objection — Claude coaches you in real time</p>
      </div>

      {/* Product selector */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5" style={{ scrollbarWidth: 'none' }}>
        {PRODUCT_TYPES.map(p => (
          <button key={p} onClick={() => setProduct(p)}
            style={{
              flexShrink: 0,
              fontFamily: 'Inter, sans-serif',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '8px 14px',
              borderRadius: 8,
              border: `1px solid ${product === p ? '#2563EB' : 'rgba(199,205,214,0.1)'}`,
              color: product === p ? '#2563EB' : 'rgba(199,205,214,0.4)',
              background: product === p ? 'rgba(37,99,235,0.12)' : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}>
            {p}
          </button>
        ))}
      </div>

      {/* Quick objections */}
      <div className="mb-5">
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(199,205,214,0.35)', marginBottom: 10 }}>Common Objections — tap to fill</p>
        <div className="flex flex-wrap gap-2">
          {COMMON_OBJECTIONS.map(q => (
            <button key={q} onClick={() => { setObjection(q); setResult(null) }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                fontWeight: 500,
                padding: '7px 12px',
                borderRadius: 8,
                border: '1px solid rgba(199,205,214,0.1)',
                color: 'rgba(199,205,214,0.5)',
                background: 'rgba(13,42,74,0.4)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}>
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="glass rounded-2xl p-4 mb-4">
        <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(199,205,214,0.5)', display: 'block', marginBottom: 8 }}>
          Customer Objection
        </label>
        <textarea
          value={objection}
          onChange={e => setObjection(e.target.value)}
          placeholder='Type what the customer said, e.g. "I need to think about it."'
          rows={3}
          style={{ width: '100%', background: 'transparent', color: '#F8FAFC', fontFamily: 'Inter, sans-serif', fontSize: 15, resize: 'none', outline: 'none', lineHeight: 1.6 }}
          onKeyDown={e => { if (e.key === 'Enter' && e.metaKey) submit() }}
        />
        <div className="flex justify-between items-center mt-3 pt-3" style={{ borderTop: '1px solid rgba(199,205,214,0.08)' }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(199,205,214,0.3)' }}>⌘ + Enter to submit</span>
          <button
            onClick={submit}
            disabled={loading || !objection.trim()}
            className="btn-primary"
            style={{ padding: '10px 20px', borderRadius: 10, fontSize: 13 }}
          >
            {loading ? 'Analyzing…' : 'Get Rebuttal →'}
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center gap-4 py-16" style={{ color: '#C7CDD6' }}>
          <div className="spinner" />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14 }}>Claude is crafting your rebuttals…</span>
        </div>
      )}

      {error && (
        <div className="glass rounded-2xl p-4" style={{ borderColor: 'rgba(239,68,68,0.2)' }}>
          <p style={{ color: '#f87171', fontSize: 14 }}>{error}</p>
          <p style={{ color: 'rgba(199,205,214,0.4)', fontSize: 12, marginTop: 4 }}>Make sure ANTHROPIC_API_KEY is set in .env.local</p>
        </div>
      )}

      {result && (
        <div className="flex flex-col gap-4 stagger">
          <ResultCard emoji="💬" color="#2563EB" label="Best Rebuttal" text={result.bestRebuttal} />
          <ResultCard emoji="🧠" color="#C7CDD6" label="Why It Works" text={result.whyItWorks} small />
          <ResultCard emoji="🔄" color="#94a3b8" label="Alternate Rebuttal" text={result.alternateRebuttal} />
          <ResultCard emoji="🎯" color="#60a5fa" label="Follow-Up Close" text={result.followUpClose} />
        </div>
      )}
    </div>
  )
}

function ResultCard({ emoji, color, label, text, small }: { emoji: string; color: string; label: string; text: string; small?: boolean }) {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  return (
    <div className="glass rounded-2xl p-4" style={{ borderColor: `${color}20` }}>
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <span>{emoji}</span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color }}>{label}</span>
        </div>
        <button onClick={copy} style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(199,205,214,0.4)', background: 'none', border: 'none', cursor: 'pointer' }}>
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: small ? 13 : 15, color: '#F8FAFC', lineHeight: 1.65 }}>{text}</p>
    </div>
  )
}
