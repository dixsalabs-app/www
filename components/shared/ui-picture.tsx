import type { ReactNode } from "react"
import { sceneAlt, type SceneId } from "@/lib/scenes"

function Shell({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex h-full flex-col bg-[#e7f3ec] p-3 text-[#143026] sm:p-5">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-[0.62rem] font-semibold tracking-[0.18em] text-[#157a3e] uppercase">
          {label}
        </span>
        <span className="flex gap-1" aria-hidden>
          <span className="size-1.5 rounded-full bg-[#157a3e]" />
          <span className="size-1.5 rounded-full bg-[#c47a1a]" />
          <span className="size-1.5 rounded-full bg-[#9a4630]" />
        </span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-[#d5e6db] bg-white">
        {children}
      </div>
    </div>
  )
}

function Row({
  title,
  meta,
  trailing,
}: {
  title: string
  meta: string
  trailing: string
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[#e7f3ec] px-3 py-2.5 last:border-b-0">
      <span>
        <span className="block text-sm font-medium">{title}</span>
        <span className="block text-[0.7rem] text-[#3f6b52]">{meta}</span>
      </span>
      <span className="text-xs font-medium text-[#157a3e]">{trailing}</span>
    </div>
  )
}

function PosScreen() {
  const tables = ["1", "2", "3", "4", "5", "6"]
  return (
    <Shell label="Point of sale">
      <div className="grid flex-1 grid-cols-3 gap-2 p-3">
        {tables.map((table) => (
          <div
            key={table}
            className={
              table === "2"
                ? "rounded-lg bg-[#157a3e] px-2 py-3 text-white"
                : "rounded-lg bg-[#f4faf6] px-2 py-3"
            }
          >
            <p className="text-[0.65rem] tracking-wide uppercase opacity-80">Table</p>
            <p className="font-serif text-xl leading-none">{table}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-[#e7f3ec] px-3 py-2.5 text-sm">
        <span>Thali · 2</span>
        <span className="font-medium">₹480 · UPI</span>
      </div>
    </Shell>
  )
}

function OrdersScreen() {
  return (
    <Shell label="Orders">
      <Row title="Mishra Stores" meta="Cuttack · standing order" trailing="Packed" />
      <Row title="Patnaik & Co." meta="Bhubaneswar · 40 pcs" trailing="₹1,84,000" />
      <Row title="Haat counter" meta="Today’s cutoff 4 pm" trailing="Open" />
    </Shell>
  )
}

function InvoiceScreen() {
  return (
    <Shell label="GST invoice">
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <p className="text-[0.65rem] tracking-[0.16em] text-[#3f6b52] uppercase">
            Tax invoice
          </p>
          <p className="mt-2 font-serif text-2xl">INV-204</p>
          <p className="mt-3 text-sm">Rice · 2 qt</p>
          <p className="text-sm text-[#3f6b52]">CGST + SGST</p>
        </div>
        <div className="flex items-center justify-between rounded-full bg-[#157a3e] px-4 py-2 text-sm text-white">
          <span>Send on WhatsApp</span>
          <span>₹2,480</span>
        </div>
      </div>
    </Shell>
  )
}

function SiteScreen() {
  return (
    <Shell label="Website">
      <div className="border-b border-[#e7f3ec] px-3 py-2 text-[0.7rem] text-[#3f6b52]">
        theshop.odisha / visit
      </div>
      <div className="flex flex-1 flex-col justify-center px-4">
        <p className="font-serif text-2xl leading-tight">Sambalpuri cotton. In stock this week.</p>
        <p className="mt-3 text-sm text-[#3f6b52]">Call, visit, or pay on the phone.</p>
        <span className="mt-4 inline-flex w-fit rounded-full bg-[#157a3e] px-3 py-1.5 text-xs text-white">
          See the shop
        </span>
      </div>
    </Shell>
  )
}

function ClinicScreen() {
  return (
    <Shell label="Front desk">
      <Row title="9:30 · Review" meta="Forms in" trailing="Ready" />
      <Row title="10:15 · New visit" meta="Waiting on a reply" trailing="Remind" />
      <Row title="11:00 · Follow-up" meta="Approved by the desk" trailing="Filed" />
    </Shell>
  )
}

function PhoneScreen() {
  return (
    <Shell label="Today’s jobs">
      <div className="mx-auto my-3 flex w-[9.5rem] flex-1 flex-col rounded-[1.4rem] border border-[#143026] bg-[#143026] p-1.5 text-white">
        <div className="flex flex-1 flex-col rounded-[1.1rem] bg-[#10261c] px-3 py-3">
          <p className="text-[0.6rem] tracking-[0.14em] text-white/60 uppercase">Next</p>
          <p className="mt-1 text-sm font-medium">Unit 4, near the market</p>
          <p className="mt-3 text-[0.6rem] tracking-[0.14em] text-white/60 uppercase">After</p>
          <p className="mt-1 text-sm">Workshop lane</p>
          <span className="mt-auto rounded-full bg-[#157a3e] py-1.5 text-center text-xs">
            Mark done
          </span>
        </div>
      </div>
    </Shell>
  )
}

function SearchScreen() {
  return (
    <Shell label="Search">
      <div className="p-3">
        <div className="rounded-full border border-[#d5e6db] px-3 py-2 text-sm text-[#3f6b52]">
          dental clinic near me
        </div>
        <div className="mt-3 rounded-xl bg-[#f4faf6] p-3">
          <p className="text-xs text-[#157a3e]">Nila Dental · Bhubaneswar</p>
          <p className="mt-1 text-sm font-medium">The fee, the visit, and how to book.</p>
        </div>
      </div>
    </Shell>
  )
}

function FilmScreen() {
  return (
    <Shell label="Film">
      <div className="flex flex-1 items-center justify-center bg-[#143026]">
        <span className="grid size-12 place-items-center rounded-full bg-white text-[#143026]">
          <span className="ml-0.5 border-y-[7px] border-l-[12px] border-y-transparent border-l-[#143026]" />
        </span>
      </div>
      <div className="px-3 py-2.5 text-sm">
        <p className="font-medium">How the table is made</p>
        <p className="text-[0.7rem] text-[#3f6b52]">Next: the finish, the delivery</p>
      </div>
    </Shell>
  )
}

function QuoteScreen() {
  return (
    <Shell label="Quote">
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <p className="text-[0.65rem] tracking-[0.16em] text-[#3f6b52] uppercase">Draft</p>
          <p className="mt-2 font-serif text-3xl">₹18,400</p>
          <p className="mt-2 text-sm text-[#3f6b52]">From three similar jobs. Not sent yet.</p>
        </div>
        <div className="flex gap-2 text-sm">
          <span className="rounded-full bg-[#157a3e] px-3 py-1.5 text-white">Approve</span>
          <span className="rounded-full border border-[#d5e6db] px-3 py-1.5">Edit</span>
        </div>
      </div>
    </Shell>
  )
}

function PayrollScreen() {
  return (
    <Shell label="Payroll">
      <div className="flex flex-1 flex-col justify-center p-4">
        <p className="text-[0.65rem] tracking-[0.16em] text-[#157a3e] uppercase">This month</p>
        <p className="mt-2 font-serif text-3xl">Payroll ran</p>
        <p className="mt-2 text-sm text-[#3f6b52]">Payslips are in the folder. Nothing is waiting.</p>
      </div>
    </Shell>
  )
}

const screens: Record<SceneId, () => ReactNode> = {
  pos: PosScreen,
  orders: OrdersScreen,
  invoice: InvoiceScreen,
  site: SiteScreen,
  clinic: ClinicScreen,
  phone: PhoneScreen,
  search: SearchScreen,
  film: FilmScreen,
  quote: QuoteScreen,
  payroll: PayrollScreen,
}

export function UiPicture({ scene }: { scene: SceneId }) {
  const Screen = screens[scene]
  return (
    <div
      role="img"
      aria-label={sceneAlt[scene]}
      className="absolute inset-0 transition-transform duration-700 ease-studio group-hover:scale-[1.03]"
    >
      <Screen />
    </div>
  )
}
