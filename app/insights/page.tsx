import type { Metadata } from "next"
import Link from "next/link"
import { Container } from "@/components/layout/container"
import { CtaBand } from "@/components/shared/cta-band"
import { JsonLd } from "@/components/shared/json-ld"
import { PageIntro } from "@/components/shared/page-intro"
import { insights } from "@/lib/insights"
import { breadcrumbJsonLd } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Short notes on websites, apps, search, and the jobs worth paying to fix. Written for owners, in plain words.",
  alternates: { canonical: "/insights" },
}

export default function InsightsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
        ])}
      />
      <PageIntro
        crumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
        eyebrow="Insights"
        title="Straight answers before you spend the money."
        lede="Short notes for owners who have heard the words and want to know what is actually worth doing."
      />
      <ul className="mt-12 border-t border-border">
        {insights.map((post) => (
          <li key={post.slug} className="border-b border-border">
            <Container>
              <Link
                href={`/insights/${post.slug}`}
                className="group grid gap-2 py-6 md:grid-cols-12 md:items-baseline md:py-7"
              >
                <time
                  dateTime={post.date}
                  className="font-mono text-xs text-brand-ink md:col-span-3"
                >
                  {post.displayDate}
                </time>
                <h2 className="font-serif text-2xl tracking-tight transition-colors duration-300 ease-studio group-hover:text-brand md:col-span-9 md:text-3xl">
                  {post.title}
                </h2>
              </Link>
            </Container>
          </li>
        ))}
      </ul>
      <CtaBand />
    </>
  )
}
