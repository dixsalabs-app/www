"use client"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ProjectFrame } from "@/components/shared/project-frame"
import {
  disciplineFilters,
  isDisciplineFilter,
  type DisciplineFilter,
  type WorkCard,
} from "@/lib/work"
import { cn } from "@/lib/utils"

export function WorkExplorer({ cards }: { cards: WorkCard[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const requested = searchParams.get("discipline") ?? undefined
  const active: DisciplineFilter = isDisciplineFilter(requested)
    ? requested
    : "all"

  function select(next: DisciplineFilter) {
    const query = next === "all" ? "" : `?discipline=${next}`
    router.replace(`${pathname}${query}`, { scroll: false })
  }

  const visible =
    active === "all" ? cards : cards.filter((card) => card.discipline === active)

  return (
    <div>
      <div
        role="toolbar"
        aria-label="Filter projects"
        className="flex flex-wrap gap-x-6 gap-y-2 border-b border-border"
      >
        {disciplineFilters.map((filter) => {
          const selected = active === filter.value
          return (
            <button
              key={filter.value}
              type="button"
              aria-pressed={selected}
              onClick={() => select(filter.value)}
              className={cn(
                "-mb-px border-b-2 pb-3 text-sm transition-colors duration-300 ease-studio",
                selected
                  ? "border-brand text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {filter.label}
            </button>
          )
        })}
      </div>
      {visible.length === 0 ? (
        <p className="mt-12 text-muted-foreground">Nothing in this group yet.</p>
      ) : (
        <ul className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2">
          {visible.map((card) => (
            <li key={card.slug}>
              <Link href={`/work/${card.slug}`} className="group block h-full">
                <ProjectFrame
                  tone={card.tone}
                  scene={card.scene}
                  place={card.place}
                />
                <div className="pt-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                      {card.place} · {card.sector}
                    </p>
                    <p className="font-mono text-xs text-brand-ink">{card.metric.value}</p>
                  </div>
                  <h2 className="mt-2 font-serif text-2xl font-medium tracking-tight transition-colors duration-300 ease-studio group-hover:text-brand">
                    {card.client}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground">
                    {card.title}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
