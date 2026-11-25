import type { Metadata } from "next"
import { ServicesSection } from "@/components/home/services-section"
import { CtaBand } from "@/components/shared/cta-band"
import { JsonLd } from "@/components/shared/json-ld"
import { PageIntro } from "@/components/shared/page-intro"
import { breadcrumbJsonLd } from "@/lib/seo"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Websites, web apps, mobile apps, and AI automation, plus content, SEO, Google Marketplace, and AI SEO. Each one has a scope, a timeline, and a fixed price.",
  alternates: { canonical: "/services" },
}

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <PageIntro
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        eyebrow="Services"
        title="The build first. Then the words, and the way people find you."
        lede="Websites, web apps, mobile apps, and AI automation. Content creation and enhancement. SEO, Google Marketplace, and AI SEO. Products stay on their own page."
        note={`${site.investmentNote} We reply within ${site.responseTime}.`}
      />
      <ServicesSection intro={false} />
      <CtaBand
        title="Not sure which one you need?"
        body="Describe what feels stuck, in your own words. We will tell you whether it is a site, an app, content, search, or something you should not hire us for."
        primaryLabel="Start a project"
      />
    </>
  )
}
