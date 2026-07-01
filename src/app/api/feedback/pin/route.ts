import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/server";
import { checkBodySize } from "@/lib/api-guards";

function unauthorized() {
  return NextResponse.json({ error: "密钥不正确。" }, { status: 401 });
}

function verifyKey(request: NextRequest): boolean {
  const key = request.cookies.get("admin_token")?.value || ""
  const expectedKey = process.env.REPLY_SECRET
  if (!expectedKey) return false
  return key === expectedKey
}

export async function POST(request: NextRequest) {
  try {
    if (!checkBodySize(request)) {
      return NextResponse.json({ error: "请求体过大。" }, { status: 413 })
    }
    const body = await request.json();
    const id = String(body.id || "").trim();
    const action = String(body.action || "").trim();

    if (!id) {
      return NextResponse.json({ error: "缺少留言 ID。" }, { status: 400 });
    }

    if (action !== "pin" && action !== "unpin") {
      return NextResponse.json({ error: "无效的操作。" }, { status: 400 });
    }

    if (!verifyKey(request)) return unauthorized();

    if (action === "pin") {
      const { error } = await supabaseAdmin
        .from("feedback")
        .update({ is_pinned: true, pinned_at: new Date().toISOString() })
        .eq("id", id);

      if (error) {
        return NextResponse.json(
          { error: "置顶失败，请稍后再试。" },
          { status: 500 },
        );
      }
    } else {
      const { error } = await supabaseAdmin
        .from("feedback")
        .update({ is_pinned: false, pinned_at: null })
        .eq("id", id);

      if (error) {
        return NextResponse.json(
          { error: "取消置顶失败，请稍后再试。" },
          { status: 500 },
        );
      }
    }

    revalidatePath("/thoughts");
    revalidatePath("/contact");

    return NextResponse.json({
      success: true,
      message: action === "pin" ? "已置顶。" : "已取消置顶。",
    });
  } catch (err) {
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: "请求格式不正确。" }, { status: 400 });
    }
    return NextResponse.json(
      { error: "出了点问题，请稍后再试。" },
      { status: 500 },
    );
  }
}
