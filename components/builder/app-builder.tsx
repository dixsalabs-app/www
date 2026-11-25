"use client"

import { useEffect, useId, useRef, useState } from "react"
import { Monitor, Smartphone } from "lucide-react"
import { z } from "zod"
import { submitInquiry } from "@/app/contact/actions"
import { LivePreview } from "@/components/builder/live-preview"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  accents,
  audienceById,
  audienceQuestion,
  audiencesFor,
  blankDraft,
  buildKinds,
  composeBrief,
  displayName,
  kindById,
  offerLine,
  offerPlaceholder,
  projectTypeFor,
  readDraft,
  screensFor,
  screensQuestion,
  selectedScreens,
  STORAGE_KEY,
  withKind,
  withScreens,
  type AccentId,
  type BuilderDraft,
  type PreviewDevice,
} from "@/lib/builder"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

const fieldClass = "h-11 bg-background px-3 text-base md:text-base"

const stepIds = ["kind", "name", "who", "parts", "colour", "send"] as const

export function AppBuilder() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const firstRender = useRef(true)
  const headingId = useId()
  const [step, setStep] = useState(0)
  const [draft, setDraft] = useState<BuilderDraft>(() => blankDraft())
  const [hydrated, setHydrated] = useState(false)
  const [attempted, setAttempted] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [note, setNote] = useState("")
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [keepOne, setKeepOne] = useState(false)

  useEffect(() => {
    const saved = readDraft(window.localStorage.getItem(STORAGE_KEY))
    if (saved) setDraft(saved)
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft))
    } catch {
      // The sketch still works if this browser blocks storage.
    }
  }, [draft, hydrated])

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    headingRef.current?.focus()
  }, [step, sent])

  const steps = [
    { id: "kind", label: "What should we build?" },
    { id: "name", label: "Name it." },
    { id: "who", label: audienceQuestion(draft.kind) },
    { id: "parts", label: screensQuestion(draft.kind) },
    { id: "colour", label: "Pick a colour." },
    { id: "send", label: "Send the sketch." },
  ]

  const emailOk = z.email().safeParse(email.trim()).success
  const nameOk = name.trim().length >= 2
  const businessOk = draft.businessName.trim().length >= 2

  function stepReady(index: number) {
    if (index === 1) return businessOk
    if (index === 3) return draft.screens.length > 0
    if (index === 5) return nameOk && emailOk
    return true
  }

  function go(next: number) {
    setAttempted(false)
    setError(null)
    setKeepOne(false)
    setStep(next)
  }

  function continueStep() {
    if (!stepReady(step)) {
      setAttempted(true)
      return
    }
    go(Math.min(step + 1, steps.length - 1))
  }

  function reset() {
    setDraft(blankDraft())
    setStep(0)
    setName("")
    setEmail("")
    setNote("")
    setSent(false)
    setError(null)
    setAttempted(false)
    setKeepOne(false)
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      // Ignore storage failures.
    }
  }

  function toggleScreen(id: string) {
    if (draft.screens.includes(id) && draft.screens.length === 1) {
      setKeepOne(true)
      return
    }
    setKeepOne(false)
    setDraft((current) => {
      const has = current.screens.includes(id)
      if (has && current.screens.length === 1) return current
      const screens = has
        ? current.screens.filter((screen) => screen !== id)
        : [...current.screens, id]
      return withScreens(current, screens)
    })
  }

  async function onSend(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAttempted(true)
    if (!nameOk || !emailOk) return
    setPending(true)
    setError(null)
    const result = await submitInquiry({
      name: name.trim(),
      email: email.trim(),
      company: draft.businessName.trim(),
      projectType: projectTypeFor(draft.kind),
      budget: "",
      message: composeBrief(draft, note),
      website: "",
    })
    setPending(false)
    if (!result.ok) {
      setError(result.message)
      return
    }
    setSent(true)
  }

  const summary = [
    { step: 0, label: "What", value: kindById(draft.kind).label },
    { step: 1, label: "Name", value: displayName(draft) },
    {
      step: 1,
      label: "Line",
      value: draft.offer.trim() || "Not added yet",
    },
    { step: 2, label: "Who", value: audienceById(draft.kind, draft.audience).label },
    {
      step: 3,
      label: "Includes",
      value: selectedScreens(draft).map((screen) => screen.label).join(", "),
    },
    {
      step: 4,
      label: "Colour",
      value: accents.find((accent) => accent.id === draft.accent)?.label ?? "Cognac",
    },
  ]

  return (
    <div className="lg:grid lg:grid-cols-[minmax(20rem,28rem)_minmax(0,1fr)]">
      <section className="flex min-h-[calc(100svh-4rem)] flex-col lg:h-[calc(100svh-4rem)] lg:min-h-0 lg:overflow-hidden">
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 md:px-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Build" }]} />
        <p className="eyebrow mt-5">Build it live</p>
        <ol aria-label="Progress" className="mt-5 flex gap-1.5">
          {steps.map((item, index) => (
            <li key={item.id} className="flex-1">
              <button
                type="button"
                disabled={index > step || sent}
                aria-current={index === step && !sent ? "step" : undefined}
                aria-label={`${index + 1}. ${item.label}`}
                onClick={() => go(index)}
                className={cn(
                  "block h-1.5 w-full rounded-full",
                  index <= step ? "bg-brand" : "bg-border",
                  "disabled:cursor-default",
                )}
              />
            </li>
          ))}
        </ol>

        {sent ? (
          <div className="mt-8" role="status">
            <h1
              ref={headingRef}
              tabIndex={-1}
              className="display text-[clamp(2.8rem,6vw,4.4rem)] outline-none"
            >
              We have this sketch.
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              A person on the team will read it and reply within {site.responseTime}.
              The sketch stays on this page so you can still click through it.
            </p>
            <div className="sticky top-16 z-20 -mx-5 mt-6 border-y border-border bg-background/95 px-5 py-3 backdrop-blur-md lg:hidden">
              <LivePreview
                draft={draft}
                variant="compact"
                onScreen={(id) => setDraft((current) => ({ ...current, activeScreen: id }))}
              />
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button type="button" className="h-11 rounded-full px-5" onClick={() => setSent(false)}>
                Edit and send again
              </Button>
              <Button type="button" variant="outline" className="h-11 rounded-full px-5" onClick={reset}>
                Start another
              </Button>
            </div>
          </div>
        ) : (
          <>
            <p className="mt-4 font-mono text-xs text-brand-ink">
              {step + 1} of {steps.length}
            </p>
            <h1
              ref={headingRef}
              id={headingId}
              tabIndex={-1}
              className="display mt-3 text-[clamp(2.3rem,4vw,3.4rem)] outline-none"
            >
              {steps[step].label}
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              {stepHelp(stepIds[step], draft.kind)}
            </p>

            <div className="sticky top-16 z-20 -mx-5 mt-6 border-y border-border bg-background/95 px-5 py-3 backdrop-blur-md lg:hidden">
              <LivePreview
                draft={draft}
                variant="compact"
                onScreen={(id) => setDraft((current) => ({ ...current, activeScreen: id }))}
              />
            </div>

            <div className="mt-6">
              {step === 0 ? (
                <fieldset>
                  <legend className="sr-only">{steps[0].label}</legend>
                  <div className="grid gap-2">
                    {buildKinds.map((kind) => (
                      <ChoiceCard
                        key={kind.id}
                        type="radio"
                        name="kind"
                        checked={draft.kind === kind.id}
                        title={kind.label}
                        detail={kind.detail}
                        onChange={() =>
                          setDraft((current) => withKind(current, kind.id))
                        }
                      />
                    ))}
                  </div>
                </fieldset>
              ) : null}

              {step === 1 ? (
                <div className="grid gap-5">
                  <div className="grid gap-2">
                    <Label htmlFor="businessName">Business name</Label>
                    <Input
                      id="businessName"
                      value={draft.businessName}
                      maxLength={60}
                      autoComplete="organization"
                      className={fieldClass}
                      aria-invalid={attempted && !businessOk}
                      onChange={(event) => {
                        const value = event.target.value
                        setDraft((current) => ({ ...current, businessName: value }))
                      }}
                    />
                    {attempted && !businessOk ? (
                      <p className="text-sm text-destructive" role="alert">
                        Enter the business name.
                      </p>
                    ) : null}
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-baseline justify-between gap-3">
                      <Label htmlFor="offer">One sentence</Label>
                      <span className="text-xs text-muted-foreground">Optional</span>
                    </div>
                    <Textarea
                      id="offer"
                      value={draft.offer}
                      maxLength={160}
                      rows={3}
                      placeholder={offerPlaceholder(draft.kind)}
                      className="min-h-24 bg-background px-3 py-3 text-base md:text-base"
                      onChange={(event) => {
                        const value = event.target.value
                        setDraft((current) => ({ ...current, offer: value }))
                      }}
                    />
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <fieldset>
                  <legend className="sr-only">{steps[2].label}</legend>
                  <div className="grid gap-3">
                    {audiencesFor(draft.kind).map((audience) => (
                      <ChoiceCard
                        key={audience.id}
                        type="radio"
                        name="audience"
                        checked={draft.audience === audience.id}
                        title={audience.label}
                        detail={audience.detail}
                        onChange={() =>
                          setDraft((current) => ({
                            ...current,
                            audience: audience.id,
                          }))
                        }
                      />
                    ))}
                  </div>
                </fieldset>
              ) : null}

              {step === 3 ? (
                <fieldset>
                  <legend className="sr-only">{steps[3].label}</legend>
                  <div className="grid gap-3">
                    {screensFor(draft.kind).map((screen) => (
                      <ChoiceCard
                        key={screen.id}
                        type="checkbox"
                        name="screens"
                        checked={draft.screens.includes(screen.id)}
                        title={screen.label}
                        detail={screen.detail}
                        onChange={() => toggleScreen(screen.id)}
                      />
                    ))}
                  </div>
                  {keepOne ? (
                    <p className="mt-3 text-sm text-destructive" role="alert">
                      Keep at least one part.
                    </p>
                  ) : null}
                </fieldset>
              ) : null}

              {step === 4 ? (
                <fieldset>
                  <legend className="sr-only">Colour</legend>
                  <div className="grid grid-cols-2 gap-3">
                    {accents.map((accent) => {
                      const selected = draft.accent === accent.id
                      return (
                        <label
                          key={accent.id}
                          className={cn(
                            "relative flex cursor-pointer items-center gap-3 rounded-xl border p-3",
                            "has-[:focus-visible]:border-ring has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50",
                            selected
                              ? "border-brand bg-brand/10"
                              : "border-border bg-card hover:border-foreground/25",
                          )}
                        >
                          <input
                            type="radio"
                            name="accent"
                            className="absolute inset-0 cursor-pointer opacity-0"
                            checked={selected}
                            onChange={() =>
                              setDraft((current) => ({
                                ...current,
                                accent: accent.id as AccentId,
                              }))
                            }
                          />
                          <span
                            aria-hidden
                            className="size-8 rounded-full border border-black/10"
                            style={{ background: accent.swatch }}
                          />
                          <span className="text-sm font-medium">{accent.label}</span>
                        </label>
                      )
                    })}
                  </div>
                </fieldset>
              ) : null}

              {step === 5 ? (
                <form onSubmit={onSend} noValidate className="grid gap-5">
                  <ul className="grid gap-2">
                    {summary.map((item) => (
                      <li key={`${item.label}-${item.step}`}>
                        <button
                          type="button"
                          onClick={() => go(item.step)}
                          className="flex w-full items-baseline justify-between gap-4 rounded-xl border border-border bg-card px-3 py-3 text-left hover:border-foreground/25"
                        >
                          <span className="text-xs tracking-wide text-muted-foreground uppercase">
                            {item.label}
                          </span>
                          <span className="text-sm font-medium">{item.value}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="grid gap-2">
                    <Label htmlFor="senderName">Your name</Label>
                    <Input
                      id="senderName"
                      autoComplete="name"
                      value={name}
                      className={fieldClass}
                      aria-invalid={attempted && !nameOk}
                      onChange={(event) => setName(event.target.value)}
                    />
                    {attempted && !nameOk ? (
                      <p className="text-sm text-destructive" role="alert">
                        Enter your name.
                      </p>
                    ) : null}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="senderEmail">Email</Label>
                    <Input
                      id="senderEmail"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      value={email}
                      className={fieldClass}
                      aria-invalid={attempted && !emailOk}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    {attempted && !emailOk ? (
                      <p className="text-sm text-destructive" role="alert">
                        Enter a valid email.
                      </p>
                    ) : null}
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-baseline justify-between gap-3">
                      <Label htmlFor="senderNote">Anything else</Label>
                      <span className="text-xs text-muted-foreground">Optional</span>
                    </div>
                    <Textarea
                      id="senderNote"
                      value={note}
                      rows={4}
                      maxLength={2000}
                      className="min-h-28 bg-background px-3 py-3 text-base md:text-base"
                      onChange={(event) => setNote(event.target.value)}
                    />
                  </div>
                  {error ? (
                    <p className="text-sm text-destructive" role="alert">
                      {error}
                    </p>
                  ) : null}
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Nothing reaches us until you send it. This browser keeps a copy of the
                    sketch so a refresh does not wipe it. We reply within {site.responseTime}.
                  </p>
                  <div className="flex items-center justify-between gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-11 rounded-full px-5"
                      onClick={() => go(step - 1)}
                    >
                      Back
                    </Button>
                    <Button type="submit" disabled={pending} className="h-11 rounded-full px-5">
                      {pending ? "Sending…" : "Send the sketch"}
                    </Button>
                  </div>
                </form>
              ) : null}
            </div>
          </>
        )}
        </div>
        {!sent && step < 5 ? (
          <div className="sticky bottom-0 z-30 flex items-center justify-between gap-3 border-t border-border bg-background/95 px-5 py-3 backdrop-blur-md md:px-8">
            {step > 0 ? (
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-full px-5"
                onClick={() => go(step - 1)}
              >
                Back
              </Button>
            ) : (
              <button
                type="button"
                onClick={reset}
                className="text-sm text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground"
              >
                Clear sketch
              </button>
            )}
            <Button type="button" className="h-11 rounded-full px-5" onClick={continueStep}>
              Continue
            </Button>
          </div>
        ) : null}
      </section>

      <aside className="hero-grid hidden border-l border-border bg-muted lg:sticky lg:top-16 lg:flex lg:h-[calc(100svh-4rem)] lg:flex-col lg:overflow-y-auto">
        <div className="flex items-center justify-between gap-4 px-6 py-5">
          <div>
            <p className="eyebrow">Live sketch</p>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              {offerLine(draft).placeholder
                ? "Search, open a record, change a status, or edit a draft. The names are samples, and the sentence is an example until you write your own."
                : "Search, open a record, change a status, or edit a draft. The names are samples."}
            </p>
          </div>
          <div className="flex rounded-full border border-border bg-background p-1" role="group" aria-label="Sketch size">
            <DeviceButton
              label="Phone"
              icon={<Smartphone aria-hidden />}
              pressed={draft.device === "phone"}
              onClick={() => setDevice(setDraft, "phone")}
            />
            <DeviceButton
              label="Desktop"
              icon={<Monitor aria-hidden />}
              pressed={draft.device === "desktop"}
              onClick={() => setDevice(setDraft, "desktop")}
            />
          </div>
        </div>
        <div className="flex w-full min-w-0 flex-1 items-stretch px-4 pb-8">
          <LivePreview
            draft={draft}
            variant="stage"
            onScreen={(id) => setDraft((current) => ({ ...current, activeScreen: id }))}
          />
        </div>
      </aside>
    </div>
  )
}

function setDevice(
  setDraft: React.Dispatch<React.SetStateAction<BuilderDraft>>,
  device: PreviewDevice,
) {
  setDraft((current) => ({ ...current, device }))
}

function stepHelp(id: (typeof stepIds)[number], kind: BuilderDraft["kind"]) {
  switch (id) {
    case "kind":
      return "A website if people need to find you. An app if everyone should see the same list. A repeated job if the same task eats the day. Pick the closest one — you can change it."
    case "name":
      return "The name and the sentence show up on the sketch as you type."
    case "who":
      return kind === "site"
        ? "We use this to aim the page. The names in the sketch are samples."
        : "We use this to fill the sketch with the right people. The names are samples."
    case "parts":
      return "Tick what you need. Then search, open a record, and try a status or a reply in the sketch."
    case "colour":
      return "This is the button colour. We can tune it later."
    case "send":
      return "Check the list. Tap any row to change it, then send the sketch to the studio."
  }
}

function ChoiceCard({
  type,
  name,
  checked,
  title,
  detail,
  onChange,
}: {
  type: "radio" | "checkbox"
  name: string
  checked: boolean
  title: string
  detail: string
  onChange: () => void
}) {
  return (
    <label
      className={cn(
        "relative block cursor-pointer rounded-xl border px-4 py-3 transition-colors",
        "has-[:focus-visible]:border-ring has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50",
        checked ? "border-brand bg-brand/10" : "border-border bg-card hover:border-foreground/25",
      )}
    >
      <input
        type={type}
        name={name}
        className="absolute inset-0 cursor-pointer opacity-0"
        checked={checked}
        onChange={onChange}
      />
      <span className="display block pr-8 text-[1.45rem] leading-none">{title}</span>
      <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">{detail}</span>
    </label>
  )
}

function DeviceButton({
  label,
  icon,
  pressed,
  onClick,
}: {
  label: string
  icon: React.ReactNode
  pressed: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-medium",
        pressed ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {icon}
      {label}
    </button>
  )
}
