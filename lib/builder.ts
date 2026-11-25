import type { ProjectType } from "@/lib/contact-schema"

export const buildKindIds = ["app", "site", "workflow"] as const
export type BuildKind = (typeof buildKindIds)[number]

export const accentIds = ["green", "cognac", "ink", "bone", "bronze"] as const
export type AccentId = (typeof accentIds)[number]

export const deviceIds = ["phone", "desktop"] as const
export type PreviewDevice = (typeof deviceIds)[number]

export const orderStatuses = ["New", "Packed", "Done"] as const
export type OrderStatus = (typeof orderStatuses)[number]

export type BuilderDraft = {
  kind: BuildKind
  businessName: string
  offer: string
  audience: string
  screens: string[]
  accent: AccentId
  activeScreen: string
  device: PreviewDevice
}

export type Choice = {
  id: string
  label: string
  detail: string
}

export type ScreenChoice = Choice

type KindMeta = {
  id: BuildKind
  projectType: ProjectType
  label: string
  detail: string
}

export const buildKinds: KindMeta[] = [
  {
    id: "app",
    projectType: "web-application",
    label: "A private app",
    detail: "Your team, dealers, or customers — looking at the same orders, status, and files.",
  },
  {
    id: "site",
    projectType: "website",
    label: "A website",
    detail: "The page people find on Google or Instagram. What you do, and how to reach you.",
  },
  {
    id: "workflow",
    projectType: "ai-automation",
    label: "A repeated job",
    detail: "A quote, a reminder, or a first reply, drafted for you. Your team still approves it.",
  },
]

const audienceCatalog: Record<BuildKind, Choice[]> = {
  app: [
    {
      id: "team",
      label: "My team",
      detail: "The people who do the work every day.",
    },
    {
      id: "dealers",
      label: "Dealers",
      detail: "They place orders and check what is ready.",
    },
    {
      id: "customers",
      label: "Customers",
      detail: "They track an order or a request.",
    },
  ],
  site: [
    {
      id: "buyers",
      label: "New buyers",
      detail: "People deciding whether to call.",
    },
    {
      id: "clients",
      label: "Existing clients",
      detail: "People who already know you.",
    },
    {
      id: "both",
      label: "Both",
      detail: "New buyers and people who already buy.",
    },
  ],
  workflow: [
    {
      id: "office",
      label: "The office",
      detail: "Whoever opens the inbox in the morning.",
    },
    {
      id: "sales",
      label: "Sales",
      detail: "The person who sends the quotes.",
    },
    {
      id: "accounts",
      label: "Accounts",
      detail: "The person who chases payments.",
    },
  ],
}

const screenCatalog: Record<BuildKind, ScreenChoice[]> = {
  app: [
    {
      id: "today",
      label: "Today",
      detail: "What needs a person this morning.",
    },
    {
      id: "orders",
      label: "Orders",
      detail: "A list with a status, not a chat thread.",
    },
    {
      id: "people",
      label: "People",
      detail: "Staff, dealers, or customers.",
    },
    {
      id: "files",
      label: "Documents",
      detail: "Invoices and photos next to the job.",
    },
    {
      id: "messages",
      label: "Messages",
      detail: "Replies that are waiting on someone.",
    },
  ],
  site: [
    {
      id: "home",
      label: "Home",
      detail: "The first screen, with the offer.",
    },
    {
      id: "offer",
      label: "What you do",
      detail: "Three plain points.",
    },
    {
      id: "proof",
      label: "Proof",
      detail: "A few reasons to trust you.",
    },
    {
      id: "contact",
      label: "Contact",
      detail: "A way to call or write.",
    },
  ],
  workflow: [
    {
      id: "queue",
      label: "To review",
      detail: "Drafts waiting on a person.",
    },
    {
      id: "done",
      label: "Sent",
      detail: "What has already gone out.",
    },
    {
      id: "rules",
      label: "Rules",
      detail: "What the software may and may not do.",
    },
  ],
}

export const accents: {
  id: AccentId
  label: string
  swatch: string
  ink: string
}[] = [
  { id: "green", label: "Green", swatch: "#157a3e", ink: "#ffffff" },
  { id: "cognac", label: "Cognac", swatch: "#a34b32", ink: "#fffaf6" },
  { id: "ink", label: "Ink", swatch: "#1a1714", ink: "#f4f0e8" },
  { id: "bone", label: "Bone", swatch: "#f4f0e8", ink: "#1a1714" },
  { id: "bronze", label: "Bronze", swatch: "#6b4a32", ink: "#f7f1e8" },
]

export const morningTasks = [
  { id: "t1", label: "Confirm the Mishra Stores order" },
  { id: "t2", label: "Send the packed list to dispatch" },
  { id: "t3", label: "Reply to the new enquiry" },
]

export type OrderRow = {
  id: string
  who: string
  item: string
  amount: string
  note: string
  status: OrderStatus
}

export function sampleOrders(): OrderRow[] {
  return [
    {
      id: "1048",
      who: "Mishra Stores",
      item: "Cotton shirting · 40 pcs",
      amount: "₹1,84,000",
      note: "Asked to confirm delivery by Thursday.",
      status: "New",
    },
    {
      id: "1047",
      who: "Northline Stores",
      item: "Buttons · 12 boxes",
      amount: "₹18,400",
      note: "Packed this morning. Waiting on the van.",
      status: "Packed",
    },
    {
      id: "1046",
      who: "Patnaik & Co.",
      item: "Lining · 80 metres",
      amount: "₹42,000",
      note: "Delivered. Invoice already paid.",
      status: "Done",
    },
    {
      id: "1042",
      who: "R.K. Textiles",
      item: "Thread · 6 cones",
      amount: "₹6,200",
      note: "New buyer. Owner may want a look.",
      status: "New",
    },
  ]
}

export type PersonRow = {
  name: string
  meta: string
  note: string
  balance: string
  orderId?: string
}

export function samplePeople(audience: string): PersonRow[] {
  if (audience === "dealers") {
    return [
      {
        name: "Mishra Stores",
        meta: "Cuttack · 12 open orders",
        note: "Places a standing order every Thursday.",
        balance: "₹1,84,000 open",
        orderId: "1048",
      },
      {
        name: "Northline Stores",
        meta: "Bhubaneswar · 2 waiting",
        note: "Prefers a WhatsApp photo of the packed box.",
        balance: "₹18,400 packed",
        orderId: "1047",
      },
      {
        name: "R.K. Textiles",
        meta: "Sambalpur · paid this week",
        note: "First order this month. Keep the owner in the loop.",
        balance: "₹6,200 new",
        orderId: "1042",
      },
    ]
  }
  if (audience === "customers") {
    return [
      {
        name: "Priya Das",
        meta: "Bhubaneswar · order 1048",
        note: "Wants a message when the order leaves.",
        balance: "₹1,84,000 open",
        orderId: "1048",
      },
      {
        name: "Arun Behera",
        meta: "Cuttack · asked for a quote",
        note: "Asked for a price on 20 metres of lining.",
        balance: "Quote not sent",
      },
      {
        name: "Patnaik & Co.",
        meta: "Rourkela · order 1046",
        note: "Pays on delivery. Last invoice is settled.",
        balance: "Clear",
        orderId: "1046",
      },
    ]
  }
  return [
    {
      name: "Accounts",
      meta: "Checks invoices before they go out",
      note: "Sees amounts and due dates. Does not pack orders.",
      balance: "2 invoices waiting",
    },
    {
      name: "Dispatch",
      meta: "Updates status after packing",
      note: "Moves an order from New to Packed.",
      balance: "1 box ready",
      orderId: "1047",
    },
    {
      name: "Front desk",
      meta: "Sends the first reply",
      note: "Answers the morning messages before noon.",
      balance: "1 reply waiting",
    },
  ]
}

export type SketchFile = {
  id: string
  name: string
  kind: "Invoices" | "Photos"
  lines: string[]
}

export const documents: SketchFile[] = [
  {
    id: "f1",
    name: "Invoice 2291.pdf",
    kind: "Invoices",
    lines: ["Mishra Stores", "Cotton shirting · ₹1,84,000", "Tax · ₹33,120", "Due Friday"],
  },
  {
    id: "f2",
    name: "Packing list · 1047.pdf",
    kind: "Invoices",
    lines: ["Northline Stores", "Buttons · 12 boxes", "Checked by dispatch", "Ready for the van"],
  },
  {
    id: "f3",
    name: "Shirting swatch.jpg",
    kind: "Photos",
    lines: ["Warm white", "Attached to order 1048", "Mishra asked to confirm the shade"],
  },
]

export const fileFilters = ["All", "Invoices", "Photos"] as const

export type FlowDraft = {
  id: string
  title: string
  body: string
  tag: string
  amount: string
  state: "waiting" | "sent" | "skipped"
  edited: boolean
}

export function sampleFlow(): FlowDraft[] {
  return [
    {
      id: "d1",
      title: "Quote for Mishra Stores",
      body: "40 pcs cotton shirting. Draft total ₹1,84,000. Ready for a person to approve.",
      tag: "Quote",
      amount: "₹1,84,000",
      state: "waiting",
      edited: false,
    },
    {
      id: "d2",
      title: "Reminder · Invoice 2291",
      body: "Due last Friday. The draft asks for payment and keeps the tone polite.",
      tag: "Reminder",
      amount: "₹33,120",
      state: "waiting",
      edited: false,
    },
    {
      id: "d3",
      title: "New website enquiry",
      body: "Someone asked about bulk orders. The draft asks for quantity and city.",
      tag: "Inbox",
      amount: "New name",
      state: "waiting",
      edited: false,
    },
  ]
}

export const workflowRules = [
  {
    id: "r1",
    label: "A person approves anything a customer will see",
    on: "Drafts wait here until someone taps Approve.",
    off: "A draft could leave without a check. We still recommend a person.",
  },
  {
    id: "r2",
    label: "Skip drafts under ₹5,000",
    on: "Small amounts can go through on their own.",
    off: "Every amount waits for a person, including the small ones.",
  },
  {
    id: "r3",
    label: "Flag a new customer for the owner",
    on: "A first-time name is marked for the owner.",
    off: "New names are treated like everyone else.",
  },
]

export type ChatMessage = { id: string; from: string; text: string }

export type ChatThread = {
  id: string
  from: string
  unread: boolean
  messages: ChatMessage[]
}

export function sampleThreads(): ChatThread[] {
  return [
    {
      id: "c1",
      from: "Mishra Stores",
      unread: true,
      messages: [
        {
          id: "m1",
          from: "Mishra Stores",
          text: "Can you confirm the shirting by Thursday?",
        },
      ],
    },
    {
      id: "c2",
      from: "Northline Stores",
      unread: false,
      messages: [
        {
          id: "m2",
          from: "Northline Stores",
          text: "The buttons arrived. Thank you.",
        },
      ],
    },
    {
      id: "c3",
      from: "R.K. Textiles",
      unread: true,
      messages: [
        {
          id: "m3",
          from: "R.K. Textiles",
          text: "Is the thread the same shade as last time?",
        },
      ],
    },
  ]
}

export const quickReplies = [
  "Confirmed for Thursday.",
  "Sending the invoice today.",
  "Same shade as last time.",
]

export const contactChannels = ["Call", "WhatsApp", "Visit"] as const
export const contactSlots = ["Morning", "Afternoon", "Evening"] as const

export const sampleQuotes = [
  "We stopped asking where the order was.",
  "The page says what we do in one screen.",
  "New buyers know how to reach us.",
]

export const sampleFigures = [
  { value: "4.9", label: "from buyers" },
  { value: "1 day", label: "usual reply" },
  { value: "2014", label: "working since" },
]

export const STORAGE_KEY = "dixsa-build-v1"

export function audiencesFor(kind: BuildKind) {
  return audienceCatalog[kind]
}

export function screensFor(kind: BuildKind) {
  return screenCatalog[kind]
}

export function defaultScreens(kind: BuildKind) {
  if (kind === "site") return ["home", "offer", "contact"]
  if (kind === "workflow") return screenCatalog.workflow.map((screen) => screen.id)
  return ["today", "orders", "people"]
}

export function kindById(kind: BuildKind) {
  return buildKinds.find((item) => item.id === kind) ?? buildKinds[0]
}

export function audienceById(kind: BuildKind, id: string) {
  return (
    audienceCatalog[kind].find((item) => item.id === id) ??
    audienceCatalog[kind][0]
  )
}

export function accentById(id: AccentId) {
  return accents.find((item) => item.id === id) ?? accents[0]
}

export function selectedScreens(draft: BuilderDraft) {
  const picked = new Set(draft.screens)
  return screenCatalog[draft.kind].filter((screen) => picked.has(screen.id))
}

export function resolveScreen(draft: BuilderDraft) {
  if (draft.screens.includes(draft.activeScreen)) return draft.activeScreen
  return draft.screens[0] ?? ""
}

export function offerPlaceholder(kind: BuildKind) {
  switch (kind) {
    case "app":
      return "Dealers place an order without a WhatsApp thread."
    case "site":
      return "A clear page that turns a visit into a call or an order."
    case "workflow":
      return "Quotes drafted overnight. Someone approves them in the morning."
  }
}

export function offerLine(draft: BuilderDraft) {
  const text = draft.offer.trim()
  if (text) return { text, placeholder: false }
  return { text: offerPlaceholder(draft.kind), placeholder: true }
}

export function displayName(draft: BuilderDraft) {
  return draft.businessName.trim() || "Your business"
}

export function audienceQuestion(kind: BuildKind) {
  switch (kind) {
    case "app":
      return "Who opens it first?"
    case "site":
      return "Who is the page for?"
    case "workflow":
      return "Who checks the drafts?"
  }
}

export function screensQuestion(kind: BuildKind) {
  switch (kind) {
    case "app":
      return "What should it include?"
    case "site":
      return "Which parts of the page?"
    case "workflow":
      return "What should the team see?"
  }
}

export function projectTypeFor(kind: BuildKind): ProjectType {
  return kindById(kind).projectType
}

export function blankDraft(): BuilderDraft {
  const screens = defaultScreens("app")
  return {
    kind: "app",
    businessName: "",
    offer: "",
    audience: audienceCatalog.app[0].id,
    screens,
    accent: "green",
    activeScreen: screens[0],
    device: "phone",
  }
}

export function withKind(draft: BuilderDraft, kind: BuildKind): BuilderDraft {
  const screens = defaultScreens(kind)
  return {
    ...draft,
    kind,
    audience: audienceCatalog[kind][0].id,
    screens,
    activeScreen: screens[0],
  }
}

export function withScreens(draft: BuilderDraft, screens: string[]): BuilderDraft {
  const allowed = new Set(screenCatalog[draft.kind].map((screen) => screen.id))
  const ordered = screenCatalog[draft.kind]
    .map((screen) => screen.id)
    .filter((id) => screens.includes(id) && allowed.has(id))
  const next = ordered.length > 0 ? ordered : defaultScreens(draft.kind)
  return {
    ...draft,
    screens: next,
    activeScreen: next.includes(draft.activeScreen)
      ? draft.activeScreen
      : next[0],
  }
}

function isKind(value: unknown): value is BuildKind {
  return typeof value === "string" && buildKindIds.includes(value as BuildKind)
}

function isAccent(value: unknown): value is AccentId {
  return typeof value === "string" && accentIds.includes(value as AccentId)
}

function isDevice(value: unknown): value is PreviewDevice {
  return typeof value === "string" && deviceIds.includes(value as PreviewDevice)
}

export function readDraft(raw: string | null): BuilderDraft | null {
  if (!raw) return null
  try {
    const data = JSON.parse(raw) as Partial<BuilderDraft>
    if (!isKind(data.kind)) return null
    const base = withKind(blankDraft(), data.kind)
    const screens = Array.isArray(data.screens)
      ? data.screens.filter((id): id is string => typeof id === "string")
      : base.screens
    const draft = withScreens(
      {
        ...base,
        businessName:
          typeof data.businessName === "string" ? data.businessName.slice(0, 60) : "",
        offer: typeof data.offer === "string" ? data.offer.slice(0, 160) : "",
        audience:
          typeof data.audience === "string" &&
          audienceCatalog[data.kind].some((item) => item.id === data.audience)
            ? data.audience
            : base.audience,
        accent: isAccent(data.accent) ? data.accent : "green",
        device: isDevice(data.device) ? data.device : "phone",
        activeScreen:
          typeof data.activeScreen === "string" ? data.activeScreen : base.activeScreen,
      },
      screens,
    )
    return draft
  } catch {
    return null
  }
}

export function composeBrief(draft: BuilderDraft, note: string) {
  const kind = kindById(draft.kind)
  const audience = audienceById(draft.kind, draft.audience)
  const accent = accentById(draft.accent)
  const screens = selectedScreens(draft)
  const line = draft.offer.trim()
  const lines = [
    "Live sketch from the website.",
    "",
    `What: ${kind.label}`,
    `Name: ${draft.businessName.trim()}`,
    `One line: ${line || "Not added yet."}`,
    `Who: ${audience.label} — ${audience.detail}`,
    `Includes: ${screens.map((screen) => screen.label).join(", ")}`,
    `Colour: ${accent.label}`,
  ]
  const extra = note.trim()
  if (extra) {
    lines.push("", "Note:", extra)
  }
  return lines.join("\n")
}
