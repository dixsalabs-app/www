import { z } from "zod"

export const projectTypeValues = [
  "website",
  "web-application",
  "mobile-app",
  "ai-automation",
  "content",
  "seo",
  "google-marketplace",
  "ai-seo",
  "marketing",
  "youtube",
  "pos",
  "gst-invoices",
  "not-sure",
] as const

export const budgetValues = [
  "under-15k",
  "15-30k",
  "30-60k",
  "60k-plus",
  "discuss",
] as const

export type ProjectType = (typeof projectTypeValues)[number]
export type BudgetRange = (typeof budgetValues)[number]

export const projectTypeOptions: { value: ProjectType; label: string }[] = [
  { value: "website", label: "A website" },
  { value: "web-application", label: "A web app for my team or customers" },
  { value: "mobile-app", label: "A mobile app" },
  { value: "ai-automation", label: "AI automation for a job we repeat" },
  { value: "content", label: "Content — create it, or sharpen what we have" },
  { value: "seo", label: "SEO" },
  { value: "google-marketplace", label: "Google Marketplace" },
  { value: "ai-seo", label: "AI SEO" },
  { value: "pos", label: "Hotel and restaurant POS" },
  { value: "gst-invoices", label: "GST invoices on WhatsApp" },
  { value: "not-sure", label: "Not sure yet" },
]

export const budgetOptions: { value: BudgetRange; label: string }[] = [
  { value: "under-15k", label: "Under ₹6 lakh" },
  { value: "15-30k", label: "₹6–12 lakh" },
  { value: "30-60k", label: "₹12–25 lakh" },
  { value: "60k-plus", label: "Above ₹25 lakh" },
  { value: "discuss", label: "Let's discuss" },
]

const projectTypeSet: readonly string[] = projectTypeValues
const budgetSet: readonly string[] = budgetValues

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "That name is too long."),
  email: z.string().trim().pipe(z.email("Enter a valid work email.")),
  company: z
    .string()
    .trim()
    .min(2, "Please enter your company.")
    .max(120, "That company name is too long."),
  projectType: z
    .string()
    .refine(
      (value) => projectTypeSet.includes(value),
      "Select a project type.",
    ),
  budget: z
    .string()
    .refine(
      (value) => value === "" || budgetSet.includes(value),
      "Select a budget range.",
    ),
  message: z
    .string()
    .trim()
    .min(24, "Tell us a little more — a few sentences helps us prepare.")
    .max(4000, "Please keep this under 4,000 characters."),
  website: z.string().optional(),
})

export type ContactInput = z.input<typeof contactSchema>
export type ContactValues = z.output<typeof contactSchema>

export function isProjectType(value: string | undefined): value is ProjectType {
  return Boolean(value && projectTypeSet.includes(value))
}

export type InquiryResult =
  | { ok: true }
  | { ok: false; message: string }
