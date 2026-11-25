import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"
import { homeCopy } from "@/lib/site"
import { testimonialStudies, type CaseStudy } from "@/lib/work"

function withPhoto(study: CaseStudy): study is CaseStudy & { image: string } {
  return Boolean(study.image)
}

export function TestimonialsSection() {
  const studies = testimonialStudies().filter(withPhoto)
  if (studies.length === 0) return null

  return (
    <section className="border-t border-border">
      <Container className="py-20 md:py-28">
        <Reveal>
          <p className="eyebrow">From the work</p>
          <h2 className="mt-3 max-w-2xl font-serif text-[clamp(1.85rem,3vw,2.6rem)] leading-snug font-medium tracking-tight text-balance">
            {homeCopy.notesTitle.join(" ")}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground">
            {homeCopy.notesLede}
          </p>
        </Reveal>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {studies.map((study, index) => (
            <li key={study.slug}>
              <Reveal delay={index * 0.05} className="h-full">
                <figure className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card">
                  <Image
                    src={study.image}
                    alt={study.imageAlt ?? study.client}
                    width={1200}
                    height={900}
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <figcaption className="flex flex-1 flex-col p-5">
                    <p className="font-mono text-xs text-brand-ink">
                      {study.metric.value}
                      <span className="mt-1 block font-sans text-sm font-normal tracking-normal text-muted-foreground">
                        {study.metric.label}
                      </span>
                    </p>
                    <blockquote className="mt-4 font-serif text-xl leading-snug font-medium tracking-tight text-balance">
                      “{study.quote.text}”
                    </blockquote>
                    <p className="mt-5 text-sm leading-relaxed">
                      <span className="block font-medium">{study.quote.name}</span>
                      <span className="text-muted-foreground">{study.quote.role}</span>
                    </p>
                    <Link
                      href={`/work/${study.slug}`}
                      className="mt-4 text-sm font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-brand"
                    >
                      {study.client}, {study.place}
                    </Link>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
