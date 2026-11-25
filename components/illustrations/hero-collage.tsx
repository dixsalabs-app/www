"use client"

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react"
import Link from "next/link"
import { ArrowRight, Search, Sparkles } from "lucide-react"
import { useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

const scenes = [
  {
    id: "app",
    label: "Web app",
    action: "See web apps",
    href: "/services/web-apps",
    kicker: "Web apps",
    line: "Orders, payments, and follow-ups on one screen the team opens every day.",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    action: "See automation",
    href: "/services/ai-automation",
    kicker: "WhatsApp automation",
    line: "A reply or an invoice goes out on WhatsApp, and a person can still check it.",
  },
  {
    id: "youtube",
    label: "YouTube",
    action: "See the films",
    href: "/services/content",
    kicker: "YouTube",
    line: "A short film in the owner's words, and a plan so the next one is not a blank page.",
  },
  {
    id: "seo",
    label: "SEO",
    action: "See SEO",
    href: "/services/seo",
    kicker: "SEO",
    line: "The page title changes to the words a buyer already types into Google.",
  },
  {
    id: "ai",
    label: "AI SEO",
    action: "See AI SEO",
    href: "/services/ai-seo",
    kicker: "AI SEO",
    line: "An assistant quotes the offer, the city, and how to start — not a guess.",
  },
] as const

type SceneId = (typeof scenes)[number]["id"]

function useCount(from: number, to: number, animate: boolean) {
  const [value, setValue] = useState(animate ? from : to)

  useEffect(() => {
    if (!animate) return
    let current = from
    const id = window.setInterval(() => {
      current += 1
      setValue(current)
      if (current >= to) window.clearInterval(id)
    }, 90)
    return () => window.clearInterval(id)
  }, [animate, from, to])

  return value
}

function useTyped(text: string, animate: boolean) {
  const [count, setCount] = useState(animate ? 0 : text.length)

  useEffect(() => {
    if (!animate) return
    let index = 0
    const id = window.setInterval(() => {
      index += 1
      setCount(index)
      if (index >= text.length) window.clearInterval(id)
    }, 18)
    return () => window.clearInterval(id)
  }, [animate, text])

  return text.slice(0, count)
}

function WebAppStory({ animate }: { animate: boolean }) {
  const open = useCount(12, 18, animate)
  const [grown, setGrown] = useState(!animate)
  const bars = [42, 64, 50, 88, 72, 96]

  useEffect(() => {
    if (!animate) return
    const id = window.setTimeout(() => setGrown(true), 40)
    return () => window.clearTimeout(id)
  }, [animate])

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex h-9 items-center gap-1.5 bg-[#143026] px-3">
        <span className="size-2 rounded-full bg-terracotta" />
        <span className="size-2 rounded-full bg-marigold" />
        <span className="size-2 rounded-full bg-brand" />
        <span className="ml-2 text-xs font-medium text-white/85">Orders</span>
        <span className="ml-auto font-mono text-xs text-marigold">{open} open</span>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-[5.5rem_1fr]">
        <div className="flex flex-col gap-2 bg-[#143026] px-3 py-4">
          <span className="h-2 w-12 rounded-full bg-brand" />
          <span className="h-1.5 w-9 rounded-full bg-white/35" />
          <span className="h-1.5 w-10 rounded-full bg-white/20" />
          <span className="h-1.5 w-8 rounded-full bg-white/20" />
        </div>
        <div className="flex min-w-0 flex-col px-3 py-3">
          <p className="text-xs font-medium text-[#143026]">Today</p>
          <div className="mt-3 flex h-24 items-end justify-between">
            {bars.map((height, index) => (
              <span
                key={index}
                className="block w-3 origin-bottom rounded-sm transition-transform duration-700 ease-studio"
                style={{
                  height,
                  transform: `scaleY(${grown ? 1 : 0.25})`,
                  backgroundColor: index === 4 ? "#c47a1a" : index === 2 ? "#143026" : "#157a3e",
                }}
              />
            ))}
          </div>
          <div className="mt-auto flex items-center justify-between gap-2 border-t border-border pt-2">
            <span className="truncate text-xs text-[#3f6b52]">Table 4 · packed</span>
            <span className="shrink-0 rounded-full bg-[#e8f5ee] px-2 py-0.5 text-[10px] font-medium text-brand">
              Paid
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function WhatsAppStory({ animate }: { animate: boolean }) {
  const [sent, setSent] = useState(!animate)

  useEffect(() => {
    if (!animate) return
    const id = window.setTimeout(() => setSent(true), 650)
    return () => window.clearTimeout(id)
  }, [animate])

  return (
    <div className="flex h-full items-center justify-center bg-[#f3f8f5] px-4">
      <div className="flex h-[92%] w-full max-w-[15rem] flex-col rounded-[1.7rem] bg-[#143026] p-1.5 shadow-[0_18px_40px_-24px_rgb(20_48_38/0.55)]">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.25rem] bg-[#efeae2]">
          <div className="flex items-center gap-2 bg-[#075e54] px-3 py-2">
            <span className="grid size-7 place-items-center rounded-full bg-white/15 text-[11px] font-semibold text-white">
              W
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-medium text-white">Invoices</span>
              <span className="block text-[10px] text-white/75">
                {sent ? "sent · checked by the team" : "typing…"}
              </span>
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-end gap-2 px-2.5 py-2.5">
            <p className="max-w-[92%] self-start rounded-2xl rounded-bl-md bg-white px-2.5 py-1.5 text-xs leading-snug text-[#143026] shadow-sm">
              Can you send the bill?
            </p>
            <p
              className={cn(
                "max-w-[95%] self-end rounded-2xl rounded-br-md bg-[#d9fdd3] px-2.5 py-1.5 text-xs leading-snug text-[#143026] transition-opacity duration-300",
                sent ? "opacity-100" : "opacity-0",
              )}
            >
              Sent. Invoice #1042.
              <span className="ml-1 text-[10px] text-[#53bdeb]">✓✓</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function YouTubeStory({ animate }: { animate: boolean }) {
  const [progress, setProgress] = useState(animate ? 8 : 62)

  useEffect(() => {
    if (!animate) return
    const id = window.setTimeout(() => setProgress(62), 40)
    return () => window.clearTimeout(id)
  }, [animate])

  return (
    <div className="relative h-full overflow-hidden bg-[#143026]">
      <div className="absolute -top-6 -right-4 size-24 rounded-full bg-marigold" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-[#0e5c32]" />
      <svg viewBox="0 0 80 72" aria-hidden className="absolute top-8 left-8 w-20 sm:left-12">
        <rect x="18" y="4" width="5" height="28" rx="1.5" fill="#f7fbf8" />
        <rect x="57" y="4" width="5" height="28" rx="1.5" fill="#f7fbf8" />
        <rect x="16" y="4" width="48" height="8" rx="2" fill="#c47a1a" />
        <rect x="12" y="30" width="56" height="7" rx="2" fill="#f7fbf8" />
        <rect x="16" y="37" width="5" height="22" rx="1" fill="#f7fbf8" />
        <rect x="59" y="37" width="5" height="22" rx="1" fill="#f7fbf8" />
      </svg>
      <div className="absolute inset-0 grid place-items-center pb-10">
        <span className="grid size-12 place-items-center rounded-full bg-white text-[#143026] shadow-md">
          <svg viewBox="0 0 12 12" className="ml-0.5 size-4" aria-hidden>
            <path d="M2.5 1.2 v9.6 l8-4.8 z" fill="currentColor" />
          </svg>
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-4 px-4">
        <p className="text-sm font-medium text-white">How a chair is made</p>
        <p className="text-xs text-white/75">Karkhana · Berhampur</p>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1.5 bg-white/20">
        <span
          className="block h-full bg-terracotta transition-[width] duration-[4600ms] ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

function SeoStory({ animate }: { animate: boolean }) {
  const [matched, setMatched] = useState(!animate)

  useEffect(() => {
    if (!animate) return
    const id = window.setTimeout(() => setMatched(true), 600)
    return () => window.clearTimeout(id)
  }, [animate])

  return (
    <div className="flex h-full flex-col justify-center bg-white px-4 py-4">
      <div className="flex items-center gap-2 rounded-full border border-border bg-[#f4faf6] px-3 py-2">
        <Search className="size-4 shrink-0 text-brand" aria-hidden />
        <span className="truncate text-sm text-[#143026]">root canal bhubaneswar</span>
      </div>
      <div
        className={cn(
          "mt-3 rounded-2xl px-3 py-3 transition-colors duration-500",
          matched ? "bg-[#e8f5ee]" : "bg-[#f4faf6]",
        )}
      >
        <p className="text-[11px] text-[#3f6b52]">Nila Dental · Bhubaneswar</p>
        <p
          className={cn(
            "mt-1 text-sm font-medium transition-colors duration-500",
            matched ? "text-brand" : "text-[#143026]",
          )}
        >
          {matched ? "Root canal in Bhubaneswar" : "Our services"}
        </p>
        <p className="mt-1 text-xs text-[#3f6b52]">
          {matched ? "The title matches the search" : "The fee, and how to book"}
        </p>
      </div>
    </div>
  )
}

const aiAnswer = "Nila Dental in Bhubaneswar. The fee and how to book are on the page."

function AiSeoStory({ animate }: { animate: boolean }) {
  const typed = useTyped(aiAnswer, animate)
  const done = typed.length === aiAnswer.length

  return (
    <div className="flex h-full flex-col bg-white px-4 py-4">
      <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.16em] text-marigold uppercase">
        <Sparkles className="size-3.5" aria-hidden />
        AI answer
      </div>
      <p className="mt-3 font-serif text-lg leading-snug text-[#143026]">
        Who does a root canal in Bhubaneswar?
      </p>
      <p className="mt-3 min-h-[4.5rem] text-sm leading-relaxed text-[#143026]">
        {typed}
        {animate && !done ? (
          <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 bg-brand motion-safe:animate-pulse" />
        ) : null}
      </p>
      <p
        className={cn(
          "mt-auto text-xs font-medium text-brand transition-opacity duration-500",
          done ? "opacity-100" : "opacity-0",
        )}
      >
        Cited · the clinic&apos;s page
      </p>
    </div>
  )
}

function Story({ id, animate }: { id: SceneId; animate: boolean }) {
  if (id === "app") return <WebAppStory animate={animate} />
  if (id === "whatsapp") return <WhatsAppStory animate={animate} />
  if (id === "youtube") return <YouTubeStory animate={animate} />
  if (id === "seo") return <SeoStory animate={animate} />
  return <AiSeoStory animate={animate} />
}

export function HeroCollage() {
  const reduce = useReducedMotion() === true
  const [index, setIndex] = useState(0)
  const [nonce, setNonce] = useState(1)
  const [paused, setPaused] = useState(false)
  const indexRef = useRef(0)
  const chosenAt = useRef(0)
  const buttons = useRef<Array<HTMLButtonElement | null>>([])
  const scene = scenes[index]

  indexRef.current = index

  useEffect(() => {
    if (reduce || paused) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % scenes.length)
    }, 5600)
    return () => window.clearInterval(id)
  }, [paused, reduce])

  function go(next: number, replayIfSame: boolean) {
    if (indexRef.current !== next) {
      chosenAt.current = Date.now()
      indexRef.current = next
      setIndex(next)
      return
    }
    if (replayIfSame && Date.now() - chosenAt.current > 450) {
      setNonce((current) => current + 1)
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (
      event.key !== "ArrowRight" &&
      event.key !== "ArrowLeft" &&
      event.key !== "ArrowDown" &&
      event.key !== "ArrowUp"
    ) {
      return
    }
    event.preventDefault()
    const direction = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1
    const next = (indexRef.current + direction + scenes.length) % scenes.length
    go(next, false)
    buttons.current[next]?.focus()
  }

  return (
    <figure
      className="mx-auto w-full max-w-lg"
      onPointerEnter={(event: PointerEvent<HTMLElement>) => {
        if (event.pointerType === "mouse") setPaused(true)
      }}
      onPointerLeave={(event) => {
        const activeElement = document.activeElement
        if (activeElement instanceof Node && event.currentTarget.contains(activeElement)) return
        setPaused(false)
      }}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false)
      }}
    >
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-6 right-6 size-24 rounded-full bg-marigold/20"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-5 -left-4 size-20 rounded-full bg-brand/10"
        />
        <button
          type="button"
          onClick={() => go(index, true)}
          className="relative block w-full overflow-hidden rounded-2xl border border-border bg-white text-left shadow-[0_18px_40px_-24px_rgb(20_48_38/0.45)]"
        >
          <span className="sr-only">
            {scene.kicker}. {scene.line} Activate to play it again.
          </span>
          <span className="block h-64 sm:h-72" aria-hidden>
            <Story key={`${scene.id}-${nonce}`} id={scene.id} animate={!reduce} />
          </span>
        </button>
        <div
          role="group"
          aria-label="Choose an example. Arrow keys move between them."
          onKeyDown={onKeyDown}
          className="relative mt-3 grid grid-cols-5 gap-1.5"
        >
          {scenes.map((item, itemIndex) => {
            const active = itemIndex === index
            return (
              <button
                key={item.id}
                ref={(node) => {
                  buttons.current[itemIndex] = node
                }}
                type="button"
                tabIndex={active ? 0 : -1}
                aria-pressed={active}
                onClick={() => go(itemIndex, true)}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") go(itemIndex, false)
                }}
                className={cn(
                  "rounded-full border px-1 py-1.5 text-center text-[10px] leading-tight font-semibold tracking-wide transition-colors duration-300 ease-studio sm:text-[11px]",
                  active
                    ? "border-brand bg-brand text-white"
                    : "border-border bg-white text-[#143026] hover:border-brand/40",
                )}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      </div>
      <figcaption className="mt-4 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <p className="max-w-sm text-sm leading-relaxed text-pretty text-muted-foreground">
          <span className="font-medium text-foreground">{scene.kicker}. </span>
          {scene.line}
        </p>
        <Link
          href={scene.href}
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-foreground"
        >
          <span className="underline decoration-border underline-offset-4 transition-colors group-hover:decoration-foreground">
            {scene.action}
          </span>
          <ArrowRight
            className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </figcaption>
    </figure>
  )
}
