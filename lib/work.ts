import type { Discipline } from "@/lib/services"
import type { SceneId } from "@/lib/scenes"

export type ProjectTone =
  | "copper"
  | "forest"
  | "ink"
  | "sand"
  | "slate"
  | "wine"

export type CaseStudy = {
  slug: string
  client: string
  title: string
  summary: string
  sector: string
  place: string
  discipline: Discipline
  year: string
  timeline: string
  services: string[]
  featured: boolean
  tone: ProjectTone
  scene: SceneId
  metric: { value: string; label: string }
  challenge: string
  approach: string[]
  solution: string[]
  results: { value: string; label: string }[]
  tech: string[]
  quote: { text: string; name: string; role: string }
  image?: string
  imageAlt?: string
}

export const disciplineFilters = [
  { value: "all", label: "All" },
  { value: "websites", label: "Websites" },
  { value: "web-apps", label: "Web apps" },
  { value: "mobile", label: "Mobile" },
  { value: "ai", label: "Automation" },
  { value: "marketing", label: "Marketing" },
  { value: "seo", label: "Search" },
  { value: "video", label: "Film" },
] as const

export type DisciplineFilter = (typeof disciplineFilters)[number]["value"]

export const caseStudies: CaseStudy[] = [
  {
    slug: "harbor-rye",
    client: "Annapurna Wholesale",
    title: "Dealers order online. The godown picks from the same list.",
    summary:
      "Replaced WhatsApp and spreadsheet orders for a 22-person food wholesaler with one app the buyers and the warehouse both trust.",
    sector: "Food wholesale",
    place: "Cuttack",
    discipline: "web-apps",
    year: "2025",
    timeline: "9 weeks",
    services: ["Design", "A private app", "Connects to the books"],
    featured: true,
    tone: "forest",
    scene: "orders",
    metric: { value: "38%", label: "of wholesale revenue now ordered online" },
    challenge:
      "Dealers ordered by phone, WhatsApp, and a shared spreadsheet. Wrong picks were common, the office retyped every order into Tally, and the owner was the bottleneck every Friday.",
    approach: [
      "Sat with the warehouse lead and two account buyers before drawing a screen.",
      "Treated the Friday order window as the problem, not “a portal” as the brief.",
      "Kept the catalog plain: standing orders, substitutions, and a cutoff time.",
    ],
    solution: [
      "A buyer portal with standing orders and a cutoff nobody has to interpret.",
      "A warehouse pick view that follows the walk of the floor, not a generic table.",
      "A nightly sync into the accounting tool they already used.",
      "Roles so seasonal staff never see pricing they should not.",
    ],
    results: [
      { value: "38%", label: "of wholesale revenue placed online within four months" },
      { value: "62%", label: "fewer order errors against the previous quarter" },
      { value: "6 hrs", label: "of Friday office overtime removed in a typical week" },
    ],
    tech: ["Next.js", "TypeScript", "Postgres", "Razorpay", "Tally"],
    quote: {
      text: "We stopped being the people who retype orders. The godown trusts the list, which is the only review that mattered.",
      name: "Meera Mohanty",
      role: "Owner, Annapurna Wholesale",
    },
    image: "/images/testimonial-wholesale.jpg",
    imageAlt:
      "In the Annapurna Wholesale godown, the owner and a warehouse lead check the day’s orders on a tablet among crates of vegetables and sacks of rice.",
  },
  {
    slug: "northline-legal",
    client: "Mohanty & Co",
    title: "A site that turns a Google search into a real consult",
    summary:
      "Rebuilt a 12-lawyer firm’s website around the questions people actually search, and sent each enquiry to the right person.",
    sector: "Law firm",
    place: "Bhubaneswar",
    discipline: "websites",
    year: "2025",
    timeline: "7 weeks",
    services: ["The words", "Website", "Enquiry form"],
    featured: true,
    tone: "ink",
    scene: "site",
    metric: { value: "2.4×", label: "useful consult requests in one quarter" },
    challenge:
      "The old site was a template with a single inbox. Partners could not tell which visits were worth a call. Search traffic existed. Conversations did not.",
    approach: [
      "Interviewed the intake coordinator, not only the partners.",
      "Rewrote practice pages around client problems, including who the firm is not for.",
      "Decided the page had to be fast on a normal phone before we talked about how it looked.",
    ],
    solution: [
      "Practice pages that state the outcome and the boundary of the work.",
      "Intake that routes family and business matters to different coordinators.",
      "An editorial site that feels established without performing expense.",
      "Pages that hold up on a mid-range phone.",
    ],
    results: [
      { value: "2.4×", label: "qualified consult requests in the first quarter" },
      { value: "0.9s", label: "largest contentful paint on a mid-range phone" },
      { value: "Half", label: "as many form submissions the team had to re-screen" },
    ],
    tech: ["Next.js", "TypeScript", "Content layer", "Vercel", "Plausible"],
    quote: {
      text: "Intake finally knows why someone wrote. We stopped spending the morning sorting a pile.",
      name: "Arvind Mohanty",
      role: "Managing partner, Mohanty & Co",
    },
  },
  {
    slug: "lumen-payroll",
    client: "Hisaab Payroll",
    title: "Customers stopped asking “has payroll run?”",
    summary:
      "A customer home for a 40-person payroll company: status, documents, and the one action people actually needed.",
    sector: "Payroll software",
    place: "Bhubaneswar",
    discipline: "web-apps",
    year: "2026",
    timeline: "11 weeks",
    services: ["Design", "A customer home", "Connects to their system"],
    featured: true,
    tone: "slate",
    scene: "payroll",
    metric: { value: "41%", label: "fewer “what is the status?” tickets" },
    challenge:
      "The product lived in a dense admin screen. Customers emailed and WhatsApped to ask whether a payroll run had finished. The company had forty people and did not want a nine-month rewrite.",
    approach: [
      "Watched five support calls and listed the questions that repeated.",
      "Scoped a portal, not a redesign of the whole product.",
      "Integrated with the system they already had.",
    ],
    solution: [
      "A customer home with run status, documents, and one “something looks wrong” path.",
      "Support notes so the team sees what the customer sees.",
      "Empty states written in the company’s voice, not placeholder Latin.",
    ],
    results: [
      { value: "41%", label: "fewer tickets about run status" },
      { value: "27%", label: "lift in new-customer activation" },
      { value: "⅓", label: "less handle time on the tickets that remain" },
    ],
    tech: ["Next.js", "TypeScript", "React", "Postgres", "Hisaab API"],
    quote: {
      text: "We shipped the page customers were already asking for, and left the rest of the product alone.",
      name: "Neha Patnaik",
      role: "Head of customer experience, Hisaab Payroll",
    },
  },
  {
    slug: "fieldday-clinics",
    client: "Aarogya Clinics",
    title: "Forms arrive before the patient sits down",
    summary:
      "An intake and reminder flow for four clinics. It collects what the front desk used to chase on the phone, and a person approves it before it is filed.",
    sector: "Clinics",
    place: "Cuttack",
    discipline: "ai",
    year: "2026",
    timeline: "8 weeks",
    services: ["The workflow", "A repeated job", "Connects to the clinic"],
    featured: false,
    tone: "sand",
    scene: "clinic",
    metric: { value: "11 hrs", label: "saved at each clinic, every week" },
    challenge:
      "Front desks spent mornings calling patients for forms and confirmations. A chatbot on the website answered general questions and never touched that work.",
    approach: [
      "Timed the morning phone block before proposing any software.",
      "Refused a public chatbot as the first project.",
      "Designed the review step with the clinic manager so staff stay in control.",
    ],
    solution: [
      "SMS and email intake that asks only what that visit type needs.",
      "A queue where staff approve or edit before anything files.",
      "Reminders that stop when the patient confirms.",
      "A plain-language log a new receptionist can read.",
    ],
    results: [
      { value: "11 hrs", label: "of staff time back per location each week" },
      { value: "19%", label: "drop in no-shows after reminders went live" },
      { value: "90%+", label: "staff using it in the first month" },
    ],
    tech: ["Next.js", "TypeScript", "WhatsApp", "Clinic software", "Hosted LLM"],
    quote: {
      text: "The review step is why the desks use it. Nothing is filed until one of us has seen it.",
      name: "Kavita Das",
      role: "Clinic manager, Aarogya Clinics",
    },
  },
  {
    slug: "marrow-goods",
    client: "Taana Home",
    title: "The product explains itself before it asks for payment",
    summary:
      "Rebuilt a home-textiles brand’s site so the fabric, the lead time, and the checkout agree — and the pages stay fast on a phone.",
    sector: "Online store",
    place: "Sambalpur",
    discipline: "websites",
    year: "2025",
    timeline: "6 weeks",
    services: ["Website", "Product pages", "The online store"],
    featured: false,
    tone: "copper",
    scene: "site",
    metric: { value: "3.1%", label: "of visits now buy, up from 1.8%" },
    challenge:
      "These are considered purchases. The old theme hid the fabric and the delivery time. Paid traffic left. The founder’s edits broke the layout every other month.",
    approach: [
      "Read the support inbox for the questions the ads were creating.",
      "Designed product pages around those questions.",
      "Moved editing onto structured content instead of a fragile theme.",
    ],
    solution: [
      "Product pages with materials, lead time, and care in the first screen.",
      "Collections the founder can edit without a developer on the phone.",
      "A performance budget so image-heavy pages stay quick.",
    ],
    results: [
      { value: "1.8% → 3.1%", label: "conversion over ten weeks" },
      { value: "24%", label: "lower bounce on paid landing pages" },
      { value: "0", label: "edits that broke the layout, once the pages were simple to change" },
    ],
    tech: ["Next.js", "TypeScript", "Shopify Storefront API", "Vercel"],
    quote: {
      text: "People finally see the lead time before they ask us in chat. That alone paid for the project.",
      name: "Ananya Mishra",
      role: "Founder, Taana Home",
    },
  },
  {
    slug: "keel-ops",
    client: "Dakshin Freight",
    title: "Quotes go out the same day",
    summary:
      "An internal quoting desk that drafts a rate from the company’s own history and waits for an estimator to send it.",
    sector: "Logistics",
    place: "Paradip",
    discipline: "ai",
    year: "2026",
    timeline: "7 weeks",
    services: ["A quoting desk", "A tool for the team", "Stays in email"],
    featured: false,
    tone: "wine",
    scene: "quote",
    metric: { value: "4 hrs", label: "typical quote time, down from 2 days" },
    challenge:
      "Estimators quoted from memory and a shared inbox. Good customers waited two days. A generic chatbot had already been turned off after it invented a lane rate.",
    approach: [
      "Used six months of sent quotes as the source of truth.",
      "Required an estimator to approve every number.",
      "Started with one lane type, then expanded.",
    ],
    solution: [
      "Inbox triage that pulls the fields estimators already look for.",
      "A draft rate with the comparable past jobs shown beside it.",
      "A send step that stays in their email, so customers never meet a bot.",
    ],
    results: [
      { value: "2 days → 4 hrs", label: "typical turnaround on the lanes in scope" },
      { value: "More quotes", label: "sent without adding an estimator" },
      { value: "Zero", label: "customer-facing messages without a person" },
    ],
    tech: ["Next.js", "TypeScript", "Email API", "Rate history", "Hosted LLM"],
    quote: {
      text: "It shows me the last three jobs that looked like this one. I still decide the number.",
      name: "Sanjay Behera",
      role: "Estimating lead, Dakshin Freight",
    },
  },
  {
    slug: "route-desk",
    client: "Nayak Repairs",
    title: "The day’s jobs live on the phone the crew already carries.",
    summary:
      "A small phone app for a repair company. The crew sees the next job. The office sees it finished, without a dusk call.",
    sector: "Field service",
    place: "Rourkela",
    discipline: "mobile",
    year: "2026",
    timeline: "12 weeks",
    services: ["A phone app", "A job list", "Status the office can see"],
    featured: false,
    tone: "slate",
    scene: "phone",
    metric: { value: "Same day", label: "status, instead of a call at the end of the route" },
    challenge:
      "Jobs were assigned in a morning WhatsApp group. By afternoon the office did not know which ones were done. A website the crew had to pinch and zoom stayed closed.",
    approach: [
      "Rode two routes before drawing a screen.",
      "Kept the first version to one list: what’s next, and what’s done.",
      "Left pricing and invoicing in the system they already had.",
    ],
    solution: [
      "A phone app with the day’s jobs, the address, and one way to mark done.",
      "A note and a photo when something on site does not match the ticket.",
      "An office view that updates when the crew taps done.",
    ],
    results: [
      { value: "Same day", label: "the office knows a job is finished" },
      { value: "0", label: "end-of-day calls just to ask for status" },
      { value: "12 wks", label: "to a first version the crew would open" },
    ],
    tech: [],
    quote: {
      text: "They open it because the next address is there. That was the whole brief.",
      name: "Suresh Nayak",
      role: "Owner, Nayak Repairs",
    },
  },
  {
    slug: "saffron-table",
    client: "Chilika Table",
    title: "The ad and the page finally say the same thing.",
    summary:
      "A first campaign for a three-location restaurant. The offer, the page, and the booking button agree. The spend goes to people who can actually come.",
    sector: "Restaurants",
    place: "Puri",
    discipline: "marketing",
    year: "2025",
    timeline: "4 weeks, then a monthly rhythm",
    services: ["One offer", "A page that matches", "The first campaign"],
    featured: false,
    tone: "copper",
    scene: "pos",
    metric: { value: "2.1×", label: "bookings from the same monthly spend" },
    challenge:
      "Ads promised a tasting menu. The site talked about the group’s story. People booked the wrong thing, or they did not book.",
    approach: [
      "Named one dinner and one way to reserve it.",
      "Rewrote the landing page before spending another rupee.",
      "Read the bookings at the end of the month and kept only what brought a table.",
    ],
    solution: [
      "One offer, written the way the floor already describes it.",
      "A page with the price, the time, and a booking button in the first screen.",
      "A simple note each month: what was spent, and which tables came from it.",
    ],
    results: [
      { value: "2.1×", label: "reservations from the same ad budget" },
      { value: "Fewer", label: "guests who arrived expecting a different menu" },
      { value: "1 page", label: "the ads are allowed to land on" },
    ],
    tech: [],
    quote: {
      text: "We stopped explaining the ad after they sat down. The page had already done it.",
      name: "Lopamudra Sahu",
      role: "Partner, Chilika Table",
    },
    image: "/images/testimonial-restaurant.jpg",
    imageAlt:
      "Evening service at Chilika Table in Puri. A server takes the order on a tablet beside a thali.",
  },
  {
    slug: "nila-dental",
    client: "Nila Dental",
    title: "The page that answers the search is the one that gets the call.",
    summary:
      "Search work for a dental clinic. The pages people already look for were rewritten around the question, the fee range, and how to book.",
    sector: "Clinics",
    place: "Bhubaneswar",
    discipline: "seo",
    year: "2026",
    timeline: "5 weeks for the first pages",
    services: ["The questions people type", "Rewritten pages", "A list of what to publish next"],
    featured: false,
    tone: "ink",
    scene: "search",
    metric: { value: "3×", label: "visits from people searching the treatment" },
    challenge:
      "The site had a homepage and a list of services. People searching for a specific treatment found a competitor who answered the question.",
    approach: [
      "Started with the three treatments the clinic wanted more of.",
      "Wrote each page the way the dentist explains it in the chair.",
      "Left a short list of the next pages, in order, instead of a pile.",
    ],
    solution: [
      "One page per treatment, with who it is for and what it costs in plain terms.",
      "Titles that match the words people type.",
      "A booking step on the page, not a phone number buried in the footer.",
    ],
    results: [
      { value: "3×", label: "visits from searches for those treatments" },
      { value: "More calls", label: "that already know which treatment they want" },
      { value: "A list", label: "of the next pages, short enough to keep publishing" },
    ],
    tech: [],
    quote: {
      text: "People arrive having read the page. The first five minutes of the visit are different.",
      name: "Dr. Lata Mohanty",
      role: "Founder, Nila Dental",
    },
    image: "/images/testimonial-dental.jpg",
    imageAlt:
      "At Nila Dental in Bhubaneswar, the dentist explains an x-ray to a patient before treatment.",
  },
  {
    slug: "field-and-co",
    client: "Karkhana",
    title: "One film that explains the work, and a plan for the next.",
    summary:
      "A first YouTube film for a furniture workshop. The script is in the founder’s words. The next three films are written down so the channel does not stop.",
    sector: "Workshop",
    place: "Berhampur",
    discipline: "video",
    year: "2026",
    timeline: "5 weeks",
    services: ["A script", "One film", "A plan for the next"],
    featured: false,
    tone: "wine",
    scene: "film",
    metric: { value: "4 min", label: "average watch on a six-minute film" },
    challenge:
      "Buyers wanted to see how a piece was made before they paid a deposit. The channel had two videos and a year of silence.",
    approach: [
      "Wrote the script from a real client conversation, not a slogan.",
      "Shot one offer: a dining table, from brief to delivery.",
      "Left titles and a next-three list the workshop can follow without us.",
    ],
    solution: [
      "A six-minute film that shows the work and names the lead time.",
      "A script the founder approved before the shoot.",
      "Three further films outlined, so the next one is a decision, not a blank page.",
    ],
    results: [
      { value: "4 min", label: "average view on a six-minute film" },
      { value: "Deposit calls", label: "that already know the lead time" },
      { value: "3", label: "next films sketched, ready to shoot" },
    ],
    tech: [],
    quote: {
      text: "People watch it to the end. That had not happened with anything we posted before.",
      name: "Kabir Sahu",
      role: "Founder, Karkhana",
    },
  },
]

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug)
}

export function getAdjacentStudy(slug: string) {
  const index = caseStudies.findIndex((study) => study.slug === slug)
  if (index < 0) return undefined
  return caseStudies[(index + 1) % caseStudies.length]
}

export function studiesByDiscipline(discipline: Discipline) {
  return caseStudies.filter((study) => study.discipline === discipline)
}

export function studiesByDisciplines(disciplines: readonly Discipline[]) {
  if (disciplines.length === 0) return []
  return caseStudies.filter((study) => disciplines.includes(study.discipline))
}

export function featuredStudies() {
  return caseStudies.filter((study) => study.featured)
}

const testimonialSlugs = [
  "harbor-rye",
  "saffron-table",
  "nila-dental",
] as const

export function testimonialStudies() {
  return testimonialSlugs.flatMap((slug) => {
    const study = getCaseStudy(slug)
    return study ? [study] : []
  })
}

export function workStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }))
}

export function isDisciplineFilter(value: string | undefined): value is DisciplineFilter {
  return disciplineFilters.some((filter) => filter.value === value)
}

export type WorkCard = Pick<
  CaseStudy,
  | "slug"
  | "client"
  | "title"
  | "summary"
  | "sector"
  | "place"
  | "discipline"
  | "tone"
  | "scene"
  | "metric"
>

export function toWorkCard(study: CaseStudy): WorkCard {
  return {
    slug: study.slug,
    client: study.client,
    title: study.title,
    summary: study.summary,
    sector: study.sector,
    place: study.place,
    discipline: study.discipline,
    tone: study.tone,
    scene: study.scene,
    metric: study.metric,
  }
}
