import { Container } from "@/components/layout/container"

export function RouteFallback() {
  return (
    <Container className="py-24" aria-busy="true" aria-live="polite">
      <p className="sr-only">Loading</p>
      <div className="h-3 w-24 bg-muted" />
      <div className="mt-6 h-16 max-w-xl bg-muted" />
      <div className="mt-4 h-4 max-w-lg bg-muted" />
    </Container>
  )
}
