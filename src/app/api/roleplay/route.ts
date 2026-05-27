import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  const { messages, config, requestCoaching } = await req.json()

  const { prospectType, productType, difficulty } = config

  const difficultyDesc = {
    easy: 'You are slightly skeptical but generally warm and open to hearing information.',
    medium: 'You have real objections and concerns. You push back but can be moved with good logic.',
    hard: 'You are skeptical, busy, and have strong objections. It takes real skill to earn your trust.',
  }[difficulty as string] ?? 'medium'

  const prospectPersona: Record<string, string> = {
    'Skeptical Senior': 'You are a 68-year-old retired schoolteacher. You are cautious about money and have been called by telemarketers before. You are polite but guarded.',
    'Busy Professional': 'You are a 45-year-old small business owner. You are pressed for time and a bit impatient. You value efficiency and directness.',
    'Price-Sensitive Family': 'You are a 38-year-old parent of three. Money is tight and every dollar matters. You want coverage but are worried about the cost.',
    'Already Has Coverage': 'You believe you already have enough coverage and are not sure why you need more. You need to be educated and convinced.',
    'Undecided Spouse': 'You are 55 and your spouse handles all finances. You need to talk to them before making any decisions.',
  }

  const systemPrompt = requestCoaching
    ? `You are an expert insurance sales coach. The agent just finished a role play. Review the conversation and provide coaching feedback.

Respond ONLY with valid JSON in this exact format:
{
  "score": <number 1-100>,
  "grade": "<A/B/C/D/F>",
  "summary": "<2 sentence overall assessment>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "improvements": ["<area 1>", "<area 2>", "<area 3>"],
  "keyMoment": "<The single most important moment in the call and what should have been done>",
  "tipForNextTime": "<One actionable tip the agent can apply immediately next time>"
}`
    : `You are roleplaying as a ${prospectType} insurance prospect. The agent is selling ${productType}.

Prospect persona: ${prospectPersona[prospectType] ?? 'A typical insurance prospect.'}

Difficulty: ${difficultyDesc}

Rules:
- Stay in character at all times. Never break the fourth wall.
- Respond naturally as this prospect would — short, real-world sentences.
- React to what the agent actually says. If they make a good point, acknowledge it. If they fumble, push back harder.
- Raise realistic objections at appropriate moments.
- If the agent attempts to close, respond as this prospect realistically would.
- Keep responses under 4 sentences unless a longer response is natural.
- Do NOT be a pushover, but do NOT be impossibly difficult either — match the difficulty setting.`

  const messagesToSend = requestCoaching
    ? [{ role: 'user' as const, content: `Here is the complete role play conversation to review and score:\n\n${messages.map((m: {role: string; content: string}) => `${m.role === 'user' ? 'AGENT' : 'PROSPECT'}: ${m.content}`).join('\n\n')}` }]
    : messages.map((m: {role: string; content: string}) => ({ role: m.role as 'user' | 'assistant', content: m.content }))

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: systemPrompt,
      messages: messagesToSend,
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''

    if (requestCoaching) {
      const clean = text.replace(/```json|```/g, '').trim()
      const coaching = JSON.parse(clean)
      return NextResponse.json({ coaching })
    }

    return NextResponse.json({ reply: text })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
