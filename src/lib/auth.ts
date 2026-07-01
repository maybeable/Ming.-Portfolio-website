import { cookies } from "next/headers"

const COOKIE_NAME = "admin_token"

export async function getAdminKey(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get(COOKIE_NAME)?.value ?? null
}

export async function isAdmin(): Promise<boolean> {
  const key = await getAdminKey()
  if (!key || !process.env.REPLY_SECRET) return false
  return key === process.env.REPLY_SECRET
}

export function verifyAdminRequest(key: string): boolean {
  if (!process.env.REPLY_SECRET) return false
  return key === process.env.REPLY_SECRET
}

export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "strict" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 30, // 30 days
}
