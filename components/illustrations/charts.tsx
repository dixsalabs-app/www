export type Slice = {
  label: string
  value: number
  color: string
}

/** Example mix for a first website. Not a measured result. */
export const exampleMix: Slice[] = [
  { label: "Site or app", value: 46, color: "#157a3e" },
  { label: "Content", value: 18, color: "#c47a1a" },
  { label: "SEO and AI SEO", value: 22, color: "#143026" },
  { label: "Google Marketplace", value: 14, color: "#9a4630" },
]

function polar(cx: number, cy: number, r: number, angle: number) {
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  }
}

export function PieChart({
  slices,
  size = 220,
  label = "Example project mix",
}: {
  slices: readonly Slice[]
  size?: number
  label?: string
}) {
  const total = slices.reduce((sum, slice) => sum + slice.value, 0)
  const cx = size / 2
  const cy = size / 2
  const r = size * 0.4
  const gap = 0.035
  const paths = slices
    .reduce<{ angle: number; items: { label: string; color: string; d: string }[] }>(
      (state, slice) => {
        const sweep = (slice.value / total) * Math.PI * 2
        const start = state.angle + gap / 2
        const end = state.angle + sweep - gap / 2
        const a = polar(cx, cy, r, start)
        const b = polar(cx, cy, r, end)
        const large = end - start > Math.PI ? 1 : 0
        return {
          angle: state.angle + sweep,
          items: [
            ...state.items,
            {
              label: slice.label,
              color: slice.color,
              d: `M ${cx} ${cy} L ${a.x} ${a.y} A ${r} ${r} 0 ${large} 1 ${b.x} ${b.y} Z`,
            },
          ],
        }
      },
      { angle: -Math.PI / 2, items: [] },
    )
    .items

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={label}
      className="h-auto w-full"
    >
      <circle cx={cx} cy={cy} r={r + 10} fill="#e8f5ee" />
      {paths.map((slice) => (
        <path key={slice.label} d={slice.d} fill={slice.color} />
      ))}
      <circle cx={cx} cy={cy} r={r * 0.46} fill="#ffffff" />
      <text
        x={cx}
        y={cy - 4}
        textAnchor="middle"
        fill="#143026"
        fontSize={size * 0.11}
        fontFamily="Georgia, serif"
      >
        100
      </text>
      <text
        x={cx}
        y={cy + size * 0.07}
        textAnchor="middle"
        fill="#3f6b52"
        fontSize={size * 0.045}
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        example
      </text>
    </svg>
  )
}

export function MixBars({ slices }: { slices: readonly Slice[] }) {
  return (
    <ul className="space-y-4">
      {slices.map((slice) => (
        <li key={slice.label}>
          <div className="flex items-baseline justify-between gap-4 text-sm">
            <span>{slice.label}</span>
            <span className="font-mono text-xs text-muted-foreground">
              {slice.value}%
            </span>
          </div>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full"
              style={{ width: `${slice.value}%`, backgroundColor: slice.color }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}
