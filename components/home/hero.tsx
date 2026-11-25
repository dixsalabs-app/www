import Link from "next/link"
import { Container } from "@/components/layout/container"
import { HeroCollage } from "@/components/illustrations/hero-collage"
import { RegionalLine } from "@/components/region/regional-line"
import { PrimaryLink } from "@/components/shared/cta-link"
import { TextLink } from "@/components/shared/text-link"
import { heroLines, site, trustMarks } from "@/lib/site"
import { metrics } from "@/lib/studio"

export function Hero() {
  return (
    <section>
      <Container className="grid items-center gap-12 py-16 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-10 md:py-24">
        <div>
          <RegionalLine />
          <h1 className="mt-4 max-w-xl font-serif text-[clamp(2.4rem,4.2vw,3.7rem)] leading-[1.12] font-medium tracking-tight text-balance">
            {heroLines.join(" ")}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-pretty text-muted-foreground md:text-lg">
            {site.hero}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {trustMarks.map((mark) => (
              <li key={mark.href}>
                <Link
                  href={mark.href}
                  className="inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground transition-colors duration-300 ease-studio hover:border-brand hover:text-brand"
                >
                  {mark.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <PrimaryLink href="/contact">Start a project</PrimaryLink>
            <TextLink href="#services">See the services</TextLink>
          </div>
        </div>
        <HeroCollage />
      </Container>
      <Container>
        <ul className="grid gap-8 border-t border-border py-8 sm:grid-cols-3 md:py-10">
          {metrics.map((metric) => (
            <li key={metric.label}>
              <p className="font-serif text-3xl font-medium tracking-tight md:text-4xl">
                {metric.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{metric.label}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
