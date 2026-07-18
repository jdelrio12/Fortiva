'use client'
import { useState } from 'react'

const S = { fontFamily: 'Inter, sans-serif' as const }
const M = { fontFamily: 'Montserrat, sans-serif' as const }
const B = { fontFamily: 'Bebas Neue, sans-serif' as const }

interface Doc { file: string; title: string; desc?: string }
interface Folder { id: string; name: string; emoji: string; color: string; desc: string; docs: Doc[] }

// HOW TO ADD A DOCUMENT:
// 1. Upload the file to the repo under  public/docs/  (GitHub: Add file > Upload files,
//    and type  public/docs/  in front of the filename if the folder does not exist yet).
// 2. Add one line to the matching folder's docs list below:
//      { file: 'exact-file-name.pdf', title: 'What reps see', desc: '' },
//    The file name must match exactly, including capitals and the extension.
//
// HOW TO ADD A NEW FOLDER: copy one whole { id: ... } block, paste it in the list,
// and change the id, name, emoji, color, and desc. It shows up automatically.
const FOLDERS: Folder[] = [
  {
    id: 'meeting', name: 'Meeting Review', emoji: '🗒️', color: '#2563EB',
    desc: 'Notes, recaps, and materials from team meetings.',
    docs: [],
  },
  {
    id: 'sales', name: 'Sales Documents', emoji: '📈', color: '#EAB308',
    desc: 'Forms, fact finders, and everything you use in the field.',
    docs: [],
  },
]

const iconFor = (file: string) => {
  const ext = file.split('.').pop()?.toLowerCase() || ''
  if (ext === 'pdf') return '📕'
  if (['doc', 'docx'].includes(ext)) return '📘'
  if (['xls', 'xlsx', 'csv'].includes(ext)) return '📗'
  if (['ppt', 'pptx'].includes(ext)) return '📙'
  if (['png', 'jpg', 'jpeg'].includes(ext)) return '🖼️'
  return '📄'
}
const extLabel = (file: string) => (file.split('.').pop() || '').toUpperCase()

export default function DocsPage() {
  const [folderId, setFolderId] = useState<string | null>(null)
  const folder = FOLDERS.find(f => f.id === folderId) || null

  // ---------- FOLDER CONTENTS ----------
  if (folder) {
    return (
      <div>
        <button onClick={() => setFolderId(null)} style={{ ...S, fontSize: 12, color: 'rgba(199,205,214,0.5)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 12 }}>‹ Documents</button>
        <div className="mb-5">
          <div style={{ fontSize: 30 }}>{folder.emoji}</div>
          <h1 style={{ ...M, fontWeight: 900, fontSize: 26, letterSpacing: '0.03em', color: '#F8FAFC', marginTop: 4 }}>{folder.name}</h1>
          <p style={{ ...S, fontSize: 13, color: '#C7CDD6', marginTop: 4 }}>{folder.desc}</p>
        </div>

        {folder.docs.length === 0 ? (
          <div className="glass rounded-2xl p-6 text-center">
            <div style={{ fontSize: 28, marginBottom: 8 }}>📂</div>
            <div style={{ ...S, fontSize: 14, color: '#C7CDD6' }}>Documents coming soon.</div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 stagger">
            {folder.docs.map(d => (
              <a key={d.file} href={`/docs/${d.file}`} target="_blank" rel="noopener noreferrer" download
                className="glass rounded-2xl p-4 w-full" style={{ textDecoration: 'none', display: 'block', border: '1px solid rgba(199,205,214,0.1)' }}>
                <div className="flex items-center gap-3">
                  <div style={{ fontSize: 26, lineHeight: 1 }}>{iconFor(d.file)}</div>
                  <div className="flex-1" style={{ minWidth: 0 }}>
                    <div style={{ ...M, fontWeight: 700, fontSize: 15, color: '#F8FAFC', lineHeight: 1.3 }}>{d.title}</div>
                    {d.desc ? <div style={{ ...S, fontSize: 12, color: 'rgba(199,205,214,0.6)', marginTop: 3 }}>{d.desc}</div> : null}
                    <div style={{ ...S, fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', color: 'rgba(199,205,214,0.4)', marginTop: 5 }}>{extLabel(d.file)}</div>
                  </div>
                  <div style={{ color: '#2563EB', fontSize: 18 }}>⬇</div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    )
  }

  // ---------- HOME ----------
  return (
    <div>
      <div className="mb-6">
        <div style={{ ...B, fontSize: 11, letterSpacing: '0.25em', color: '#2563EB', marginBottom: 4 }}>FORTIVA</div>
        <h1 style={{ ...M, fontWeight: 900, fontSize: 30, letterSpacing: '0.04em', color: '#F8FAFC', lineHeight: 1 }}>DOCUMENTS</h1>
        <p style={{ color: '#C7CDD6', fontSize: 13, marginTop: 6 }}>Everything you need to download, in one place.</p>
      </div>

      <div className="flex flex-col gap-3 stagger">
        {FOLDERS.map(f => (
          <button key={f.id} onClick={() => setFolderId(f.id)} className="glass rounded-2xl p-5 text-left w-full" style={{ cursor: 'pointer', border: `1px solid ${f.color}33` }}>
            <div className="flex items-center gap-4">
              <div style={{ fontSize: 30, lineHeight: 1 }}>{f.emoji}</div>
              <div className="flex-1">
                <div style={{ ...M, fontWeight: 800, fontSize: 18, color: '#F8FAFC' }}>{f.name}</div>
                <div style={{ ...S, fontSize: 13, color: '#C7CDD6', marginTop: 4, lineHeight: 1.5 }}>{f.desc}</div>
                <div style={{ ...S, fontSize: 11, color: 'rgba(199,205,214,0.45)', marginTop: 6 }}>{f.docs.length} {f.docs.length === 1 ? 'document' : 'documents'}</div>
              </div>
              <div style={{ color: 'rgba(199,205,214,0.3)', fontSize: 22 }}>›</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
