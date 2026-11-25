import type { Metadata } from "next"
import { Suspense } from "react"
import { Container } from "@/components/layout/container"
import { CtaBand } from "@/components/shared/cta-band"
import { JsonLd } from "@/components/shared/json-ld"
import { PageIntro } from "@/components/shared/page-intro"
import { WorkExplorer } from "@/components/work/work-explorer"
import { breadcrumbJsonLd } from "@/lib/seo"
import { caseStudies, toWorkCard } from "@/lib/work"

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects for growing companies. A site, an app, or a job that was taking the morning — and the result after it shipped.",
  alternates: { canonical: "/work" },
}

const cards = caseStudies.map(toWorkCard)

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />
      <PageIntro
        crumbs={[{ label: "Home", href: "/" }, { label: "Work" }]}
        eyebrow="Work"
        title="Different businesses. The same kind of relief."
        lede="A wholesaler, a law firm, a clinic, a shop. Something was slow or easy to miss. After launch, it was not."
        note="These are custom projects. The POS and the invoice tool live with the products."
      />
      <Container className="py-12 md:py-16">
        <Suspense fallback={<div aria-hidden className="h-10 w-full border-b border-border" />}>
          <WorkExplorer cards={cards} />
        </Suspense>
      </Container>
      <CtaBand />
    </>
  )
}
