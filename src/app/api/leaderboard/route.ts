import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SHEET_CSV_URL
  if (!url) {
    return NextResponse.json({ error: 'NEXT_PUBLIC_SHEET_CSV_URL not set in .env.local' }, { status: 500 })
  }

  try {
    const res = await fetch(url, { next: { revalidate: 60 } })
    if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`)
    const csv = await res.text()

    const lines = csv.trim().split('\n').slice(1) // skip header row
    const map: Record<string, number> = {}

    for (const line of lines) {
      // Handle quoted CSV fields robustly
      const parts = line.match(/(".*?"|[^,]+)/g) || []
      if (parts.length < 2) continue
      const name = parts[0].replace(/"/g, '').trim()
      const raw  = parts[1].replace(/[",$\s]/g, '').trim()
      const val  = parseFloat(raw) || 0
      if (!name) continue
      map[name] = (map[name] || 0) + val
    }

    const agents = Object.entries(map)
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => b.total - a.total)

    const grandTotal = agents.reduce((s, a) => s + a.total, 0)

    return NextResponse.json({ agents, grandTotal })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
