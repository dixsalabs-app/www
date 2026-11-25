import { cache } from "react"
import { connection } from "next/server"
import { headers } from "next/headers"
import { placeFromHeaders } from "@/lib/opened-place"

export const openedPlace = cache(async () => {
  await connection()
  return placeFromHeaders(await headers())
})
