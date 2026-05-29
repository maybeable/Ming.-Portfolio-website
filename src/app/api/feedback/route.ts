import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    const { data: items } = await supabase
      .from("feedback")
      .select()
      .order("created_at", { ascending: false });

    if (!items) {
      return NextResponse.json({ featured: [], recent: [] });
    }

    const featured = items
      .filter((item) => item.featured)
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );

    const recent = items
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
      .slice(0, limit);

    return NextResponse.json({ featured, recent });
  } catch {
    return NextResponse.json({ featured: [], recent: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const content = String(body.content || "").trim();
    const name = body.name ? String(body.name).trim() : null;

    if (!content || content.length < 2) {
      return NextResponse.json(
        { error: "内容太短了，至少写点什么吧。" },
        { status: 400 },
      );
    }

    if (content.length > 800) {
      return NextResponse.json(
        { error: "内容太长了，请控制在 800 字以内。" },
        { status: 400 },
      );
    }

    if (name && name.length > 30) {
      return NextResponse.json({ error: "名字太长了。" }, { status: 400 });
    }

    const { data: entry, error } = await supabase
      .from("feedback")
      .insert({ content, name })
      .select()
      .single();

    if (error || !entry) {
      return NextResponse.json(
        { error: "出了点问题，请稍后再试。" },
        { status: 500 },
      );
    }

    revalidatePath("/contact");
    revalidatePath("/thoughts");

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
