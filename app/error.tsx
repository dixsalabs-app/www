"use client"

import { useEffect } from "react"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Container className="py-24 md:py-32">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="interior-title mt-4 max-w-xl text-balance">
        This page did not load.
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Try again. If it keeps happening, email us and we will take it from
        there.
      </p>
      <Button type="button" onClick={reset} className="mt-8 h-11 rounded-full px-5">
        Try again
      </Button>
    </Container>
  )
}
