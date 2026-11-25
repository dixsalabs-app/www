import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"
import { audiences } from "@/lib/studio"

export function SegmentsSection() {
  return (
    <section className="border-b border-border">
      <Container className="py-20 md:py-28">
        <Reveal>
          <p className="eyebrow">Who it is for</p>
          <h2 className="display mt-4 max-w-4xl text-[clamp(3rem,6vw,5.5rem)]">
            Every kind
            <br />
            of business.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            A shop, a firm, a startup, or a company that already has a few
            tools. If you can say what you wish was easier, you know enough
            to start.
          </p>
        </Reveal>
        <ul className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((item, index) => (
            <li key={item.title} className="bg-background">
              <Reveal delay={index * 0.04} className="h-full p-7 md:p-8">
                <p className="eyebrow">{item.kicker}</p>
                <h3 className="display mt-4 text-[clamp(2rem,3vw,2.6rem)]">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
