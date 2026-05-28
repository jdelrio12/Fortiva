import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: 'linear-gradient(180deg, #081F3A 0%, #071426 100%)' }}>
      <div className="flex items-center gap-3 mb-8">
        <div style={{ width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #C7CDD6', background: 'linear-gradient(145deg, #C7CDD6 0%, #9aa3af 40%, #C7CDD6 100%)', color: '#081F3A', fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 16, letterSpacing: '0.05em', borderRadius: 4 }}>FIG</div>
        <div>
          <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 22, letterSpacing: '0.08em', color: '#F8FAFC', lineHeight: 1 }}>FORTIVA</div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 10, letterSpacing: '0.22em', color: '#C7CDD6', marginTop: 2 }}>INSURANCE GROUP</div>
        </div>
      </div>
      <div style={{ height: 1, width: 200, background: 'linear-gradient(90deg, transparent, #C7CDD6, transparent)', opacity: 0.3, marginBottom: 32 }} />
      <SignIn appearance={{ elements: { rootBox: 'w-full max-w-sm', card: 'bg-[#0d2a4a] border border-white/10 shadow-2xl rounded-2xl', headerTitle: 'text-white font-bold', headerSubtitle: 'text-[#C7CDD6]', formFieldLabel: 'text-[#C7CDD6] text-xs font-semibold tracking-wider uppercase', formFieldInput: 'bg-[#081F3A] border-white/10 text-white rounded-lg focus:border-[#2563EB]', formButtonPrimary: 'bg-[#2563EB] hover:bg-[#1d4ed8] font-bold tracking-wide rounded-xl', footerActionLink: 'text-[#2563EB]', identityPreviewText: 'text-white', identityPreviewEditButton: 'text-[#2563EB]' }}} />
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, letterSpacing: '0.15em', color: 'rgba(199,205,214,0.3)', marginTop: 32, textAlign: 'center' }}>
        GUIDANCE YOU TRUST. PROTECTION YOU NEED.
      </p>
    </div>
  )
}
