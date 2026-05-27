'use client'
import { useEffect, useState, useCallback } from 'react'

interface Agent { name: string; total: number }
interface Data { agents: Agent[]; grandTotal: number }

const MEDALS = ['🥇', '🥈', '🥉']

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString('en-US')
}

export default function LeaderboardPage() {
  const [data, setData] = useState<Data | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/leaderboard')
      const json = await res.json()
      if (json.error) throw new Error(json.error)
      setData(json)
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  return (
    <div>
      {/* Page header */}
      <div className="mb-6">
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 11, letterSpacing: '0.25em', color: '#2563EB', marginBottom: 4 }}>
          FORTIVA INSURANCE GROUP
        </div>
        <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 32, letterSpacing: '0.04em', color: '#F8FAFC', lineHeight: 1 }}>
          AGENT LEADERBOARD
        </h1>
        <p style={{ color: '#C7CDD6', fontSize: 13, marginTop: 6, fontFamily: 'Inter, sans-serif' }}>
          Ranked by total annual premium
        </p>
      </div>

      {/* Total agency card */}
      {data && (
        <div
          className="rounded-2xl p-5 mb-6 flex justify-between items-center"
          style={{
            background: 'linear-gradient(135deg, #1d4ed8 0%, #2563EB 50%, #1e40af 100%)',
            boxShadow: '0 8px 32px rgba(37,99,235,0.4)',
            border: '1px solid rgba(199,205,214,0.15)',
          }}
        >
          <div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 10, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: 6 }}>
              Total Agency Premium
            </div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 36, color: '#fff', letterSpacing: '0.02em', lineHeight: 1 }}>
              {fmt(data.grandTotal)}
            </div>
          </div>
          <div className="text-right">
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 40, color: '#fff', lineHeight: 1 }}>
              {data.agents.length}
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
              Agents
            </div>
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="divider mb-4" />

      {/* Refresh bar */}
      <div className="flex justify-between items-center mb-4">
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.2em', color: '#C7CDD6', textTransform: 'uppercase' }}>
          Rankings
        </span>
        <div className="flex items-center gap-3">
          {lastUpdated && (
            <span style={{ fontSize: 11, color: 'rgba(199,205,214,0.4)', fontFamily: 'Inter, sans-serif' }}>
              Updated {lastUpdated}
            </span>
          )}
          <button
            onClick={load}
            disabled={loading}
            className="transition-colors disabled:opacity-40"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 12,
              fontWeight: 600,
              border: '1px solid rgba(199,205,214,0.15)',
              borderRadius: 8,
              padding: '6px 14px',
              color: '#C7CDD6',
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            ↻ Refresh
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center gap-4 py-20" style={{ color: '#C7CDD6' }}>
          <div className="spinner" />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14 }}>Loading leaderboard…</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="glass rounded-2xl p-6 text-center" style={{ borderColor: 'rgba(239,68,68,0.2)' }}>
          <div className="text-4xl mb-3">⚠️</div>
          <p style={{ color: '#C7CDD6', fontSize: 14 }}>{error}</p>
          <p style={{ color: 'rgba(199,205,214,0.4)', fontSize: 12, marginTop: 8 }}>
            Check that <code style={{ color: '#2563EB' }}>NEXT_PUBLIC_SHEET_CSV_URL</code> is set in <code style={{ color: '#2563EB' }}>.env.local</code>
          </p>
        </div>
      )}

      {/* Board */}
      {data && !loading && (
        <div className="flex flex-col gap-3 stagger">
          {data.agents.map((agent, i) => {
            const pct = data.agents[0]?.total ? (agent.total / data.agents[0].total * 100) : 0
            const rank = i + 1

            const rankStyle =
              i === 0 ? { border: '1px solid rgba(199,205,214,0.35)', background: 'linear-gradient(135deg,#0d2a4a 0%,#112f52 100%)' }
              : i === 1 ? { border: '1px solid rgba(199,205,214,0.2)' }
              : i === 2 ? { border: '1px solid rgba(199,205,214,0.12)' }
              : {}

            const barColor =
              i === 0 ? 'linear-gradient(90deg,#C7CDD6,#9aa3af)'
              : i === 1 ? 'linear-gradient(90deg,#94a3b8,#64748b)'
              : i === 2 ? 'linear-gradient(90deg,#78716c,#57534e)'
              : 'linear-gradient(90deg,#2563EB,#1d4ed8)'

            const rankColor =
              i === 0 ? '#C7CDD6'
              : i === 1 ? '#94a3b8'
              : i === 2 ? '#78716c'
              : 'rgba(199,205,214,0.35)'

            return (
              <div
                key={agent.name}
                className="glass rounded-2xl p-4 flex items-center gap-4"
                style={{ ...rankStyle, transition: 'transform 0.15s ease' }}
              >
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, color: rankColor, minWidth: 28, textAlign: 'center' }}>
                  {rank}
                </div>
                <div className="text-xl min-w-[28px] text-center">{MEDALS[i] ?? ''}</div>
                <div className="flex-1 min-w-0">
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 15, color: '#F8FAFC', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {agent.name}
                  </div>
                  <div style={{ marginTop: 6, height: 3, background: 'rgba(199,205,214,0.08)', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: 99, background: barColor, width: `${pct}%`, transition: 'width 0.8s cubic-bezier(0.16,1,0.3,1)' }} />
                  </div>
                </div>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 18, letterSpacing: '0.02em', whiteSpace: 'nowrap', color: '#F8FAFC' }}>
                  {fmt(agent.total)}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
