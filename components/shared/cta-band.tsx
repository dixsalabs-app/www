import { Container } from "@/components/layout/container"
import { PrimaryLink } from "@/components/shared/cta-link"
import { homeCopy, site } from "@/lib/site"

export function CtaBand({
  title = homeCopy.closeTitle,
  body = homeCopy.closeBody,
  primaryHref = "/contact",
  primaryLabel = "Start a project",
}: {
  title?: string
  body?: string
  primaryHref?: string
  primaryLabel?: string
}) {
  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <div aria-hidden className="band-jaali pointer-events-none absolute inset-0" />
      <Container className="relative py-20 md:py-24">
        <h2 className="max-w-xl font-serif text-[clamp(2rem,3.6vw,3rem)] leading-tight font-medium tracking-tight text-balance">
          {title}
        </h2>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-pretty text-white/80 md:text-lg">
          {body}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <PrimaryLink
            href={primaryHref}
            className="bg-white text-brand hover:bg-white/90"
          >
            {primaryLabel}
          </PrimaryLink>
          <a
            href={`mailto:${site.email}`}
            className="text-sm text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
          >
            {site.email}
          </a>
        </div>
      </Container>
    </section>
  )
}
