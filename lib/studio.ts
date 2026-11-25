/**
 * Studio facts, process, team, and proof.
 * Replace the people, metrics, and client-reported results with your own.
 */

export const metrics = [
  { value: "46", label: "Projects shipped" },
  { value: "6 wks", label: "Average timeline" },
  { value: "1 day", label: "Reply time" },
] as const

export const principles = [
  {
    title: "We start from the result you want",
    body: "More orders, fewer missed calls, a quote that goes out the same day. We write that result into the agreement before we talk about how it looks.",
  },
  {
    title: "The price is fixed before we start",
    body: "The first release has a list of what is included. Anything else waits. That protects your calendar and ours.",
  },
  {
    title: "Your team can run it after we leave",
    body: "The person who inherits the tool should be able to publish, invite a user, and see what changed last week without calling us.",
  },
  {
    title: "A person still checks the important step",
    body: "We automate a job and leave a review step. We do not paste a chatbot on the homepage and call that the project.",
  },
] as const

export const smbPractices = [
  {
    title: "A price before kickoff",
    body: "You see the scope, the timeline, and the fee before the project starts. Discovery is how the number gets specific, not how it becomes open-ended.",
  },
  {
    title: "You meet the people who build it",
    body: "Strategy, design, and engineering sit in the same weekly review. There is no account layer translating you to the team.",
  },
  {
    title: "You can click it and try it",
    body: "Every week you open a private link and use what we built. You do not have to read a report to know where things stand.",
  },
  {
    title: "We use what you already pay for",
    body: "Tally, Shopify, your clinic software, the inbox. The new system should replace a workaround, not add another login for its own sake.",
  },
  {
    title: "Plain language, written down",
    body: "Decisions, roles, and how to publish are documented so a new hire can follow them after we leave.",
  },
  {
    title: "A defined window after launch",
    body: "Support is part of the scope. When it ends, you choose a light retainer or you run it yourselves. Both are acceptable outcomes.",
  },
] as const

export const processSteps = [
  {
    id: "01",
    title: "Discovery",
    summary: "We name the problem and what better looks like in numbers.",
    detail:
      "A working session with the people who feel the problem. You leave with a written list of what is included, a price in rupees, and a definition of done.",
  },
  {
    id: "02",
    title: "Design",
    summary: "Flows, interface, and the words on the screen.",
    detail:
      "We prototype the risky parts first — the step staff will resist, the page a buyer must understand — and test them before we build.",
  },
  {
    id: "03",
    title: "Build",
    summary: "A small senior team builds it in the open.",
    detail:
      "Every week you click a private link and use the work. Connections to your existing tools are part of the build, not a list we discover at the end.",
  },
  {
    id: "04",
    title: "Launch",
    summary: "We train your team and stay for launch day.",
    detail:
      "We show the people who will use it, check the result is actually being recorded, and do not disappear on the day it goes live.",
  },
  {
    id: "05",
    title: "Support",
    summary: "A fixed window to fix, tune, and hand over.",
    detail:
      "Most clients keep a light monthly support plan. Some do not. The product is built so either choice is reasonable.",
  },
] as const

export const audiences = [
  {
    kicker: "Shops and local businesses",
    title: "Be the one they choose",
    body: "A textile shop in Sambalpur, a clinic in Cuttack, a lunch room in Bhubaneswar. People already search, tap Instagram, or send a WhatsApp. The page should say what you offer and how to call, visit, or pay — and it should follow the place where it was opened.",
  },
  {
    kicker: "Growing companies",
    title: "Put the work in one place",
    body: "Orders, follow-ups, and files still jump between chats, spreadsheets, and someone’s memory. A private app gives the team one list they will actually use.",
  },
  {
    kicker: "Firms and practices",
    title: "Bring the right clients",
    body: "A site that explains the work in plain words, and sends a serious enquiry to the right person.",
  },
  {
    kicker: "Startups",
    title: "Get a first version live",
    body: "You know what you want to offer. We turn it into a site or an app people can try, without a long technology project or a big in-house team.",
  },
  {
    kicker: "Brands that sell online",
    title: "Make buying feel simple",
    body: "The page should load on a normal phone, say the useful thing first, and make the next step — a message, a call, or an order — obvious.",
  },
  {
    kicker: "Teams that already have tools",
    title: "Fix the one painful gap",
    body: "Keep what already works. We close the hole your current software leaves: the page that does not bring customers, the screen people avoid, or the job still done by hand.",
  },
] as const

export const fit = {
  good: [
    "You run a shop, a firm, a startup, or a company with a team — and something about it is harder than it should be.",
    "You can describe the problem in normal words. Building the solution is our side of the job.",
    "You want a clear price, a clear timeline, and to talk to the people who do the work.",
    "Someone on your side will actually use it after it goes live.",
  ],
  not: [
    "You want a phone app for the App Store and Play Store as the whole project.",
    "You want a long technology plan with nothing your customers can use.",
    "You need a large team sitting in your office for a year.",
    "You only want a logo dropped onto a template.",
  ],
} as const

export const team = [
  {
    name: "Meera Mohanty",
    role: "Founder",
    bio: "Spent a decade inside operations at growing companies in Odisha before starting Dixsa Labs. She writes the scope and stays on the account.",
  },
  {
    name: "Arjun Behera",
    role: "Design",
    bio: "Designs screens a non-designer can keep using. He runs the weekly design review with engineering in the room.",
  },
  {
    name: "Priya Patnaik",
    role: "Engineering",
    bio: "Builds the systems a team can keep after we leave. She is the person who says when a scope is unrealistic.",
  },
  {
    name: "Rohan Das",
    role: "Automation",
    bio: "Ships workflows with a review step and a record of what happened. He turns down projects that only want a chatbot.",
  },
] as const

export function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
}
