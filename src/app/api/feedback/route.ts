import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readFile, writeFile } from "fs/promises";
import path from "path";

interface Feedback {
  id: string;
  content: string;
  name: string | null;
  featured: boolean;
  createdAt: string;
}

function dataPath() {
  return path.join(process.cwd(), "data", "feedback.json");
}

async function readFeedback(): Promise<Feedback[]> {
  const raw = await readFile(dataPath(), "utf-8");
  return JSON.parse(raw);
}

function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export async function GET(request: NextRequest) {
  try {
    const items = await readFeedback();
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    const featured = items
      .filter((item) => item.featured)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

    const recent = items
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
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
      return NextResponse.json(
        { error: "名字太长了。" },
        { status: 400 },
      );
    }

    const items = await readFeedback();

    const entry: Feedback = {
      id: generateId(),
      content,
      name: name || null,
      featured: false,
      createdAt: new Date().toISOString(),
    };

    items.push(entry);
    await writeFile(dataPath(), JSON.stringify(items, null, 2) + "\n", "utf-8");

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
