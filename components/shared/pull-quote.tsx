export function PullQuote({
  quote,
  cite,
}: {
  quote: string
  cite?: string
}) {
  return (
    <figure className="border-l-2 border-brand pl-6">
      <blockquote className="font-serif text-[clamp(1.7rem,3vw,2.35rem)] leading-snug font-medium tracking-tight text-balance">
        {quote}
      </blockquote>
      {cite ? (
        <figcaption className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {cite}
        </figcaption>
      ) : null}
    </figure>
  )
}
