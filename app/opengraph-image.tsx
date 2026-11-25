import { ImageResponse } from "next/og"
import { site } from "@/lib/site"

export const alt = `${site.name} — ${site.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  const lines = site.tagline.split(/(?<=\.)\s+/)

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#143026",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 10,
              background: "#157a3e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 16 16">
              <path
                fill="#ffffff"
                fillRule="evenodd"
                d="M0.8 0.8h6c4.6 0 7.8 2.9 7.8 7.2s-3.2 7.2-7.8 7.2h-6V0.8zM7.6 4.15 10.9 8 7.6 11.85 4.3 8 7.6 4.15z"
              />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div
              style={{
                fontSize: 28,
                letterSpacing: 6,
                fontWeight: 600,
              }}
            >
              DIXSA
            </div>
            <div
              style={{
                fontSize: 16,
                letterSpacing: 8,
                fontWeight: 600,
                color: "#157a3e",
              }}
            >
              LABS
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 84,
              lineHeight: 0.88,
              letterSpacing: -2,
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            {lines.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
          <div style={{ fontSize: 28, color: "#3f6b52", maxWidth: 820 }}>
            {site.description}
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
