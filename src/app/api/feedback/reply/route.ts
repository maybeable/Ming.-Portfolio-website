import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/server";
import { checkBodySize } from "@/lib/api-guards";

export async function POST(request: NextRequest) {
  try {
    if (!checkBodySize(request)) {
      return NextResponse.json({ error: "请求体过大。" }, { status: 413 })
    }
    const body = await request.json();
    const id = String(body.id || "").trim();
    const reply = String(body.reply || "").trim();

    if (!id) {
      return NextResponse.json({ error: "缺少留言 ID。" }, { status: 400 });
    }

    if (!reply || reply.length < 1) {
      return NextResponse.json({ error: "回复内容不能为空。" }, { status: 400 });
    }

    if (reply.length > 500) {
      return NextResponse.json(
        { error: "回复内容请控制在 500 字以内。" },
        { status: 400 },
      );
    }

    const expectedKey = process.env.REPLY_SECRET;
    if (!expectedKey) {
      return NextResponse.json(
        { error: "服务未配置回复密钥。" },
        { status: 500 },
      );
    }

    const key = request.cookies.get("admin_token")?.value || "";
    if (key !== expectedKey) {
      return NextResponse.json({ error: "密钥不正确。" }, { status: 401 });
    }

    const { data: entry, error } = await supabaseAdmin
      .from("feedback_replies")
      .insert({
        feedback_id: id,
        content: reply,
        is_author: true,
      })
      .select()
      .single();

    if (error || !entry) {
      return NextResponse.json(
        { error: "更新失败，请稍后再试。" },
        { status: 500 },
      );
    }

    revalidatePath("/thoughts");
    revalidatePath("/contact");

    return NextResponse.json({ success: true, message: entry });
  } catch (err) {
    if (err instanceof SyntaxError) {
      return NextResponse.json(
        { error: "请求格式不正确。" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "出了点问题，请稍后再试。" },
      { status: 500 },
    );
  }
}
