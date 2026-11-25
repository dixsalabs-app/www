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
import { ProjectFrame } from "@/components/shared/project-frame"
import { breadcrumbJsonLd, productJsonLd } from "@/lib/seo"
import { getProduct, productStaticParams, products, site } from "@/lib/site"
import type { ProjectTone } from "@/lib/work"

type ProductPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return productStaticParams()
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return { title: "Product" }
  return {
    title: product.navLabel,
    description: product.summary,
    alternates: { canonical: `/products/${product.slug}` },
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense fallback={<RouteFallback />}>
      <ProductContent params={params} />
    </Suspense>
  )
}

async function ProductContent({ params }: ProductPageProps) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  const others = products.filter((item) => item.slug !== product.slug)

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: product.navLabel, path: `/products/${product.slug}` },
        ])}
      />
      <JsonLd
        data={productJsonLd({
          name: product.navLabel,
          description: product.summary,
          path: `/products/${product.slug}`,
        })}
      />
      <PageIntro
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.navLabel },
        ]}
        index={product.index}
        eyebrow={product.kicker}
        title={product.line}
        lede={product.summary}
      />

      <Container className="pt-10">
        <ProjectFrame
          tone={product.tone as ProjectTone}
          scene={product.scene}
          place={product.place}
          aspect="cinema"
        />
      </Container>

      <Container className="py-10">
        <dl className="grid gap-8 border-t border-border pt-8 sm:grid-cols-2">
          <div>
            <dt className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
              Timeline
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-pretty">{product.timeline}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
              Price
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-pretty">{product.price}</dd>
          </div>
        </dl>
      </Container>

      <Container className="grid gap-14 pb-20 md:grid-cols-12 md:pb-28">
        <div className="md:col-span-7">
          <section className="border-t border-border pt-8">
            <h2 className="font-serif text-3xl tracking-tight">Who it is for</h2>
            <p className="mt-4 leading-relaxed text-pretty text-muted-foreground">
              {product.audience}
            </p>
          </section>
          <section className="mt-12 border-t border-border pt-8">
            <h2 className="font-serif text-3xl tracking-tight">What it does</h2>
            <ul className="mt-2 border-b border-border">
              {product.features.map((feature, index) => (
                <li
                  key={feature}
                  className="grid grid-cols-[2rem_1fr] gap-3 border-t border-border py-4 text-sm leading-relaxed"
                >
                  <span className="font-mono text-xs text-brand-ink">0{index + 1}</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="mt-12 border-t border-border pt-8">
            <h2 className="font-serif text-3xl tracking-tight">Not this product</h2>
            <p className="mt-4 leading-relaxed text-pretty text-muted-foreground">
              {product.notFor}
            </p>
          </section>
        </div>
        <aside className="md:col-span-5">
          <div className="md:sticky md:top-24">
            <p className="eyebrow">{product.navLabel}</p>
            <p className="mt-4 font-serif text-2xl tracking-tight text-balance">
              {product.line}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-pretty text-muted-foreground">
              {site.productNote}
            </p>
            <div className="mt-8">
              <PrimaryLink href={product.startHref}>{product.startLabel}</PrimaryLink>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              We reply within {site.responseTime}.
            </p>
          </div>
        </aside>
      </Container>

      {others.length > 0 ? (
        <Container className="border-t border-border py-10">
          <p className="text-[0.68rem] tracking-[0.16em] text-muted-foreground uppercase">
            The other product
          </p>
          {others.map((other) => (
            <Link
              key={other.slug}
              href={`/products/${other.slug}`}
              className="mt-3 inline-block font-serif text-3xl tracking-tight transition-colors duration-300 ease-studio hover:text-brand"
            >
              {other.line}
            </Link>
          ))}
        </Container>
      ) : null}
      <CtaBand
        title={product.line}
        body={`${product.timeline} ${product.price}`}
        primaryHref={product.startHref}
        primaryLabel={product.startLabel}
      />
    </>
  )
}
