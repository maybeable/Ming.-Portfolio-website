import { NextRequest, NextResponse } from "next/server"
import { verifyAdminRequest, AUTH_COOKIE_OPTIONS } from "@/lib/auth"
import { checkBodySize } from "@/lib/api-guards"

export async function POST(request: NextRequest) {
  try {
    if (!checkBodySize(request)) {
      return NextResponse.json({ error: "请求体过大。" }, { status: 413 })
    }
    const body = await request.json()
    const key = String(body.key || "").trim()

    if (!verifyAdminRequest(key)) {
      return NextResponse.json({ error: "密钥不正确。" }, { status: 401 })
    }

    const response = NextResponse.json({ success: true })
    response.cookies.set("admin_token", key, AUTH_COOKIE_OPTIONS)
    return response
  } catch {
    return NextResponse.json(
      { error: "请求格式不正确。" },
      { status: 400 }
    )
  }
}
