import { cn } from "@/lib/utils"

export const serviceArtKinds = [
  "websites",
  "web-apps",
  "mobile-apps",
  "ai-automation",
  "content",
  "seo",
  "google-marketplace",
  "ai-seo",
] as const

export type ServiceArtKind = (typeof serviceArtKinds)[number]

function Stage({
  id,
  children,
}: {
  id: string
  children: React.ReactNode
}) {
  return (
    <svg
      viewBox="0 0 360 288"
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id={`${id}-wash`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f7fbf8" />
          <stop offset="100%" stopColor="#d7efe2" />
        </linearGradient>
      </defs>
      <rect width="360" height="288" fill={`url(#${id}-wash)`} />
      {children}
    </svg>
  )
}

function WebsiteArt() {
  return (
    <Stage id="site">
      <circle cx="312" cy="42" r="46" fill="#c47a1a" opacity="0.22" />
      <circle cx="28" cy="250" r="36" fill="#157a3e" opacity="0.14" />
      <g>
        <rect x="48" y="36" width="214" height="168" rx="16" fill="#ffffff" />
        <rect x="48" y="36" width="214" height="28" rx="16" fill="#143026" />
        <rect x="48" y="52" width="214" height="12" fill="#143026" />
        <circle cx="66" cy="50" r="4" fill="#9a4630" />
        <circle cx="80" cy="50" r="4" fill="#c47a1a" />
        <circle cx="94" cy="50" r="4" fill="#157a3e" />
        <rect x="64" y="78" width="120" height="14" rx="4" fill="#143026" />
        <rect x="64" y="100" width="88" height="8" rx="3" fill="#d5e6db" />
        <rect x="64" y="122" width="70" height="22" rx="11" fill="#157a3e" />
        <rect x="148" y="78" width="96" height="72" rx="10" fill="#e8f5ee" />
        <path d="M168 132 L184 112 L198 124 L220 100 L228 132 Z" fill="#157a3e" />
        <circle cx="176" cy="98" r="8" fill="#c47a1a" />
      </g>
      <g transform="translate(232 148)">
        <circle cx="46" cy="46" r="40" fill="#ffffff" />
        <path d="M46 46 L46 10 A36 36 0 0 1 78 62 Z" fill="#157a3e" />
        <path d="M46 46 L78 62 A36 36 0 0 1 28 74 Z" fill="#c47a1a" />
        <path d="M46 46 L28 74 A36 36 0 0 1 46 10 Z" fill="#143026" />
        <circle cx="46" cy="46" r="16" fill="#ffffff" />
      </g>
      <rect x="48" y="214" width="92" height="44" rx="12" fill="#ffffff" />
      <rect x="60" y="232" width="18" height="16" rx="3" fill="#d5e6db" />
      <rect x="82" y="224" width="18" height="24" rx="3" fill="#157a3e" />
      <rect x="104" y="228" width="18" height="20" rx="3" fill="#c47a1a" />
    </Stage>
  )
}

function WebAppArt() {
  return (
    <Stage id="app">
      <circle cx="40" cy="40" r="48" fill="#157a3e" opacity="0.12" />
      <rect x="36" y="32" width="288" height="220" rx="18" fill="#ffffff" />
      <rect x="36" y="32" width="72" height="220" rx="18" fill="#143026" />
      <rect x="96" y="32" width="12" height="220" fill="#143026" />
      <rect x="52" y="52" width="40" height="8" rx="3" fill="#157a3e" />
      <rect x="52" y="74" width="40" height="6" rx="3" fill="#ffffff" opacity="0.35" />
      <rect x="52" y="90" width="40" height="6" rx="3" fill="#ffffff" opacity="0.35" />
      <rect x="52" y="106" width="40" height="6" rx="3" fill="#ffffff" opacity="0.35" />
      <rect x="128" y="52" width="76" height="10" rx="3" fill="#143026" />
      <rect x="128" y="78" width="36" height="78" rx="6" fill="#d5e6db" />
      <rect x="172" y="102" width="36" height="54" rx="6" fill="#157a3e" />
      <rect x="216" y="64" width="36" height="92" rx="6" fill="#c47a1a" />
      <rect x="260" y="88" width="36" height="68" rx="6" fill="#143026" />
      <circle cx="250" cy="196" r="28" fill="#e8f5ee" />
      <path d="M250 196 L250 172 A24 24 0 0 1 272 206 Z" fill="#157a3e" />
      <path d="M250 196 L272 206 A24 24 0 1 1 250 172 Z" fill="#9a4630" />
      <circle cx="250" cy="196" r="10" fill="#ffffff" />
    </Stage>
  )
}

function MobileArt() {
  return (
    <Stage id="phone">
      <circle cx="300" cy="230" r="70" fill="#c47a1a" opacity="0.16" />
      <rect x="118" y="24" width="124" height="240" rx="28" fill="#143026" />
      <rect x="128" y="40" width="104" height="208" rx="16" fill="#f7fbf8" />
      <rect x="158" y="32" width="44" height="6" rx="3" fill="#3f6b52" />
      <rect x="140" y="58" width="80" height="36" rx="10" fill="#157a3e" />
      <rect x="140" y="106" width="80" height="22" rx="8" fill="#ffffff" stroke="#d5e6db" />
      <rect x="140" y="136" width="80" height="22" rx="8" fill="#ffffff" stroke="#d5e6db" />
      <rect x="140" y="166" width="80" height="22" rx="8" fill="#ffffff" stroke="#d5e6db" />
      <circle cx="154" cy="117" r="5" fill="#157a3e" />
      <circle cx="154" cy="147" r="5" fill="#c47a1a" />
      <circle cx="154" cy="177" r="5" fill="#9a4630" />
      <g transform="translate(36 168)">
        <circle cx="36" cy="36" r="32" fill="#ffffff" />
        <path d="M36 36 L36 8 A28 28 0 0 1 62 46 Z" fill="#157a3e" />
        <path d="M36 36 L62 46 A28 28 0 0 1 22 54 Z" fill="#c47a1a" />
        <path d="M36 36 L22 54 A28 28 0 0 1 36 8 Z" fill="#143026" />
      </g>
    </Stage>
  )
}

function AutomationArt() {
  return (
    <Stage id="ai">
      <circle cx="300" cy="48" r="40" fill="#9a4630" opacity="0.16" />
      <rect x="36" y="78" width="96" height="72" rx="14" fill="#ffffff" />
      <rect x="50" y="96" width="56" height="6" rx="3" fill="#d5e6db" />
      <rect x="50" y="110" width="40" height="6" rx="3" fill="#d5e6db" />
      <rect x="50" y="124" width="48" height="6" rx="3" fill="#157a3e" />
      <path d="M132 114 H168" stroke="#157a3e" strokeWidth="3" />
      <circle cx="196" cy="114" r="28" fill="#157a3e" />
      <path d="M186 114 h20 M196 104 v20" stroke="#ffffff" strokeWidth="3" />
      <path d="M224 114 H260" stroke="#c47a1a" strokeWidth="3" />
      <rect x="260" y="78" width="68" height="72" rx="14" fill="#ffffff" />
      <path d="M278 114 l8 8 16-18" fill="none" stroke="#157a3e" strokeWidth="3" />
      <rect x="86" y="176" width="188" height="70" rx="16" fill="#143026" />
      <rect x="104" y="196" width="70" height="8" rx="3" fill="#ffffff" opacity="0.85" />
      <rect x="104" y="214" width="110" height="6" rx="3" fill="#ffffff" opacity="0.35" />
      <rect x="230" y="194" width="28" height="28" rx="8" fill="#c47a1a" />
    </Stage>
  )
}

function ContentArt() {
  return (
    <Stage id="content">
      <circle cx="48" cy="48" r="36" fill="#c47a1a" opacity="0.2" />
      <rect x="78" y="56" width="150" height="176" rx="12" fill="#ffffff" opacity="0.55" transform="rotate(-8 153 144)" />
      <rect x="108" y="40" width="168" height="196" rx="14" fill="#ffffff" />
      <rect x="124" y="58" width="136" height="78" rx="10" fill="#e8f5ee" />
      <path d="M146 118 L168 92 L186 108 L214 78 L236 118 Z" fill="#157a3e" />
      <circle cx="160" cy="82" r="8" fill="#c47a1a" />
      <rect x="124" y="150" width="120" height="8" rx="3" fill="#143026" />
      <rect x="124" y="168" width="96" height="6" rx="3" fill="#d5e6db" />
      <rect x="124" y="182" width="108" height="6" rx="3" fill="#d5e6db" />
      <rect x="124" y="204" width="64" height="16" rx="8" fill="#157a3e" />
      <g transform="translate(40 150)">
        <rect width="58" height="86" rx="8" fill="#143026" />
        <rect x="8" y="12" width="42" height="4" rx="2" fill="#ffffff" opacity="0.3" />
        <rect x="8" y="24" width="42" height="28" rx="4" fill="#9a4630" />
        <rect x="8" y="58" width="28" height="4" rx="2" fill="#c47a1a" />
      </g>
    </Stage>
  )
}

function SeoArt() {
  return (
    <Stage id="seo">
      <circle cx="300" cy="220" r="64" fill="#157a3e" opacity="0.1" />
      <rect x="40" y="48" width="200" height="40" rx="20" fill="#ffffff" />
      <circle cx="64" cy="68" r="8" fill="none" stroke="#157a3e" strokeWidth="3" />
      <path d="M70 74 l8 8" stroke="#157a3e" strokeWidth="3" />
      <rect x="88" y="62" width="120" height="8" rx="3" fill="#d5e6db" />
      <rect x="40" y="104" width="200" height="52" rx="12" fill="#157a3e" />
      <rect x="56" y="118" width="120" height="8" rx="3" fill="#ffffff" />
      <rect x="56" y="134" width="88" height="6" rx="3" fill="#ffffff" opacity="0.55" />
      <rect x="40" y="166" width="200" height="44" rx="12" fill="#ffffff" />
      <rect x="56" y="180" width="100" height="6" rx="3" fill="#d5e6db" />
      <rect x="56" y="192" width="70" height="6" rx="3" fill="#d5e6db" />
      <polyline
        points="268,200 292,168 314,180 340,120 360,132"
        fill="none"
        stroke="#c47a1a"
        strokeWidth="4"
      />
      <circle cx="268" cy="200" r="5" fill="#143026" />
      <circle cx="314" cy="180" r="5" fill="#143026" />
      <circle cx="340" cy="120" r="6" fill="#157a3e" />
      <path d="M250 210 H348" stroke="#d5e6db" strokeWidth="2" />
    </Stage>
  )
}

function MarketplaceArt() {
  return (
    <Stage id="market">
      <circle cx="70" cy="210" r="54" fill="#c47a1a" opacity="0.15" />
      <rect x="36" y="36" width="180" height="160" rx="18" fill="#d7efe2" />
      <path d="M50 150 C80 120 90 90 120 100 C150 70 190 90 196 130 C170 160 80 180 50 150 Z" fill="#157a3e" opacity="0.35" />
      <path d="M126 78 c0 28 18 40 18 40 s18-12 18-40 a18 18 0 0 0-36 0z" fill="#9a4630" />
      <circle cx="144" cy="76" r="6" fill="#ffffff" />
      <rect x="200" y="56" width="128" height="168" rx="16" fill="#ffffff" />
      <rect x="214" y="72" width="100" height="64" rx="10" fill="#e8f5ee" />
      <path d="M230 120 h68 v8 h-68z" fill="#157a3e" />
      <rect x="246" y="88" width="36" height="28" fill="#c47a1a" />
      <rect x="214" y="148" width="88" height="8" rx="3" fill="#143026" />
      <rect x="214" y="164" width="60" height="6" rx="3" fill="#d5e6db" />
      <g fill="#c47a1a">
        <polygon points="222,178 224,184 230,184 225,188 227,194 222,190 217,194 219,188 214,184 220,184" />
        <polygon points="240,178 242,184 248,184 243,188 245,194 240,190 235,194 237,188 232,184 238,184" />
        <polygon points="258,178 260,184 266,184 261,188 263,194 258,190 253,194 255,188 250,184 256,184" />
      </g>
      <rect x="214" y="202" width="72" height="14" rx="7" fill="#157a3e" />
    </Stage>
  )
}

function AiSeoArt() {
  return (
    <Stage id="aiseo">
      <circle cx="300" cy="56" r="44" fill="#157a3e" opacity="0.12" />
      <rect x="36" y="48" width="168" height="150" rx="16" fill="#ffffff" />
      <rect x="52" y="66" width="90" height="10" rx="3" fill="#143026" />
      <rect x="52" y="86" width="120" height="6" rx="3" fill="#d5e6db" />
      <rect x="52" y="100" width="104" height="6" rx="3" fill="#d5e6db" />
      <rect x="52" y="114" width="112" height="6" rx="3" fill="#d5e6db" />
      <rect x="52" y="140" width="28" height="36" rx="6" fill="#e8f5ee" />
      <rect x="88" y="148" width="90" height="6" rx="3" fill="#157a3e" />
      <rect x="88" y="160" width="70" height="6" rx="3" fill="#d5e6db" />
      <path d="M188 150 h36 l18 16 v46 a16 16 0 0 1-16 16 H170 a16 16 0 0 1-16-16 v-28 z" fill="#143026" />
      <rect x="176" y="186" width="70" height="6" rx="3" fill="#ffffff" opacity="0.8" />
      <rect x="176" y="200" width="48" height="6" rx="3" fill="#c47a1a" />
      <g transform="translate(250 150)">
        <circle cx="40" cy="40" r="36" fill="#ffffff" />
        <path d="M40 40 L40 8 A32 32 0 1 1 12 52 Z" fill="#157a3e" />
        <path d="M40 40 L12 52 A32 32 0 0 1 40 8 Z" fill="#c47a1a" />
        <circle cx="40" cy="40" r="14" fill="#ffffff" />
      </g>
    </Stage>
  )
}

const arts: Record<ServiceArtKind, () => React.ReactElement> = {
  websites: WebsiteArt,
  "web-apps": WebAppArt,
  "mobile-apps": MobileArt,
  "ai-automation": AutomationArt,
  content: ContentArt,
  seo: SeoArt,
  "google-marketplace": MarketplaceArt,
  "ai-seo": AiSeoArt,
}

export function ServiceArt({
  kind,
  wide = false,
  className,
}: {
  kind: ServiceArtKind
  wide?: boolean
  className?: string
}) {
  const Art = arts[kind]
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[#e7f3ec]",
        wide ? "aspect-[2/1] w-full" : "aspect-[5/4]",
        className,
      )}
    >
      <Art />
    </div>
  )
}

export function isServiceArtKind(value: string): value is ServiceArtKind {
  return (serviceArtKinds as readonly string[]).includes(value)
}
