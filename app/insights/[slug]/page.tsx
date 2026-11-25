import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Container } from "@/components/layout/container"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { CtaBand } from "@/components/shared/cta-band"
import { JsonLd } from "@/components/shared/json-ld"
import { RouteFallback } from "@/components/shared/route-fallback"
import { getInsight, insightStaticParams, insights } from "@/lib/insights"
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo"

type InsightPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return insightStaticParams()
}

export async function generateMetadata({
  params,
}: InsightPageProps): Promise<Metadata> {
  const { slug } = await params
  const insight = getInsight(slug)
  if (!insight) return { title: "Insights" }
  return {
    title: insight.title,
    description: insight.description,
    alternates: { canonical: `/insights/${insight.slug}` },
    openGraph: {
      type: "article",
      publishedTime: insight.date,
      title: insight.title,
      description: insight.description,
    },
  }
}

export default function InsightPage({ params }: InsightPageProps) {
  return (
    <Suspense fallback={<RouteFallback />}>
      <InsightContent params={params} />
    </Suspense>
  )
}

async function InsightContent({ params }: InsightPageProps) {
  const { slug } = await params
  const insight = getInsight(slug)
  if (!insight) notFound()

  const more = insights.filter((item) => item.slug !== insight.slug).slice(0, 2)

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: insight.title, path: `/insights/${insight.slug}` },
        ])}
      />
      <JsonLd
        data={articleJsonLd({
          title: insight.title,
          description: insight.description,
          path: `/insights/${insight.slug}`,
          date: insight.date,
        })}
      />
      <Container className="pt-12 pb-20 md:pt-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Insights", href: "/insights" },
            { label: insight.title },
          ]}
        />
        <header className="mx-auto mt-10 max-w-2xl">
          <p className="eyebrow">{insight.topic}</p>
          <h1 className="interior-title mt-4 text-balance text-[clamp(2.3rem,4.5vw,3.8rem)]">
            {insight.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-pretty text-muted-foreground">
            {insight.description}
          </p>
          <p className="mt-4 font-mono text-xs text-brand-ink">
            <time dateTime={insight.date}>{insight.displayDate}</time>
            <span className="mx-2" aria-hidden>
              ·
            </span>
            {insight.readingTime}
          </p>
        </header>
        <article className="mx-auto mt-12 max-w-2xl">
          {insight.content.map((block, index) => {
            if (block.type === "h2") {
              return (
                <h2
                  key={`${block.text}-${index}`}
                  className="mt-10 font-serif text-3xl tracking-tight"
                >
                  {block.text}
                </h2>
              )
            }
            if (block.type === "ul") {
              return (
                <ul key={index} className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground">
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )
            }
            return (
              <p key={index} className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {block.text}
              </p>
            )
          })}
        </article>
        {more.length > 0 ? (
          <aside className="mx-auto mt-16 max-w-2xl border-t border-border pt-8">
            <h2 className="text-sm font-medium">Keep reading</h2>
            <ul className="mt-4 space-y-3">
              {more.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/insights/${post.slug}`}
                    className="font-serif text-2xl tracking-tight hover:text-brand"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </Container>
      <CtaBand
        title="If this is the decision in front of you, tell us."
        body="A few sentences on the problem is enough. We will say whether a project is the right next step."
        primaryLabel="Start a project"
      />
    </>
  )
}
