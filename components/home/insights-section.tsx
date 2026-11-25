import Link from "next/link"
import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"
import { TextLink } from "@/components/shared/text-link"
import { insights } from "@/lib/insights"

export function InsightsSection() {
  const posts = insights.slice(0, 2)

  return (
    <section>
      <Container className="py-20 md:py-28">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Insights</p>
              <h2 className="display mt-4 text-[clamp(3rem,6vw,5.5rem)]">
                Read this
                <br />
                before you spend.
              </h2>
            </div>
            <TextLink href="/insights">All insights</TextLink>
          </div>
        </Reveal>
        <div className="mt-12 border-t border-border">
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-border">
              <Link
                href={`/insights/${post.slug}`}
                className="group grid gap-3 py-8 md:grid-cols-12 md:items-baseline md:py-10"
              >
                <p className="text-sm text-muted-foreground md:col-span-3">
                  {post.displayDate}
                  <span className="mx-2" aria-hidden>
                    ·
                  </span>
                  {post.readingTime}
                </p>
                <div className="md:col-span-9">
                  <h3 className="display text-[clamp(1.8rem,3vw,2.6rem)] transition-colors group-hover:text-brand">
                    {post.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-muted-foreground">{post.description}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
