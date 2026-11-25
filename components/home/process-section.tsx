import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"
import { PosterHeading } from "@/components/shared/poster-heading"
import { homeCopy } from "@/lib/site"
import { processSteps } from "@/lib/studio"

export function ProcessSection() {
  return (
    <section className="border-t border-border">
      <Container className="py-20 md:py-28">
        <Reveal>
          <PosterHeading
            eyebrow="How we work"
            lines={homeCopy.processTitle}
            lede={homeCopy.processLede}
            href="/about"
            action="The full process"
          />
        </Reveal>
        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step) => (
            <li key={step.id}>
              <p className="font-mono text-xs text-brand-ink">{step.id}</p>
              <h3 className="mt-3 font-serif text-xl font-medium tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground">
                {step.summary}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
