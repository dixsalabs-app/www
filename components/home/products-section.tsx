import Link from "next/link"
import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"
import { PosterHeading } from "@/components/shared/poster-heading"
import { ProjectFrame } from "@/components/shared/project-frame"
import { homeCopy, products } from "@/lib/site"
import type { ProjectTone } from "@/lib/work"

export function ProductsSection() {
  return (
    <section id="products" className="border-t border-border">
      <Container className="py-20 md:py-28">
        <Reveal>
          <PosterHeading
            eyebrow="Studio products"
            lines={homeCopy.productsTitle}
            lede={homeCopy.productsLede}
            href="/products"
            action="Both products"
          />
        </Reveal>
        <ul className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-2">
          {products.map((product, index) => (
            <li key={product.slug}>
              <Reveal delay={index * 0.06}>
                <Link href={`/products/${product.slug}`} className="group block">
                  <ProjectFrame
                    tone={product.tone as ProjectTone}
                    scene={product.scene}
                  />
                  <p className="mt-5 eyebrow">{product.kicker}</p>
                  <h3 className="mt-2 font-serif text-2xl font-medium tracking-tight transition-colors duration-300 ease-studio group-hover:text-brand">
                    {product.navLabel}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-pretty text-muted-foreground">
                    {product.line}
                  </p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
