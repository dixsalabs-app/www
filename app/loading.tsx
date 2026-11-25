import { Container } from "@/components/layout/container"

export default function Loading() {
  return (
    <Container className="py-24" aria-busy="true" aria-live="polite">
      <p className="sr-only">Loading</p>
      <div className="h-3 w-24 rounded bg-muted" />
      <div className="mt-6 h-14 w-full max-w-xl rounded bg-muted" />
      <div className="mt-4 h-4 w-full max-w-lg rounded bg-muted" />
    </Container>
  )
}
