import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/container"
import { CtaBand } from "@/components/shared/cta-band"
import { JsonLd } from "@/components/shared/json-ld"
import { PageIntro } from "@/components/shared/page-intro"
import { ProjectFrame } from "@/components/shared/project-frame"
import { breadcrumbJsonLd } from "@/lib/seo"
import { products, site } from "@/lib/site"
import type { ProjectTone } from "@/lib/work"

export const metadata: Metadata = {
  title: "Products",
  description:
    "Two tools Dixsa Labs runs itself: a POS for hotels and restaurants, and GST invoices that leave on WhatsApp.",
  alternates: { canonical: "/products" },
}

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ])}
      />
      <PageIntro
        crumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
        eyebrow="Studio products"
        title="Orders and invoices, already built."
        lede="A point of sale for hotels and restaurants. GST invoices that leave on WhatsApp. Use the one that matches the job."
        note={site.productNote}
      />

      <Container className="py-14 md:py-20">
        <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2">
          {products.map((product) => (
            <li key={product.slug}>
              <Link href={`/products/${product.slug}`} className="group block h-full">
                <ProjectFrame
                  tone={product.tone as ProjectTone}
                  scene={product.scene}
                  place={product.place}
                />
                <div className="pt-5">
                  <p className="font-mono text-xs text-brand-ink">{product.index}</p>
                  <h2 className="mt-3 font-serif text-2xl font-medium tracking-tight text-balance transition-colors duration-300 ease-studio group-hover:text-brand md:text-3xl">
                    {product.line}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-pretty text-muted-foreground">
                    {product.audience}
                  </p>
                  <p className="mt-4 text-sm">{product.price}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
                    <span className="underline decoration-border underline-offset-4 transition-colors duration-300 ease-studio group-hover:decoration-brand">
                      {product.cardCta}
                    </span>
                    <ArrowRight
                      className="size-4 transition-transform duration-300 ease-studio motion-safe:group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
      <CtaBand
        title="Need something that does not exist yet?"
        body="The products cover two jobs. Everything else is a project, with a fixed price before it starts."
        primaryLabel="Start a project"
      />
    </>
  )
}
