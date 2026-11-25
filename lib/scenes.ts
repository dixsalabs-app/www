export const sceneIds = [
  "pos",
  "orders",
  "invoice",
  "site",
  "clinic",
  "phone",
  "search",
  "film",
  "quote",
  "payroll",
] as const

export type SceneId = (typeof sceneIds)[number]

export const sceneAlt: Record<SceneId, string> = {
  pos: "A point-of-sale screen with tables and today’s bill.",
  orders: "An order list shared by the shop and the godown.",
  invoice: "A GST invoice ready to send on WhatsApp.",
  site: "A shop website with the offer and a way to call.",
  clinic: "A clinic desk with today’s appointments.",
  phone: "A phone screen with the day’s jobs.",
  search: "A search result for a local service.",
  film: "A film player with the next titles queued.",
  quote: "A quote waiting for a person to approve it.",
  payroll: "A payroll status the customer can read.",
}
