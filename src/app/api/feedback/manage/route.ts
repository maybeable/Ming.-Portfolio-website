import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase/server";

function unauthorized() {
  return NextResponse.json({ error: "密钥不正确。" }, { status: 401 });
}

function verifyKey(key: string) {
  const expectedKey = process.env.REPLY_SECRET;
  if (!expectedKey) return false;
  return key === expectedKey;
}

// PATCH — 软删除或恢复
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const id = String(body.id || "").trim();
    const action = String(body.action || "").trim();
    const key = String(body.key || "").trim();

    if (!id) {
      return NextResponse.json({ error: "缺少留言 ID。" }, { status: 400 });
    }

    if (action !== "delete" && action !== "restore") {
      return NextResponse.json({ error: "无效的操作。" }, { status: 400 });
    }

    if (!verifyKey(key)) return unauthorized();

    if (action === "delete") {
      const { error } = await supabase
        .from("feedback")
        .update({ deleted: true, deleted_at: new Date().toISOString() })
        .eq("id", id);

      if (error) {
        return NextResponse.json(
          { error: "删除失败，请稍后再试。" },
          { status: 500 },
        );
      }
    } else {
      const { error } = await supabase
        .from("feedback")
        .update({ deleted: false, deleted_at: null })
        .eq("id", id);

      if (error) {
        return NextResponse.json(
          { error: "恢复失败，请稍后再试。" },
          { status: 500 },
        );
      }
    }

    revalidatePath("/thoughts");
    revalidatePath("/contact");

    return NextResponse.json({
      success: true,
      message: action === "delete" ? "留言已从前台隐藏。" : "留言已恢复。",
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

// DELETE — 永久删除
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const id = String(body.id || "").trim();
    const key = String(body.key || "").trim();

    if (!id) {
      return NextResponse.json({ error: "缺少留言 ID。" }, { status: 400 });
    }

    if (!verifyKey(key)) return unauthorized();

    const { error } = await supabase.from("feedback").delete().eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: "永久删除失败，请稍后再试。" },
        { status: 500 },
      );
    }

    revalidatePath("/thoughts");
    revalidatePath("/contact");

    return NextResponse.json({ success: true, message: "留言已永久删除。" });
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
