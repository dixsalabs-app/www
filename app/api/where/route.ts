import { connection } from "next/server"
import { placeFromHeaders } from "@/lib/opened-place"

export async function GET(request: Request) {
  await connection()
  const place = await placeFromHeaders(request.headers)
  return Response.json(
    { place },
    { headers: { "Cache-Control": "private, no-store" } },
  )
}
