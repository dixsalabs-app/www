import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"
import { PrimaryLink } from "@/components/shared/cta-link"
import { enquireSteps } from "@/lib/site"

export function NextStepsSection() {
  return (
    <section className="border-t border-border">
      <Container className="py-20 md:py-28">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">What happens next</p>
            <h2 className="mt-3 font-serif text-[clamp(1.85rem,3vw,2.6rem)] leading-snug font-medium tracking-tight text-balance">
              From your note to a fixed price.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground">
              You do not need a brief, a deck, or the right technical words. A few lines in English or Odia are enough. These are the only three steps before any project starts.
            </p>
          </div>
        </Reveal>
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {enquireSteps.map((step, index) => (
            <li key={step.id}>
              <Reveal delay={index * 0.04} className="h-full">
                <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-[inset_0_3px_0_0_var(--marigold)]">
                  <p className="font-mono text-xs text-marigold">{step.id}</p>
                  <h3 className="mt-3 font-serif text-2xl font-medium tracking-tight">
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
        <div className="mt-10">
          <PrimaryLink href="/contact">Start a project</PrimaryLink>
        </div>
      </Container>
    </section>
  )
}
