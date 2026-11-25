import { Container } from "@/components/layout/container"
import { exampleMix, MixBars, PieChart } from "@/components/illustrations/charts"
import { Reveal } from "@/components/motion/reveal"

export function PracticeChart() {
  return (
    <section className="border-t border-border bg-card">
      <Container className="grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
        <Reveal>
          <p className="eyebrow">A picture of one project</p>
          <h2 className="mt-3 max-w-md font-serif text-[clamp(1.85rem,3vw,2.6rem)] leading-snug font-medium tracking-tight text-balance">
            The build is the large slice. Content and search sit beside it.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-pretty text-muted-foreground">
            This is an example mix for a first website, drawn as a pie and as
            bars. It is not a result we promise. Your split is written into the
            scope before anyone starts.
          </p>
          <ul className="mt-8 space-y-3">
            {exampleMix.map((slice) => (
              <li key={slice.label} className="flex items-center gap-3 text-sm">
                <span
                  aria-hidden
                  className="size-3 shrink-0 rounded-full"
                  style={{ backgroundColor: slice.color }}
                />
                <span className="flex-1">{slice.label}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {slice.value}%
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="grid gap-8 rounded-3xl border border-border bg-background p-6 sm:p-8 md:grid-cols-[minmax(0,16rem)_1fr] md:items-center">
            <PieChart slices={exampleMix} />
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-brand-ink uppercase">
                The same mix, as bars
              </p>
              <div className="mt-5">
                <MixBars slices={exampleMix} />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
