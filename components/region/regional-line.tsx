import { Suspense } from "react"
import { openedPlace } from "@/lib/opened-place-server"
import { defaultRegion, regionalCopy } from "@/lib/region"

function Line({ place }: { place: string }) {
  const copy = place === "Odisha" ? defaultRegion : regionalCopy(place)
  return (
    <>
      <p className="eyebrow">{copy.eyebrow}</p>
      <p className="font-odia mt-3 text-base text-marigold">{copy.odia}</p>
    </>
  )
}

async function LiveLine() {
  return <Line place={await openedPlace()} />
}

export function RegionalLine() {
  return (
    <Suspense fallback={<Line place="Odisha" />}>
      <LiveLine />
    </Suspense>
  )
}

function Caption({ place, detail }: { place: string; detail: string }) {
  const copy = place === "Odisha" ? defaultRegion : regionalCopy(place)
  return (
    <>
      {copy.place} · {detail}
    </>
  )
}

async function LiveCaption({ detail }: { detail: string }) {
  return <Caption place={await openedPlace()} detail={detail} />
}

export function OpenedDetail({ detail }: { detail: string }) {
  return (
    <Suspense fallback={<Caption place="Odisha" detail={detail} />}>
      <LiveCaption detail={detail} />
    </Suspense>
  )
}
