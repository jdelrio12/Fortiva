'use client'
import Link from 'next/link'

const S = { fontFamily: 'Inter, sans-serif' as const }
const M = { fontFamily: 'Montserrat, sans-serif' as const }
const B = { fontFamily: 'Bebas Neue, sans-serif' as const }

const ITEMS = [
  {
    href: '/mentor',
    emoji: '💬',
    title: 'Fortiva Mentor',
    desc: 'Talk it out. Your personal mindset coach for when you are stuck, in your head, or shaking off a rough call. Type or speak, and it talks back.',
  },
  {
    href: '/fmb',
    emoji: '🧭',
    title: 'Manifest Blueprint',
    desc: 'Get clear on what you want, build your daily blueprint and affirmations, and center yourself with the meditation sounds.',
  },
]

export default function GrowthPage() {
  return (
    <div>
      <div className="mb-6">
        <div style={{ ...B, fontSize: 11, letterSpacing: '0.25em', color: '#2563EB', marginBottom: 4 }}>FORTIVA</div>
        <h1 style={{ ...M, fontWeight: 900, fontSize: 30, letterSpacing: '0.04em', color: '#F8FAFC', lineHeight: 1 }}>PERSONAL DEVELOPMENT</h1>
        <p style={{ color: '#C7CDD6', fontSize: 13, marginTop: 6 }}>Sharpen your inner game. The work behind the work.</p>
      </div>

      <div className="flex flex-col gap-3 stagger">
        {ITEMS.map(it => (
          <Link key={it.href} href={it.href} className="glass rounded-2xl p-5 w-full" style={{ textDecoration: 'none', display: 'block' }}>
            <div className="flex items-start gap-4">
              <div style={{ fontSize: 30, lineHeight: 1 }}>{it.emoji}</div>
              <div className="flex-1">
                <div style={{ ...M, fontWeight: 800, fontSize: 18, color: '#F8FAFC' }}>{it.title}</div>
                <div style={{ ...S, fontSize: 13, color: '#C7CDD6', marginTop: 6, lineHeight: 1.55 }}>{it.desc}</div>
              </div>
              <div style={{ color: 'rgba(199,205,214,0.3)', fontSize: 22 }}>›</div>
            </div>
          </Link>
        ))}
      </div>

      <p style={{ ...S, fontSize: 11, color: 'rgba(199,205,214,0.3)', marginTop: 18, textAlign: 'center', lineHeight: 1.5 }}>
        More tools coming. This is your space to grow.
      </p>
    </div>
  )
}
