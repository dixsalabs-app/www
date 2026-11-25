import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Container } from "@/components/layout/container"
import { CtaBand } from "@/components/shared/cta-band"
import { PrimaryLink } from "@/components/shared/cta-link"
import { JsonLd } from "@/components/shared/json-ld"
import { PageIntro } from "@/components/shared/page-intro"
import { RouteFallback } from "@/components/shared/route-fallback"
import { ServiceArt } from "@/components/illustrations/service-art"
import { ProjectFrame } from "@/components/shared/project-frame"
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo"
import { getInsight } from "@/lib/insights"
import { getService, serviceStaticParams, services } from "@/lib/services"
import { site } from "@/lib/site"
import { studiesByDisciplines } from "@/lib/work"

type ServicePageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return serviceStaticParams()
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return { title: "Service" }
  return {
    title: service.navLabel,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
  }
}

export default function ServicePage({ params }: ServicePageProps) {
  return (
    <Suspense fallback={<RouteFallback />}>
      <ServiceContent params={params} />
    </Suspense>
  )
}

async function ServiceContent({ params }: ServicePageProps) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const related = studiesByDisciplines(service.disciplines).slice(0, 2)
  const insight = service.insightSlug ? getInsight(service.insightSlug) : undefined
  const others = services.filter((item) => item.slug !== service.slug)
  const contactHref = `/contact?type=${service.projectType}`

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.navLabel, path: `/services/${service.slug}` },
        ])}
      />
      <JsonLd
        data={serviceJsonLd({
          name: service.navLabel,
          description: service.summary,
          path: `/services/${service.slug}`,
        })}
      />
      <PageIntro
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.navLabel },
        ]}
        index={service.index}
        eyebrow={service.navLabel}
        title={service.title}
        lede={service.hook}
        note={service.plain}
      />

      <Container className="pt-10">
        <ServiceArt
          kind={service.slug}
          wide
          className="rounded-3xl border border-border"
        />
      </Container>

      <Container className="py-10 md:py-14">
        <dl className="grid gap-8 border-t border-border pt-8 sm:grid-cols-3">
          <Fact term="Length" detail={service.length} />
          <Fact term="You need it when" detail={service.when} />
          <Fact term="You leave with" detail={service.leaveWith} />
        </dl>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-pretty text-muted-foreground">
          {site.investmentNote}
        </p>
      </Container>

      <Container className="grid gap-14 pb-20 md:grid-cols-12 md:pb-28">
        <div className="grid gap-12 md:col-span-7">
          <Story title="The problem" body={service.problem} />
          <Story title="What we do" body={service.solution} />
          <Story title="What changes" body={service.outcome} />
        </div>
        <aside className="md:col-span-5">
          <div className="md:sticky md:top-24">
            <p className="eyebrow">Scope</p>
            <h2 className="mt-4 font-serif text-3xl tracking-tight">What is included</h2>
            <ol className="mt-6 border-t border-border">
              {service.includes.map((item, index) => (
                <li
                  key={item}
                  className="grid grid-cols-[2rem_1fr] gap-3 border-b border-border py-4 text-sm leading-relaxed"
                >
                  <span className="font-mono text-xs text-brand-ink">
                    0{index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <PrimaryLink href={contactHref}>Start this project</PrimaryLink>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              We reply within {site.responseTime}.
            </p>
          </div>
        </aside>
      </Container>

      <section className="border-t border-border">
        <Container className="grid gap-12 py-16 md:grid-cols-2 md:py-20">
          <FitList title="A good fit" items={service.fit} />
          <FitList title="Not this engagement" items={service.notFit} muted />
        </Container>
      </section>

      {related.length > 0 ? (
        <Container className="py-16 md:py-20">
          <h2 className="font-serif text-3xl tracking-tight">Related work</h2>
          <ul className="mt-8 grid gap-x-8 gap-y-12 md:grid-cols-2">
            {related.map((study) => (
              <li key={study.slug}>
                <Link href={`/work/${study.slug}`} className="group block">
                  <ProjectFrame tone={study.tone} scene={study.scene} />
                  <div className="pt-4">
                    <p className="font-mono text-xs text-brand-ink">{study.metric.value}</p>
                    <p className="mt-3 font-serif text-2xl tracking-tight transition-colors duration-300 ease-studio group-hover:text-brand">
                      {study.client}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">{study.metric.label}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      ) : null}

      <Container className="flex flex-col gap-6 border-t border-border py-10 text-sm md:flex-row md:items-center md:justify-between">
        {insight ? (
          <Link
            href={`/insights/${insight.slug}`}
            className="underline decoration-border underline-offset-4 transition-colors duration-300 ease-studio hover:decoration-brand"
          >
            Read: {insight.title}
          </Link>
        ) : (
          <span />
        )}
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {others.map((item) => (
            <Link
              key={item.slug}
              href={`/services/${item.slug}`}
              className="text-muted-foreground transition-colors duration-300 ease-studio hover:text-brand-ink"
            >
              {item.navLabel}
            </Link>
          ))}
        </div>
      </Container>
      <CtaBand
        title="Tell us the result you want."
        body="We reply within one business day, with a plain view on fit, time, and price."
        primaryHref={contactHref}
        primaryLabel="Start this project"
      />
    </>
  )
}

function Fact({ term, detail }: { term: string; detail: string }) {
  return (
    <div>
      <dt className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
        {term}
      </dt>
      <dd className="mt-2 text-sm leading-relaxed text-pretty">{detail}</dd>
    </div>
  )
}

function Story({ title, body }: { title: string; body: string }) {
  return (
    <section className="border-t border-border pt-8">
      <h2 className="font-serif text-3xl tracking-tight">{title}</h2>
      <p className="mt-4 leading-relaxed text-pretty text-muted-foreground">{body}</p>
    </section>
  )
}

function FitList({
  title,
  items,
  muted = false,
}: {
  title: string
  items: readonly string[]
  muted?: boolean
}) {
  return (
    <section>
      <h2 className="font-serif text-2xl tracking-tight">{title}</h2>
      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li
            key={item}
            className={`border-t border-border pt-4 text-sm leading-relaxed text-pretty ${muted ? "text-muted-foreground" : ""}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}
