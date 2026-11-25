import { placeFromGeo } from "@/lib/region"

type HeaderBag = { get(name: string): string | null }

function headerCity(headers: HeaderBag) {
  const city = headers.get("x-vercel-ip-city") ?? headers.get("cf-ipcity")
  if (!city) return ""
  try {
    return decodeURIComponent(city)
  } catch {
    return city
  }
}

function visitorIp(headers: HeaderBag) {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? ""
  const normalized = forwarded.toLowerCase().replace(/^::ffff:/, "")
  if (
    !normalized ||
    normalized === "127.0.0.1" ||
    normalized === "::1" ||
    normalized.startsWith("10.") ||
    normalized.startsWith("192.168.") ||
    normalized.startsWith("169.254.") ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(normalized)
  ) {
    return ""
  }
  return forwarded
}

async function placeFromIp(headers: HeaderBag) {
  const ip = visitorIp(headers)
  const url = ip ? `https://ipwho.is/${encodeURIComponent(ip)}` : "https://ipwho.is/"
  const response = await fetch(url, { cache: "no-store" })
  if (!response.ok) return "Odisha"
  const data = (await response.json()) as {
    success?: boolean
    city?: string
    region?: string
    region_code?: string
  }
  if (data.success === false) return "Odisha"
  return placeFromGeo({
    city: data.city,
    region: data.region,
    regionCode: data.region_code,
  })
}

/** City inside Odisha where this request opened the site. Anywhere else stays Odisha. */
export async function placeFromHeaders(headers: HeaderBag) {
  const hinted = headerCity(headers)
  const fromHeaders = placeFromGeo({
    city: hinted,
    region: headers.get("cf-region") ?? headers.get("x-vercel-ip-country-region"),
    regionCode:
      headers.get("cf-region-code") ?? headers.get("x-vercel-ip-country-region"),
  })
  if (fromHeaders !== "Odisha" || hinted) return fromHeaders
  try {
    return await placeFromIp(headers)
  } catch {
    return "Odisha"
  }
}
