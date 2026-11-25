"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { submitInquiry } from "@/app/contact/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  budgetOptions,
  contactSchema,
  projectTypeOptions,
  type ContactInput,
  type ProjectType,
} from "@/lib/contact-schema"
import { site } from "@/lib/site"

const fieldClass = "h-11 bg-background px-3 text-base md:text-base"

export function ContactForm({
  initialProjectType = "",
  intent = "",
}: {
  initialProjectType?: ProjectType | ""
  intent?: string
}) {
  const [done, setDone] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      projectType: initialProjectType,
      budget: "",
      message: "",
      website: "",
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form

  async function onSubmit(values: ContactInput) {
    setServerError(null)
    const result = await submitInquiry(values)
    if (!result.ok) {
      setServerError(result.message)
      return
    }
    setDone(true)
  }

  if (done) {
    return (
      <div className="border border-border bg-card p-7 md:p-8" role="status">
        <p className="eyebrow">Received</p>
        <h2 className="mt-4 font-serif text-3xl tracking-tight">
          We have your note.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Expect a reply within {site.responseTime}. We will say whether we are
          a fit, what a first project would take, and if a call is the right
          next step.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative border border-border bg-card p-6 md:p-8"
      noValidate
    >
      {intentNote(intent)}

      <div className="grid gap-5">
        <Field label="Name" htmlFor="name" error={errors.name?.message}>
          <Input
            id="name"
            autoComplete="name"
            className={fieldClass}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
        </Field>
        <Field label="Email" htmlFor="email" error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            className={fieldClass}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
        </Field>
        <Field label="Company" htmlFor="company" error={errors.company?.message}>
          <Input
            id="company"
            autoComplete="organization"
            className={fieldClass}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? "company-error" : undefined}
            {...register("company")}
          />
        </Field>
        <Field
          label="Project type"
          htmlFor="projectType"
          error={errors.projectType?.message}
        >
          <select
            id="projectType"
            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive"
            aria-invalid={Boolean(errors.projectType)}
            aria-describedby={errors.projectType ? "projectType-error" : undefined}
            {...register("projectType")}
          >
            <option value="">Select a project type</option>
            {projectTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label="Budget range"
          htmlFor="budget"
          hint="Optional"
          error={errors.budget?.message}
        >
          <select
            id="budget"
            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive"
            aria-invalid={Boolean(errors.budget)}
            aria-describedby={errors.budget ? "budget-error" : "budget-hint"}
            {...register("budget")}
          >
            <option value="">Select a range, if you have one</option>
            {budgetOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label="What do you wish was easier?"
          htmlFor="message"
          error={errors.message?.message}
        >
          <Textarea
            id="message"
            rows={6}
            placeholder="For example: customers cannot find us, orders still arrive on WhatsApp, or quotes take all morning."
            className="min-h-36 bg-background px-3 py-3 text-base md:text-base"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            {...register("message")}
          />
        </Field>
      </div>

      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      {serverError ? (
        <p className="mt-4 text-sm text-destructive" role="alert">
          {serverError}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-11 rounded-full px-5 text-sm"
        >
          {isSubmitting ? "Sending…" : "Start a project"}
        </Button>
        <p className="text-sm text-muted-foreground">
          We reply within {site.responseTime}.
        </p>
      </div>
    </form>
  )
}

function intentNote(intent: string) {
  if (intent === "strategy-call") {
    return (
      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
        You asked for a strategy call. Share a few details and we will send
        times — or{" "}
        <a
          href={site.bookingUrl}
          className="underline decoration-border underline-offset-4 hover:decoration-foreground"
          target="_blank"
          rel="noopener noreferrer"
        >
          book a time directly
        </a>
        .
      </p>
    )
  }

  const notes: Record<string, string> = {
    "site-or-app":
      "This can be a public website, a private app, or both. Pick the closest project type. If you are not sure, choose “Not sure yet.”",
    pos: "You are asking about the hotel and restaurant POS. Tell us the property, and how orders work today.",
    gst: "You want to start the GST invoice tool. Tell us the business name, and roughly how many invoices you send in a month.",
  }

  const note = notes[intent]
  if (!note) return null

  return (
    <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{note}</p>
  )
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <Label htmlFor={htmlFor}>{label}</Label>
        {hint ? (
          <span id={`${htmlFor}-hint`} className="text-xs text-muted-foreground">
            {hint}
          </span>
        ) : null}
      </div>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
