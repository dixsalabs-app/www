import { absoluteUrl, site } from "@/lib/site"

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    email: site.email,
    description: site.positioning,
    areaServed: "Odisha",
    knowsAbout: [
      "Websites",
      "Web apps",
      "Mobile apps",
      "AI automation",
      "Content creation and enhancement",
      "SEO",
      "Google Marketplace",
      "AI SEO",
      "Point of sale for hotels and restaurants",
      "GST invoices on WhatsApp",
    ],
    slogan: site.tagline,
  }
}

export function serviceJsonLd(service: {
  name: string
  description: string
  path: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: absoluteUrl(service.path),
    areaServed: "Odisha",
    provider: {
      "@type": "Organization",
      name: site.legalName,
      url: site.url,
    },
  }
}

export function productJsonLd(product: {
  name: string
  description: string
  path: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    description: product.description,
    url: absoluteUrl(product.path),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    brand: {
      "@type": "Brand",
      name: site.name,
    },
    provider: {
      "@type": "Organization",
      name: site.legalName,
      url: site.url,
    },
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function articleJsonLd(article: {
  title: string
  description: string
  path: string
  date: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: absoluteUrl(article.path),
    author: {
      "@type": "Organization",
      name: site.legalName,
      url: site.url,
    },
    publisher: {
      "@type": "Organization",
      name: site.legalName,
      url: site.url,
    },
  }
}
