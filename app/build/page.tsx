import type { Metadata } from "next"
import { AppBuilder } from "@/components/builder/app-builder"
import { JsonLd } from "@/components/shared/json-ld"
import { breadcrumbJsonLd } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Build it live",
  description:
    "Answer a few plain questions and watch a live sketch of your app, website, or workflow update as you go. Send it when it looks right.",
  alternates: { canonical: "/build" },
}

export default function BuildPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Build", path: "/build" },
        ])}
      />
      <AppBuilder />
    </>
  )
}
