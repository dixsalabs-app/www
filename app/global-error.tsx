"use client"

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          background: "#ffffff",
          color: "#143026",
        }}
      >
        <main style={{ maxWidth: 640, margin: "0 auto", padding: "6rem 1.25rem" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 400 }}>
            The site hit an unexpected error.
          </h1>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "1.5rem",
              height: "2.75rem",
              padding: "0 1.25rem",
              background: "#157a3e",
              color: "#ffffff",
              border: 0,
              borderRadius: 999,
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  )
}
