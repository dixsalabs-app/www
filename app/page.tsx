import type { Metadata } from "next"
import { Hero } from "@/components/home/hero"
import { NextStepsSection } from "@/components/home/next-steps-section"
import { PracticeChart } from "@/components/home/practice-chart"
import { ProductsSection } from "@/components/home/products-section"
import { RoadmapSection } from "@/components/home/roadmap-section"
import { ServicesSection } from "@/components/home/services-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { WorkSection } from "@/components/home/work-section"
import { CtaBand } from "@/components/shared/cta-band"
import { homeCopy, site } from "@/lib/site"

export const metadata: Metadata = {
  title: {
    absolute: `${site.name} — ${site.tagline}`,
  },
  description: site.positioning,
  alternates: { canonical: "/" },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <PracticeChart />
      <ProductsSection />
      <WorkSection />
      <TestimonialsSection />
      <RoadmapSection />
      <NextStepsSection />
      <CtaBand title={homeCopy.closeTitle} body={homeCopy.closeBody} />
    </>
  )
}
