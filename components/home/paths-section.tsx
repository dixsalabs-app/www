import Link from "next/link"
import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"
import { Photo } from "@/components/shared/photo"
import { startPaths } from "@/lib/site"

export function PathsSection() {
  return (
    <section className="border-t border-border">
      <Container className="py-20 md:py-28">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">Where to start</p>
            <h2 className="mt-3 font-serif text-[clamp(1.85rem,3vw,2.6rem)] leading-snug font-medium tracking-tight text-balance">
              Three kinds of work. Pick the one that matches the problem.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground">
              If customers cannot find you, start with the first. If the Monday haat order still lives in WhatsApp, start with the second. If the job is the table or a GST bill, start with the third.
            </p>
          </div>
        </Reveal>
        <ul className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-3">
          {startPaths.map((path, index) => (
            <li key={path.index}>
              <Reveal delay={index * 0.05}>
                <Link href={path.href} className="group block">
                  <Photo scene={path.scene} place={path.place} />
                  <p className="mt-4 font-mono text-xs text-brand-ink">{path.index}</p>
                  <h3 className="mt-2 font-serif text-2xl font-medium tracking-tight transition-colors duration-300 ease-studio group-hover:text-brand">
                    {path.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground">
                    {path.body}
                  </p>
                  <p className="mt-4 text-sm font-medium text-foreground underline decoration-border underline-offset-4 group-hover:decoration-brand">
                    {path.action}
                  </p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
