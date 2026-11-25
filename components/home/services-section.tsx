import Link from "next/link"
import { Container } from "@/components/layout/container"
import { ServiceArt } from "@/components/illustrations/service-art"
import { Reveal } from "@/components/motion/reveal"
import { PosterHeading } from "@/components/shared/poster-heading"
import { servicesInGroup } from "@/lib/services"
import { homeCopy } from "@/lib/site"

const groups = ["Build", "Content and search"] as const

export function ServicesSection({ intro = true }: { intro?: boolean }) {
  return (
    <section id="services" className="border-t border-border">
      <Container className={intro ? "py-20 md:py-28" : "pt-10 pb-20 md:pb-28"}>
        {intro ? (
          <Reveal>
            <PosterHeading
              eyebrow="Services"
              lines={homeCopy.servicesTitle}
              lede={homeCopy.servicesLede}
              href="/services"
              action="All services"
            />
          </Reveal>
        ) : null}
        {groups.map((group, groupIndex) => (
          <div
            key={group}
            className={groupIndex === 0 && !intro ? "mt-2" : "mt-14"}
          >
            <h3 className="font-serif text-2xl font-medium tracking-tight">{group}</h3>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {servicesInGroup(group).map((service, index) => (
                <li key={service.slug}>
                  <Reveal delay={index * 0.04} className="h-full">
                    <Link
                      href={`/services/${service.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card"
                    >
                      <ServiceArt
                        kind={service.slug}
                        className="rounded-none transition-transform duration-500 ease-studio group-hover:scale-[1.03]"
                      />
                      <div className="flex flex-1 flex-col p-5">
                        <p className="font-mono text-xs text-brand-ink">{service.index}</p>
                        <h3 className="mt-2 font-serif text-2xl font-medium tracking-tight transition-colors duration-300 ease-studio group-hover:text-brand">
                          {service.navLabel}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground">
                          {service.line}
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
    </section>
  )
}
