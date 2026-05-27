'use client'
import { useState } from 'react'
import { scripts, CATEGORIES, type Category, type Script } from '@/lib/scripts-data'

const CAT_COLORS: Record<Category, string> = {
  'Final Expense':       '#2563EB',
  'Mortgage Protection': '#C7CDD6',
  'Medicare':            '#60a5fa',
  'Life Insurance':      '#94a3b8',
}

function ScriptModal({ script, onClose }: { script: Script; onClose: () => void }) {
  const [tab, setTab] = useState<'opening'|'discovery'|'transition'|'close'|'rebuttals'>('opening')
  const color = CAT_COLORS[script.category]
  const tabs = ['opening','discovery','transition','close','rebuttals'] as const

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: '#071426' }}>
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="sticky top-0 glass-dark border-b px-4 py-4 flex justify-between items-start" style={{ borderColor: 'rgba(199,205,214,0.1)' }}>
          <div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color, marginBottom: 4 }}>{script.category}</div>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, color: '#F8FAFC', fontSize: 18, lineHeight: 1.2 }}>{script.title}</h2>
          </div>
          <button onClick={onClose} style={{ color: '#C7CDD6', fontSize: 24, lineHeight: 1, marginLeft: 16, marginTop: 2, background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto border-b px-4 gap-0" style={{ borderColor: 'rgba(199,205,214,0.08)', scrollbarWidth: 'none' }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{
                flexShrink: 0,
                padding: '12px 12px',
                fontFamily: 'Inter, sans-serif',
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                background: 'none',
                border: 'none',
                borderBottom: tab === t ? `2px solid ${color}` : '2px solid transparent',
                color: tab === t ? color : 'rgba(199,205,214,0.4)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}>
              {t === 'discovery' ? 'Discovery' : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-4 pb-24">
          {tab === 'opening' && <><SectionHead color={color}>Opening Statement</SectionHead><ScriptBox text={script.opening} /></>}
          {tab === 'discovery' && (
            <><SectionHead color={color}>Discovery Questions</SectionHead>
            <div className="flex flex-col gap-3">
              {script.discoveryQuestions.map((q, i) => (
                <div key={i} className="glass rounded-xl p-4 flex gap-3">
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 12, color, marginTop: 2 }}>{i + 1}.</span>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#F8FAFC', lineHeight: 1.6 }}>{q}</p>
                </div>
              ))}
            </div></>
          )}
          {tab === 'transition' && <><SectionHead color={color}>Transition Bridge</SectionHead><ScriptBox text={script.transition} /></>}
          {tab === 'close' && <><SectionHead color={color}>Closing Statement</SectionHead><ScriptBox text={script.close} /></>}
          {tab === 'rebuttals' && (
            <><SectionHead color={color}>Rebuttals</SectionHead>
            <div className="flex flex-col gap-4">
              {script.rebuttals.map((r, i) => (
                <div key={i} className="glass rounded-xl p-4">
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color, marginBottom: 8 }}>Objection {i + 1}</div>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#F8FAFC', fontSize: 15, marginBottom: 12 }}>"{r.objection}"</p>
                  <div style={{ borderTop: '1px solid rgba(199,205,214,0.08)', paddingTop: 12 }}>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(199,205,214,0.4)', marginBottom: 8 }}>Your Response</div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#C7CDD6', lineHeight: 1.6 }}>{r.response}</p>
                  </div>
                </div>
              ))}
            </div></>
          )}
        </div>
      </div>
    </div>
  )
}

function SectionHead({ children, color }: { children: React.ReactNode; color: string }) {
  return <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color, marginBottom: 12 }}>{children}</h3>
}

function ScriptBox({ text }: { text: string }) {
  return (
    <div className="glass rounded-xl p-4">
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#F8FAFC', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{text}</p>
    </div>
  )
}

export default function ScriptsPage() {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All')
  const [openScript, setOpenScript] = useState<Script | null>(null)

  const filtered = activeCategory === 'All' ? scripts : scripts.filter(s => s.category === activeCategory)

  return (
    <div>
      <div className="mb-6">
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 11, letterSpacing: '0.25em', color: '#2563EB', marginBottom: 4 }}>FORTIVA INSURANCE GROUP</div>
        <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 32, letterSpacing: '0.04em', color: '#F8FAFC', lineHeight: 1 }}>SCRIPTS LIBRARY</h1>
        <p style={{ color: '#C7CDD6', fontSize: 13, marginTop: 6 }}>Insurance sales scripts by product line</p>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6" style={{ scrollbarWidth: 'none' }}>
        {(['All', ...CATEGORIES] as const).map(cat => {
          const color = cat === 'All' ? '#2563EB' : CAT_COLORS[cat]
          const active = activeCategory === cat
          return (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{
                flexShrink: 0,
                fontFamily: 'Inter, sans-serif',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '8px 14px',
                borderRadius: 8,
                border: `1px solid ${active ? color : 'rgba(199,205,214,0.1)'}`,
                color: active ? color : 'rgba(199,205,214,0.4)',
                background: active ? `${color}18` : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}>
              {cat}
            </button>
          )
        })}
      </div>

      {/* Script cards */}
      <div className="flex flex-col gap-3 stagger">
        {filtered.map(script => {
          const color = CAT_COLORS[script.category]
          return (
            <button key={script.id} onClick={() => setOpenScript(script)}
              className="glass rounded-2xl p-4 text-left w-full"
              style={{ cursor: 'pointer', transition: 'transform 0.15s ease, box-shadow 0.15s ease' }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color, marginBottom: 6 }}>{script.category}</div>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 16, color: '#F8FAFC' }}>{script.title}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(199,205,214,0.5)', marginTop: 4 }}>{script.opening.slice(0, 90)}…</div>
                </div>
                <div style={{ color: 'rgba(199,205,214,0.3)', fontSize: 20, marginLeft: 12 }}>›</div>
              </div>
              <div className="flex gap-2 mt-3 flex-wrap">
                {['Opening','Discovery','Transition','Close','Rebuttals'].map(label => (
                  <span key={label} style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 4, background: 'rgba(199,205,214,0.06)', color: 'rgba(199,205,214,0.35)', border: '1px solid rgba(199,205,214,0.08)' }}>
                    {label}
                  </span>
                ))}
              </div>
            </button>
          )
        })}
      </div>

      {openScript && <ScriptModal script={openScript} onClose={() => setOpenScript(null)} />}
    </div>
  )
}
