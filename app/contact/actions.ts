"use server"

import { contactSchema, type InquiryResult } from "@/lib/contact-schema"

/**
 * Validates a project inquiry.
 * Wire delivery in this function — Resend, Postmark, or your CRM —
 * using `parsed.data` (name, email, company, projectType, budget, message).
 * Do not log the payload in production.
 */
export async function submitInquiry(input: unknown): Promise<InquiryResult> {
  const parsed = contactSchema.safeParse(input)

  if (!parsed.success) {
    return {
      ok: false,
      message: "Check the highlighted fields and try again.",
    }
  }

  if (parsed.data.website && parsed.data.website.trim().length > 0) {
    return { ok: true }
  }

  return { ok: true }
}
