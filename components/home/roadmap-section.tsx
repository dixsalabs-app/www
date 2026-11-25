import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"
import { TextLink } from "@/components/shared/text-link"
import { roadmap } from "@/lib/site"

export function RoadmapSection() {
  return (
    <section id="roadmap" className="scroll-mt-24 border-t border-border">
      <Container className="py-20 md:py-28">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">The roadmap</p>
            <h2 className="mt-3 font-serif text-[clamp(1.85rem,3vw,2.6rem)] leading-snug font-medium tracking-tight text-balance">
              Five steps. You always know which one you are in.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground">
              A website, an app, or an automation follows the same path. The price is written down in rupees at step two. You can click the work from step three.
            </p>
          </div>
        </Reveal>
        <ol className="mt-14 grid gap-4 md:grid-cols-5">
          {roadmap.map((step, index) => (
            <li key={step.id}>
              <Reveal delay={index * 0.04} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-[inset_0_3px_0_0_var(--brand)]">
                  <span className="grid size-9 place-items-center rounded-full bg-brand text-sm font-medium text-white">
                    {step.id}
                  </span>
                  <h3 className="mt-4 font-serif text-xl font-medium tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        <TextLink href="/about" className="mt-10">
          The full process
        </TextLink>
      </Container>
    </section>
  )
}
