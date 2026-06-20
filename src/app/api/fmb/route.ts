import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: Request) {
  try {
    const { input } = await req.json()
    const i = input || {}

    const prompt = `You are an elite performance coach for insurance sales agents at Fortiva Insurance Group. Create a personalized "path to clarity" plan for one of our agents.

Be grounded, warm, and action-oriented. Use confidence- and identity-based affirmations, practical daily habits, and a concrete game plan. Focus on mindset PLUS real action — avoid magical thinking, hype, or unrealistic promises. This agent already works with us; do not mention choosing or changing careers.

Agent details:
- Name: ${i.name || 'the agent'}
- What they are working toward: ${i.vision || 'building a successful, meaningful career and providing for the people they love'}
- Monthly income goal: ${i.incomeGoal ? `$${i.incomeGoal}` : 'not specified'}
- Timeframe: ${i.timeframe || '90 days'}
- Product focus: ${i.focus || 'all product lines'}
- Biggest obstacle right now: ${i.obstacle || 'not specified'}

Return ONLY valid JSON, with no markdown, code fences, or preamble. Use exactly this shape:
{
  "northStar": "one vivid, specific sentence capturing their vision in their own spirit",
  "milestones": [
    { "label": "short milestone title", "target": "when, e.g. 'Weeks 1-2'", "detail": "one concrete sentence" }
  ],
  "affirmations": ["six first-person, present-tense affirmations rooted in identity and effort"],
  "mindsetScript": "a 4-6 sentence morning script the agent reads aloud, first person, calm and confident",
  "gamePlan": [
    { "phase": "phase name", "focus": "one-line focus", "actions": ["specific action", "specific action"] }
  ]
}

Rules: exactly 4 milestones spanning start to their timeframe; exactly 6 affirmations; exactly 3 phases in the game plan with 2-4 actions each. Tailor everything to their goal, timeframe, product focus, and obstacle.`

    const msg = await anthropic.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = msg.content.map(b => (b.type === 'text' ? b.text : '')).join('')
    const clean = text.replace(/```json/g, '').replace(/```/g, '').trim()
    const plan = JSON.parse(clean)

    return NextResponse.json({ plan })
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Failed to generate plan' }, { status: 500 })
  }
}
