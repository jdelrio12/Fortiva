'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { href: '/leaderboard', label: 'Leaderboard', icon: '🏆' },
  { href: '/scripts',     label: 'Scripts',     icon: '📋' },
  { href: '/objections',  label: 'Objections',  icon: '🛡' },
  { href: '/roleplay',    label: 'Role Play',   icon: '🤖' },
]

export default function Nav() {
  const path = usePathname()

  return (
    <>
      {/* Top Header */}
      <header className="relative z-20 border-b glass-dark" style={{ borderColor: 'rgba(199,205,214,0.1)' }}>
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* FIG Badge + Wordmark */}
          <div className="flex items-center gap-3">
            <div
              className="fig-badge rounded-sm"
              style={{ width: 42, height: 42, fontSize: 14 }}
            >
              FIG
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 900,
                  fontSize: 18,
                  letterSpacing: '0.08em',
                  lineHeight: 1,
                  color: '#F8FAFC',
                }}
              >
                FORTIVA
              </div>
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: 9,
                  letterSpacing: '0.22em',
                  color: '#C7CDD6',
                  marginTop: 2,
                }}
              >
                INSURANCE GROUP
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 9,
              letterSpacing: '0.15em',
              color: 'rgba(199,205,214,0.5)',
              textAlign: 'right',
              lineHeight: 1.4,
            }}
          >
            GUIDANCE YOU TRUST.<br />PROTECTION YOU NEED.
          </div>
        </div>

        {/* Silver divider line like the logo */}
        <div className="divider" />
      </header>

      {/* Bottom Nav */}
      <nav
        className="fixed bottom-0 inset-x-0 z-50 glass-dark border-t"
        style={{ borderColor: 'rgba(199,205,214,0.1)' }}
      >
        <div className="flex items-stretch max-w-2xl mx-auto">
          {tabs.map((tab) => {
            const active = path.startsWith(tab.href)
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex-1 flex flex-col items-center gap-1 py-3 transition-colors relative"
                style={{
                  color: active ? '#2563EB' : 'rgba(199,205,214,0.4)',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                <span className="text-lg leading-none">{tab.icon}</span>
                <span>{tab.label}</span>
                {active && (
                  <span
                    className="absolute top-0 inset-x-0 h-0.5 rounded-full"
                    style={{ background: 'linear-gradient(90deg,#1d4ed8,#2563EB,#1d4ed8)' }}
                  />
                )}
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
