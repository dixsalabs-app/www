import type { Metadata } from "next"
import { Suspense } from "react"
import { Container } from "@/components/layout/container"
import { ContactForm } from "@/components/contact/contact-form"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"
import { CtaBand } from "@/components/shared/cta-band"
import { TextLink } from "@/components/shared/text-link"
import { JsonLd } from "@/components/shared/json-ld"
import { isProjectType, type ProjectType } from "@/lib/contact-schema"
import { breadcrumbJsonLd } from "@/lib/seo"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Tell Dixsa Labs what you wish was easier. A website, a web app, content, search, or one of the products. We reply within one business day.",
  alternates: { canonical: "/contact" },
}

type ContactPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default function ContactPage({ searchParams }: ContactPageProps) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <Container className="grid gap-12 py-12 md:grid-cols-12 md:py-16">
        <div className="md:col-span-5">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
          />
          <p className="eyebrow mt-10">Start a project</p>
          <h1 className="interior-title mt-4 max-w-xl text-balance">
            Tell us what you wish was easier.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-pretty text-muted-foreground">
            A few sentences is enough. What you sell, who it is for, and what
            is slowing you down. We reply within {site.responseTime}, in plain
            words, with an honest view on fit, time, and price.
          </p>
          <div className="mt-6">
            <TextLink href="/build">Sketch it live first</TextLink>
          </div>
          <ol className="mt-10 border-t border-border">
            <Step
              index="01"
              title="We read it"
              body="A person on the team, not a queue, looks at what you sent."
            />
            <Step
              index="02"
              title="You get a direct reply"
              body="If we are not the right studio, we say so. If we are, we propose a short call and what to prepare."
            />
            <Step
              index="03"
              title="A short call, then a fixed price"
              body={site.investmentNote}
            />
          </ol>
          <p className="mt-8 text-sm">
            Prefer to pick a time?{" "}
            <a
              href={site.bookingUrl}
              className="underline decoration-border underline-offset-4 transition-colors duration-300 ease-studio hover:decoration-brand"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a time
            </a>
            .
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Or email{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-foreground underline decoration-border underline-offset-4 hover:decoration-brand"
            >
              {site.email}
            </a>
            .
          </p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-pretty text-muted-foreground">
            {site.location}
          </p>
        </div>
        <div className="md:col-span-7">
          <Suspense
            fallback={
              <div className="h-96 border border-border bg-card" aria-hidden />
            }
          >
            <ContactWithParams searchParams={searchParams} />
          </Suspense>
        </div>
      </Container>
      <CtaBand
        title="Prefer to pick a time?"
        body={`Book a call, or send the note above. A person replies within ${site.responseTime} either way.`}
        primaryHref={site.bookingUrl}
        primaryLabel="Book a time"
      />
    </>
  )
}

function Step({
  index,
  title,
  body,
}: {
  index: string
  title: string
  body: string
}) {
  return (
    <li className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-border py-5">
      <p className="font-mono text-xs text-brand-ink">{index}</p>
      <div>
        <p className="font-medium">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-pretty text-muted-foreground">
          {body}
        </p>
      </div>
    </li>
  )
}

async function ContactWithParams({ searchParams }: ContactPageProps) {
  const params = await searchParams
  const type = typeof params.type === "string" ? params.type : undefined
  const intent = typeof params.intent === "string" ? params.intent : ""
  return (
    <ContactForm
      initialProjectType={resolveProjectType(type)}
      intent={intent}
    />
  )
}

const legacyProjectType: Record<string, ProjectType> = {
  youtube: "content",
  marketing: "content",
  search: "seo",
}

function resolveProjectType(value: string | undefined): ProjectType | "" {
  if (!value) return ""
  const next = legacyProjectType[value] ?? value
  return isProjectType(next) ? next : ""
}
