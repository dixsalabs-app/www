import { Container } from "@/components/layout/container"
import { caseStudies } from "@/lib/work"

export function Proof() {
  return (
    <section className="border-b border-border" aria-label="Selected clients">
      <Container className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-10">
        <p className="eyebrow shrink-0">Selected clients</p>
        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {caseStudies.map((study) => (
            <li
              key={study.slug}
              className="font-serif text-lg font-semibold tracking-[0.14em] text-foreground/75 uppercase"
            >
              {study.client}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
