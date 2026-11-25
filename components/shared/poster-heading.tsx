import { TextLink } from "@/components/shared/text-link"

export function PosterHeading({
  eyebrow,
  lines,
  lede,
  href,
  action,
}: {
  eyebrow: string
  lines: readonly string[]
  lede?: string
  href?: string
  action?: string
}) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-[clamp(1.85rem,3vw,2.6rem)] leading-snug font-medium tracking-tight text-balance">
        {lines.join(" ")}
      </h2>
      {lede ? (
        <p className="mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground">
          {lede}
        </p>
      ) : null}
      {href && action ? (
        <TextLink href={href} className="mt-5">
          {action}
        </TextLink>
      ) : null}
    </div>
  )
}
