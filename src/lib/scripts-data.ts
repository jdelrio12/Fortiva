export interface Script {
  id: string
  category: 'Final Expense' | 'Mortgage Protection' | 'Medicare' | 'Life Insurance'
  title: string
  opening: string
  discoveryQuestions: string[]
  transition: string
  close: string
  rebuttals: { objection: string; response: string }[]
}

export const scripts: Script[] = [
  {
    id: 'fe-1',
    category: 'Final Expense',
    title: 'Final Expense Cold Call Opener',
    opening: `Hi, may I speak with [Name]? Great, [Name], my name is [Your Name] calling from [Agency]. I'm reaching out because we help families in [City] make sure they have a plan in place so their loved ones aren't left with burial or medical bills when they pass. I'm not here to sell you anything today — I just want to ask you a couple of quick questions to see if we might be able to help. Do you have just two minutes?`,
    discoveryQuestions: [
      'Do you currently have any type of life insurance policy in place?',
      'If something were to happen to you today, do you know if your family would have enough to cover final expenses like burial and any outstanding medical bills?',
      'About how much would you estimate a funeral costs these days?',
      'Is there anyone — a spouse, children, or grandchildren — who depends on you financially?',
      'If you could get coverage for around the cost of a cup of coffee a day, would that give you some peace of mind?',
    ],
    transition: `I appreciate you sharing that with me. Based on what you've told me, it sounds like having something in place would really take a weight off your shoulders — and your family's. Let me show you what we have available that fits your situation.`,
    close: `So [Name], what I can do is get you started with a plan today for as little as [price]. There's no medical exam — just a few health questions. You'd be covered starting immediately, and your family would receive [benefit amount] whenever the time comes. Can we go ahead and get that set up for you today?`,
    rebuttals: [
      { objection: "I can't afford it right now.", response: `I completely understand. That's actually the reason most families don't have coverage — until it's too late. Our plans start at just [price] a month. That's less than most people spend on a streaming service. Can we find a benefit amount that fits your budget?` },
      { objection: "I need to talk to my spouse.", response: `That makes total sense — this is a family decision. Would it work to get [spouse's name] on a quick three-way call right now? I promise I won't take more than five minutes of their time.` },
      { objection: "I already have insurance through work.", response: `That's great — work policies are a wonderful benefit. The one thing to be aware of is that coverage typically ends when you retire or leave the job. Final expense coverage stays with you for life and never goes up in price. Would it make sense to have something in place as a backup?` },
    ],
  },
  {
    id: 'mp-1',
    category: 'Mortgage Protection',
    title: 'Mortgage Protection Mailer Follow-Up',
    opening: `Hi, is this [Name]? Hi [Name], this is [Your Name] from [Agency]. You recently sent back a card about protecting your home and mortgage — I'm just reaching out to get you some information. Did you have a couple of minutes?`,
    discoveryQuestions: [
      'How long ago did you purchase your home, and roughly how much is left on your mortgage?',
      'Are you the sole income earner, or does your household have two incomes?',
      'If something happened to you tomorrow, would your family be able to keep the house on one income?',
      'Do you have any life insurance currently that would specifically cover the mortgage?',
      'How important is it to you that your family can stay in the home if you were gone?',
    ],
    transition: `So what I'm hearing is that the home is important — it's where your family lives, where your kids grew up. And right now there's a gap between what would happen and what you want to happen. Let me show you how we close that gap.`,
    close: `Here's what I can do. I can get you a policy that pays off your mortgage directly to your family — or gives them the cash to do whatever they need — for about [price] a month. It's level term coverage so the premium never changes. Would you like to lock that rate in today while you're still healthy and rates are low?`,
    rebuttals: [
      { objection: "We're doing fine financially.", response: `That's wonderful to hear. Most of my clients who are doing well are exactly the ones who plan ahead — they protect what they've built. This is really just about making sure one event doesn't unravel everything you've worked for.` },
      { objection: "I'll think about it.", response: `I completely respect that. Can I ask — what part of this would you be thinking through? Sometimes I can answer questions right now that save a lot of back-and-forth.` },
    ],
  },
  {
    id: 'med-1',
    category: 'Medicare',
    title: 'Medicare Supplement / Advantage Opener',
    opening: `Hello, may I speak with [Name]? Hi [Name], this is [Your Name] calling. You recently [responded to an ad / were referred to me] about your Medicare options. I specialize in helping people turning 65 — or those already on Medicare — understand the differences between their plan options so they're not overpaying or underinsured. Do you have five minutes to chat?`,
    discoveryQuestions: [
      'Are you currently on Medicare Part A and Part B, or are you approaching your 65th birthday?',
      'Are you on Original Medicare, a Medicare Advantage plan, or a Medicare Supplement?',
      'Do you have any doctors or specialists you see regularly that are really important to you?',
      'Do you take any prescription medications? We\'ll want to make sure those are covered.',
      'What\'s most important to you — keeping costs predictable, or having a lower monthly premium?',
    ],
    transition: `Based on what you've shared, it sounds like [Original Medicare / a Supplement / Advantage] may or may not be giving you the best value right now. Let me walk you through exactly what I'm seeing for your situation — there's no cost or obligation.`,
    close: `What I'd like to do is enroll you in [plan] today. It starts on [date], your current doctors are in-network, your prescriptions are covered, and your monthly cost will be [price]. Would you like to move forward while I have your information in front of me?`,
    rebuttals: [
      { objection: "I'm happy with what I have.", response: `I love hearing that — most people just want something that works. My only question is: do you know for certain that your current plan is still the most cost-effective option this year? Plans change every January 1st, and I just want to confirm you're not overpaying for the same or better coverage.` },
      { objection: "My doctor handles all this for me.", response: `That's great that you have that relationship. What I do is specifically look at coverage and cost — your doctor is focused on your health, and I'm focused on making sure the bills are covered. The two go hand in hand.` },
    ],
  },
  {
    id: 'li-1',
    category: 'Life Insurance',
    title: 'Term Life Insurance Needs Analysis',
    opening: `Hi [Name], this is [Your Name] from [Agency]. I work with families to help them figure out exactly how much life insurance they actually need — not too much, not too little. It's a free needs analysis and takes about ten minutes. Would that be valuable to you?`,
    discoveryQuestions: [
      'How many people depend on your income today — spouse, kids, parents?',
      'What is your approximate annual household income?',
      'Do you have any outstanding debts — mortgage, car loans, student loans?',
      'Do you have children? If so, would you want to fund their education if something happened to you?',
      'Do you currently have any life insurance? If so, do you know the death benefit amount?',
    ],
    transition: `Based on what you've told me, your family would need approximately [calculated amount] to maintain their lifestyle and cover obligations if you passed away today. Right now you have [X] — which means there's a gap of [Y]. Let me show you what it costs to close that gap.`,
    close: `For a [age]-year-old in your health category, I can get you [coverage amount] in coverage for [price] a month — that's a [term]-year level term policy. Your family is protected the entire time and the payment never changes. Can we go ahead and get the application submitted today?`,
    rebuttals: [
      { objection: "Life insurance is too expensive.", response: `I hear that a lot, and honestly most people overestimate the cost by 3x or more. For someone your age and health, we're typically talking about [price range] a month for substantial coverage. Would it be okay if I showed you the actual number?` },
      { objection: "I don't believe I'll die young.", response: `I hope you're right — and statistically, you probably will live a long life. But this isn't really about dying young. It's about your family not having to make devastating financial decisions at the worst moment of their lives. That's worth a few dollars a month, isn't it?` },
      { objection: "I want to shop around first.", response: `Absolutely — and I'd encourage that. Just know I'm already looking at over 40 carriers, so I've done that shopping for you. But if you want to compare quotes elsewhere, I can email you what I have so you have a benchmark. Fair enough?` },
    ],
  },
]

export const CATEGORIES = ['Final Expense', 'Mortgage Protection', 'Medicare', 'Life Insurance'] as const
export type Category = typeof CATEGORIES[number]
