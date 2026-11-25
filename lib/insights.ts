export type InsightBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }

export type Insight = {
  slug: string
  title: string
  description: string
  date: string
  displayDate: string
  readingTime: string
  topic: string
  content: InsightBlock[]
}

export const insights: Insight[] = [
  {
    slug: "what-smbs-should-automate-first",
    title: "What a growing company should automate first",
    description:
      "Most growing companies do not have an AI problem. They have two or three tasks that quietly take the morning. Start there.",
    date: "2026-03-04",
    displayDate: "4 March 2026",
    readingTime: "6 min",
    topic: "AI automation",
    content: [
      {
        type: "p",
        text: "The useful question is not “where can we use AI?” It is “which repeated task is expensive, already digital, and safe to draft before a person signs off?” If you cannot name that task, you are not ready for a tool. You are ready for a conversation with the people doing the work.",
      },
      {
        type: "h2",
        text: "A task is a candidate when three things are true",
      },
      {
        type: "ul",
        items: [
          "It happens often enough that an hour saved is a real hour, not a demo.",
          "The inputs already live in an inbox, a form, or a system of record.",
          "A wrong answer is recoverable because a person reviews it before it reaches a customer, a chart, or an invoice.",
        ],
      },
      {
        type: "p",
        text: "Quoting, intake, scheduling reminders, and first-pass support triage usually qualify. “Strategy,” brand voice, and anything that depends on a relationship usually do not — at least not as the first project.",
      },
      {
        type: "h2",
        text: "Do not start with a public chatbot",
      },
      {
        type: "p",
        text: "A chatbot on the website feels like progress and rarely touches the work. It answers questions your team already handles in a sentence, and it improvises on the questions that matter. We have watched clinics, logistics teams, and professional firms turn these off. The replacement that sticks is quieter: a queue inside the job they already do, with the last few real examples sitting next to the draft.",
      },
      {
        type: "h2",
        text: "Leave these alone, for now",
      },
      {
        type: "ul",
        items: [
          "Decisions with a thin history. A model cannot learn a rate you have only quoted twice.",
          "Anything customer-facing with no review step. Speed is not worth a confident wrong answer.",
          "A roadmap of twelve automations. Ship one workflow. Then decide if the second one is real.",
        ],
      },
      {
        type: "p",
        text: "If you can describe the task in one sentence, and a new hire could follow a checklist for it, it is probably worth a scoped build. If you cannot, the next step is not software. It is writing the checklist.",
      },
    ],
  },
  {
    slug: "custom-app-or-another-subscription",
    title: "When a custom web app is cheaper than another subscription",
    description:
      "Another software subscription looks inexpensive until someone still copies the same details by hand. Here is how to compare the cost.",
    date: "2026-06-18",
    displayDate: "18 June 2026",
    readingTime: "7 min",
    topic: "Web applications",
    content: [
      {
        type: "p",
        text: "Small and mid-sized companies rarely overspend on software licenses. They overspend on the person who copies a row from one product into another, then checks it because the two products do not agree. That person is usually a founder, an office manager, or a senior operator. Their hour is the expensive part.",
      },
      {
        type: "h2",
        text: "Compare a year, not a sticker price",
      },
      {
        type: "p",
        text: "A ₹4,000 subscription against a ₹15 lakh build is the wrong comparison. Put a year of seats on one side. On the other, put the hours of rework, the errors that became refunds or missed orders, and the deals that waited because the answer lived in someone’s WhatsApp. If that total is larger than a fixed-price build — and the work is not going away — the custom app is the cheaper system.",
      },
      {
        type: "h2",
        text: "Build when the workflow is the business",
      },
      {
        type: "p",
        text: "Ordering, client intake, partner access, the status page customers keep asking for: these are not side tasks. They are how the company makes money or keeps a promise. A generic tool will cover eighty percent and leave the twenty percent that makes you different on a spreadsheet. That remainder is the product.",
      },
      {
        type: "h2",
        text: "Buy when the process is generic",
      },
      {
        type: "ul",
        items: [
          "Payroll, email, and accounting, unless you are in the business of replacing them.",
          "A marketing site that only needs a clear offer and fast pages. That is a website project, not an application.",
          "A process you have not run manually for a month. Software will freeze a habit you have not learned yet.",
        ],
      },
      {
        type: "p",
        text: "The right first version is smaller than the tour you would give an investor. One person, one job, one connection to a tool you already use. If it removes the rework, you have earned the next piece. If it does not, you found out in weeks, not in a long project.",
      },
    ],
  },
  {
    slug: "a-performance-budget-you-can-keep",
    title: "Keep the page fast enough to earn the visit",
    description:
      "Agree how fast the page must be before design starts. Otherwise it gets heavier than the visits you are paying for.",
    date: "2026-09-09",
    displayDate: "9 September 2026",
    readingTime: "6 min",
    topic: "Websites",
    content: [
      {
        type: "p",
        text: "Decide how fast the page must be before anyone designs it. The limit is simple: the main content appears quickly on a normal phone, and you do not let extra tools slow that down. Design and chat widgets are where the limit usually dies.",
      },
      {
        type: "h2",
        text: "Limits strict enough to matter",
      },
      {
        type: "ul",
        items: [
          "Largest contentful paint under 2.5 seconds on a mid-range phone over a decent connection. Faster if the page is a paid landing page.",
          "No layout shift from late fonts, banners, or chat widgets.",
          "A script budget you can say out loud. If you cannot name it, every vendor will spend it.",
        ],
      },
      {
        type: "h2",
        text: "Where business websites actually get slow",
      },
      {
        type: "p",
        text: "It is rarely the tool underneath. It is a heavy photograph, too many font weights, and a chat box that loads before the offer does. A template packed with options makes this worse, because nobody knows which option is costing the second.",
      },
      {
        type: "p",
        text: "The commercial reason is simple. Paid traffic and search both send people to a page that has a few seconds to explain why they should stay. A slow page is a tax on the media you already bought. A fast page does not fix a vague offer — but a vague offer on a slow page fails twice.",
      },
      {
        type: "h2",
        text: "How to hold the line after launch",
      },
      {
        type: "p",
        text: "Give the team a content model that cannot inject an arbitrary script into the hero. Review new tags the way you review new hires: what they cost, what they replace, and who owns them. Re-check the budget when a campaign launches, not at the annual redesign. The sites that stay fast are the ones where speed is a publishing rule, not a launch-week heroics.",
      },
    ],
  },
  {
    slug: "show-up-when-they-search",
    title: "Show up when someone searches for what you sell",
    description:
      "A page worth finding answers a real question. That is the work, on Google and in the answers AI tools repeat.",
    date: "2026-11-02",
    displayDate: "2 November 2026",
    readingTime: "5 min",
    topic: "Search",
    content: [
      {
        type: "p",
        text: "People do not search for your company history. They search for the problem they have, and the kind of business that fixes it. If your site answers a different question, a competitor’s page will be the one they find.",
      },
      {
        type: "h2",
        text: "Start with the page a buyer would thank you for",
      },
      {
        type: "p",
        text: "Pick one service you actually want more of. Write the page the way you would explain it on a call: who it is for, what they leave with, what it costs in plain terms, and how to start. Then give the page a title that matches the words they type. That is the first piece of search work. Everything else is a refinement.",
      },
      {
        type: "h2",
        text: "AI answers quote the clearest page",
      },
      {
        type: "p",
        text: "When someone asks an AI tool who to hire, it repeats the page it can understand. Vague slogans get skipped. A page that states the offer, the boundary, and the next step gets quoted. Write for a person. A clear page is also the one a machine can use without inventing your business.",
      },
      {
        type: "ul",
        items: [
          "One page per offer. A single page that lists everything ranks for nothing in particular.",
          "Say who it is not for. That keeps the wrong enquiries out, and it makes the right ones trust you.",
          "Fix the slow page before you write ten new ones. A page people leave is not a page worth finding.",
        ],
      },
      {
        type: "p",
        text: "Search is slow on purpose. A first set of fixes can be done in a few weeks. The visits compound after that, if you keep publishing the next honest page. If you need enquiries this week, that is a campaign, not a ranking promise.",
      },
    ],
  },
]

export function getInsight(slug: string) {
  return insights.find((insight) => insight.slug === slug)
}

export function insightStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }))
}
