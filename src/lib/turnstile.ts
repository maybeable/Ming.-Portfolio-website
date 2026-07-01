interface TurnstileResponse {
  success: boolean
  "error-codes": string[]
  challenge_ts?: string
  hostname?: string
}

export async function verifyTurnstile(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY

  if (!secretKey) {
    console.error("TURNSTILE_SECRET_KEY is not set — rejecting all verification")
    return false
  }

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: secretKey, response: token }),
    }
  )

  const data: TurnstileResponse = await res.json()
  return data.success
}
