'use client'
import { useState, useEffect } from 'react'

const S = { fontFamily: 'Inter, sans-serif' as const }
const M = { fontFamily: 'Montserrat, sans-serif' as const }
const B = { fontFamily: 'Bebas Neue, sans-serif' as const }

interface Card { q: string; choices: string[]; a: number }
interface Deck { id: string; name: string; emoji: string; color: string; cards: Card[] }

const DECKS: Deck[] = [
  {
    id: "fe", name: "Final Expense", emoji: "\ud83d\udd4a\ufe0f", color: "#2563EB", cards: [
      { q: "What type of policy is final expense insurance?", choices: ["Permanent whole life", "A 20-year term policy", "A rider on homeowners"], a: 0 },
      { q: "What does final expense mainly cover?", choices: ["Funeral, burial, and end-of-life costs", "The full mortgage balance", "Lost wages while disabled"], a: 0 },
      { q: "What happens to final expense premiums over time?", choices: ["They stay locked in and never increase", "They rise every single year", "They reset at age 65"], a: 0 },
      { q: "Does a final expense policy build cash value?", choices: ["Yes, modest cash value over time", "No, never", "Only with a mortgage rider"], a: 0 },
      { q: "\"Day 1 coverage\" on a final expense policy means...", choices: ["Full benefit is available immediately, if eligible", "You wait 10 years for any payout", "It only covers accidents"], a: 0 },
      { q: "Final expense face amounts are usually...", choices: ["Smaller, often $5k to $25k", "Always over $500k", "Equal to the home value"], a: 0 },
      { q: "A big reason clients like final expense is that it...", choices: ["Is simple, affordable, and permanent", "Expires after 10 years", "Pays the lender directly"], a: 0 },
      { q: "Final expense is often a great fit for someone who wants to...", choices: ["Cover burial costs and not burden family", "Insure a brand new car", "Get renters coverage"], a: 0 },
      { q: "A policy where the full benefit starts after a waiting period is called a...", choices: ["Graded benefit", "Deductible", "Premium holiday"], a: 0 },
      { q: "Does final expense expire if premiums are paid?", choices: ["No, it is permanent", "Yes, at age 65", "Yes, after 20 years"], a: 0 },
      { q: "Who receives the final expense payout?", choices: ["The beneficiary you name", "The funeral home only", "The lender"], a: 0 },
      { q: "Can the beneficiary use the money however they choose?", choices: ["Yes, for any purpose", "Only for the casket", "Only for taxes"], a: 0 },
      { q: "Is the death benefit generally taxable to the beneficiary?", choices: ["No, generally income-tax-free", "Yes, fully taxed", "Only if over $1,000"], a: 0 },
      { q: "A main appeal for older clients is that final expense is...", choices: ["Easier to qualify for and affordable", "The most expensive option", "Only for the wealthy"], a: 0 },
      { q: "Compared to a large term policy, final expense premiums are usually...", choices: ["Lower, because the face amount is smaller", "Much higher", "Exactly the same"], a: 0 },
      { q: "What happens if final expense premiums stop being paid?", choices: ["The policy can lapse and coverage ends", "It stays free forever", "It converts to term"], a: 0 },
      { q: "Why set up final expense even with some savings?", choices: ["So loved ones are not forced to drain savings", "Because savings are illegal", "To avoid having a will"], a: 0 },
      { q: "Does final expense lock in at your current age?", choices: ["Yes, waiting usually costs more later", "No, age never matters", "It gets cheaper with age automatically"], a: 0 },
      { q: "Final expense pays the beneficiary as...", choices: ["A lump sum", "Small monthly checks for life", "Store credit"], a: 0 },
      { q: "Final expense can be used for...", choices: ["Either cremation or burial, the family decides", "Burial only", "Cremation only"], a: 0 },
      { q: "A simple way to describe final expense is...", choices: ["A small permanent policy that covers final costs", "A short-term loan", "A homeowners add-on"], a: 0 },
      { q: "Final expense is sometimes called...", choices: ["Burial or funeral insurance", "Gap insurance", "Umbrella insurance"], a: 0 },
      { q: "The biggest benefit clients mention is...", choices: ["Peace of mind for their family", "Earning interest fast", "Avoiding all paperwork"], a: 0 },
      { q: "Final expense coverage amounts are designed to...", choices: ["Match typical end-of-life costs", "Replace 30 years of income", "Pay off any home"], a: 0 },
      { q: "Final expense is best described as which kind of coverage?", choices: ["Permanent, smaller-face whole life", "Large temporary term", "A property policy"], a: 0 },
    ],
  },
  {
    id: "mp", name: "Mortgage Protection", emoji: "\ud83c\udfe0", color: "#60a5fa", cards: [
      { q: "Who does mortgage protection pay out to?", choices: ["You and your family", "The bank", "The home builder"], a: 0 },
      { q: "PMI (private mortgage insurance) protects...", choices: ["The lender, not you", "Your family", "The roof"], a: 0 },
      { q: "Homeowners covers the structure. Mortgage protection covers...", choices: ["The people and the income", "The driveway", "Nothing at all"], a: 0 },
      { q: "Does mortgage protection have to pay off the entire mortgage?", choices: ["No, you can choose an amount", "Yes, always the full balance", "Only the interest"], a: 0 },
      { q: "\"Equity protection\" is...", choices: ["A smaller, affordable plan covering 1 to 2 years of payments", "Coverage for the lawn", "A type of PMI"], a: 0 },
      { q: "Living benefits on mortgage protection can pay out for...", choices: ["Critical illness, chronic illness, disability, terminal illness", "A new car", "Property taxes"], a: 0 },
      { q: "A \"dual-purpose policy\" acts as...", choices: ["Mortgage protection and life insurance in one", "Two separate term policies", "Home plus auto"], a: 0 },
      { q: "If you sell your home and buy a new one, mortgage protection...", choices: ["Can transfer with you", "Disappears instantly", "Goes to the old lender"], a: 0 },
      { q: "Of the three home coverages, the one that protects the family most is...", choices: ["Mortgage protection, it pays them directly", "PMI", "A flood rider"], a: 0 },
      { q: "Mortgage protection guards against losing the home if you...", choices: ["Get sick, become disabled, or pass away", "Repaint it", "Refinance"], a: 0 },
      { q: "Who is the beneficiary on a mortgage protection policy?", choices: ["Your family, not the bank", "The bank always", "The real estate agent"], a: 0 },
      { q: "A reason to choose less than the full mortgage amount...", choices: ["It is more affordable and still protects the family", "It is required by law", "The bank forbids more"], a: 0 },
      { q: "Mortgage protection is typically set up...", choices: ["Separately from the mortgage, after closing", "By the builder", "Only by the IRS"], a: 0 },
      { q: "Why is mortgage protection compared to life insurance?", choices: ["Both pay a benefit to your beneficiary", "Both cover the car", "Both are required at closing"], a: 0 },
      { q: "If a client says \"I have homeowners, I am covered,\" the key point is...", choices: ["Homeowners covers the structure, not your income or family", "They are fully covered already", "They should cancel homeowners"], a: 0 },
      { q: "A dual-purpose policy is popular with which clients?", choices: ["Older clients who want lifelong coverage", "Only renters", "Only businesses"], a: 0 },
      { q: "Equity protection gives a family time to...", choices: ["Grieve, sell, or refinance without a fire sale", "Buy a boat", "Avoid the funeral"], a: 0 },
      { q: "Mortgage protection can pay out for a disability that...", choices: ["Keeps you from working and earning", "Is only a minor cold", "Never matters"], a: 0 },
      { q: "The three home-related coverages are PMI, homeowners, and...", choices: ["Mortgage protection", "Auto insurance", "Pet insurance"], a: 0 },
      { q: "A common reason mortgage protection is overlooked...", choices: ["People assume closing or the bank handled it", "It is a secret product", "It is illegal"], a: 0 },
      { q: "Mortgage protection mainly helps the family...", choices: ["Keep the home or have options if income is lost", "Get a free vacation", "Lower taxes only"], a: 0 },
      { q: "With mortgage protection, the payout generally goes...", choices: ["Directly to the beneficiary", "Only to the bank", "To the listing agent"], a: 0 },
      { q: "If you refinance or buy a new home, you should...", choices: ["Review or update your mortgage protection", "Cancel all coverage", "Do nothing ever"], a: 0 },
      { q: "The main job of mortgage protection is to...", choices: ["Keep a roof over the family if the earner is lost", "Insure furniture", "Pay closing costs"], a: 0 },
      { q: "Mortgage protection is most important because it...", choices: ["Protects the people who depend on the income", "Repaves the driveway", "Protects the bank only"], a: 0 },
    ],
  },
  {
    id: "life", name: "Life Options", emoji: "\ud83e\udde9", color: "#C7CDD6", cards: [
      { q: "Term life insurance provides coverage...", choices: ["For a set period, like 10, 20, or 30 years", "Forever, guaranteed", "Only after retirement"], a: 0 },
      { q: "Whole life insurance is...", choices: ["Permanent and builds cash value", "Temporary and the cheapest option", "Only for businesses"], a: 0 },
      { q: "At the end of a term policy, coverage usually...", choices: ["Ends, or renews at a much higher cost", "Doubles automatically", "Becomes permanent for free"], a: 0 },
      { q: "\"Level term\" means...", choices: ["The premium stays the same the whole term", "The benefit shrinks each year", "You pay only once"], a: 0 },
      { q: "Cash value is...", choices: ["A savings component in permanent policies", "A late fee", "The agent commission"], a: 0 },
      { q: "Why might a family carry both term and permanent coverage?", choices: ["Term for temporary needs, permanent for costs that always exist", "To pay double for no reason", "There is no reason to"], a: 0 },
      { q: "The death benefit paid to a beneficiary is generally...", choices: ["Income-tax-free", "Taxed at 50%", "Paid to the IRS first"], a: 0 },
      { q: "\"Return of premium\" means...", choices: ["Some policies refund premiums if coverage goes unused", "A discount for referrals", "The carrier pays your premium"], a: 0 },
      { q: "Living benefits let you...", choices: ["Access the death benefit while alive in certain situations", "Skip payments forever", "Add a car to the policy"], a: 0 },
      { q: "Which is usually the most affordable for a big temporary need?", choices: ["Term life", "Whole life", "There is no cheap option"], a: 0 },
      { q: "Which builds cash value you can borrow against?", choices: ["Permanent whole life", "Term", "Neither"], a: 0 },
      { q: "A 20-year term policy fits a need that...", choices: ["Goes away, like a mortgage or kids at home", "Lasts 40 more years", "Never exists"], a: 0 },
      { q: "Permanent insurance is well suited for...", choices: ["Costs that always exist, like final expenses", "Only renters", "Short-term debt only"], a: 0 },
      { q: "\"Convertible\" term often lets you...", choices: ["Switch to permanent later without starting over", "Convert it into a car", "Double the term for free"], a: 0 },
      { q: "The person who receives the death benefit is the...", choices: ["Beneficiary", "Underwriter", "Lienholder"], a: 0 },
      { q: "A rider is...", choices: ["An add-on that customizes a policy", "A late penalty", "The agent fee"], a: 0 },
      { q: "Why do many families end up with no coverage after work benefits?", choices: ["Group coverage ends at the job and converting can be costly", "They cancel on purpose", "It is illegal to keep"], a: 0 },
      { q: "Which lasts your entire life if premiums are paid?", choices: ["Whole life", "10-year term", "20-year term"], a: 0 },
      { q: "Level premium means...", choices: ["The payment does not change over the term", "It rises every year", "You pay once"], a: 0 },
      { q: "A key difference between term and permanent is...", choices: ["Term expires, permanent does not", "They are identical", "Term builds more cash value"], a: 0 },
      { q: "Living benefits are valuable because...", choices: ["You may use the policy while alive, not only at death", "They double premiums", "They are free money forever"], a: 0 },
      { q: "The face amount of a policy is...", choices: ["The death benefit amount", "The monthly premium", "The agent commission"], a: 0 },
      { q: "Which is true about term life?", choices: ["It is temporary and usually the lowest cost", "It builds large cash value", "It never expires"], a: 0 },
      { q: "Permanent coverage appeals to clients who want...", choices: ["Lifelong protection and a cash value component", "Only the cheapest option", "No coverage at all"], a: 0 },
      { q: "The only plan that truly helps a family is the one that...", choices: ["Is actually in place when it is needed", "Costs the most", "Is never purchased"], a: 0 },
    ],
  },
  {
    id: "smart", name: "Often Overlooked", emoji: "\ud83d\udca1", color: "#EAB308", cards: [
      { q: "What usually happens to life insurance from work when you leave the job?", choices: ["It typically goes away", "It follows you free forever", "It triples"], a: 0 },
      { q: "A contingent beneficiary is...", choices: ["A backup if the primary beneficiary passes first", "The agent", "The bank"], a: 0 },
      { q: "Billions in life insurance go unclaimed each year mainly because...", choices: ["Beneficiaries do not know the policy exists", "Carriers hide it", "It is illegal to claim"], a: 0 },
      { q: "Before passing away young, a person is more likely to face...", choices: ["A period of disability or lost income", "Nothing ever", "A lottery win"], a: 0 },
      { q: "When you move to a new home, mortgage protection coverage...", choices: ["Can transfer with you", "Is forfeited", "Must be rebought at triple cost"], a: 0 },
      { q: "Why does waiting to buy coverage usually cost more?", choices: ["Premiums are based on your age now, which rises", "Carriers charge a waiting fee", "It never costs more"], a: 0 },
      { q: "A smart thing to tell your beneficiary is...", choices: ["Where the policy is and that it exists", "Nothing, keep it secret", "To call the bank only"], a: 0 },
      { q: "Naming a minor child directly as beneficiary can...", choices: ["Create legal delays, a trust or guardian is often better", "Speed up the payout", "Avoid all paperwork"], a: 0 },
      { q: "Many foreclosures and bankruptcies are triggered by...", choices: ["Lost income from disability or unexpected bills, not just death", "Too much savings", "Paying off the home early"], a: 0 },
      { q: "A \"free-look\" period lets you...", choices: ["Review and adjust or cancel shortly after starting", "Never change anything", "Skip the first 3 payments"], a: 0 },
      { q: "Reviewing your coverage is smart after...", choices: ["Big life changes like marriage, a baby, or a new home", "Never", "Only after age 90"], a: 0 },
      { q: "Keeping beneficiary designations current matters because...", choices: ["Outdated ones can send money to the wrong person", "It is just paperwork", "It lowers premiums"], a: 0 },
      { q: "A policy can lapse if...", choices: ["Premiums are not paid", "You move", "You name a backup"], a: 0 },
      { q: "Why name a contingent beneficiary?", choices: ["So the benefit has a clear path if the primary is gone", "To pay less", "To skip approval"], a: 0 },
      { q: "Coverage is usually cheaper when you...", choices: ["Lock it in younger", "Wait as long as possible", "Never buy it"], a: 0 },
      { q: "One overlooked value of permanent coverage is...", choices: ["It will not expire and leave you with nothing later", "It is always the cheapest", "It pays the lender"], a: 0 },
      { q: "People often underestimate...", choices: ["How much a funeral actually costs today", "How cheap everything is", "Their own age"], a: 0 },
      { q: "Why review old policies a client already has?", choices: ["They may be overpaying or have weaker coverage than they think", "It is illegal not to", "To cancel everything"], a: 0 },
      { q: "A common myth is...", choices: ["My work policy is enough forever", "Coverage can transfer with a home", "Beneficiaries should be told"], a: 0 },
      { q: "Telling your family the policy exists helps avoid...", choices: ["Unclaimed benefits that never get paid", "Lower premiums", "A free-look period"], a: 0 },
      { q: "A smart habit once a year is to...", choices: ["Review coverage, beneficiaries, and goals", "Cancel one policy", "Ignore it"], a: 0 },
      { q: "If both primary and contingent beneficiaries are gone, the benefit may...", choices: ["Go through the estate, which can be slow", "Vanish", "Go to the agent"], a: 0 },
      { q: "One reason living benefits get overlooked...", choices: ["People picture life insurance paying only at death", "They are illegal", "They cost nothing"], a: 0 },
      { q: "A practical reason to set coverage up sooner...", choices: ["Rates are based on your current age, which only goes up", "It is required by law today", "It gets free later"], a: 0 },
      { q: "The most overlooked truth in insurance is...", choices: ["The best policy is the one in place when it is needed", "The most expensive is always best", "Coverage never matters"], a: 0 },
    ],
  },
]

const STORE_KEY = 'fortiva_train_v1'
interface Progress { xp: number; best: Record<string, number>; mastered: Record<string, boolean> }
const emptyProgress: Progress = { xp: 0, best: {}, mastered: {} }

const levelOf = (xp: number) => Math.floor(xp / 100) + 1
const multOf = (streak: number) => (streak >= 7 ? 3 : streak >= 5 ? 2 : streak >= 3 ? 1.5 : 1)
const shuffle = <T,>(arr: T[]) => arr.map(v => [Math.random(), v] as const).sort((a, b) => a[0] - b[0]).map(p => p[1])

const prepCard = (c: Card): Card => {
  const order = shuffle(c.choices.map((_, i) => i))
  return { q: c.q, choices: order.map(i => c.choices[i]), a: order.indexOf(c.a) }
}

type Screen = 'home' | 'play' | 'results'

export default function TrainPage() {
  const [prog, setProg] = useState<Progress>(emptyProgress)
  const [screen, setScreen] = useState<Screen>('home')
  const [deck, setDeck] = useState<Deck | null>(null)
  const [queue, setQueue] = useState<Card[]>([])
  const [idx, setIdx] = useState(0)
  const [chosen, setChosen] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [result, setResult] = useState<{ accuracy: number; earned: number; best: number; perfect: boolean; leveledTo: number | null } | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const raw = localStorage.getItem(STORE_KEY)
      if (raw) setProg({ ...emptyProgress, ...JSON.parse(raw) })
    } catch {}
  }, [])

  const save = (p: Progress) => { try { localStorage.setItem(STORE_KEY, JSON.stringify(p)) } catch {} }

  const start = (d: Deck) => {
    setDeck(d)
    setQueue(shuffle(d.cards).map(prepCard))
    setIdx(0); setChosen(null); setScore(0); setStreak(0); setCorrect(0)
    setScreen('play')
  }
  const startMixed = () => {
    const all = DECKS.flatMap(d => d.cards)
    start({ id: 'mixed', name: 'Mixed', emoji: '🎲', color: '#2563EB', cards: shuffle(all).slice(0, 20) })
  }

  const answer = (i: number) => {
    if (chosen !== null || !deck) return
    setChosen(i)
    if (i === queue[idx].a) {
      const ns = streak + 1
      setStreak(ns)
      setScore(s => s + Math.round(10 * multOf(ns)))
      setCorrect(c => c + 1)
    } else {
      setStreak(0)
    }
  }

  const next = () => {
    if (!deck) return
    if (idx + 1 < queue.length) { setIdx(idx + 1); setChosen(null); return }
    const total = queue.length
    const accuracy = total ? correct / total : 0
    const earned = score
    const newXp = prog.xp + earned
    const prevBest = prog.best[deck.id] || 0
    const next: Progress = {
      xp: newXp,
      best: { ...prog.best, [deck.id]: Math.max(prevBest, score) },
      mastered: { ...prog.mastered, [deck.id]: prog.mastered[deck.id] || accuracy === 1 },
    }
    setProg(next); save(next)
    setResult({ accuracy, earned, best: next.best[deck.id], perfect: accuracy === 1, leveledTo: levelOf(newXp) > levelOf(prog.xp) ? levelOf(newXp) : null })
    setScreen('results')
  }

  // ---------------- HOME ----------------
  if (screen === 'home') {
    const lvl = levelOf(prog.xp), into = prog.xp % 100
    return (
      <div>
        <Header />
        <div className="glass rounded-2xl p-5 mb-5">
          <div className="flex justify-between items-end mb-3">
            <div>
              <div style={{ ...S, fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(199,205,214,0.5)' }}>Level</div>
              <div style={{ ...M, fontWeight: 900, fontSize: 40, color: '#F8FAFC', lineHeight: 1 }}>{lvl}</div>
            </div>
            <div style={{ ...S, fontSize: 13, color: '#C7CDD6' }}>{prog.xp} XP</div>
          </div>
          <div style={{ height: 8, borderRadius: 999, background: 'rgba(199,205,214,0.12)', overflow: 'hidden' }}>
            <div style={{ width: `${into}%`, height: '100%', background: 'linear-gradient(90deg,#1d4ed8,#2563EB)' }} />
          </div>
          <div style={{ ...S, fontSize: 11, color: 'rgba(199,205,214,0.4)', marginTop: 6 }}>{100 - into} XP to level {lvl + 1}</div>
        </div>

        <div style={{ ...S, fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(199,205,214,0.45)', marginBottom: 10 }}>Pick a Deck</div>
        <div className="flex flex-col gap-3 stagger">
          {DECKS.map(d => {
            const best = prog.best[d.id] || 0
            const mastered = prog.mastered[d.id]
            return (
              <button key={d.id} onClick={() => start(d)} className="glass rounded-2xl p-4 text-left w-full" style={{ cursor: 'pointer', border: `1px solid ${mastered ? `${d.color}66` : 'rgba(199,205,214,0.1)'}` }}>
                <div className="flex items-center gap-3">
                  <div style={{ fontSize: 26 }}>{d.emoji}</div>
                  <div className="flex-1">
                    <div style={{ ...M, fontWeight: 700, fontSize: 16, color: '#F8FAFC' }}>{d.name} {mastered && <span title="Mastered">⭐</span>}</div>
                    <div style={{ ...S, fontSize: 12, color: 'rgba(199,205,214,0.5)', marginTop: 2 }}>{d.cards.length} cards{best ? ` · best ${best}` : ''}</div>
                  </div>
                  <div style={{ color: 'rgba(199,205,214,0.3)', fontSize: 20 }}>›</div>
                </div>
              </button>
            )
          })}
          <button onClick={startMixed} className="btn-primary" style={{ width: '100%', padding: '16px', borderRadius: 14, fontSize: 14, letterSpacing: '0.06em', marginTop: 4 }}>
            🎲 MIXED CHALLENGE (12 RANDOM)
          </button>
        </div>
      </div>
    )
  }

  // ---------------- PLAY ----------------
  if (screen === 'play' && deck) {
    const card = queue[idx]
    const mult = multOf(streak)
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <div style={{ ...S, fontSize: 12, color: 'rgba(199,205,214,0.5)' }}>{deck.emoji} {deck.name}</div>
          <button onClick={() => setScreen('home')} style={{ ...S, fontSize: 12, color: 'rgba(199,205,214,0.5)', background: 'none', border: 'none', cursor: 'pointer' }}>✕ Quit</button>
        </div>

        {/* stat bar */}
        <div className="flex gap-2 mb-4">
          <Stat label="Card" value={`${idx + 1}/${queue.length}`} />
          <Stat label="Score" value={String(score)} color="#2563EB" />
          <Stat label="Streak" value={streak > 0 ? `🔥 ${streak}${mult > 1 ? `  x${mult}` : ''}` : '0'} color={streak >= 3 ? '#EAB308' : undefined} />
        </div>
        <div style={{ height: 6, borderRadius: 999, background: 'rgba(199,205,214,0.12)', overflow: 'hidden', marginBottom: 18 }}>
          <div style={{ width: `${(idx / queue.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg,#1d4ed8,#2563EB)', transition: 'width 0.3s' }} />
        </div>

        <div className="glass rounded-2xl p-5 mb-4">
          <div style={{ ...M, fontWeight: 700, fontSize: 19, color: '#F8FAFC', lineHeight: 1.35 }}>{card.q}</div>
        </div>

        <div className="flex flex-col gap-3">
          {card.choices.map((c, i) => {
            const isAnswer = i === card.a
            const isChosen = chosen === i
            let bg = 'rgba(13,42,74,0.4)', bd = 'rgba(199,205,214,0.12)', col = '#F8FAFC'
            if (chosen !== null) {
              if (isAnswer) { bg = 'rgba(34,197,94,0.18)'; bd = '#22c55e' }
              else if (isChosen) { bg = 'rgba(239,68,68,0.18)'; bd = '#ef4444' }
              else { col = 'rgba(199,205,214,0.4)' }
            }
            return (
              <button key={i} onClick={() => answer(i)} disabled={chosen !== null}
                style={{ textAlign: 'left', padding: '14px 16px', borderRadius: 12, border: `1px solid ${bd}`, background: bg, color: col, ...S, fontSize: 15, lineHeight: 1.45, cursor: chosen === null ? 'pointer' : 'default', transition: 'all 0.15s' }}>
                {chosen !== null && isAnswer ? '✓ ' : chosen !== null && isChosen ? '✗ ' : ''}{c}
              </button>
            )
          })}
        </div>

        {chosen !== null && (
          <div className="mt-4">
            <div style={{ ...M, fontWeight: 700, fontSize: 15, color: chosen === card.a ? '#22c55e' : '#ef4444', marginBottom: 12 }}>
              {chosen === card.a ? `Correct!  +${Math.round(10 * multOf(streak))}` : 'Not quite, see the highlighted answer.'}
            </div>
            <button onClick={next} className="btn-primary" style={{ width: '100%', padding: '15px', borderRadius: 14, fontSize: 15, letterSpacing: '0.06em' }}>
              {idx + 1 < queue.length ? 'NEXT →' : 'SEE RESULTS →'}
            </button>
          </div>
        )}
      </div>
    )
  }

  // ---------------- RESULTS ----------------
  if (screen === 'results' && deck && result) {
    const stars = result.accuracy >= 1 ? 3 : result.accuracy >= 0.7 ? 2 : result.accuracy >= 0.4 ? 1 : 0
    return (
      <div>
        <Header />
        <div className="glass rounded-2xl p-6 text-center mb-4" style={{ borderColor: result.perfect ? 'rgba(234,179,8,0.5)' : 'rgba(37,99,235,0.35)' }}>
          <div style={{ fontSize: 34, letterSpacing: 6 }}>{'★★★'.slice(0, stars).padEnd(3, '☆')}</div>
          {result.perfect && <div style={{ ...B, fontSize: 22, letterSpacing: '0.15em', color: '#EAB308', marginTop: 8 }}>PERFECT RUN!</div>}
          <div style={{ ...M, fontWeight: 900, fontSize: 46, color: '#F8FAFC', marginTop: 8, lineHeight: 1 }}>{Math.round(result.accuracy * 100)}%</div>
          <div style={{ ...S, fontSize: 13, color: '#C7CDD6', marginTop: 6 }}>{correct} of {queue.length} correct</div>
        </div>

        <div className="flex gap-2 mb-4">
          <Stat label="XP Earned" value={`+${result.earned}`} color="#2563EB" />
          <Stat label="Best" value={String(result.best)} color="#EAB308" />
          <Stat label="Level" value={String(levelOf(prog.xp))} />
        </div>

        {result.leveledTo && (
          <div className="glass rounded-xl p-4 mb-4 text-center" style={{ borderColor: 'rgba(234,179,8,0.4)' }}>
            <span style={{ ...M, fontWeight: 800, fontSize: 15, color: '#EAB308' }}>⬆ Level up! You reached Level {result.leveledTo}</span>
          </div>
        )}

        <div className="flex gap-2">
          <button onClick={() => start(deck)} className="btn-primary" style={{ flex: 1, padding: '16px', borderRadius: 14, fontSize: 15, letterSpacing: '0.06em' }}>PLAY AGAIN →</button>
          <button onClick={() => setScreen('home')} style={{ ...S, fontSize: 14, padding: '16px 20px', borderRadius: 14, border: '1px solid rgba(199,205,214,0.15)', color: '#C7CDD6', background: 'transparent', cursor: 'pointer' }}>Decks</button>
        </div>
      </div>
    )
  }

  return null
}

function Header() {
  return (
    <div className="mb-6">
      <div style={{ ...B, fontSize: 11, letterSpacing: '0.25em', color: '#2563EB', marginBottom: 4 }}>FORTIVA INSURANCE GROUP</div>
      <h1 style={{ ...M, fontWeight: 900, fontSize: 32, letterSpacing: '0.04em', color: '#F8FAFC', lineHeight: 1 }}>TRAINING</h1>
      <p style={{ color: '#C7CDD6', fontSize: 13, marginTop: 6 }}>Flashcards to lock in the fundamentals</p>
    </div>
  )
}

function Stat({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="glass rounded-xl p-3 flex-1 text-center">
      <div style={{ ...S, fontSize: 9, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(199,205,214,0.4)' }}>{label}</div>
      <div style={{ ...M, fontWeight: 800, fontSize: 16, color: color || '#F8FAFC', marginTop: 3 }}>{value}</div>
    </div>
  )
}
