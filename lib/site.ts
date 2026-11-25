/**
 * Brand and site configuration.
 * Change the name, contact details, navigation, and product facts here.
 * Colors live in app/globals.css. Long service copy lives in lib/services.ts.
 * Case studies live in lib/work.ts. Notes live in lib/insights.ts.
 */
export const site = {
  name: "Dixsa Labs",
  legalName: "Dixsa Labs",
  tagline: "Easy to find. Easy to trust. Easier to run.",
  positioning:
    "Dixsa Labs builds websites, web apps, mobile apps, and AI automation for growing companies, then the content, SEO, Google Marketplace, and AI SEO that help the right people arrive.",
  description:
    "Websites, web apps, mobile apps, and AI automation. Content, SEO, Google Marketplace, and AI SEO sit beside the build. Products stay in their own section.",
  hero: "We build the website, the web app, the mobile app, and the automation. Then we write the content, and we do the SEO, Google Marketplace, and AI SEO that bring the right people in. The price is fixed before we start.",
  footerLine: "Odisha. A fixed price. A reply in IST.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dixsalabs.com",
  email: "hello@dixsalabs.com",
  /** Replace with your real scheduling link. */
  bookingUrl: "https://calendly.com/dixsa-labs/strategy-call",
  location:
    "A studio for businesses in Odisha. We work in IST and reply within one business day.",
  responseTime: "one business day",
  copyrightYear: 2026,
  investmentNote:
    "Most first projects have a fixed price, usually between ₹6 lakh and ₹25 lakh. A short call is where the number gets exact.",
  productNote:
    "The POS and the invoice tool are priced apart from custom projects. We state the fee before you start. The invoice tool is free to try.",
} as const

/** Poster lines for the home headline. Broken on purpose. */
export const heroLines = [
  "Websites, web apps,",
  "and the work that",
  "helps people find you.",
] as const

export const trustMarks = [
  { label: "Websites", href: "/services/websites" },
  { label: "Web apps", href: "/services/web-apps" },
  { label: "Mobile apps", href: "/services/mobile-apps" },
  { label: "AI automation", href: "/services/ai-automation" },
] as const

export const places = [
  {
    city: "Bhubaneswar",
    trade: "Restaurants",
    href: "/products/pos",
    scene: "pos",
  },
  {
    city: "Cuttack",
    trade: "Wholesale",
    href: "/work/harbor-rye",
    scene: "orders",
  },
  {
    city: "Puri",
    trade: "Hotels",
    href: "/products/pos",
    scene: "pos",
  },
  {
    city: "Sambalpur",
    trade: "Textiles",
    href: "/work/marrow-goods",
    scene: "site",
  },
  {
    city: "Rourkela",
    trade: "Jobs",
    href: "/work/route-desk",
    scene: "phone",
  },
  {
    city: "Berhampur",
    trade: "Shops",
    href: "/products/gst-whatsapp",
    scene: "invoice",
  },
] as const

export const roadmap = [
  {
    id: "01",
    title: "Name the result",
    body: "We write the problem, what better looks like, and the list of what is included.",
  },
  {
    id: "02",
    title: "Fix the price",
    body: "You see the fee and the timeline in rupees before anyone starts building.",
  },
  {
    id: "03",
    title: "Use it every week",
    body: "You open a private link and click through the work. There is no report to decode.",
  },
  {
    id: "04",
    title: "Launch together",
    body: "We train the people who will use it, and stay through the first live day.",
  },
  {
    id: "05",
    title: "Hand it over",
    body: "A fixed support window. Then you run it, or keep a light monthly plan.",
  },
] as const

export const startPaths = [
  {
    index: "01",
    title: "Help customers find you",
    body: "A website, search, and marketing so a person who is already looking understands what you offer and how to call, visit, or order.",
    href: "/services",
    action: "Websites, search, and marketing",
    place: "Sambalpur",
    scene: "site",
  },
  {
    index: "02",
    title: "Put the daily work in one place",
    body: "An app or an automation for orders, follow-ups, payroll, or the job that still lives in WhatsApp and a spreadsheet.",
    href: "/services/web-apps",
    action: "Apps and systems",
    place: "Cuttack",
    scene: "orders",
  },
  {
    index: "03",
    title: "Start with a tool we already run",
    body: "A restaurant point of sale, or GST invoices that leave on WhatsApp. Use one of these when a custom project is the wrong shape.",
    href: "/products",
    action: "The two products",
    place: "The counter",
    scene: "invoice",
  },
] as const

export const enquireSteps = [
  {
    id: "01",
    title: "You tell us what is stuck",
    body: "A few sentences is enough. What you sell, who it is for, and the job that is taking too long.",
  },
  {
    id: "02",
    title: "We reply within one business day",
    body: "A person on the team says whether we are the right studio, and what a first version would include.",
  },
  {
    id: "03",
    title: "A short call, then a fixed price",
    body: "You leave with a written list, a timeline, and a fee. Nothing starts until that is agreed.",
  },
] as const

export const homeCopy = {
  eyebrow: "For shops and companies in Odisha",
  servicesTitle: ["Eight services.", "The build first."],
  servicesLede:
    "Websites, web apps, mobile apps, and AI automation. Around that, we create and sharpen content, and we do SEO, Google Marketplace, and AI SEO.",
  productsTitle: ["Products,", "kept", "separate."],
  productsLede:
    "Two tools we already run. They are not custom projects. Use one when a website, an app, or a search plan is the wrong shape.",
  workTitle: ["From the problem", "to what changed."],
  workLede:
    "Each project starts with a job that was slow or easy to miss. The number is what the client reported after it went live.",
  notesTitle: ["They said it", "after it", "was live."],
  notesLede:
    "Owners and managers, on the project that shipped. Each note links to the study.",
  processTitle: ["We plan.", "We build.", "Then we stay."],
  processLede: "Five steps for a custom project. You always know what happens next.",
  closeTitle: "Tell us the result you want.",
  closeBody:
    "A website, a web app, a mobile app, content, or search. Products live in their own section. We reply within one business day, in IST. The price is fixed in rupees before the work starts.",
} as const

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
] as const

/** Short service index. Full pages are assembled in lib/services.ts. */
export const serviceList = [
  {
    slug: "websites",
    index: "01",
    group: "Build",
    navLabel: "Websites",
    line: "A public site that says what you do, and how to start.",
  },
  {
    slug: "web-apps",
    index: "02",
    group: "Build",
    navLabel: "Web apps",
    line: "A private tool the team opens instead of a chat and a spreadsheet.",
  },
  {
    slug: "mobile-apps",
    index: "03",
    group: "Build",
    navLabel: "Mobile apps",
    line: "The job, on the phone your customer or your staff already carry.",
  },
  {
    slug: "ai-automation",
    index: "04",
    group: "Build",
    navLabel: "AI automation",
    line: "One repeated job, drafted for you and still checked by a person.",
  },
  {
    slug: "content",
    index: "05",
    group: "Content and search",
    navLabel: "Content",
    line: "New pages, posts, and films — and a sharper cut of what you already have.",
  },
  {
    slug: "seo",
    index: "06",
    group: "Content and search",
    navLabel: "SEO",
    line: "You show up when someone searches Google for what you sell.",
  },
  {
    slug: "google-marketplace",
    index: "07",
    group: "Content and search",
    navLabel: "Google Marketplace",
    line: "The map pin, the business profile, and a listing people can buy from.",
  },
  {
    slug: "ai-seo",
    index: "08",
    group: "Content and search",
    navLabel: "AI SEO",
    line: "An AI answer quotes your offer, your place, and the next step.",
  },
] as const

export const products = [
  {
    slug: "pos",
    index: "01",
    navLabel: "Hotel and restaurant POS",
    kicker: "For hotels and restaurants",
    line: "Orders and payments that stay in one place.",
    summary:
      "Tables, rooms, and takeaway share one list. The payment sits on the same order. The day closes with a count, not a reconstruction.",
    audience:
      "Hotels, restaurants, and cafes that still split the bill across a register, a notebook, and a chat.",
    features: [
      "Orders from the table, the room, or the counter land in one list.",
      "The payment stays attached to the order.",
      "Staff see the tables and rooms they are responsible for.",
      "An end-of-day summary the owner can read without a second system.",
    ],
    notFor:
      "A chain that needs a different tax and menu setup outside Odisha. This is built for one business here, then the next location in the state.",
    timeline: "Most single locations are taking orders within two weeks.",
    price: "A setup fee and a monthly price. Both are fixed before we begin.",
    cardCta: "See the product",
    startLabel: "Book a demo",
    startHref: "/contact?type=pos&intent=pos",
    tone: "forest",
    place: "Bhubaneswar",
    scene: "pos",
  },
  {
    slug: "gst-whatsapp",
    index: "02",
    navLabel: "GST invoices on WhatsApp",
    kicker: "For small businesses",
    line: "GST invoices that leave on WhatsApp.",
    summary:
      "Raise the invoice. Send it on WhatsApp. Keep the record. The customer gets a proper bill, not a photo of a notebook.",
    audience:
      "Shops and small firms that still type a bill, then send a picture on WhatsApp.",
    features: [
      "Raise a GST invoice without learning a new accounts package.",
      "Send it on WhatsApp from the same place you made it.",
      "Keep a record of what went out, and to whom.",
      "Free to start. The monthly price is stated before a paid month begins.",
    ],
    notFor:
      "A finance team that needs to replace its books. This sends the invoice. Your accountant still keeps the accounts.",
    timeline: "The first invoices can go out the same week.",
    price: "Free to start. After the trial, a monthly price we state before it begins.",
    cardCta: "Start free",
    startLabel: "Start free",
    startHref: "/contact?type=gst-invoices&intent=gst",
    tone: "sand",
    place: "Cuttack",
    scene: "invoice",
  },
] as const

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug)
}

export function productStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export function absoluteUrl(path = "/") {
  const base = site.url.replace(/\/$/, "")
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}
