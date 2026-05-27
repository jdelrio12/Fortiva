import type { Metadata } from 'next'
import '../styles/globals.css'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Fortiva Insurance Group — Agency Hub',
  description: 'Guidance You Trust. Protection You Need.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-glow">
        <Nav />
        <main className="relative z-10 max-w-2xl mx-auto px-4 pt-6 pb-28">
          {children}
        </main>
      </body>
    </html>
  )
}
