const store = new Map<string, { count: number; resetAt: number }>()

const WINDOW_MS = 60_000
const MAX_REQUESTS = 5

function lazyCleanup(now: number) {
  for (const [key, entry] of store) {
    if (now > entry.resetAt) {
      store.delete(key)
    }
  }
}

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  lazyCleanup(now)

  const entry = store.get(ip)

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true, remaining: MAX_REQUESTS - 1 }
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 }
  }

  entry.count++
  return { allowed: true, remaining: MAX_REQUESTS - entry.count }
}
