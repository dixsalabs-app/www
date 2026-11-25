/**
 * The studio works in Odisha. A visitor’s city is used only when
 * the page was opened inside the state. Anywhere else stays “Odisha”.
 */

const REGION = /odisha|orissa/i

const aliases: Record<string, string> = {
  bhubaneshwar: "Bhubaneswar",
  bhubaneswar: "Bhubaneswar",
  cuttack: "Cuttack",
  puri: "Puri",
  rourkela: "Rourkela",
  sambalpur: "Sambalpur",
  berhampur: "Berhampur",
  brahmapur: "Berhampur",
  balasore: "Balasore",
  baleshwar: "Balasore",
  baleswar: "Balasore",
  bhadrak: "Bhadrak",
  baripada: "Baripada",
  jharsuguda: "Jharsuguda",
  angul: "Angul",
  kendrapara: "Kendrapara",
  jajpur: "Jajpur",
  paradip: "Paradip",
  paradeep: "Paradip",
  dhenkanal: "Dhenkanal",
  koraput: "Koraput",
  rayagada: "Rayagada",
  sundargarh: "Sundargarh",
  keonjhar: "Keonjhar",
  kendujhar: "Keonjhar",
  bargarh: "Bargarh",
  balangir: "Balangir",
  bolangir: "Balangir",
  nayagarh: "Nayagarh",
  khordha: "Khordha",
  khurda: "Khordha",
  konark: "Konark",
  jeypore: "Jeypore",
  bhawanipatna: "Bhawanipatna",
  talcher: "Talcher",
  barbil: "Barbil",
  jagatsinghpur: "Jagatsinghpur",
  phulbani: "Phulbani",
}

const odiaName: Record<string, string> = {
  Odisha: "ଓଡ଼ିଶା",
  Bhubaneswar: "ଭୁବନେଶ୍ୱର",
  Cuttack: "କଟକ",
  Puri: "ପୁରୀ",
  Rourkela: "ରାଉରକେଲା",
  Sambalpur: "ସମ୍ବଲପୁର",
  Berhampur: "ବ୍ରହ୍ମପୁର",
  Balasore: "ବାଲେଶ୍ୱର",
  Bhadrak: "ଭଦ୍ରକ",
  Baripada: "ବାରିପଦା",
  Paradip: "ପାରାଦୀପ",
  Khordha: "ଖୋର୍ଦ୍ଧା",
  Konark: "କୋଣାର୍କ",
}

export type RegionalCopy = {
  place: string
  eyebrow: string
  odia: string
  opened: string
}

export function canonicalCity(city: string) {
  const key = city.trim().toLowerCase()
  return aliases[key] ?? ""
}

export function placeFromGeo(input: {
  city?: string | null
  region?: string | null
  regionCode?: string | null
}) {
  const region = input.region ?? ""
  const code = (input.regionCode ?? "").toUpperCase()
  const inOdisha =
    REGION.test(region) ||
    code === "OR" ||
    code === "OD" ||
    code === "IN-OR" ||
    code === "IN-OD"
  const city = canonicalCity(input.city ?? "")
  const regionKnown = Boolean(region || code)
  if (city && inOdisha) return city
  if (city && !regionKnown) return city
  return "Odisha"
}

export function regionalCopy(place: string): RegionalCopy {
  const shown = place === "Odisha" ? "Odisha" : canonicalCity(place) || "Odisha"
  const odia = odiaName[shown]
  return {
    place: shown,
    eyebrow:
      shown === "Odisha"
        ? "For shops and companies in Odisha"
        : `For shops and companies in ${shown}`,
    odia: odia
      ? shown === "Odisha"
        ? "ଓଡ଼ିଶାର ଦୋକାନ ଓ ବଢ଼ୁଥିବା କମ୍ପାନୀମାନଙ୍କ ପାଇଁ"
        : `${odia}ର ଦୋକାନ ଓ କମ୍ପାନୀମାନଙ୍କ ପାଇଁ`
      : "ଓଡ଼ିଶାର ଦୋକାନ ଓ ବଢ଼ୁଥିବା କମ୍ପାନୀମାନଙ୍କ ପାଇଁ",
    opened: shown === "Odisha" ? "Opened in Odisha" : `Opened in ${shown}`,
  }
}

export const defaultRegion = regionalCopy("Odisha")
