import { NextRequest, NextResponse } from "next/server"

export default function proxy(request: NextRequest) {
  const host = request.headers.get("host") || ""

  if (host.startsWith("localhost")) {
    return NextResponse.next()
  }

  const secret = request.headers.get("x-vercel-secret")
  if (secret !== process.env.CF_ORIGIN_SECRET) {
    return new NextResponse("Forbidden", { status: 403 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
}
