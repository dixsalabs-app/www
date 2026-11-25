import type { MetadataRoute } from "next"
import { insights } from "@/lib/insights"
import { absoluteUrl, products } from "@/lib/site"
import { services } from "@/lib/services"
import { caseStudies } from "@/lib/work"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/build",
    "/services",
    "/products",
    "/work",
    "/about",
    "/insights",
    "/contact",
  ]

  return [
    ...staticRoutes.map((path) => ({
      url: absoluteUrl(path || "/"),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...products.map((product) => ({
      url: absoluteUrl(`/products/${product.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...services.map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...caseStudies.map((study) => ({
      url: absoluteUrl(`/work/${study.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...insights.map((insight) => ({
      url: absoluteUrl(`/insights/${insight.slug}`),
      lastModified: insight.date,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ]
}
