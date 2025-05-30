import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const path = searchParams.get("path");
  const giteePath = `https://gitee.com/api/v5/repos/ycfcando/note/contents${path}.mdx?access_token=70a49d283e2271218bde3027fb8eb18c`;

  try {
    const res = await fetch(giteePath);
    const data = await res.json();

    return NextResponse.json({
      success: true,
      data: data,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
