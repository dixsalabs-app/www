import Link from "next/link"
import { Suspense } from "react"
import { Container } from "@/components/layout/container"
import { UiPicture } from "@/components/shared/ui-picture"
import { openedPlace } from "@/lib/opened-place-server"
import { regionalCopy } from "@/lib/region"
import type { SceneId } from "@/lib/scenes"
import { places } from "@/lib/site"
import { cn } from "@/lib/utils"

function Places({ place }: { place: string }) {
  const region = regionalCopy(place)

  return (
    <section className="border-t border-border bg-card">
      <Container className="py-8 md:py-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <p className="eyebrow">In Odisha</p>
          <p className="font-odia text-sm text-marigold">{region.opened}</p>
        </div>
        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {places.map((item) => (
            <li key={item.city}>
              <Link href={item.href} className="group block">
                <div
                  className={cn(
                    "relative aspect-[4/3] overflow-hidden rounded-xl bg-[#e7f3ec]",
                    region.place === item.city && "ring-2 ring-brand",
                  )}
                >
                  <UiPicture scene={item.scene as SceneId} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10261c]/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                    <p className="font-serif text-lg leading-none">{item.city}</p>
                    <p className="mt-1 text-[0.65rem] tracking-[0.16em] text-white/80 uppercase">
                      {item.trade}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

async function PlacesLive() {
  return <Places place={await openedPlace()} />
}

export function PlacesSection() {
  return (
    <Suspense fallback={<Places place="Odisha" />}>
      <PlacesLive />
    </Suspense>
  )
}
