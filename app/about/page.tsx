import type { Metadata } from "next"
import { Container } from "@/components/layout/container"
import { CtaBand } from "@/components/shared/cta-band"
import { JsonLd } from "@/components/shared/json-ld"
import { PageIntro } from "@/components/shared/page-intro"
import { OpenedDetail } from "@/components/region/regional-line"
import { Photo } from "@/components/shared/photo"
import { PullQuote } from "@/components/shared/pull-quote"
import { breadcrumbJsonLd } from "@/lib/seo"
import { site } from "@/lib/site"
import { initials, principles, processSteps, smbPractices, team } from "@/lib/studio"

export const metadata: Metadata = {
  title: "About",
  description:
    "Dixsa Labs is a boutique studio for growing companies. We build websites, apps, and systems so the business is easier to find, trust, and run.",
  alternates: { canonical: "/about" },
}

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageIntro
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        eyebrow="About"
        title="You explain the problem. We build the thing that fixes it."
        lede={`${site.name} is a boutique studio for growing companies. We build the digital side of the business so it is easier to find, trust, and run.`}
      />

      <Container className="grid gap-12 py-12 md:grid-cols-12 md:py-16">
        <div className="md:col-span-7">
          <p className="leading-relaxed text-pretty text-muted-foreground">
            The work we lead with is a website, a web app, a mobile app, or an
            automation. Around that we write and sharpen content, and we do SEO,
            Google Marketplace, and AI SEO. The products sit apart from that:
            orders and payments for a restaurant, or GST invoices that leave on
            WhatsApp.
          </p>
          <p className="mt-5 leading-relaxed text-pretty text-muted-foreground">
            Everyday words are enough. You meet the people who build it. We work
            with businesses in Odisha, and we reply within{" "}
            {site.responseTime}. The price is written down before we start.
          </p>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-pretty text-muted-foreground">
            {site.investmentNote}
          </p>
        </div>
        <aside className="md:col-span-5">
          <Photo
            scene="pos"
            place={<OpenedDetail detail="point of sale" />}
            aspect="mb-8 aspect-[4/5]"
          />
          <PullQuote quote="If you can explain it, we can build it." />
        </aside>
      </Container>

      <section className="border-y border-border">
        <Container className="py-16 md:py-20">
          <h2 className="font-serif text-4xl tracking-tight">How we think</h2>
          <ul className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {principles.map((principle) => (
              <li key={principle.title}>
                <h3 className="font-serif text-2xl tracking-tight">{principle.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-pretty text-muted-foreground">
                  {principle.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section>
        <Container className="py-16 md:py-20">
          <h2 className="max-w-2xl font-serif text-4xl tracking-tight text-balance">
            How a project actually runs
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-muted-foreground">
            You should not need a program office to hire us. These are the working rules.
          </p>
          <ol className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {smbPractices.map((practice, index) => (
              <li key={practice.title}>
                <p className="font-mono text-xs text-brand-ink">0{index + 1}</p>
                <h3 className="mt-4 font-serif text-2xl tracking-tight">{practice.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-pretty text-muted-foreground">
                  {practice.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-t border-border bg-card">
        <Container className="py-16 md:py-20">
          <h2 className="font-serif text-4xl tracking-tight">The process</h2>
          <ol className="mt-8">
            {processSteps.map((step) => (
              <li
                key={step.id}
                className="grid gap-3 border-t border-border py-8 md:grid-cols-12"
              >
                <p className="font-mono text-xs text-brand-ink md:col-span-2">{step.id}</p>
                <div className="md:col-span-3">
                  <h3 className="font-serif text-2xl tracking-tight">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.summary}</p>
                </div>
                <p className="text-sm leading-relaxed text-pretty text-muted-foreground md:col-span-7">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section>
        <Container className="py-16 md:py-20">
          <h2 className="font-serif text-4xl tracking-tight">The team</h2>
          <p className="mt-4 max-w-xl text-pretty text-muted-foreground">
            Founder-led. You will meet these people on the work, not a rotating
            cast introduced after the contract.
          </p>
          <ul className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {team.map((person) => (
              <li key={person.name}>
                <div
                  aria-hidden
                  className="grid size-10 place-items-center border border-border font-mono text-xs text-brand-ink"
                >
                  {initials(person.name)}
                </div>
                <h3 className="mt-5 font-serif text-2xl tracking-tight">{person.name}</h3>
                <p className="mt-1 text-sm text-brand-ink">{person.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-pretty text-muted-foreground">
                  {person.bio}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CtaBand />
    </>
  )
}
