import { Container } from "@/components/layout/container"
import { PrimaryLink, SecondaryLink } from "@/components/shared/cta-link"

export default function NotFound() {
  return (
    <Container className="py-24 md:py-32">
      <p className="eyebrow">404</p>
      <h1 className="interior-title mt-4 max-w-xl text-balance">
        That page is not on this site.
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The link may be out of date. The work, the services, and a way to start
        a project are still here.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <PrimaryLink href="/">Back to the studio</PrimaryLink>
        <SecondaryLink href="/contact">Start a project</SecondaryLink>
      </div>
    </Container>
  )
}
