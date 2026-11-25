import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"
import { fit } from "@/lib/studio"

export function FitSection() {
  return (
    <section className="border-b border-border">
      <Container className="py-20 md:py-28">
        <Reveal>
          <p className="eyebrow">Fit</p>
          <h2 className="display mt-4 max-w-3xl text-[clamp(3rem,6vw,5.5rem)]">
            Sound like you?
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            If you can explain the problem, you know enough. The technical
            part is our job.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <Reveal>
            <div className="h-full bg-brand p-7 text-brand-foreground md:p-10">
              <h3 className="display text-3xl">A good fit if</h3>
              <ul className="mt-8 space-y-5">
                {fit.good.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-foreground" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="h-full border border-border p-7 md:p-10">
              <h3 className="display text-3xl">Not this studio if</h3>
              <ul className="mt-8 space-y-5">
                {fit.not.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-border" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
