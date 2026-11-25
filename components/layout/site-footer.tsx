import Link from "next/link"
import { Container } from "@/components/layout/container"
import { Logo } from "@/components/layout/logo"
import { nav, products, serviceList, site } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <Container className="grid gap-12 py-16 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {site.description}
          </p>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
          <div>
            <p className="eyebrow">Explore</p>
            <ul className="mt-4 space-y-2 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-brand-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="hover:text-brand-ink">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/build" className="hover:text-brand-ink">
                  Build it live
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">Services</p>
            <ul className="mt-4 space-y-2 text-sm">
              {serviceList.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:text-brand-ink"
                  >
                    {service.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Products</p>
            <ul className="mt-4 space-y-2 text-sm">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="hover:text-brand-ink"
                  >
                    {product.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Studio</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-brand-ink">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.bookingUrl}
                  className="hover:text-brand-ink"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a time
                </a>
              </li>
              <li className="max-w-[14rem] leading-relaxed text-muted-foreground">
                Reply within {site.responseTime}.
              </li>
            </ul>
          </div>
        </div>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-border py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {site.copyrightYear} {site.legalName}
        </p>
        <p>{site.footerLine}</p>
      </Container>
    </footer>
  )
}
