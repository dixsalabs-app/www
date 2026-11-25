import {
  contactChannels,
  contactSlots,
  documents,
  fileFilters,
  morningTasks,
  orderStatuses,
  quickReplies,
  sampleFigures,
  sampleQuotes,
  workflowRules,
  type ChatThread,
  type FlowDraft,
  type OrderRow,
  type OrderStatus,
  type PersonRow,
} from "@/lib/builder"
import { cn } from "@/lib/utils"

type Offer = { text: string; placeholder: boolean }
type Audience = { label: string; detail: string }

export type SketchModel = {
  name: string
  nameIsPlaceholder: boolean
  offer: Offer
  audience: Audience
  screens: string[]
  kind: "app" | "site" | "workflow"
  screen: string
  onScreen: (id: string) => void
  tasks: Record<string, boolean>
  toggleTask: (id: string) => void
  orders: OrderRow[]
  openOrder: string
  setOpenOrder: (id: string) => void
  orderQuery: string
  setOrderQuery: (value: string) => void
  orderFilter: "All" | OrderStatus
  setOrderFilter: (value: "All" | OrderStatus) => void
  setOrderStatus: (id: string, status: OrderStatus) => void
  people: PersonRow[]
  person: string
  setPerson: (name: string) => void
  personQuery: string
  setPersonQuery: (value: string) => void
  fileFilter: (typeof fileFilters)[number]
  setFileFilter: (value: (typeof fileFilters)[number]) => void
  openFile: string | null
  setOpenFile: (id: string | null) => void
  threads: ChatThread[]
  activeThread: string | null
  openThread: (id: string | null) => void
  reply: string
  setReply: (value: string) => void
  sendReply: (text: string) => void
  flow: FlowDraft[]
  markFlow: (id: string, state: "sent" | "skipped" | "waiting") => void
  undo: FlowDraft[] | null
  restore: () => void
  editing: string | null
  setEditing: (id: string | null) => void
  updateBody: (id: string, body: string) => void
  rules: Record<string, boolean>
  toggleRule: (id: string) => void
  visitor: string
  setVisitor: (value: string) => void
  channel: (typeof contactChannels)[number]
  setChannel: (value: (typeof contactChannels)[number]) => void
  slot: (typeof contactSlots)[number]
  setSlot: (value: (typeof contactSlots)[number]) => void
  siteSent: boolean
  submitSite: () => void
  reopenSite: () => void
  openPoint: string
  setOpenPoint: (id: string) => void
  featuredQuote: number
  setFeaturedQuote: (index: number) => void
  replyId: string
  visitorId: string
  searchId: string
}

export function SketchBody({ model }: { model: SketchModel }) {
  const { kind, screen } = model

  if (!screen) {
    return (
      <p className="p-5 text-sm text-neutral-500">
        Tick at least one part and it will show up here.
      </p>
    )
  }

  if (kind === "app" && screen === "today") return <TodayScreen model={model} />
  if (kind === "app" && screen === "orders") return <OrdersScreen model={model} />
  if (kind === "app" && screen === "people") return <PeopleScreen model={model} />
  if (kind === "app" && screen === "files") return <FilesScreen model={model} />
  if (kind === "app" && screen === "messages") return <MessagesScreen model={model} />
  if (kind === "site" && screen === "home") return <HomeScreen model={model} />
  if (kind === "site" && screen === "offer") return <OfferScreen model={model} />
  if (kind === "site" && screen === "proof") return <ProofScreen model={model} />
  if (kind === "site" && screen === "contact") return <ContactScreen model={model} />
  if (kind === "workflow" && screen === "queue") return <QueueScreen model={model} />
  if (kind === "workflow" && screen === "done") return <DoneScreen model={model} />
  if (kind === "workflow" && screen === "rules") return <RulesScreen model={model} />

  return null
}

function TodayScreen({ model }: { model: SketchModel }) {
  const open = morningTasks.filter((task) => !model.tasks[task.id]).length
  const fresh = model.orders.filter((row) => row.status === "New").length
  const unread = model.threads.filter((thread) => thread.unread).length

  return (
    <div className="space-y-4 p-4">
      <div>
        <p className="text-lg font-semibold">Good morning</p>
        <p className={cn("text-sm", model.nameIsPlaceholder ? "text-neutral-400" : "text-neutral-500")}>
          {model.name}
        </p>
        <p className={cn("mt-2 text-sm leading-relaxed", model.offer.placeholder ? "text-neutral-400" : "text-neutral-600")}>
          {model.offer.placeholder ? `Example: ${model.offer.text}` : model.offer.text}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Stat value={String(open)} label="Still open" />
        <Stat
          value={String(fresh)}
          label="New orders"
          onOpen={model.screens.includes("orders") ? () => model.onScreen("orders") : undefined}
        />
        <Stat
          value={String(unread)}
          label="Unread"
          onOpen={model.screens.includes("messages") ? () => model.onScreen("messages") : undefined}
        />
      </div>
      <ul className="space-y-2">
        {morningTasks.map((task) => {
          const checked = Boolean(model.tasks[task.id])
          return (
            <li key={task.id}>
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-3">
                <input
                  type="checkbox"
                  className="mt-0.5 size-4 accent-[var(--sketch)]"
                  checked={checked}
                  onChange={() => model.toggleTask(task.id)}
                />
                <span className={cn("min-w-0 text-sm", checked && "text-neutral-400 line-through")}>
                  {task.label}
                </span>
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function OrdersScreen({ model }: { model: SketchModel }) {
  const query = model.orderQuery.trim().toLowerCase()
  const visible = model.orders.filter((row) => {
    const statusOk = model.orderFilter === "All" || row.status === model.orderFilter
    const text = `${row.who} ${row.item} ${row.id}`.toLowerCase()
    return statusOk && (!query || text.includes(query))
  })
  const current = model.orders.find((row) => row.id === model.openOrder)

  return (
    <div className="space-y-3 p-4">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-lg font-semibold">Orders</p>
        <p className="text-xs text-neutral-500">{visible.length} showing</p>
      </div>
      <SearchField
        id={`${model.searchId}-orders`}
        label="Search orders"
        value={model.orderQuery}
        placeholder="Name, item, or number"
        onChange={model.setOrderQuery}
      />
      <div className="flex gap-1.5 overflow-x-auto">
        {(["All", ...orderStatuses] as const).map((status) => (
          <Chip
            key={status}
            pressed={model.orderFilter === status}
            onClick={() => model.setOrderFilter(status)}
          >
            {status}
          </Chip>
        ))}
      </div>
      {visible.length === 0 ? (
        <p className="rounded-xl bg-neutral-50 p-3 text-sm text-neutral-500">
          Nothing matches that search. Try another name, or show all.
        </p>
      ) : (
        <ul className="space-y-2">
          {visible.map((row) => {
            const open = current?.id === row.id
            return (
              <li key={row.id} className="rounded-xl border border-neutral-200">
                <button
                  type="button"
                  onClick={() => model.setOpenOrder(open ? "" : row.id)}
                  aria-expanded={open}
                  className="flex w-full min-w-0 items-center gap-3 px-3 py-3 text-left"
                >
                  <Mark name={row.who} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{row.who}</span>
                    <span className="block truncate text-xs text-neutral-500">
                      #{row.id} · {row.item}
                    </span>
                  </span>
                  <span className="shrink-0 text-right">
                    <span className="block text-xs font-semibold">{row.amount}</span>
                    <StatusPill status={row.status} />
                  </span>
                </button>
                {open ? (
                  <div className="border-t border-neutral-200 px-3 py-3">
                    <p className="text-sm text-neutral-600">{row.note}</p>
                    <p className="mt-3 text-xs font-medium text-neutral-500">Move it along</p>
                    <div className="mt-2 grid grid-cols-3 gap-1">
                      {orderStatuses.map((status, index) => {
                        const reached = orderStatuses.indexOf(row.status) >= index
                        return (
                          <button
                            key={status}
                            type="button"
                            aria-pressed={row.status === status}
                            onClick={() => model.setOrderStatus(row.id, status)}
                            className={cn(
                              "rounded-full px-2 py-1.5 text-[11px] font-medium",
                              reached
                                ? "bg-[var(--sketch)] text-[var(--sketch-ink)]"
                                : "bg-neutral-100 text-neutral-500",
                            )}
                          >
                            {status}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ) : null}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

function PeopleScreen({ model }: { model: SketchModel }) {
  const query = model.personQuery.trim().toLowerCase()
  const visible = model.people.filter((row) => {
    const text = `${row.name} ${row.meta}`.toLowerCase()
    return !query || text.includes(query)
  })
  const current = model.people.find((row) => row.name === model.person)

  return (
    <div className="space-y-3 p-4">
      <p className="text-lg font-semibold">{model.audience.label}</p>
      <SearchField
        id={`${model.searchId}-people`}
        label={`Search ${model.audience.label.toLowerCase()}`}
        value={model.personQuery}
        placeholder="Search by name"
        onChange={model.setPersonQuery}
      />
      {visible.length === 0 ? (
        <p className="rounded-xl bg-neutral-50 p-3 text-sm text-neutral-500">
          No one matches that name.
        </p>
      ) : (
        <ul className="space-y-2">
          {visible.map((row) => (
            <li key={row.name}>
              <button
                type="button"
                onClick={() => model.setPerson(row.name)}
                aria-pressed={current?.name === row.name}
                className={cn(
                  "flex w-full min-w-0 items-center gap-3 rounded-xl border px-3 py-3 text-left",
                  current?.name === row.name
                    ? "border-[var(--sketch)] bg-neutral-50"
                    : "border-neutral-200",
                )}
              >
                <Mark name={row.name} />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{row.name}</span>
                  <span className="block truncate text-xs text-neutral-500">{row.meta}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {current ? (
        <div className="rounded-xl bg-neutral-50 p-3">
          <p className="text-sm font-medium">{current.balance}</p>
          <p className="mt-1 text-sm text-neutral-600">{current.note}</p>
          {current.orderId && model.screens.includes("orders") ? (
            <button
              type="button"
              onClick={() => {
                model.setOpenOrder(current.orderId!)
                model.onScreen("orders")
              }}
              className="mt-3 text-sm font-medium text-[var(--sketch)] underline underline-offset-4"
            >
              Open order {current.orderId}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

function FilesScreen({ model }: { model: SketchModel }) {
  const visible = documents.filter(
    (file) => model.fileFilter === "All" || file.kind === model.fileFilter,
  )
  const open = documents.find((file) => file.id === model.openFile)

  return (
    <div className="space-y-3 p-4">
      <p className="text-lg font-semibold">Documents</p>
      <div className="flex gap-1.5">
        {fileFilters.map((filter) => (
          <Chip
            key={filter}
            pressed={model.fileFilter === filter}
            onClick={() => model.setFileFilter(filter)}
          >
            {filter}
          </Chip>
        ))}
      </div>
      <ul className="space-y-2">
        {visible.map((file) => {
          const expanded = open?.id === file.id
          return (
            <li key={file.id} className="rounded-xl border border-neutral-200">
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => model.setOpenFile(expanded ? null : file.id)}
                className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left"
              >
                <span>
                  <span className="block text-sm font-medium">{file.name}</span>
                  <span className="text-xs text-neutral-500">{file.kind}</span>
                </span>
                <span className="text-xs font-medium text-neutral-500">
                  {expanded ? "Close" : "Open"}
                </span>
              </button>
              {expanded ? (
                <ul className="space-y-1 border-t border-neutral-200 px-3 py-3">
                  {file.lines.map((line) => (
                    <li key={line} className="text-sm text-neutral-600">
                      {line}
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function MessagesScreen({ model }: { model: SketchModel }) {
  const thread = model.threads.find((item) => item.id === model.activeThread)

  return (
    <div className="flex h-full min-h-64 flex-col @min-[28rem]:grid @min-[28rem]:min-h-0 @min-[28rem]:grid-cols-[11rem_1fr]">
      <ul
        className={cn(
          "space-y-1 border-neutral-200 p-2 @min-[28rem]:block @min-[28rem]:border-r",
          thread && "hidden",
        )}
      >
        {model.threads.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => model.openThread(item.id)}
              className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left hover:bg-neutral-50"
            >
              <Mark name={item.from} />
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-medium">{item.from}</span>
                  {item.unread ? (
                    <span className="size-2 shrink-0 rounded-full bg-[var(--sketch)]" aria-label="Unread" />
                  ) : null}
                </span>
                <span className="block truncate text-xs text-neutral-500">
                  {item.messages[item.messages.length - 1]?.text}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <div className={cn("flex min-h-0 flex-1 flex-col", !thread && "hidden @min-[28rem]:flex")}>
        {thread ? (
          <>
            <div className="flex items-center gap-2 border-b border-neutral-200 px-3 py-2">
              <button
                type="button"
                onClick={() => model.openThread(null)}
                className="text-xs font-medium text-neutral-500 @min-[28rem]:hidden"
              >
                All
              </button>
              <p className="truncate text-sm font-semibold">{thread.from}</p>
            </div>
            <ul className="flex-1 space-y-2 overflow-y-auto p-3">
              {thread.messages.map((message) => (
                <li
                  key={message.id}
                  className={cn(
                    "max-w-[90%] rounded-2xl px-3 py-2 text-sm",
                    message.from === "You"
                      ? "ml-auto bg-[var(--sketch)] text-[var(--sketch-ink)]"
                      : "bg-neutral-100",
                  )}
                >
                  {message.text}
                </li>
              ))}
            </ul>
            <div className="flex gap-1.5 overflow-x-auto px-3">
              {quickReplies.map((text) => (
                <button
                  key={text}
                  type="button"
                  onClick={() => model.sendReply(text)}
                  className="shrink-0 rounded-full border border-neutral-200 px-2.5 py-1 text-[11px] font-medium text-neutral-600"
                >
                  {text}
                </button>
              ))}
            </div>
            <form
              className="flex gap-2 p-3"
              onSubmit={(event) => {
                event.preventDefault()
                model.sendReply(model.reply)
              }}
            >
              <label className="sr-only" htmlFor={model.replyId}>
                Reply to {thread.from}
              </label>
              <input
                id={model.replyId}
                value={model.reply}
                onChange={(event) => model.setReply(event.target.value)}
                placeholder="Write a reply"
                className="h-10 min-w-0 flex-1 rounded-full border border-neutral-200 px-3 text-sm outline-none focus-visible:border-[var(--sketch)]"
              />
              <button
                type="submit"
                className="h-10 rounded-full bg-[var(--sketch)] px-4 text-sm font-medium text-[var(--sketch-ink)]"
              >
                Send
              </button>
            </form>
          </>
        ) : (
          <p className="p-4 text-sm text-neutral-500">Choose a conversation.</p>
        )}
      </div>
    </div>
  )
}

function HomeScreen({ model }: { model: SketchModel }) {
  return (
    <div>
      <div className="bg-[var(--sketch)] px-5 py-6 text-[var(--sketch-ink)] @min-[40rem]:px-12 @min-[40rem]:py-16">
        <div className="@min-[40rem]:flex @min-[40rem]:items-end @min-[40rem]:justify-between @min-[40rem]:gap-16">
          <div className="min-w-0 max-w-3xl">
            <p className="text-[10px] font-semibold tracking-[0.16em] uppercase opacity-80">
              {model.audience.label}
            </p>
            <p className={cn("mt-3 text-4xl font-semibold tracking-tight @min-[40rem]:text-6xl", model.nameIsPlaceholder && "opacity-70")}>
              {model.name}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed opacity-90 @min-[40rem]:text-lg">
              {model.offer.placeholder ? `Example: ${model.offer.text}` : model.offer.text}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  if (model.screens.includes("contact")) model.onScreen("contact")
                }}
                className="h-11 rounded-full bg-[var(--sketch-ink)] px-5 text-sm font-medium text-[var(--sketch)]"
              >
                Talk to us
              </button>
              {model.screens.includes("proof") ? (
                <button
                  type="button"
                  onClick={() => model.onScreen("proof")}
                  className="h-11 rounded-full border border-[var(--sketch-ink)]/30 px-5 text-sm font-medium"
                >
                  Why people stay
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <ul className="grid grid-cols-3 gap-px bg-neutral-200">
        {sampleFigures.map((figure) => (
          <li key={figure.label} className="min-w-0 bg-white px-3 py-4 @min-[40rem]:px-8 @min-[40rem]:py-8">
            <p className="text-lg font-semibold @min-[40rem]:text-3xl">{figure.value}</p>
            <p className="text-[10px] font-medium tracking-wide text-neutral-500 uppercase @min-[40rem]:mt-1 @min-[40rem]:text-xs">
              {figure.label}
            </p>
          </li>
        ))}
      </ul>
      <p className="px-4 py-3 text-[11px] text-neutral-400 @min-[40rem]:px-8">
        Sample figures. We replace them with yours.
      </p>
    </div>
  )
}

function OfferScreen({ model }: { model: SketchModel }) {
  const points = [
    {
      id: "offer",
      title: "The offer",
      body: model.offer.placeholder ? `Example: ${model.offer.text}` : model.offer.text,
    },
    {
      id: "who",
      title: "Who it is for",
      body: model.audience.detail,
    },
    {
      id: "next",
      title: "How to start",
      body: "A call, a WhatsApp message, or a short form. You pick the way your customers already use.",
    },
  ]

  return (
    <div className="space-y-3 p-4 @min-[40rem]:p-10">
      <p className="text-lg font-semibold @min-[40rem]:text-3xl">What you do</p>
      <p className="text-sm text-neutral-500">Tap a point to open it. The open one leads the page.</p>
      <ul className="space-y-2 @min-[40rem]:grid @min-[40rem]:grid-cols-3 @min-[40rem]:gap-4 @min-[40rem]:space-y-0">
        {points.map((point) => {
          const open = model.openPoint === point.id
          return (
            <li key={point.id} className={cn("rounded-xl border", open ? "border-[var(--sketch)]" : "border-neutral-200")}>
              <button
                type="button"
                aria-expanded={open}
                onClick={() => model.setOpenPoint(point.id)}
                className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left"
              >
                <span className="text-sm font-medium">{point.title}</span>
                {open ? (
                  <span className="rounded-full bg-[var(--sketch)] px-2 py-1 text-[10px] font-medium text-[var(--sketch-ink)]">
                    Shown first
                  </span>
                ) : null}
              </button>
              {open ? <p className="px-3 pb-3 text-sm leading-relaxed text-neutral-600">{point.body}</p> : null}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function ProofScreen({ model }: { model: SketchModel }) {
  return (
    <div className="space-y-3 p-4 @min-[40rem]:p-10">
      <p className="text-lg font-semibold @min-[40rem]:text-3xl">Proof</p>
      <blockquote className="rounded-2xl bg-[var(--sketch)] px-4 py-5 text-lg leading-snug font-medium text-[var(--sketch-ink)] @min-[40rem]:px-8 @min-[40rem]:py-8 @min-[40rem]:text-3xl">
        “{sampleQuotes[model.featuredQuote]}”
      </blockquote>
      <p className="text-xs text-neutral-500">Tap another line to feature it. These are samples.</p>
      <ul className="space-y-2 @min-[40rem]:grid @min-[40rem]:grid-cols-3 @min-[40rem]:gap-3 @min-[40rem]:space-y-0">
        {sampleQuotes.map((quote, index) => (
          <li key={quote}>
            <button
              type="button"
              aria-pressed={model.featuredQuote === index}
              onClick={() => model.setFeaturedQuote(index)}
              className={cn(
                "w-full rounded-xl border px-3 py-3 text-left text-sm",
                model.featuredQuote === index
                  ? "border-[var(--sketch)]"
                  : "border-neutral-200 text-neutral-600",
              )}
            >
              “{quote}”
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ContactScreen({ model }: { model: SketchModel }) {
  return (
    <form
      className="grid gap-4 p-4 @min-[40rem]:grid-cols-2 @min-[40rem]:gap-x-10 @min-[40rem]:p-10"
      onSubmit={(event) => {
        event.preventDefault()
        model.submitSite()
      }}
    >
      <p className="text-lg font-semibold @min-[40rem]:col-span-2 @min-[40rem]:text-3xl">
        Contact {model.name}
      </p>
      {model.siteSent ? (
        <div className="rounded-xl bg-neutral-50 p-3 text-sm @min-[40rem]:col-span-2" role="status">
          <p className="font-medium">Saved in this sketch.</p>
          <p className="mt-1 text-neutral-600">
            {model.visitor} would like a {model.channel.toLowerCase()} in the {model.slot.toLowerCase()}.
            Nothing leaves this page.
          </p>
          <button
            type="button"
            onClick={model.reopenSite}
            className="mt-3 text-sm font-medium underline underline-offset-4"
          >
            Edit the note
          </button>
        </div>
      ) : (
        <>
          <label className="block text-sm" htmlFor={model.visitorId}>
            Your name
            <input
              id={model.visitorId}
              value={model.visitor}
              onChange={(event) => model.setVisitor(event.target.value)}
              className="mt-1 h-10 w-full rounded-lg border border-neutral-200 px-3 text-sm outline-none focus-visible:border-[var(--sketch)]"
            />
          </label>
          <fieldset>
            <legend className="text-sm">How should we reach you?</legend>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {contactChannels.map((item) => (
                <Chip key={item} pressed={model.channel === item} onClick={() => model.setChannel(item)}>
                  {item}
                </Chip>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="text-sm">A good time</legend>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {contactSlots.map((item) => (
                <Chip key={item} pressed={model.slot === item} onClick={() => model.setSlot(item)}>
                  {item}
                </Chip>
              ))}
            </div>
          </fieldset>
          <button
            type="submit"
            className="h-10 rounded-full bg-[var(--sketch)] px-4 text-sm font-medium text-[var(--sketch-ink)]"
          >
            Send a note
          </button>
        </>
      )}
    </form>
  )
}

function QueueScreen({ model }: { model: SketchModel }) {
  const waiting = model.flow.filter((item) => item.state === "waiting")
  const minutes = waiting.length * 12

  return (
    <div className="space-y-3 p-4">
      <div>
        <p className="text-lg font-semibold">To review</p>
        <p className="text-xs text-neutral-500">
          {waiting.length === 0
            ? "The morning job is done."
            : `${waiting.length} waiting · about ${minutes} minutes of typing`}
        </p>
      </div>
      {waiting.length === 0 ? (
        <p className="rounded-xl bg-neutral-50 p-3 text-sm">
          Nothing is waiting. Approved drafts are on Sent.
        </p>
      ) : (
        <ul className="space-y-2">
          {waiting.map((item) => (
            <li key={item.id} className="rounded-xl border border-neutral-200 p-3">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[10px] font-medium tracking-wide text-neutral-500 uppercase">
                  {item.tag}
                  {item.edited ? " · Edited" : ""}
                </p>
                <p className="text-xs font-semibold">{item.amount}</p>
              </div>
              <p className="mt-1 text-sm font-medium">{item.title}</p>
              {model.editing === item.id ? (
                <textarea
                  value={item.body}
                  onChange={(event) => model.updateBody(item.id, event.target.value)}
                  rows={3}
                  aria-label={`Edit ${item.title}`}
                  className="mt-2 w-full rounded-lg border border-neutral-200 px-2 py-2 text-sm outline-none focus-visible:border-[var(--sketch)]"
                />
              ) : (
                <p className="mt-1 text-sm text-neutral-500">{item.body}</p>
              )}
              {!model.rules.r1 ? (
                <p className="mt-2 text-xs text-neutral-500">
                  The check is off, so this could leave without a person.
                </p>
              ) : null}
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => model.markFlow(item.id, "sent")}
                  className="h-9 rounded-full bg-[var(--sketch)] px-3 text-xs font-medium text-[var(--sketch-ink)]"
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => model.markFlow(item.id, "skipped")}
                  className="h-9 rounded-full border border-neutral-300 px-3 text-xs font-medium"
                >
                  Skip
                </button>
                <button
                  type="button"
                  onClick={() => model.setEditing(model.editing === item.id ? null : item.id)}
                  className="h-9 rounded-full px-3 text-xs font-medium text-neutral-600"
                >
                  {model.editing === item.id ? "Done editing" : "Edit the words"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {model.undo ? (
        <button
          type="button"
          onClick={model.restore}
          className="text-sm font-medium text-[var(--sketch)] underline underline-offset-4"
        >
          Undo last change
        </button>
      ) : null}
    </div>
  )
}

function DoneScreen({ model }: { model: SketchModel }) {
  const sent = model.flow.filter((item) => item.state === "sent")
  const skipped = model.flow.filter((item) => item.state === "skipped")

  return (
    <div className="space-y-4 p-4">
      <section>
        <p className="text-lg font-semibold">Sent</p>
        {sent.length === 0 ? (
          <p className="mt-2 text-sm text-neutral-500">
            Approved drafts show up here. Nothing has been sent yet.
          </p>
        ) : (
          <ul className="mt-2 space-y-2">
            {sent.map((item) => (
              <FlowResult
                key={item.id}
                item={item}
                detail="Approved by a person"
                action="Move back"
                onAction={() => model.markFlow(item.id, "waiting")}
              />
            ))}
          </ul>
        )}
      </section>
      {skipped.length > 0 ? (
        <section>
          <p className="text-sm font-semibold">Skipped</p>
          <ul className="mt-2 space-y-2">
            {skipped.map((item) => (
              <FlowResult
                key={item.id}
                item={item}
                detail="Held back"
                action="Review again"
                onAction={() => model.markFlow(item.id, "waiting")}
              />
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  )
}

function RulesScreen({ model }: { model: SketchModel }) {
  return (
    <div className="space-y-3 p-4">
      <p className="text-lg font-semibold">Rules</p>
      <p className="text-sm text-neutral-500">
        Turn a rule on to see what it changes. The queue follows along.
      </p>
      <ul className="space-y-2">
        {workflowRules.map((rule) => {
          const on = Boolean(model.rules[rule.id])
          return (
            <li key={rule.id} className="rounded-xl border border-neutral-200">
              <button
                type="button"
                aria-pressed={on}
                onClick={() => model.toggleRule(rule.id)}
                className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left"
              >
                <span className="text-sm">{rule.label}</span>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2 py-1 text-[10px] font-medium",
                    on
                      ? "bg-[var(--sketch)] text-[var(--sketch-ink)]"
                      : "bg-neutral-100 text-neutral-500",
                  )}
                >
                  {on ? "On" : "Off"}
                </span>
              </button>
              <p className="px-3 pb-3 text-xs leading-relaxed text-neutral-500">
                {on ? rule.on : rule.off}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function FlowResult({
  item,
  detail,
  action,
  onAction,
}: {
  item: FlowDraft
  detail: string
  action: string
  onAction: () => void
}) {
  return (
    <li className="rounded-xl bg-neutral-50 p-3">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium">{item.title}</p>
        <p className="text-xs font-semibold">{item.amount}</p>
      </div>
      <p className="mt-1 text-xs text-neutral-500">{detail}</p>
      <button
        type="button"
        onClick={onAction}
        className="mt-2 text-xs font-medium underline underline-offset-4"
      >
        {action}
      </button>
    </li>
  )
}

function Stat({
  value,
  label,
  onOpen,
}: {
  value: string
  label: string
  onOpen?: () => void
}) {
  const className = "rounded-xl border border-neutral-200 px-2 py-3 text-left"
  const inner = (
    <>
      <span className="block text-lg font-semibold">{value}</span>
      <span className="block text-[10px] font-medium tracking-wide text-neutral-500 uppercase">
        {label}
      </span>
    </>
  )
  if (!onOpen) return <div className={className}>{inner}</div>
  return (
    <button type="button" onClick={onOpen} className={cn(className, "hover:border-[var(--sketch)]")}>
      {inner}
    </button>
  )
}

function SearchField({
  id,
  label,
  value,
  placeholder,
  onChange,
}: {
  id: string
  label: string
  value: string
  placeholder: string
  onChange: (value: string) => void
}) {
  return (
    <div>
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full rounded-full border border-neutral-200 px-3 text-sm outline-none focus-visible:border-[var(--sketch)]"
      />
    </div>
  )
}

function Chip({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean
  onClick: () => void
  children: string
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium",
        pressed
          ? "bg-[var(--sketch)] text-[var(--sketch-ink)]"
          : "bg-neutral-100 text-neutral-600",
      )}
    >
      {children}
    </button>
  )
}

function Mark({ name }: { name: string }) {
  const letters = name
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase()
  return (
    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--sketch)] text-[10px] font-semibold text-[var(--sketch-ink)]">
      {letters}
    </span>
  )
}

function StatusPill({ status }: { status: OrderStatus }) {
  return (
    <span
      className={cn(
        "mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium",
        status === "New" && "bg-amber-100 text-amber-950",
        status === "Packed" && "bg-sky-100 text-sky-950",
        status === "Done" && "bg-emerald-100 text-emerald-950",
      )}
    >
      {status}
    </span>
  )
}
