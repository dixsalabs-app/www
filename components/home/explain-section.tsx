import Link from "next/link"
import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"
import { ProjectFrame } from "@/components/shared/project-frame"
import { services } from "@/lib/services"

export function ExplainSection() {
  return (
    <section className="border-b border-border">
      <Container className="py-20 md:py-28">
        <Reveal>
          <p className="eyebrow">In plain words</p>
          <h2 className="display mt-4 max-w-4xl text-[clamp(3rem,6vw,5.5rem)]">
            The work,
            <br />
            in plain
            <br />
            words.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Each one is a result you can picture, explained in normal words,
            with a price written down before the work starts.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.05}>
              <Link href={`/services/${service.slug}`} className="group block">
                <ProjectFrame
                  tone={service.tone}
                  scene={service.scene}
                  className="rounded-xl"
                />
                <p className="mt-5 font-mono text-xs text-brand-ink">{service.index}</p>
                <h3 className="display mt-2 text-4xl">{service.navLabel}</h3>
                <p className="mt-3 text-base leading-snug">{service.hook}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.plain}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
