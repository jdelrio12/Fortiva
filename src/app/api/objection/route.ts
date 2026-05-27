import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  const { objection, productType } = await req.json()

  if (!objection?.trim()) {
    return NextResponse.json({ error: 'Objection is required' }, { status: 400 })
  }

  const prompt = `You are an expert insurance sales coach with 20+ years of experience in ${productType || 'insurance sales'}.

A prospect just said this objection: "${objection}"

Respond ONLY with a valid JSON object in this exact format (no markdown, no preamble):
{
  "bestRebuttal": "The most effective, natural-sounding rebuttal to this objection. Written in first person as if you're the agent speaking directly to the prospect.",
  "whyItWorks": "2-3 sentences explaining the psychology and strategy behind why this rebuttal is effective.",
  "alternateRebuttal": "A different approach to handling the same objection — different tone or angle.",
  "followUpClose": "A natural follow-up closing question or statement to use right after delivering the rebuttal."
}`

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    })

    const raw = response.content[0].type === 'text' ? response.content[0].text : ''
    const clean = raw.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)

    return NextResponse.json(parsed)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
