'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'

const tabs = [
  { href: '/leaderboard', label: 'Leaderboard', icon: '🏆' },
  { href: '/scripts',     label: 'Scripts',     icon: '📋' },
  { href: '/objections',  label: 'Objections',  icon: '🛡' },
  { href: '/roleplay',    label: 'Role Play',   icon: '🤖' },
]

export default function Nav() {
  const path = usePathname()
  const isAuthPage = path.startsWith('/sign-in') || path.startsWith('/sign-up')
  if (isAuthPage) return null

  return (
    <>
      <header className="relative z-20 border-b glass-dark" style={{ borderColor: 'rgba(199,205,214,0.1)' }}>
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div style={{ width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #C7CDD6', background: 'linear-gradient(145deg, #C7CDD6 0%, #9aa3af 40%, #C7CDD6 100%)', color: '#081F3A', fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 14, letterSpacing: '0.05em', borderRadius: 4 }}>
              FIG
            </div>
            <div>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 18, letterSpacing: '0.08em', lineHeight: 1, color: '#F8FAFC' }}>FORTIVA</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 9, letterSpacing: '0.22em', color: '#C7CDD6', marginTop: 2 }}>INSURANCE GROUP</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, letterSpacing: '0.15em', color: 'rgba(199,205,214,0.5)', textAlign: 'right', lineHeight: 1.4 }}>
              GUIDANCE YOU TRUST.<br />PROTECTION YOU NEED.
            </div>
            <UserButton afterSignOutUrl="/sign-in" appearance={{ elements: { avatarBox: 'w-8 h-8' } }} />
          </div>
        </div>
        <div className="divider" />
      </header>

      <nav className="fixed bottom-0 inset-x-0 z-50 glass-dark border-t" style={{ borderColor: 'rgba(199,205,214,0.1)' }}>
        <div className="flex items-stretch max-w-2xl mx-auto">
          {tabs.map((tab) => {
            const active = path.startsWith(tab.href)
            return (
              <Link key={tab.href} href={tab.href} className="flex-1 flex flex-col items-center gap-1 py-3 transition-colors relative"
                style={{ color: active ? '#2563EB' : 'rgba(199,205,214,0.4)', fontFamily: 'Inter, sans-serif', fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                <span className="text-lg leading-none">{tab.icon}</span>
                <span>{tab.label}</span>
                {active && <span className="absolute top-0 inset-x-0 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg,#1d4ed8,#2563EB,#1d4ed8)' }} />}
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
