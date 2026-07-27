'use client'
import { useState } from 'react'

const S = { fontFamily: 'Inter, sans-serif' as const }
const M = { fontFamily: 'Montserrat, sans-serif' as const }
const B = { fontFamily: 'Bebas Neue, sans-serif' as const }

interface Vid { id: string; title: string; desc?: string }
interface Lib { id: string; name: string; emoji: string; color: string; desc: string; videos: Vid[] }

// HOW TO ADD A VIDEO: add one line to the matching library's videos list below.
//   { id: 'YOUTUBE_ID', title: 'Video title', desc: '' },
// The YOUTUBE_ID is the part after v= in the YouTube link.
//
// HOW TO ADD A NEW FOLDER: copy one whole { id: ... } block below, paste it in the
// list, and change the id, name, emoji, color, and desc. It shows up automatically.
const LIBRARIES: Lib[] = [
  {
    id: 'inner', name: 'Inner Game', emoji: '🧠', color: '#EAB308',
    desc: 'Mindset, confidence, and the work behind the work.',
    videos: [],
  },
  {
    id: 'sales', name: 'Sales', emoji: '📈', color: '#2563EB',
    desc: 'Scripts, closing, and real training calls.',
    videos: [
      { id: 'McmBsH1Euvc', title: '10 Competitive Advantages of Phone Sales', desc: '' },
      { id: 'pMsf80GhjtQ', title: 'Tonality, the Music Behind Your Words', desc: '' },
      { id: 'dTl9tAfOZhc', title: 'Mastering the Conversation', desc: '' },
    ],
  },
  {
    id: 'national', name: 'National Calls', emoji: '📡', color: '#60a5fa',
    desc: 'Recordings from company-wide calls and team trainings.',
    videos: [
      { id: 'ZzlQRicLGL4', title: 'Training: Jason Fuller and Gil', desc: '' },
    ],
  },
]

export default function UniversityPage() {
  const [libId, setLibId] = useState<string | null>(null)
  const [vid, setVid] = useState<Vid | null>(null)
  const lib = LIBRARIES.find(l => l.id === libId) || null

  // ---------- VIDEO PLAYER ----------
  if (lib && vid) {
    return (
      <div>
        <button onClick={() => setVid(null)} style={{ ...S, fontSize: 12, color: 'rgba(199,205,214,0.5)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 12 }}>‹ {lib.name}</button>
        <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', borderRadius: 14, overflow: 'hidden', background: '#000', border: '1px solid rgba(199,205,214,0.1)' }}>
          <iframe
            src={`https://www.youtube.com/embed/${vid.id}?rel=0`}
            title={vid.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
          />
        </div>
        <h2 style={{ ...M, fontWeight: 800, fontSize: 18, color: '#F8FAFC', marginTop: 14 }}>{vid.title}</h2>
        {vid.desc ? <p style={{ ...S, fontSize: 13, color: '#C7CDD6', marginTop: 6, lineHeight: 1.55 }}>{vid.desc}</p> : null}
      </div>
    )
  }

  // ---------- LIBRARY LIST ----------
  if (lib) {
    return (
      <div>
        <button onClick={() => setLibId(null)} style={{ ...S, fontSize: 12, color: 'rgba(199,205,214,0.5)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 12 }}>‹ Fortiva University</button>
        <div className="mb-5">
          <div style={{ fontSize: 30 }}>{lib.emoji}</div>
          <h1 style={{ ...M, fontWeight: 900, fontSize: 26, letterSpacing: '0.03em', color: '#F8FAFC', marginTop: 4 }}>{lib.name}</h1>
          <p style={{ ...S, fontSize: 13, color: '#C7CDD6', marginTop: 4 }}>{lib.desc}</p>
        </div>

        {lib.videos.length === 0 ? (
          <div className="glass rounded-2xl p-6 text-center">
            <div style={{ fontSize: 28, marginBottom: 8 }}>🎬</div>
            <div style={{ ...S, fontSize: 14, color: '#C7CDD6' }}>More videos coming soon.</div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 stagger">
            {lib.videos.map(v => (
              <button key={v.id} onClick={() => setVid(v)} className="glass rounded-2xl overflow-hidden text-left w-full" style={{ cursor: 'pointer', padding: 0, border: '1px solid rgba(199,205,214,0.1)' }}>
                <div style={{ position: 'relative' }}>
                  <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} style={{ width: '100%', display: 'block', aspectRatio: '16 / 9', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(8,31,58,0.25)' }}>
                    <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(37,99,235,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.4)' }}>
                      <span style={{ color: '#fff', fontSize: 20, marginLeft: 3 }}>▶</span>
                    </div>
                  </div>
                </div>
                <div style={{ padding: '12px 14px' }}>
                  <div style={{ ...M, fontWeight: 700, fontSize: 15, color: '#F8FAFC', lineHeight: 1.3 }}>{v.title}</div>
                  {v.desc ? <div style={{ ...S, fontSize: 12, color: 'rgba(199,205,214,0.6)', marginTop: 4 }}>{v.desc}</div> : null}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  // ---------- HOME (library folders) ----------
  return (
    <div>
      <div className="mb-6">
        <div style={{ ...B, fontSize: 11, letterSpacing: '0.25em', color: '#2563EB', marginBottom: 4 }}>FORTIVA</div>
        <h1 style={{ ...M, fontWeight: 900, fontSize: 30, letterSpacing: '0.04em', color: '#F8FAFC', lineHeight: 1 }}>FORTIVA UNIVERSITY</h1>
        <p style={{ color: '#C7CDD6', fontSize: 13, marginTop: 6 }}>Your training library. Sharpen your skills and your mindset.</p>
      </div>

      <div className="flex flex-col gap-3 stagger">
        {LIBRARIES.map(l => (
          <button key={l.id} onClick={() => setLibId(l.id)} className="glass rounded-2xl p-5 text-left w-full" style={{ cursor: 'pointer', border: `1px solid ${l.color}33` }}>
            <div className="flex items-center gap-4">
              <div style={{ fontSize: 30, lineHeight: 1 }}>{l.emoji}</div>
              <div className="flex-1">
                <div style={{ ...M, fontWeight: 800, fontSize: 18, color: '#F8FAFC' }}>{l.name}</div>
                <div style={{ ...S, fontSize: 13, color: '#C7CDD6', marginTop: 4, lineHeight: 1.5 }}>{l.desc}</div>
                <div style={{ ...S, fontSize: 11, color: 'rgba(199,205,214,0.45)', marginTop: 6 }}>{l.videos.length} {l.videos.length === 1 ? 'video' : 'videos'}</div>
              </div>
              <div style={{ color: 'rgba(199,205,214,0.3)', fontSize: 22 }}>›</div>
            </div>
          </button>
        ))}
      </div>

      <p style={{ ...S, fontSize: 11, color: 'rgba(199,205,214,0.3)', marginTop: 18, textAlign: 'center', lineHeight: 1.5 }}>
        More courses coming. Keep learning.
      </p>
    </div>
  )
}
