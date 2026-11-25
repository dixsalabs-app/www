"use client"

import { useEffect, useId, useState } from "react"
import {
  accentById,
  audienceById,
  contactChannels,
  contactSlots,
  displayName,
  fileFilters,
  offerLine,
  sampleFlow,
  sampleOrders,
  samplePeople,
  sampleThreads,
  selectedScreens,
  resolveScreen,
  type BuilderDraft,
  type ChatThread,
  type FlowDraft,
  type OrderRow,
  type OrderStatus,
} from "@/lib/builder"
import { cn } from "@/lib/utils"
import { SketchBody, type SketchModel } from "@/components/builder/sketch-screens"

type Variant = "compact" | "stage"

export function LivePreview({
  draft,
  variant,
  onScreen,
}: {
  draft: BuilderDraft
  variant: Variant
  onScreen: (id: string) => void
}) {
  const accent = accentById(draft.accent)
  const screen = resolveScreen(draft)

  return (
    <div
      className="sketch w-full text-neutral-950"
      style={
        {
          "--sketch": accent.swatch,
          "--sketch-ink": accent.ink,
        } as React.CSSProperties
      }
    >
      <p className="sr-only" aria-live="polite">
        Sketch showing {screen || "nothing yet"}
      </p>
      <PreviewSession
        key={draft.kind}
        draft={draft}
        variant={variant}
        screen={screen}
        onScreen={onScreen}
      />
    </div>
  )
}

function PreviewSession({
  draft,
  variant,
  screen,
  onScreen,
}: {
  draft: BuilderDraft
  variant: Variant
  screen: string
  onScreen: (id: string) => void
}) {
  const [tasks, setTasks] = useState<Record<string, boolean>>({})
  const [orders, setOrders] = useState<OrderRow[]>(() => sampleOrders())
  const [openOrder, setOpenOrder] = useState(sampleOrders()[0].id)
  const [orderQuery, setOrderQuery] = useState("")
  const [orderFilter, setOrderFilter] = useState<"All" | OrderStatus>("All")
  const [person, setPerson] = useState(() => samplePeople(draft.audience)[0].name)
  const [personQuery, setPersonQuery] = useState("")
  const [fileFilter, setFileFilter] = useState<(typeof fileFilters)[number]>("All")
  const [openFile, setOpenFile] = useState<string | null>(null)
  const [threads, setThreads] = useState<ChatThread[]>(() => sampleThreads())
  const [activeThread, setActiveThread] = useState<string | null>(null)
  const [reply, setReply] = useState("")
  const [flow, setFlow] = useState<FlowDraft[]>(() => sampleFlow())
  const [undo, setUndo] = useState<FlowDraft[] | null>(null)
  const [editing, setEditing] = useState<string | null>(null)
  const [rules, setRules] = useState<Record<string, boolean>>({
    r1: true,
    r2: false,
    r3: true,
  })
  const [visitor, setVisitor] = useState("")
  const [channel, setChannel] = useState<(typeof contactChannels)[number]>("Call")
  const [slot, setSlot] = useState<(typeof contactSlots)[number]>("Morning")
  const [siteSent, setSiteSent] = useState(false)
  const [openPoint, setOpenPoint] = useState("offer")
  const [featuredQuote, setFeaturedQuote] = useState(0)
  const [notice, setNotice] = useState("Click around. The records are samples.")
  const replyId = useId()
  const visitorId = useId()
  const searchId = useId()

  useEffect(() => {
    const people = samplePeople(draft.audience)
    setPerson(people[0]?.name ?? "")
    setPersonQuery("")
  }, [draft.audience])

  const name = displayName(draft)
  const offer = offerLine(draft)
  const audience = audienceById(draft.kind, draft.audience)
  const tabs = selectedScreens(draft)
  const fresh = orders.filter((row) => row.status === "New").length
  const unread = threads.filter((thread) => thread.unread).length
  const waiting = flow.filter((item) => item.state === "waiting").length

  const hint =
    draft.kind === "workflow"
      ? waiting === 0
        ? "Queue clear"
        : `${waiting} to review`
      : draft.kind === "site"
        ? "Sample page"
        : fresh + unread > 0
          ? `${fresh} new · ${unread} unread`
          : "Up to date"

  function setOrderStatus(id: string, status: OrderStatus) {
    setOrders((rows) => rows.map((row) => (row.id === id ? { ...row, status } : row)))
    setNotice(`Order ${id} is now ${status.toLowerCase()}.`)
  }

  function openThread(id: string | null) {
    setActiveThread(id)
    if (!id) return
    setThreads((current) =>
      current.map((thread) => (thread.id === id ? { ...thread, unread: false } : thread)),
    )
  }

  function sendReply(text: string) {
    const clean = text.trim()
    if (!clean || !activeThread) return
    setThreads((current) =>
      current.map((thread) =>
        thread.id === activeThread
          ? {
              ...thread,
              unread: false,
              messages: [
                ...thread.messages,
                { id: `you-${thread.messages.length + 1}`, from: "You", text: clean },
              ],
            }
          : thread,
      ),
    )
    setReply("")
    setNotice("Reply added in this sketch.")
  }

  function markFlow(id: string, state: "sent" | "skipped" | "waiting") {
    setUndo(flow)
    setFlow((current) => current.map((item) => (item.id === id ? { ...item, state } : item)))
    setEditing(null)
    setNotice(
      state === "sent"
        ? "Approved. It is now on Sent."
        : state === "skipped"
          ? "Skipped. You can bring it back from Sent."
          : "Moved back to review.",
    )
  }

  const model: SketchModel = {
    name,
    nameIsPlaceholder: draft.businessName.trim().length === 0,
    offer,
    audience,
    screens: draft.screens,
    kind: draft.kind,
    screen,
    onScreen,
    tasks,
    toggleTask: (id) => {
      setTasks((current) => ({ ...current, [id]: !current[id] }))
      setNotice("Morning list updated.")
    },
    orders,
    openOrder,
    setOpenOrder,
    orderQuery,
    setOrderQuery,
    orderFilter,
    setOrderFilter,
    setOrderStatus,
    people: samplePeople(draft.audience),
    person,
    setPerson,
    personQuery,
    setPersonQuery,
    fileFilter,
    setFileFilter,
    openFile,
    setOpenFile,
    threads,
    activeThread,
    openThread,
    reply,
    setReply,
    sendReply,
    flow,
    markFlow,
    undo,
    restore: () => {
      if (!undo) return
      setFlow(undo)
      setUndo(null)
      setNotice("Last change undone.")
    },
    editing,
    setEditing,
    updateBody: (id, body) => {
      setFlow((current) =>
        current.map((item) => (item.id === id ? { ...item, body, edited: true } : item)),
      )
    },
    rules,
    toggleRule: (id) => {
      setRules((current) => ({ ...current, [id]: !current[id] }))
      setNotice("Rule updated. The queue follows it.")
    },
    visitor,
    setVisitor,
    channel,
    setChannel,
    slot,
    setSlot,
    siteSent,
    submitSite: () => {
      if (!visitor.trim()) {
        setNotice("Add a name so the note has someone on it.")
        return
      }
      setSiteSent(true)
      setNotice("Saved in this sketch. Nothing was sent.")
    },
    reopenSite: () => {
      setSiteSent(false)
      setNotice("You can change the note.")
    },
    openPoint,
    setOpenPoint,
    featuredQuote,
    setFeaturedQuote,
    replyId,
    visitorId,
    searchId,
  }

  return (
    <SketchFrame
      variant={variant}
      device={draft.device}
      kind={draft.kind}
      name={name}
      nameIsPlaceholder={model.nameIsPlaceholder}
      offer={offer.placeholder ? "" : offer.text}
      hint={hint}
      notice={notice}
      tabs={tabs.map((tab) => ({ id: tab.id, label: tab.label }))}
      active={screen}
      onTab={onScreen}
    >
      <SketchBody model={model} />
    </SketchFrame>
  )
}

function SketchFrame({
  variant,
  device,
  kind,
  name,
  nameIsPlaceholder,
  offer,
  hint,
  notice,
  tabs,
  active,
  onTab,
  children,
}: {
  variant: Variant
  device: BuilderDraft["device"]
  kind: BuilderDraft["kind"]
  name: string
  nameIsPlaceholder: boolean
  offer: string
  hint: string
  notice: string
  tabs: { id: string; label: string }[]
  active: string
  onTab: (id: string) => void
  children: React.ReactNode
}) {
  const phone = variant === "stage" && device === "phone"
  const desktop = variant === "stage" && device === "desktop" && kind !== "site"
  const site = kind === "site"

  return (
    <div
      className={cn(
        "flex overflow-hidden bg-white shadow-xl ring-1 ring-black/5",
        variant === "compact" && "h-[20rem] w-full flex-col rounded-2xl",
        phone &&
          "mx-auto h-[min(40rem,calc(100svh-8rem))] w-full max-w-[23rem] flex-col rounded-[1.8rem]",
        variant === "stage" &&
          device === "desktop" &&
          !site &&
          "h-[min(40rem,calc(100svh-8rem))] w-full max-w-4xl rounded-xl",
        variant === "stage" &&
          device === "desktop" &&
          site &&
          "h-[min(44rem,calc(100svh-7rem))] w-full max-w-none flex-col rounded-xl",
        desktop && "flex-row",
      )}
    >
      {phone ? (
        <div className="flex justify-center bg-white pt-2">
          <div className="h-1.5 w-16 rounded-full bg-neutral-200" />
        </div>
      ) : null}
      {site && variant === "stage" && device === "desktop" ? (
        <div className="flex shrink-0 items-center justify-between gap-6 border-b border-neutral-200 px-8 py-4">
          <p className={cn("truncate text-base font-semibold", nameIsPlaceholder && "text-neutral-400")}>
            {name}
          </p>
          <nav aria-label="Page sections" className="flex shrink-0 items-center gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTab(tab.id)}
                aria-current={tab.id === active ? "page" : undefined}
                className={cn(
                  "text-sm font-medium",
                  tab.id === active
                    ? "text-[var(--sketch)] underline decoration-2 underline-offset-8"
                    : "text-neutral-500 hover:text-neutral-950",
                )}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      ) : desktop ? (
        <nav aria-label="Sketch screens" className="flex w-44 shrink-0 flex-col gap-1 border-r border-neutral-200 bg-neutral-50 p-3">
          <p className={cn("truncate px-2 pt-1 text-sm font-semibold", nameIsPlaceholder && "text-neutral-400")}>
            {name}
          </p>
          {offer ? (
            <p className="line-clamp-3 px-2 pb-2 text-[11px] leading-snug text-neutral-500">{offer}</p>
          ) : (
            <p className="px-2 pb-2 text-[11px] text-neutral-400">Your line appears here.</p>
          )}
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTab(tab.id)}
              aria-current={tab.id === active ? "page" : undefined}
              className={cn(
                "rounded-lg px-2 py-2 text-left text-sm",
                tab.id === active
                  ? "bg-[var(--sketch)] font-medium text-[var(--sketch-ink)]"
                  : "text-neutral-600 hover:bg-white",
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      ) : (
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-neutral-200 px-4 py-2.5">
          <p className={cn("truncate text-sm font-semibold", nameIsPlaceholder && "text-neutral-400")}>
            {name}
          </p>
          <p className="shrink-0 rounded-full bg-neutral-100 px-2 py-1 text-[10px] font-medium tracking-wide text-neutral-500 uppercase">
            {hint}
          </p>
        </div>
      )}

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        {site && !(variant === "stage" && device === "desktop") ? (
          <nav aria-label="Page sections" className="flex shrink-0 gap-1 overflow-x-auto border-b border-neutral-200 px-3 py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTab(tab.id)}
                aria-current={tab.id === active ? "page" : undefined}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium",
                  tab.id === active
                    ? "bg-[var(--sketch)] text-[var(--sketch-ink)]"
                    : "text-neutral-500",
                )}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        ) : null}
        <div className="@container min-h-0 flex-1 overflow-y-auto">{children}</div>
        <p className="shrink-0 border-t border-neutral-100 px-3 py-1.5 text-[11px] text-neutral-400" aria-live="polite">
          {notice}
        </p>
        {desktop || site ? null : (
          <nav
            aria-label="Sketch screens"
            className="grid shrink-0 border-t border-neutral-200"
            style={{ gridTemplateColumns: `repeat(${Math.max(tabs.length, 1)}, minmax(0, 1fr))` }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTab(tab.id)}
                aria-current={tab.id === active ? "page" : undefined}
                className={cn(
                  "truncate px-1 py-2.5 text-[11px] font-medium",
                  tab.id === active ? "text-[var(--sketch)]" : "text-neutral-500",
                )}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </div>
  )
}
