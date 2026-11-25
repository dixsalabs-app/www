import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Container } from "@/components/layout/container"
import { CtaBand } from "@/components/shared/cta-band"
import { JsonLd } from "@/components/shared/json-ld"
import { PageIntro } from "@/components/shared/page-intro"
import { RouteFallback } from "@/components/shared/route-fallback"
import { ProjectFrame } from "@/components/shared/project-frame"
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo"
import { getAdjacentStudy, getCaseStudy, workStaticParams } from "@/lib/work"

type StudyPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return workStaticParams()
}

export async function generateMetadata({
  params,
}: StudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) return { title: "Work" }
  return {
    title: `${study.client}: ${study.title}`,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
  }
}

export default function CaseStudyPage({ params }: StudyPageProps) {
  return (
    <Suspense fallback={<RouteFallback />}>
      <StudyContent params={params} />
    </Suspense>
  )
}

async function StudyContent({ params }: StudyPageProps) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) notFound()
  const nextStudy = getAdjacentStudy(study.slug)

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: study.client, path: `/work/${study.slug}` },
        ])}
      />
      <JsonLd
        data={articleJsonLd({
          title: `${study.client}: ${study.title}`,
          description: study.summary,
          path: `/work/${study.slug}`,
          date: `${study.year}-01-15`,
        })}
      />
      <PageIntro
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Work", href: "/work" },
          { label: study.client },
        ]}
        eyebrow={`${study.place} · ${study.sector} · ${study.year}`}
        title={study.title}
        lede={study.summary}
      />
      <Container className="pt-10">
        <ProjectFrame
          tone={study.tone}
          scene={study.scene}
          place={study.place}
          aspect="cinema"
        />
      </Container>
      <Container className="py-10">
        <dl className="grid gap-8 border-t border-border pt-8 sm:grid-cols-3">
          <div>
            <dt className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
              Headline result
            </dt>
            <dd className="mt-2 font-serif text-3xl font-medium tracking-tight text-brand">
              {study.metric.value}
            </dd>
            <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {study.metric.label}
            </dd>
          </div>
          <div>
            <dt className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
              Timeline
            </dt>
            <dd className="mt-2 text-lg">{study.timeline}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
              Scope
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-pretty">
              {study.services.join(" · ")}
            </dd>
          </div>
        </dl>
      </Container>

      <Container className="grid gap-14 py-6 md:grid-cols-12 md:py-10">
        <article className="grid gap-12 md:col-span-7">
          <section className="border-t border-border pt-8">
            <h2 className="font-serif text-3xl tracking-tight">The problem</h2>
            <p className="mt-4 leading-relaxed text-pretty text-muted-foreground">
              {study.challenge}
            </p>
          </section>
          <section className="border-t border-border pt-8">
            <h2 className="font-serif text-3xl tracking-tight">How we approached it</h2>
            <ol className="mt-2">
              {study.approach.map((step, index) => (
                <li
                  key={step}
                  className="grid grid-cols-[2rem_1fr] gap-3 border-t border-border py-4"
                >
                  <span className="font-mono text-xs text-brand-ink">0{index + 1}</span>
                  <p className="leading-relaxed text-pretty text-muted-foreground">{step}</p>
                </li>
              ))}
            </ol>
          </section>
          <section className="border-t border-border pt-8">
            <h2 className="font-serif text-3xl tracking-tight">What shipped</h2>
            <ul>
              {study.solution.map((item) => (
                <li
                  key={item}
                  className="border-t border-border py-4 leading-relaxed text-pretty text-muted-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </article>
        <aside className="md:col-span-5">
          <div className="md:sticky md:top-24">
            <h2 className="font-serif text-2xl tracking-tight">Results</h2>
            <ul className="mt-6 border-t border-border">
              {study.results.map((result) => (
                <li key={result.label} className="border-b border-border py-5">
                  <p className="font-serif text-3xl tracking-tight">{result.value}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {result.label}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              Figures are client-reported for this engagement.
            </p>
          </div>
        </aside>
      </Container>

      <Container className="pb-16">
        <figure className="grid items-center gap-8 border-t border-border pt-10 md:grid-cols-[minmax(0,18rem)_1fr]">
          {study.image ? (
            <Image
              src={study.image}
              alt={study.imageAlt ?? study.client}
              width={1200}
              height={900}
              className="aspect-[4/3] w-full rounded-3xl object-cover"
            />
          ) : null}
          <div>
            <blockquote className="font-serif text-[clamp(1.55rem,2.4vw,2.15rem)] leading-snug font-medium tracking-tight text-balance">
              “{study.quote.text}”
            </blockquote>
            <figcaption className="mt-6 text-sm leading-relaxed">
              <span className="block font-medium">{study.quote.name}</span>
              <span className="text-muted-foreground">{study.quote.role}</span>
            </figcaption>
          </div>
        </figure>
      </Container>

      {nextStudy ? (
        <Container className="border-t border-border py-10">
          <p className="text-[0.68rem] tracking-[0.16em] text-muted-foreground uppercase">
            Next study
          </p>
          <Link
            href={`/work/${nextStudy.slug}`}
            className="group mt-6 grid items-center gap-6 sm:grid-cols-[11rem_1fr]"
          >
            <ProjectFrame
              tone={nextStudy.tone}
              scene={nextStudy.scene}
              className="border border-border"
            />
            <span>
              <span className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                {nextStudy.place}
              </span>
              <span className="mt-1 block font-serif text-3xl font-medium tracking-tight transition-colors duration-300 ease-studio group-hover:text-brand">
                {nextStudy.client}
              </span>
              <span className="mt-2 block max-w-xl text-sm text-muted-foreground">
                {nextStudy.title}
              </span>
            </span>
          </Link>
        </Container>
      ) : null}
      <CtaBand
        title={`A similar problem to ${study.client}?`}
        body="Tell us the result you want. We will reply with whether a project like this is the right shape."
        primaryLabel="Start a project"
      />
    </>
  )
}
