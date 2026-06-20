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


// ============================================================================
// PINNACLE LAYER  (added on top of the Default scripts above — Default is
// untouched). Pinnacle sets are FULL scripts shown whole (no section tabs).
// ============================================================================

export interface FullScript {
  id: string
  category: Category
  label: string
  scenario?: string
  body: string
}

export const pinnacleScripts: FullScript[] = [
  {
    id: 'pinnacle-single-younger',
    category: 'Mortgage Protection',
    label: 'Pinnacle — Single / Younger (Term)',
    scenario: 'Single, younger client · term',
    body: `<Coach note: when sitting with a single person, it's crucial to remember they are 100% reliant on their income without a backup.>

INTRO
Hi <client>, this is <agent>. I'm just calling you for our mortgage protection appointment that we have. Give me just a second to pull you up here… *pause*
OK, I have that security code I gave you, it's ________.
We are at <address> of course with <lender>. And we haaave <$$ ON LEAD> approximately left on the home — does that sound about right?

Okay, so again, my name is <agent>. My job is pretty boring, but super important — it's just to walk you through the mortgage protection process and the ways it pays out to us as homeowners… So are you familiar with the mortgage process at all, ooor is this kinda your first time goin' through everything?
<no matter what response, keep going>

So things are done a lot differently than how they used to be done. <lender> used to bake it in with the home, now it's always done separately for several different reasons. The biggest reason being, you're the beneficiary now, and not <lender>. So now, anytime that you purchase a home, you refinance, you take out a home equity line, you have three crucial coverages to put in place. You're actually familiar with them…

1. Homeowners insurance — we all know what that is — that just covers the physical structure of the home from flood, fire, anything like that.
2. PMI, or private mortgage insurance — that just protects <lender> if for some reason you don't feel like paying your bill anymore, then their investment is protected.
And then Mortgage Protection — that's the third, and most important out of the 3 — just because that is now the only one that pays out directly to us as homeowners.

It is a pretty comprehensive coverage that pays out in several ways, so they just require you to be risk assessed. That's all that my job is, so I'll just verify you are who you say you are, ask you a couple health and financial questions, we'll go over the payout of the policy, and then submit proof of coverage at the end. It sounds like a lot, it's really not — overall, it's actually a pretty quick, easy process, okay?

<Complete financial inventory>
Okay, bear with me… I'm gonna put you on a brief hold while I type out a couple things here on my end. If you will, please just grab a pen and a clean piece of paper. I just have to have you write a couple things down…
<Call your mentor to ask for product positioning.>
<Make sure you check in with your clients every 3 minutes.>
"I'm still here with you — thank you for your patience…"
"Just about done here… FYI…"
<Write quotes down and have ready to read to the client.>

POSITIONING — CBO 100 / T125 / T100 / FAMILY FREEDOM TERM (SINGLE PERSON)
Alright, I apologize for that wait… thank you for your patience.
So this part is very crucial, so please, if there's something you don't understand, just let me know. But overall, I get paid to simplify things and break them down, so you shouldn't have too many questions. *pause*
*TALK SLOWLY*
So in covering you for that full amount of the home, it covers you in five different areas.

The first is the obvious — if you'll please write down… death. *pause*
A lot of people like this, because at that point the death benefit pays out JUST like a life insurance policy. That lump sum check will be sent directly to <beneficiary name>, and <lender> cannot touch it. They can use it on funeral expenses, the fees that come with transferring the home… basically however you and <beneficiary> decide it be used.
Do you have any questions about just that death benefit payout?

Okay the second one — if you'll please write it down… is critical illness. *pause*
Now the biggest issue with just a traditional life insurance policy is that it only pays out in the event of death. This also pays out, *pause* while you are living. So let's say, <client>, you weren't feeling well… You walk into the doctor's office and they diagnose you with a major medical issue like… cancer. *pause*
Well now we're not able to work, life insurance doesn't pay out, and now we have to figure out… okay… how do we navigate financially? And unfortunately the biggest liability with you being the sole homeowner is that you're also the sole source of income. *pause*
You work hard, you keep the lights on, you make things happen. But if God forbid you weren't able to work and bring in an income due to your health, we have to ask ourselves… okay… realistically, what's the plan?
So in that event, they will pay out directly to you as the homeowner. You don't have to pay off the home with that payout if you don't want to. Let's be honest… in that scenario, most of us use that to keep the lights on, pay utilities, make the mortgage payments, etc.
So again, critical illness… that's any major medical diagnosis you can receive while you're living — cancer, heart attack, stroke, brain tumor, organ failure, and several others. <keep it moving> Does that make sense? Any questions about that? It's pretty cut and dry.

The third and fourth kind of go together… If you'll please write down, chronic illness *pause* and disability. *pause*
That's if for some reason you're not able to do two out of your five daily living functions for 90 days or more. You can't bathe yourself, clothe yourself, feed yourself, use the restroom, or mobility… whether due to an illness of some sort, or let's say you're in some sort of accident… they will also pay out.
Do you have any questions about just those two?

Okay, and then lastly, if you'll write down… terminal illness.
That one's pretty self explanatory. That's if you're going to pass away within the next 12 months or less… Unfortunately the bills still need to be paid even then.
So again, just reviewing all of those… we have death, critical illness, chronic illness, disability and terminal illness.

<If it's a CBO 100, read the next portion. If not, skip it.>
If you do not use the coverage… so if you don't get sick, you don't pass away… they refund all of the monthly premiums that were paid — just as an incentive for you to stay healthy. A lot of people look at it as a zero-risk savings account that also has that safety net, if that makes sense.
Do you have any questions on anything we just talked about so far? It's pretty simple.

Alright, I'm gonna have you write down a couple of different options, and you can just pick the one that makes the most sense for you…
That second amount, if you'll please write down, <$$$ amount> (often the whole home, plus annual income amount). And then price per month, write <$$$>. *pause*
So the first amount, if you'll please write down, <$$$ amount> (often the whole home amount). And then price per month, write <$$$>. *pause*
So all of these pay out in those 5 different ways we talked about — death, critical illness, chronic illness, disability, and terminal illness. (If cash back, say: "And they all have the cash back.")
The only difference between them is the price per month, as well as the amount of the check you'll receive in the event of 1 of those 5 things happening. So it doesn't matter which one you pick, just that you pick one of them.
<BE QUIET for a few seconds>
Okay, so which option out of those do you think makes the most sense?

That's the one most people go with — I agree with that, as well. Alright, I'll wrap up processing and then we'll be all set in just a few minutes here.
I need 3 things from you, please *pause* <keep the next part flowing>
1. Text me a picture of the front of your ID… I just have to make sure I've been talking to you as the homeowner this whole time.
2. Grab whatever checking and routing number you want associated with this every month, and have that ready to read off to me at the end.
3. And then, do you have a primary care doctor that you see?
<PROCESS APP>
<Give company name and policy number RIGHT after they give the banking info>
After you give them the policy number, say…
Your policy will be fully active within 2-5 business days once you're through underwriting, and that is when your first payment will draft, so please ensure you have that payment in there.
About a week or 2 later, you'll receive a big policy packet in the mail. (Prosperity is via email.) Please let <beneficiary> know where that is and what it's for. We don't want any unclaimed funds. Once you receive that packet, call <insurance company> and tell them what date you'd like it to come out every month. If you don't call them, they'll just draft it on today's date, every month.
And then I'm going to text you my contact info… One second here…
<Text them your picture and name> Please save my contact in your phone and write it down — just in case you ever need to make a claim or want to increase your coverage, I'll help you and walk you through that.
And then lastly *pause*… this is VERY important... *pause* I am now assigned to your file here for the security of your information. *pause* If ANYone calls you about mortgage protection and they don't have that security code of <security code>, hang up and contact me immediately. We will never discuss this with you without having that security code, okay?
You are all set here. Did you have any questions for me?
Then you are good to go. You have my contact here if you need anything, but you should be all set. You have a good day!`,
  },
  {
    id: 'pinnacle-couple',
    category: 'Mortgage Protection',
    label: 'Pinnacle — Couple (Term)',
    scenario: 'Couple · term',
    body: `<Coach note: when sitting with a couple, it is crucial to identify where the income is coming from, and what will happen to that income when they pass away.>

INTRO
Hi <client>, this is <agent>. I'm just calling you all for our mortgage protection appointment that we have. Is your significant other there with you as well?
<Acknowledge them until you hear their voice.> ("Hi, how are you?")
Alright, guys… give me juuust a second to pull you up here…
OK, I have that security code I gave you, it's ________.
We are at <address>. You're of course with <lender>. And we haaave <$$ ON LEAD> approximately left on the home — does that sound about right?

Okay, so again, my name is <agent>. My job is pretty boring, but super important — it's just to walk you all through the mortgage protection process and the ways it pays out to us as homeowners… So are all you familiar with the mortgage process at all, ooor is this kinda you guys' first time goin' through everything?
<no matter what response, keep going>

Got it. So things are done a lot differently than how they used to be done. <lender> used to bake it in with the home, now it's always done separately for several different reasons. The biggest reason being, you're the beneficiary now, and not <lender>. So now, anytime that you purchase a home, you refinance, you take out a home equity line, you have three crucial coverages to put in place. You're actually familiar with them…

1. Homeowners insurance — we all know what that is — that just covers the physical structure of the home from flood, fire, anything like that.
2. PMI, or private mortgage insurance — that just protects <lender> if for some reason you don't feel like paying your bill anymore, then their investment is protected.
And then Mortgage Protection — that's the third, and most important out of the 3 — just because that is now the only one that pays out directly to us as homeowners.

It's a pretty comprehensive coverage that pays out in several ways, so they just require you to be risk assessed. That's all that my job is, so I'll just verify you are who you say you are, ask you a couple health and financial questions, we'll go over the payout of the policy, and then submit proof of coverage at the end. It sounds like a lot, it's really not — overall, it's actually a pretty quick, easy process, okay?

<Complete financial inventory>
Okay, bear with me… I'm gonna put you on a brief hold while I type out a couple things here on my end. If you will, please just grab a pen and a clean piece of paper — whoever has the neater handwriting out of the two of you, I'm gonna have to have you write a couple things down…
<Call your mentor to ask for product positioning.>
<Make sure you check in with your clients every 3 minutes.>
"I'm still here with you — thank you for your patience…"
"Just about done here… FYI…"
<Write quotes down and have ready to read to the client.>

TERM POSITIONING FOR A COUPLE
Alright, I apologize for that wait… thank you for your patience.
So this part is very crucial, so please, if there's something you don't understand, just let me know. But overall, I get paid to simplify things and break them down, so you shouldn't have too many questions. *pause*
*TALK SLOWLY*
So in covering you both for that full amount of the home, it covers you in five different areas.

The first is the obvious — if you'll please write down… death. *pause*
A lot of people like this, because at that point the death benefit pays out JUST like a life insurance policy. That lump sum check is sent directly to you, the bank cannot touch it, and you can use it however you all see fit.
The biggest issue with your specific scenario is that both of you naturally depend on each other's income. You make a good team financially. The only issue is, if either of you were to pass away next week unexpectedly, your income will immediately die with you. *pause* Day one. *pause*
So we have to ask ourselves… okay… nowww what does that look like for us financially? *pause*
In that event, this would quickly pay out and supplement that lack of income within a few days. *pause*
Do you have any questions about just that death benefit payout?

Now the second one — if you'll please write it down… is critical illness. *pause*
The biggest issue with just a traditional life insurance policy is that it only pays out in the event of death. This also pays out, *pause* while you are living. So let's say, <client>, you weren't feeling well… You walk into the doctor's office and they diagnose you with a major medical issue like… cancer.
Well now we're not able to work, life insurance doesn't pay out, and now we have to figure out… okay, how do we supplement our income quickly?
In that event, they will pay out to you as the homeowner, in one lump sum. You don't have to pay off the home if you don't want to, either. Let's be honest… in that scenario, most of us use that to keep the lights on, pay utilities, make the mortgage payments, groceries, etc. *pause*
So again, critical illness… that's any major medical diagnosis you can receive while you're living — cancer, heart attack, stroke, brain tumor, organ failure, and several others. Does that make sense? Any questions? It's pretty cut and dry.

The third and fourth kind of go together… If you'll please write down, chronic illness *pause* and disability. *pause*
That's if for some reason you're not able to do two out of your five daily living functions for 90 days or more. You can't bathe yourself, clothe yourself… you have to help feed him, or help him use the restroom, or you have to help her with mobility… whether due to an illness of some sort, or God forbid you're in some sort of accident… they will also pay out.
Do you have any questions about just those two?

Okay, and then lastly, if you'll write down… terminal illness.
That one's pretty self-explanatory. That's if you're going to pass away within the next 12 months or so… Unfortunately the bills still need to be paid even then.
So again, just reviewing all of those… we have death, critical illness, chronic illness, disability and terminal illness.

<If it's a CBO 100, read the next portion. If not, skip it.>
If you do not use the coverage… so if you don't get sick, you don't pass away… they refund all of the monthly premiums that were paid — just as an incentive for you to stay healthy. A lot of people look at it as a zero-risk savings account that also has that safety net, if that makes sense.
Do you have any questions on anything so far? It's pretty simple.

Alright, I'm gonna have you write down a couple of different options, and you can just pick the one that makes the most sense for you…
That second amount, if you'll please write down, <$$$ amount> (often the whole home, plus annual income amount). And then price per month, write <$$$>. *pause*
So the first amount, if you'll please write down, <$$$ amount> (often the whole home amount). And then price per month, write <$$$>. *pause*
So all of these pay out in those 5 different ways. (If cash back, say: "And they all have the cash back.")
The only difference between them is the price per month, as well as the amount of the check you'll receive in the event of 1 of those 5 things happening. You can also mix and match — a higher one on one of you, lower on the other… So it doesn't matter which one you pick, just that you pick one of them.
<BE QUIET for a few seconds>
Okay, so which option out of those do you think makes the most sense?

That's the one most people go with — I agree with that, as well. Alright, I'll wrap up processing and then we'll be all set in just a few minutes here.
I need 3 things from both of you, please *pause* <keep the next part flowing>
1. I need you both to text me a picture of the front of your ID… I just have to make sure I've been talking to you as the homeowner this whole time.
2. Grab whatever checking and routing number you want associated with this every month, and have that ready to read off to me at the end.
3. And then, do you have a primary care doctor that you see?
<PROCESS APP>
<Give company name and policy number RIGHT after they give the banking info>
After you give them the policy number, say…
Your policy will be fully active within 2-5 business days once you're through underwriting, and that is when your first payment will draft, so please ensure you have that payment in there.
About a week or 2 later, you'll receive a big policy packet in the mail. (Prosperity is via email.) Please let <beneficiary> know where that is and what it's for. We don't want any unclaimed funds. Once you receive that packet, call <insurance company> and tell them what date you'd like it to come out every month. If you don't call them, they'll just draft it on today's date, every month.
And then I'm going to text you my contact info… One second here…
<Text them your picture and name> Please save my contact in your phone and write it down — just in case you ever need to make a claim or want to increase your coverage, I'll help you and walk you through that.
And then lastly *pause*… this is VERY important... *pause* I am now assigned to your file here for the security of your information. *pause* If ANYone calls you about mortgage protection and they don't have that security code of <security code>, hang up and contact me immediately. We will never discuss this with you without having that security code, okay?
You are all set here. Did you have any questions for me?
Then you are good to go. You have my contact here if you need anything, but you should be all set. You have a good day!`,
  },
  {
    id: 'pinnacle-older-dual-purpose',
    category: 'Mortgage Protection',
    label: 'Pinnacle — Older 60+ (Dual-Purpose Policy)',
    scenario: 'Older clients, typically 60+ · whole life / dual-purpose',
    body: `<Coach note: when sitting with a couple, it is crucial to identify where the income is coming from and what will happen to that income when they pass away.>

INTRO
Hi <client>, this is <agent>. I'm just calling you for our mortgage protection appointment that we have. Give me juuust a second to pull you up here…
<If it's a couple, make sure the significant other is there> ("Hi, how are you?")
OK, and I have that security code I gave you, it's ________.
We are at <address>. We're of course with <lender>. And we haaave <$$ ON LEAD> approximately left on the home — does that sound about right?

Okay, so again, my name is <agent>. My job is pretty boring, but super important — it's just to walk you all through the mortgage protection process and the ways it pays out to us as homeowners… So are all you familiar with the mortgage process at all, ooor is this kinda you guys' first time goin' through everything?
<no matter what response, keep going>

Got it. So things are done a lot differently than how they used to be done. <lender> used to bake it in with the home, now it's always done separately for several different reasons. The biggest reason being, you're the beneficiary now, and not <lender>. So now, anytime you purchase a home, you refinance, you take out a home equity line, you have three crucial coverages to put in place. You're actually familiar with them…

1. Homeowners insurance — covers the physical structure of the home from flood, fire, anything like that.
2. PMI, or private mortgage insurance — protects <lender> if for some reason you don't feel like paying your bill anymore.
And then Mortgage Protection — the third and most important out of the 3 — the only one that pays out directly to us as homeowners.

It's a pretty comprehensive coverage that pays out in several ways, so they just require you to be risk assessed. That's all my job is — verify you are who you say you are, ask a couple health and financial questions, go over the payout of the policy, and submit proof of coverage at the end. It sounds like a lot, it's really not — a pretty quick, easy process, okay?

<Complete financial inventory>
Okay, bear with me… I'm gonna put you on a brief hold while I type out a couple things here. Please grab a pen and a clean piece of paper — whoever has the neater handwriting out of the two of you, I'm gonna have you write a couple things down…
<Call your mentor to ask for product positioning.>
<Make sure you check in with your clients every 3 minutes.>
"I'm still here with you — thank you for your patience…"
"Just about done here… FYI…"
<Write quotes down and have ready to read to the client.>

WHOLE LIFE (DUAL-PURPOSE POLICY) POSITIONING
Alright, I apologize for that wait, thank you for your patience.
So this part is very crucial, so please, if there's something you don't understand, let me know. But overall, I get paid to simplify things and break them down, so you shouldn't have too many questions. *pause*
There are three different ways to do mortgage protection. You can kinda chat back and forth with me, tell me your thoughts on what makes sense, as well.
The first way is to have coverage that pays off that full amount of the <$ amount on lead>. *pause*
The second way is to have one that pays off half of that amount.
I'll beee 100% frank with you *pause* — I meet with a lot of people in your age bracket each week, and NO one ever does those first 2 options, for a feeewww reasons.
The biggest reason being, those are both what we call a TERM policy. I'm not sure if you're familiar with what a term is, but a term is fooorrr… a term. It's only in place for a certain period of time. If you were in your 20s that'd be one thing, but at your age it never makes sense to have coverage in place only for a few years… then the policy is over… then we have nothing. On top of that, NOW we may not even be able to get anything in place because of our age and health. Does that make sense?
So what MOST everyone your age does is what's called a dual-purpose policy. A lot of people really like it because it acts just like mortgage protection AND life insurance in one. It's called "mortgage protection" because <beneficiary name> can use it on the payments of the home, the transferring fees… ANYthing your income currently pays for with the home. But ALSO, since it goes directly to <beneficiary> and <lender> can't touch it, they can also use it for funeral expenses and anything else you and <beneficiary> decide.
It's the most affordable, the cost never goes up, it doesn't expire, and it pays out in 4 different ways. It's just a solid, dual-purpose policy specifically made for seniors. That is 100% what I'd recommend and what most people your age typically go with. Would you agree with that as weeeellll? What are your thoughts?
(let client respond)

<If they say they want the whole home amount>
Sure! Now remember… the whole home amount is that term product we talked about. It's the most expensive product, and you'll be paying into something that will quickly end in a few years. Unless you have a life expectancy of a few years, I'd highly recommend we look at the dual-purpose policy — your beneficiary is guaranteed to get a check, it's just simply the date and time. Does that make sense?
<Once they say yes>
Okay, perfect. I assumed so, but just wanted to make sure we were on the same page. Alright… if you'll grab that pen and paper, I'm just gonna have you write down the 4 different ways the policy pays out. Let me know whenever you're ready.
Okay, the first way it pays out, if you'll please write down *pause* natural cause death. *pause*
The second, write *pause* accidental death. *pause*
The third, if you'll please write down *pause* terminal illness.
And the fourth, write down cash value.

(!!!TALK VERY SLOW HERE!!!)
I'll explain what each of these mean in just a minute, but first, on the other side of that paper, if you will, draw 3 different clean columns. *pause* And please don't let this overwhelm you at all, it's VERY simple and I'll walk you through it. *pause*

[EXAMPLE — how each column should look for a face amount of $20,000:]
($40,000) — Total death benefit (the total death benefit is whatever the face amount is times 2)
($20,000) — Natural death
+
($20,000) — Accidental death
($132.79) per month

1. In the first column, at the very top, please write <coverage amount times 2>. *PAUSE* Draw a line under that. *pause* Below that, write <coverage amount>. Next to it, put a dash, and write natural death. *pause* Underneath that, write a PLUS sign, then <coverage amount>. Next to it, put a dash, and write accidental death. Then below that, write <$ price per month>.
2. In the second column, at the very top, write <coverage amount times 2>. *PAUSE* Draw a line under that. *pause* Below that, write <coverage amount>. Next to it, a dash, natural death. Underneath, a PLUS sign, then <coverage amount>. Next to it, a dash, accidental death. Then below, <$ price per month>.
3. In the third column, at the very top, <coverage amount times 2>. *PAUSE* Draw a line under that. *pause* Below that, <coverage amount> — you probably see a pattern here… Next to it, a dash, natural death. Underneath, a PLUS symbol, <coverage amount>. Next to it, a dash, accidental death. Then below, <$ price per month>.

Okay, so let's break this down. *pause*
The number at the very top of each column… *pause* that is the total amount of coverage for each of those columns. *pause*
Right below that is the first way the policy pays out. If you were to pass away from a natural-cause death, they'll send that check directly to your beneficiary.
Below that, where it says plus, then <coverage amount> dash accidental death… *pause* That's the second payout. If you were to pass away from an accidental or external death — like falling down the stairs, hitting your head — they're going to double the payout. So <beneficiary name> will receive an ADDITIONAL <coverage amount>, solely for the fact that it was an accidental death.
And then below that, price per month. <keep it moving — don't pause>

All of these columns also pay out while you are LIVING, unlike traditional life insurance. So if you were to get a diagnosis like cancer, or you're given 12 or less months to live, they'll pay you up to half of that natural death amount *pause* while you are living. Now keep in mind, that would take away from the death benefit, but nonetheless, we at least know it's there if we need it.
This also builds interest and gains a cash value that you can pull from. It's nothing crazy, but again, at least you know it's there for a rainy day if needed.

Okay, <client>… So ALL 3 of these columns pay out in the same 4 ways. The only difference is the check amount that will be received by <beneficiary name>. It doesn't matter which one you pick out of the 3, just that you pick one of them.
<BE QUIET for a few seconds>
Okay, so which option out of the 3 do you think makes the most sense?

Alright, I'll wrap up processing and then we'll be all set in just a few minutes here.
I need 3 things from you, please *pause* <keep the next part flowing>
1. Text me a picture of the front of your ID… I just have to make sure I've been talking to you as the homeowner this whole time.
2. Grab whatever checking and routing number you want associated with this every month, and have that ready to read off to me at the end.
3. And then, do you have a primary care doctor that you see?
<PROCESS APP>
<Give company name and policy number RIGHT after they give the banking info>
After you give them the policy number, say…
Your policy will be fully active within 2-5 business days once you're through underwriting, and that is when your first payment will draft, so please ensure you have that payment in there.
About a week or 2 later, you'll receive a big policy packet in the mail. (Prosperity is via email.) Please let <beneficiary> know where that is and what it's for. We don't want any unclaimed funds. Once you receive that packet, call <insurance company> and tell them what date you'd like it to come out every month. If you don't call them, they'll just draft it on today's date, every month.
And then I'm going to text you my contact info… One second here…
<Text them your picture and name> Please save my contact in your phone and write it down — just in case you ever need to make a claim or want to increase your coverage, I'll help you.
And then lastly *pause*… this is VERY important... *pause* I am now assigned to your file here for the security of your information. *pause* If ANYone calls you about mortgage protection and they don't have that security code of <security code>, hang up and contact me immediately. We will never discuss this with you without having that security code, okay?
You are all set here. Did you have any questions for me?
Then you are good to go. You have my contact here if you need anything, but you should be all set. You have a good day!`,
  },
  {
    id: 'pinnacle-aged-lead',
    category: 'Mortgage Protection',
    label: 'Pinnacle — Aged Lead (One-Call Close / Appt Booking)',
    scenario: 'Aged mortgage leads · booking + one-call close',
    body: `<Coach notes: Tonality is key — Cool, Calm, Confident, and Collected.
"Chill / blasé" lines = remember to smile.  "Assertive" lines = slightly annoyed & assertive.>

OPENING (CALL-IN / OUTBOUND)
<clients name>? *(wait for the client to respond)* It's <your name>. Giving you a quick call here… I work with the brokerage, and we handle the mortgage protection for <lender>.
Your file that's associated with your property on <street name> just came across my desk, and it's showing me as incomplete… The only reason for that is, sometime around when you closed with <lender>, we sent you several things in the mail about the mortgage protection — right, where it pays off the home if you get sick or pass away.
You actually did the right thing — you filled out the card, you mailed it back into us… But for some reason, on our end, we haven't gotten that completed… I'm the manager in the area here, so I just wanted to make sure we took care of you.
Now, is it just you in the home, or is there a significant other or spouse there with you?
Just had a few minutes before my next call… grab a pen and paper for me real quick — should take about 10 min or so to get this knocked out.
*If yes — one-call close it.*  *If no — book an appt.*

BOOKING THE APPOINTMENT
(*Act busy!*)
Perfect, I typically run by appointment only anyways — let me see where I can squeeze you in here… what's the latest you'll be home today? Ok, gotcha — unfortunately I don't have that time available, but I can squeeze you in between <time> to <time>. Any reason you wouldn't be available to speak at that time? Perfect, I'll put you down for that.
And how do you keep track of your appointments? (typically Google Calendar, physical calendar, write it down, etc.) Perfect, let me know when you have your calendar pulled up… *(have them write your name down, appointment time, and a security code)*
Alright, I have you down for ____ today. Again, any reason you wouldn't be able to speak at that time? Ok gotcha — the reason I ask is because I have a full day of helping families, and when someone misses their appointment it really messes up my schedule. Anyway, I have you down for that, so looking forward to helping and serving your family then.

<If no answer, leave this message>
Good morning, this message is for <Name>, this is <agent> getting back to you regarding your mortgage with ____. We have some pending paperwork to get back to you on regarding an internal audit on the mortgage for <address>. Give me a call back at <phone number> regarding pending paperwork.

<Text script>
<clients name>, this is <your name> regarding your mortgage with <lender>. Just left you a message. Give me a call back when you get this — we have some pending paperwork to get out to you regarding the mortgage for <address>. The office number is <your phone number>. Thanks.

ONE-CALL CLOSE / APPOINTMENT SCRIPT
INTRO  *(remember to smile, relax, & be super confident)*
Ok great — is this your first time going through the mortgage protection process, or have you been through this process before…?
It's pretty simple — basically I'm going to spend 2 min asking you some health and financial questions, and based on that it's my job as the medical underwriter to run it through the carriers in the state of ___ that offer mortgage protection. The reason is to figure out some various options you'll qualify for, then God willing we're able to figure something out that makes sense financially for you and your family. I'll present those various options to you. From there you let me know what's comfortable and affordable, then we'll simply submit a request for coverage. Make sense? *(wait for the client to respond)* Great.

So when you go to buy a home there are 3 types of insurance on the home:
1. Private mortgage insurance (PMI) — something the bank requires if you put less than 20% down. Does nothing for you or your family; simply put in place to protect the bank.
2. Homeowners — protects the physical property of the home in the event of a flood, fire, etc.
3. Mortgage Protection — the 3rd and most important type of coverage. This protects you and your family in the event you were to become sick, disabled, or pass away, to ensure your family is able to stay in the home and it's taken care of.
Make sense?

Mortgage protection isn't something you can just sign up for at any time like life insurance — it's something you actually have to qualify for. So once we go to submit a request for coverage, there are 3 pieces of information required on the application, just like any other insurance app:
1. First, your driver's license, to confirm your identity. Do you have that on hand? *(wait)* Awesome.
2. Secondly, your social. That's how they'll check your prescriptions and medical history — the main factor on whether you're approved or declined.
3. Thirdly, either a bank statement or a voided check to confirm there's no prior insurance fraud, money laundering, or anything else illegal linked to your account — and of course that's how you'll be paying for the policy.
Make sense? *(wait)* Great.

*Boom! Go into the financial inventory & start filling it out!*
If you are new: once the financial inventory is filled out, unmute on the live dials OR call your mentor and they'll show you what to write.

BUILDING THE WHY  *(Bring out the emotion, DIG DEEP!)*
Ok <name>, before we go any further, I'm obviously here to help and serve you, as well as figure out some sort of protection for this home — because this house is your biggest asset and of course we want to do everything we can to protect and preserve it. I'm assuming the main reason you mailed the request into my office and took the call was to ensure that, God forbid something happens to you, you're not leaving a burden to <beneficiary>?
Gotcha. I'm assuming as well you were looking for coverage on the living side. (phrased as a statement, not a question) So God forbid any situation where you become sick, disabled, have cancer, heart attack, or any other critical, terminal, or chronic illness or disability — that your mortgage is taken care of?
Mhmmm, got it, ok, understood….. *(use effective pauses here)*

EQUITY PROTECTION
As I'm sure you're already aware, <name>, if you wanted to cover the entire mortgage that would be close to another mortgage payment… which, don't worry, none of my clients do in your situation. What my clients do in your situation is put together an equity protection plan.
Has anyone walked you through how the equity protection process works?
Gotcha — basically it's a much more practical, much more affordable approach to protecting the mortgage. My goal with you and all of my clients is to solve the maximum amount of your needs with the least amount of insurance possible. Now, this plan is different for every client and situation, so let's figure that out —
• God forbid something happened to you yesterday, who would the home be going to today?
• When it goes to <beneficiary>, do they plan on selling the home or keeping it?
• Does <beneficiary> live with you or do they have their own place?
• Is <beneficiary> local or out of state?
• Does <beneficiary> rent or own?
Ok gotcha — well, really for your situation the most amount of insurance you would need, <clients name>, is around a year to 2 years of mortgage payments, to allow <beneficiary> time to mourn, grieve, recover, figure out the financial situation, and move forward in a healthy manner.

*If they plan on selling:*
…as well as get the house cleaned up, cleaned out, put on the market, and eventually sold. What this policy allows for is to give <beneficiary> that grace period of time to get things figured out and get the home sold, so he/she isn't forced to fire-sale the home for 10k, 20k, 50k less than what it's fully worth because they couldn't afford to keep making the mortgage payments on top of their own bills. Does that make sense, <clients name>?
Perfect. The main goal of this policy is to provide <beneficiary> enough time to get things figured out and move forward in a healthy manner — as well as (*ONLY use this if they have equity in their home*) protect the <amount of equity> in your home! Does that make sense?
Perfect — so we're going to be looking at 9 months, 1 year, & 18 months of mortgage payments. I want you to let me know what's affordable and comfortable, and we'll go from there. Let me know when you're ready to write down the options.
*Boom! Have them write down the 3 options, have them pick one, then start filling out the e-app!*

TYING DOWN THE SALE
(Tie downs at the end are huge — PROVIDE VALUE IN YOURSELF.)
Appreciate your patience, just wrapping up now, <clients name>. Do you still have that pen and paper handy? Perfect — just going to have you write down the details of your coverage so there's no confusion.
*Have them write down:*
• Name of the company
• Premium per month
• Recurring bill date
• Their benefits (living benefits, cash value, permanent coverage, cash back, etc.)
• Your name and number (MAKE SURE they also have your contact saved in their phone)
• Security code (this can be anything you want — intended to prevent other agents from replacing your policy)
Alright <clients name>, those are the details of your coverage. When you see <coverage amount>, don't be alarmed — that's your mortgage protection policy. You're also going to receive the policy packet in the mail within the next 7 to 10 business days; if you don't get it within that time, give me a call and we'll get another mailed out to you.
Make sure <beneficiary> also has my contact, because God forbid when something happens to you, <clients name>, I'm the guy that's going to be putting my foot on the insurance company's throat to make sure your family is taken care of and paid out fast.
Lastly, that security code I gave you — keep that safe. If anyone calls you claiming to be me or from my office and they don't have that code, hang up and block their number, because they're trying to scam you or get information.
Any questions on anything we went over? Sounds good — I'll be calling you in a year to check in on your benefits, but for today it was a pleasure helping and serving you, <clients name>. Give me a call or shoot me a text if you need anything else. Have a blessed day, and talk in a year.`,
  },
  {
    id: 'pinnacle-call-in',
    category: 'Mortgage Protection',
    label: 'Pinnacle — Call-In Lead (Second Chance Booking)',
    scenario: 'Second-chance call-in lead · booking',
    body: `OPENING
Hey — this is <agent>. I just have to reach out about your file for your home on <address> that you closed out a few weeks ago with <lender>. I just have to confirm you received an important letter we sent you right after closing about mortgage protection. That's the coverage that pays off or down the home should you get sick or pass away. Does that sound familiar at all?
Okay, perfect — that's the reason I have to call you.
I'm the manager here in <city> assigned to meet with you over the phone for about 20 mins. I just have to go over that coverage with you as the homeowner, and then from there you'll be all set, okay?

TIE DOWNS
Just for security, we're at <full address>.
And is it just you in the home, or is there a significant other or spouse that lives with you as well?
<If yes> "Okay, would they be the beneficiary of the home?"
<If yes> "Okay, then they'll need to be present on that call as well."
<If no, continue script> Okay…
So… let me seeee… *pause*
I can do either tomorrow morning, or afternoon for that call. Which do you prefer?
Okay, if you could just grab something to write with, I just need to give you our security code.
*SLOW DOWN*
Okay, that's T……156.
And write my name, it's <agent>.
And then tomorrow, <hour time frame>.
And again, that's T……156. My name is <agent>. Tomorrow, <hour time frame>.
Do you want me to call this number right here for our appt?
And then you can get text messages on this line, I assume?
Okay. I'll shoot you a text when I'm about 10-15 minutes from calling.
If you'll do me a favor as I let you go here… just as a courtesy, please make sure you're intentional about having your phone on you and that you're available during that hour. I would appreciate it.
You're all set. Have a good day and I'll talk to you tomorrow between <hour time frame>.

REBUTTAL — "Are you with my bank?"
Yep — we're Pinnacle Life Group. We handle the mortgage protection with <lender> and every lender in the state of ___. They handle the mortgage closing, and we handle the mortgage protection for the county.`,
  },
  {
    id: 'fe-pinnacle',
    category: 'Final Expense',
    label: 'Pinnacle',
    body: `FINAL EXPENSE SCRIPT

Hey <client>, this is <agent>, <agent first & last>? (SAY NAME AS A QUESTION)
Yeah, I'm getting back to you about the form that you filled out online, looking for information on final expense / life insurance.
Now, you put your address down as… is that correct? Perfect.
Now <client>, if something unexpected were to happen to you, who would be your beneficiary? (let them respond)
And probably like most of our clients, you're just wanting to make sure <beneficiary> is not left with that financial burden, correct?
And <client>, before we get started — what made you start thinking about getting coverage?
A lot of people start looking into this after losing someone close or having a health scare. Would you mind sharing what's been on your mind?
Now, have you been through this process before, or is this your first time?
<If yes> And <client>, what is the reason you haven't been able to put anything in place?
<If no>
So <client>, most of my clients feel comfortable moving forward with this coverage when we find something that:
1. They can qualify for
2. They completely understand
3. Something they can easily afford
Does that sound reasonable?

Okay, perfect. So, awkward question for you, <client> — if something were to happen yesterday, what would it look like for <beneficiary>? How would he/she be able to pay for your funeral expenses?
So <client>, I'm just the underwriter that got assigned to your case, and I'm also a broker — so what that means is I work with all of the final expense carriers here in the state, which allows me to find you the best coverage available.
This process is pretty simple. What I'm going to do today: I'm going to ask a couple minutes of health questions to see what you're medically eligible for, and then a couple minutes of financial questions to make sure we're realistically fitting something within the budget. Based on how you answer, I should be able to run through some options for you.
Now <client>, I have no loyalty to one carrier over another — I'm simply going to look for the ones that will offer you the best rate and that will most likely approve you. Does that make sense?
Ok, perfect! So <client>, just so I can get started here — what is your date of birth? … <continue into financial inventory>

~FINANCIAL INVENTORY~
So <client>, when you pass away, are you looking to be cremated or getting a regular burial done?

(EXPLAIN PRODUCT)
Now here's how the final expense coverage is going to work for you:
1. This is permanent coverage, meaning this policy will never expire.
2. The premiums will never go up on you.
3. This is day-1 coverage (if healthy enough).
So <client>, what questions do you have for me?

Now <client>, is this coverage kind of exactly what you were looking for?
<If yes> Perfect.
<If no> No problem, <client> — what were you hoping to find?

Now <client>, here's what most of my clients do:
SHOW 3 OPTIONS (depending on client's needs). Give a reason why you chose each option.
1. (Silver Program)
2. (Gold Program)
3. (Platinum Program)
Now <client>, we obviously can't really make a decision today anyway, because I don't even know if the carrier would approve you. But if they were to approve you, which option do you think would make the most sense for you?
~Let them choose…~
Perfect!
~Send your credentials~
Get into e-app.`,
  },
  {
    id: 'li-pinnacle',
    category: 'Life Insurance',
    label: 'Pinnacle',
    body: `LIFE INSURANCE SCRIPT

Hey <client>, this is <agent>, <agent first & last>? (SAY NAME AS A QUESTION)
Yeah, I'm getting back to you about the form that you filled out online, looking for information on life insurance to protect your family in the event of a death. My name is <agent> and I'm the manager assigned to help you with that information. But I need to first verify what you put down to make sure it's correct…
Now, you put your address down as… your DOB is ________. (verify whatever information is on the lead you are calling — this establishes credibility) Is that correct? Perfect.
Now <client>, if something unexpected were to happen to you, who would be your beneficiary? (let them respond)
And probably like most of our clients, you're just wanting to make sure <beneficiary> is not left with that financial burden when you pass away?
Ok, I understand. And <client>, before we get started — what made you start thinking about getting coverage?
A lot of people start looking into this after losing someone close or having a health scare. Would you mind sharing what's been on your mind?
Now, have you been through this process before, or is this your first time?
<If yes> And <client>, what is the reason you haven't been able to put anything in place?
<If no>
Ok. So <client>, as a field underwriter, my goal is to accomplish 3 things for you and your family:
1. Something you can easily afford — because at the end of the day, the only plan that makes sense is the one that will be in place for your family when you pass, and that's going to be the one you can afford until that happens. The worst thing is to have it for a period of time and then lose it.
2. You can qualify for the protection — that we're not sending it in to carriers that look good but won't qualify it.
3. You completely understand it — because the worst thing is to think you have something you actually don't really have. So my job as a field underwriter is to make sure you can understand it. Does that make sense?
Okay, perfect. The process is pretty simple: as a field underwriter I'm going to go over some questions about your health and situation, because every situation is a little unique and different. I'll then look at the different carriers, put together a couple different options, and once we find a good fit, we'll fill out a request for coverage and see if we can get it qualified. If they do say no, it's not a big deal, as I'm not a sales rep — I field underwrite and work with all the carriers, so we can look at another carrier that might say yes. Does that make sense?

~FINANCIAL INVENTORY~
• Are you and your spouse both working?
• What's your income?
• Taking any medication — what is it for?
• Cancer, heart attack, stroke, surgeries last 5 years?
• Any private life insurance protection in place? (If it's work coverage — anything outside of work? Work coverage is great because it's affordable and sometimes free, but it's group. So if you got sick and were put on inactive or retired, it goes away. And in certain cases when you can convert it to private at retirement, because of age and it converting to a high-risk standard rate — because they don't know your health — it becomes unaffordable to do so. It can go to $500+ a month and then goes up as you enter each new 5-year age bracket, so most clients just let it go and end up with nothing. That's why most families have both. Does that make sense?)
• Anything that will act like life insurance when you pass away, like 401ks, IRAs, mutual funds?
So <client>, when you pass away, the income will go from _______ to _______, and you want to make sure that doesn't create a financial hardship? Ok, I definitely understand.

(EXPLAIN PRODUCT)
If final expense — now here's how the final expense coverage is going to work for you:
1. This is permanent coverage, meaning this policy will never expire.
2. The premiums will never go up on you.
3. This is day-1 coverage (if healthy enough).
If it's for income replacement or to cover the mortgage — talk about how it will cover the mortgage for so many years and/or so many years of income replacement (whatever is the hot button).

So <client>, what questions do you have for me?
Now <client>, is this coverage kind of exactly what you were looking for?
<If yes> Perfect.
<If no> No problem, <client> — what were you hoping to find?

Now <client>, here's what most of my clients do:
SHOW 3 OPTIONS (depending on client's needs). Give a reason why you chose each option.
(Remember: talk about what the death benefit does, not just the amount. Example: if the death benefit is 20k and the need is final expense, but you also see a need for income replacement because a spouse or child depends on that income, you'd say: "This option will cover your final expenses, so if you didn't wake up tomorrow your spouse/child wouldn't be burdened with the expense — they'd have peace of mind knowing that even though emotionally there's a struggle, there'd be no financial struggle added to it. This would also cover X months of income replacement, so they could mourn, grieve, and recover without having to think about what to do." Go through every option like that — this is where you enhance the value so the price is put in perspective with the value it brings. When value exceeds price, people buy.)
1. (Silver Program)
2. (Gold Program)
3. (Platinum Program)
Now <client>, we obviously can't really make a decision today anyway, because I don't even know if the carrier would approve you. But if they were to approve you, which option do you think would make the most sense for you?
~Let them choose…~
Perfect!
~Send your credentials~
Then ask them to get their driver's license, as you'll need to verify. Get into e-app.
Now, if we can accomplish that, would it make sense — like for most clients — to see if you could qualify for the protection?`,
  },
]

// ---- Unified script sets for the Default/Pinnacle selector ----
export type VariantKind = 'sectioned' | 'full'

export interface ScriptSet {
  id: string
  category: Category
  label: string            // 'Default', 'Pinnacle — Single / Younger (Term)', ...
  kind: VariantKind
  // sectioned (Default) fields:
  opening?: string
  discoveryQuestions?: string[]
  transition?: string
  close?: string
  rebuttals?: { objection: string; response: string }[]
  // full (Pinnacle) fields:
  scenario?: string
  body?: string
}

const defaultSets: ScriptSet[] = scripts.map((s) => ({
  id: s.id,
  category: s.category,
  label: 'Default',
  kind: 'sectioned' as const,
  opening: s.opening,
  discoveryQuestions: s.discoveryQuestions,
  transition: s.transition,
  close: s.close,
  rebuttals: s.rebuttals,
}))

const pinnacleSets: ScriptSet[] = pinnacleScripts.map((p) => ({
  id: p.id,
  category: p.category,
  label: p.label,
  kind: 'full' as const,
  scenario: p.scenario,
  body: p.body,
}))

export const scriptSets: ScriptSet[] = [...defaultSets, ...pinnacleSets]

// Variants for one product, Default first. Use this to build the selector.
export function getScriptSets(category: Category): ScriptSet[] {
  return scriptSets.filter((s) => s.category === category)
}

// ============================================================================
// OBJECTIONS TAB — Rebuttal Library
// Browsable reference list for the Objections tab (not in the Scripts
// Rebuttals section, not fed to the AI trainer). Tagged by product.
// ============================================================================
export interface ObjectionRebuttal {
  id: string
  category: Category   // product line
  group: string        // grouping within the library
  objection: string
  response: string
}

export const objectionRebuttals: ObjectionRebuttal[] = [
  { id: 'mp-hangup', category: 'Mortgage Protection', group: 'Reconnect', objection: "If they hang up", response: "Hi, ___, seems we got disconnected there. <Go back into the script, or repeat what they said before they hung up.>" },
  { id: 'mp-required', category: 'Mortgage Protection', group: 'Requirement & trust', objection: "Is this required?", response: "Oooof… I mean… technically they won't take your home away if you don't… uh, but I will tell you, you'd be one of the rare people not to put it in place since it's just such a crucial coverage. It'd be like driving a car without car insurance, if that makes sense. *(Act a little confused / thrown off as to why they'd even ask that.)* *Be quiet.*" },
  { id: 'mp-decide-today', category: 'Mortgage Protection', group: 'Stall & decision', objection: "Do I have to make a decision today?", response: "Yyyeesss, I do need to submit that original coverage through today; HOWEVER, since most of us need time to look over our finances to see which option we want, they give you a 30-day policy adjustment period. So we'll start with whichever option you're most comfortable with right off the bat, and then you have a couple weeks to adjust it to a higher amount if you want. Does that make sense? *Be quiet.*" },
  { id: 'mp-think-spouse', category: 'Mortgage Protection', group: 'Stall & decision', objection: "We need a couple days to think about it / talk to my spouse", response: "Okay, sure — do you need to think about whether or not you want the coverage at all, or do you know you want the coverage, it's just a matter of which option to pick? <If they want it:> I'd recommend starting at the low end of what you know you can afford — you're actually going to talk to me again in a year for a review and can bump it up then. Anyway, the address we have on file to mail the policy out to is ____, right? <If they still don't want it:> Go back into the why and dig into their pain points." },
  { id: 'mp-before-closing-bank', category: 'Mortgage Protection', group: 'Requirement & trust', objection: "Why wasn't this done before closing? / Are you with my bank?", response: "Yep, good question! It UUUSED to be done that way. <lender> now handles the mortgage, refi, and equity side of things, and then after closing it's passed off to the mortgage protection department. It's always done right after closing and separately from the home, so that you're the beneficiary now and not the bank. Does that make sense?" },
  { id: 'mp-social', category: 'Mortgage Protection', group: 'Requirement & trust', objection: "Why do you need my social?", response: "Sure, totally get that. They need that to look at your medical and prescription history, and it also prevents fraud so someone's not signing up for coverage in your name. Confirm that social with me again? <If more pushback:> We actually have to carry insurance that, if anybody were able to get through all of our firewalls and access your info, would cover you for up to a million dollars. That should be enough, right? Ok, go ahead with the social." },
  { id: 'mp-banking', category: 'Mortgage Protection', group: 'Requirement & trust', objection: "Why do you need my banking info?", response: "The insurance carrier requires either a voided check or account number to verify there's no insurance fraud or money laundering linked to your account — and of course that's how you'll pay for the policy once approved. Looks like the address on file to mail the policy out to is ____? <If still pushing back:> I also just texted you a link to the Department of Insurance to look up my information and make sure I'm legit — let me know when you get it. (https://sbs.naic.org/solar-external-lookup)" },
  { id: 'mp-already-have', category: 'Mortgage Protection', group: 'Already covered', objection: "I already got this taken care of (took a policy)", response: "Perfect, that's the reason for my call — I see that on your file. To confirm I'm speaking with the right person, the address on file for the policy is ____? And I have your DOB as ___? It looks like one of our junior underwriters helped you with coverage but didn't update your file. Did you get the packet ok? Complete plan or partial? How much coverage, and how much a month? Which company did you go with — any reason you went with a B-rated carrier, or couldn't you qualify for a top-rated one? Any health issues? *(Look up quotes to see if you can get cheaper, or build value on living benefits / cash value.)* This'll only take a few minutes and we can get it switched." },
  { id: 'mp-homeowners-confusion', category: 'Mortgage Protection', group: 'Already covered', objection: "I have this through Allstate / State Farm / AAA", response: "Has anyone explained the difference between homeowners insurance and mortgage protection with you before?" },
  { id: 'mp-closing', category: 'Mortgage Protection', group: 'Already covered', objection: "We took care of that at closing", response: "Correct, you took care of your mortgage at closing, but I'm calling in regards to the mortgage protection. The banks used to offer this before 2008, but now it's contracted out directly to the various insurance carriers, who I work with. It's my job as the state-licensed underwriter to run it through the companies and figure out which option makes the most sense for you and your family. Make sense?" },
  { id: 'mp-no-lender', category: 'Mortgage Protection', group: 'Already covered', objection: "We don't have that lender anymore", response: "Correct, that's the reason for my call — I see that on your file, which is probably why it's still pending and slipped through the cracks; I apologize. To confirm I'm speaking with the right person, the address on file for the mortgage is <address>? As you may recall, this is the coverage that takes care of the home God forbid you become sick, disabled, or pass away. Make sense?" },
  { id: 'mp-dont-remember', category: 'Mortgage Protection', group: 'Reconnect', objection: "I don't remember / didn't fill it out", response: "Did maybe a spouse fill it out? Or a child? (If no:) Do you currently have any protection for your family that pays out if you're sick, disabled, or pass away? That's okay — if you're anything like me, I forgot what I had for breakfast. This'll be quick — grab a pen and paper and we'll get it taken care of." },
  { id: 'mp-not-interested', category: 'Mortgage Protection', group: 'Not interested', objection: "I'm not interested", response: "Understandably — most people aren't interested until they get cancer, become disabled, or God forbid pass away. Anyway, the address on file for the home is ____? *(2nd time:)* I'm assuming what was on your mind when you submitted this request was simply some practical, affordable coverage to protect the home and your family. *(3rd time:)* Are you afraid the price is going to be too high, or that you're going to be declined? <Declined:> I'm the senior medical underwriter assigned to figure out options you'll qualify for. <Price too high:> I'm the manager for the <county/city> area, assigned to figure out more practical, affordable options for your budget." },
  { id: 'mp-off-list', category: 'Mortgage Protection', group: 'Not interested', objection: "Take me off the list", response: "To be frank with you, ___, there is no list — I'm sorry, you may be confused. This is the request YOU submitted in regards to protecting your family God forbid you were to get cancer, become disabled, or pass away. Anyway, the address on file for the home is ____?" },
  { id: 'mp-cheaper', category: 'Mortgage Protection', group: 'Price', objection: "Do you have anything cheaper?", response: "When you jump out of a plane, do you want the cheapest parachute or the best parachute? If you just want cheap life insurance I can certainly help you with that — but you mentioned the <cash value / living benefits> was important to you?" },
  { id: 'mp-busy', category: 'Mortgage Protection', group: 'Availability', objection: "I'm busy right now — can you call me back?", response: "I'm really busy as well and have a lot of families to get to — I'll make this brief. Go ahead and grab something to write with so we can get this taken care of real quick." },
  { id: 'mp-work', category: 'Mortgage Protection', group: 'Availability', objection: "I'm at work", response: "Perfect, I'll make this brief — grab something to write with so we can get this taken care of real quick." },
  { id: 'mp-driving', category: 'Mortgage Protection', group: 'Availability', objection: "I'm driving", response: "I don't want you to get in an accident — go ahead and pull over real quick and I'll get your information pulled up." },
  { id: 'mp-work-coverage', category: 'Mortgage Protection', group: 'Already covered', objection: "I already have coverage through work", response: "That's great that you have some through work, but after you leave, retire, or change jobs, all that coverage goes away. Worst case, if you get sick and end up getting laid off, you lose those benefits too, and then you most likely wouldn't be able to qualify health-wise for any coverage. These are private bills, meant to be supplemented with private insurance. Anyway, the address on file for the home is ____?" },
  { id: 'mp-saw-ad', category: 'Mortgage Protection', group: 'Already covered', objection: "I saw an ad for this", response: "Yes, that's for accidental coverage, so it only covers you if you were to die in an accident. Were you looking for accidental only, or did you want something that covers you for any cause of death?" },
  { id: 'mp-cant-afford', category: 'Mortgage Protection', group: 'Price', objection: "I can't afford it", response: "I completely understand — protecting your family is the most important priority, but we also want to make sure this coverage isn't taking food off the table. I see you were quoted some pretty steep numbers by our sales rep, which is the reason for my call — I'm the medical underwriter assigned to figure out something more practical and affordable." },
  { id: 'mp-have-life', category: 'Mortgage Protection', group: 'Already covered', objection: "We don't need mortgage protection, our home is covered with our life insurance", response: "Has anyone explained the difference between mortgage and life insurance before? Both pay a check directly to your beneficiary when you pass away, but mortgage protection also covers the living side — any situation where you get sick, disabled, cancer, heart attack, stroke, or any critical, chronic, or terminal illness, this pays out to supplement lost income and medical bills. The biggest cause of bankruptcies and foreclosures isn't death — it's unforeseen medical bills or being disabled and unable to work. You're far more likely to become sick or disabled than to pass away. Make sense?" },
  { id: 'mp-selling', category: 'Mortgage Protection', group: 'Home status', objection: "We're going to sell the home", response: "Perfect — this coverage actually sticks with you and transfers when you buy a new home. Do you plan on staying local, or moving out of state?" },
  { id: 'mp-sold', category: 'Mortgage Protection', group: 'Home status', objection: "We already sold the home", response: "Perfect — did you purchase a new home, or are you renting? <If bought:> That's why your file flagged as incomplete — what's the new mortgage address? I'll update it for you. <If renting:> We also handle life insurance that covers you if God forbid you become sick, disabled, or pass away — have you gotten that set up yet?" },
]

export function getObjectionRebuttals(category: Category): ObjectionRebuttal[] {
  return objectionRebuttals.filter((r) => r.category === category)
}

// ---- Cross-sell tool (Referral). Surface wherever you decide. ----
export const referralScript = {
  id: 'pinnacle-referral',
  label: 'Pinnacle — Referral Script',
  body: `REFERRAL SCRIPT
*While filling out the application for a client*

One thing the office requires now, due to there being 5 billion dollars in unclaimed life insurance last year, is for us to put an emergency contact list on file for the policy. They require me to list 5 people on file that I can get a hold of, God forbid when something happens to you, to make sure your family is paid out and everything is taken care of accordingly.
*List 5 names, relation to the insured, & their phone number.*
Awesome, got those all listed. The office just has me give them a call and run them through some information. I just shot you a text — please copy, paste, and send that to the 5 people we listed on your emergency contact list.

*Text to send:*
"Hey, I put you down as one of my emergency contacts on my life insurance policy. My underwriter (<your name>) for the policy is going to call you and run a couple things by you. This is his/her number (<your number>), so save the number in your phone so when he calls you, you know it's him and answer."

*Calling the referral:*
Hey <name>, it's <your name>, calling in regards to the policy I helped set up for <relation to the client>. He/she had listed you as the beneficiary / emergency contact — did he let you know about this?
<Yes> Perfect — so yes, you are the beneficiary of <client>'s policy, so one thing that's required is that I give you a quick phone call to run a couple things by you, as well as make sure you have my contact information, God forbid when something happens — because of there being 5 billion dollars in unclaimed life insurance every year.
<No> Ahh, he's funny — I told him to give you a call and let you know, but he probably forgot, no worries. Anyway, he put you down as the beneficiary of <client>'s policy, so one thing that's required is that I give you a quick phone call to run a couple things by you, as well as make sure you have my contact information, God forbid when something happens — because of there being 5 billion dollars in unclaimed life insurance every year.
This is my personal number, so please save it in your phone so you know how to get a hold of me. Also, I was talking with <referring insured> and they didn't specify if you have your life insurance set up yet. Have you gotten that taken care of…?
<If yes> Gotcha — who do you have that set up through? Hmmm, ok, that looks like one of our B-rated companies… let me check to see if there are any better options available for you…
<If no> Ok, no worries — I actually have about 10 min before my meeting here. Do you have a pen and paper handy?
*Boom! Go into one-call closing it.*`,
}
