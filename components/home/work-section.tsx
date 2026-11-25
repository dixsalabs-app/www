import Link from "next/link"
import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"
import { Photo } from "@/components/shared/photo"
import { PosterHeading } from "@/components/shared/poster-heading"
import { homeCopy } from "@/lib/site"
import { featuredStudies } from "@/lib/work"

function firstSentence(text: string) {
  const end = text.indexOf(". ")
  return end === -1 ? text : text.slice(0, end + 1)
}

export function WorkSection() {
  const studies = featuredStudies()
  if (studies.length === 0) return null

  return (
    <section className="border-t border-border">
      <Container className="py-20 md:py-28">
        <Reveal>
          <PosterHeading
            eyebrow="From challenge to outcome"
            lines={homeCopy.workTitle}
            lede={homeCopy.workLede}
            href="/work"
            action="See every project"
          />
        </Reveal>
        <ul className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-3">
          {studies.map((study, index) => (
            <li key={study.slug}>
              <Reveal delay={index * 0.05}>
                <Link href={`/work/${study.slug}`} className="group block">
                  <Photo scene={study.scene} place={study.place} />
                  <p className="mt-4 text-xs tracking-[0.14em] text-muted-foreground uppercase">
                    {study.place}
                    <span className="text-foreground"> · {study.client}</span>
                  </p>
                  <h3 className="mt-2 font-serif text-2xl font-medium tracking-tight text-balance transition-colors duration-300 ease-studio group-hover:text-brand">
                    {study.title}
                  </h3>
                  <p className="mt-4 text-xs tracking-[0.14em] text-brand-ink uppercase">
                    The problem
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-pretty text-muted-foreground">
                    {firstSentence(study.challenge)}
                  </p>
                  <p className="mt-4 text-xs tracking-[0.14em] text-brand-ink uppercase">
                    What changed
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-pretty">
                    <span className="font-medium">{study.metric.value}</span>{" "}
                    <span className="text-muted-foreground">{study.metric.label}</span>
                  </p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
