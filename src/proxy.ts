import { NextRequest, NextResponse } from "next/server"

const ALLOWED_HOSTS = ["xiaomingswork.xin", "www.xiaomingswork.xin"]

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") || ""

  // 本地开发直接放行
  if (host.startsWith("localhost")) {
    return NextResponse.next()
  }

  // 生产环境：必须经过 Cloudflare（校验密钥头）
  const secret = request.headers.get("x-vercel-secret")
  if (secret !== process.env.CF_ORIGIN_SECRET) {
    return new NextResponse("Forbidden", { status: 403 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
}
