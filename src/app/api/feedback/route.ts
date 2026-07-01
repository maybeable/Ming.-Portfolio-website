import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase/server";
import { verifyTurnstile } from "@/lib/turnstile";
import { checkRateLimit } from "@/lib/rate-limit";
import { checkBodySize, checkSameOrigin } from "@/lib/api-guards";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    const { data: items } = await supabase
      .from("feedback")
      .select()
      .order("is_pinned", { ascending: false })
      .order("pinned_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (!items) {
      return NextResponse.json({ featured: [], recent: [] });
    }

    const featured = items.filter((item) => item.featured);
    const recent = items.slice(0, limit);

    return NextResponse.json({ featured, recent });
  } catch {
    return NextResponse.json({ featured: [], recent: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!checkBodySize(request)) {
      return NextResponse.json({ error: "请求体过大。" }, { status: 413 })
    }
    if (!checkSameOrigin(request)) {
      return NextResponse.json({ error: "不允许的请求来源。" }, { status: 403 })
    }

    const body = await request.json();
    const content = String(body.content || "").trim();
    const name = body.name ? String(body.name).trim() : null;
    const turnstileToken = body.turnstileToken
      ? String(body.turnstileToken).trim()
      : null;
    const adminKey = request.cookies.get("admin_token")?.value || "";
    const isAuthor = !!(
      adminKey &&
      process.env.REPLY_SECRET &&
      adminKey === process.env.REPLY_SECRET
    );

    // Content validation
    if (!content || content.length < 2) {
      return NextResponse.json(
        { error: "内容太短了，至少写点什么吧。" },
        { status: 400 }
      );
    }

    if (content.length > 800) {
      return NextResponse.json(
        { error: "内容太长了，请控制在 800 字以内。" },
        { status: 400 }
      );
    }

    if (name && name.length > 30) {
      return NextResponse.json({ error: "名字太长了。" }, { status: 400 });
    }

    // Turnstile verification (skip for author)
    if (!isAuthor) {
      if (!turnstileToken) {
        return NextResponse.json(
          { error: "请完成人机验证。" },
          { status: 400 }
        );
      }

      const verified = await verifyTurnstile(turnstileToken);
      if (!verified) {
        return NextResponse.json(
          { error: "人机验证失败，请刷新后重试。" },
          { status: 403 }
        );
      }
    }

    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const { allowed, remaining } = checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { error: "发送太频繁了，请一分钟后再试。" },
        {
          status: 429,
          headers: { "Retry-After": "60" },
        }
      );
    }

    const { data: entry, error } = await supabase
      .from("feedback")
      .insert({ content, name, is_author: isAuthor })
      .select()
      .single();

    if (error || !entry) {
      return NextResponse.json(
        { error: "出了点问题，请稍后再试。" },
        { status: 500 }
      );
    }

    revalidatePath("/contact");
    revalidatePath("/thoughts");

    return NextResponse.json(
      { success: true, message: entry },
      { headers: { "X-RateLimit-Remaining": String(remaining) } }
    );
  } catch (err) {
    if (err instanceof SyntaxError) {
      return NextResponse.json(
        { error: "请求格式不正确。" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "出了点问题，请稍后再试。" },
      { status: 500 }
    );
  }
}
