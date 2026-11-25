import { Container } from "@/components/layout/container"
import { Breadcrumbs } from "@/components/shared/breadcrumbs"

export function PageIntro({
  eyebrow,
  index,
  title,
  lede,
  note,
  crumbs,
}: {
  eyebrow: string
  index?: string
  title: string
  lede?: string
  note?: string
  crumbs: { label: string; href?: string }[]
}) {
  return (
    <Container className="pt-12 pb-2 md:pt-16">
      <Breadcrumbs items={crumbs} />
      {index ? (
        <p className="mt-10 font-mono text-xs text-brand-ink">{index}</p>
      ) : null}
      <p className={index ? "eyebrow mt-3" : "eyebrow mt-10"}>{eyebrow}</p>
      <h1 className="interior-title mt-4 max-w-3xl text-balance">{title}</h1>
      {lede ? (
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty">{lede}</p>
      ) : null}
      {note ? (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground">
          {note}
        </p>
      ) : null}
    </Container>
  )
}
