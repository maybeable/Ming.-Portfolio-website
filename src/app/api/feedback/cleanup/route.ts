import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

// POST — 自动清理已删除超过 30 天的留言
// 可通过 Vercel Cron Jobs 或外部定时任务调用
export async function POST(request: NextRequest) {
  try {
    const expectedKey = process.env.REPLY_SECRET;
    if (!expectedKey) {
      return NextResponse.json(
        { error: "服务未配置密钥。" },
        { status: 500 },
      );
    }

    let key = "";
    const authHeader = request.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      key = authHeader.slice(7);
    } else {
      key = request.cookies.get("admin_token")?.value || "";
    }

    if (key !== expectedKey) {
      return NextResponse.json({ error: "密钥不正确。" }, { status: 401 });
    }

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 30);

    const { data, error } = await supabaseAdmin
      .from("feedback")
      .delete()
      .eq("deleted", true)
      .lt("deleted_at", cutoff.toISOString())
      .select("id");

    if (error) {
      return NextResponse.json(
        { error: "清理失败，请稍后再试。" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      deleted: data?.length || 0,
      message: `已清理 ${data?.length || 0} 条过期留言。`,
    });
  } catch {
    return NextResponse.json(
      { error: "出了点问题，请稍后再试。" },
      { status: 500 },
    );
  }
}
