import { NextRequest } from "next/server"

const MAX_BODY_SIZE = 10_000 // 10KB

export function checkBodySize(request: NextRequest): boolean {
  const contentLength = request.headers.get("content-length")
  if (contentLength && parseInt(contentLength, 10) > MAX_BODY_SIZE) {
    return false
  }
  return true
}

export function checkSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin")
  if (!origin) return true // server-to-server
  const url = new URL(request.url)
  return origin === `${url.protocol}//${url.host}`
}
