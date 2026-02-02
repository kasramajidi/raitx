import { NextResponse } from "next/server";

const EXTERNAL_API = "https://mrpremiumhub.org/api.ashx";

/**
 * پروکسی درخواست‌های احراز هویت به mrpremiumhub.org از سمت سرور
 * تا خطای CORS و ERR_NETWORK_CHANGED در مرورگر رفع شود.
 */

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    if (!queryString) {
      return NextResponse.json(
        { error: "پارامتر action لازم است" },
        { status: 400 }
      );
    }
    const url = `${EXTERNAL_API}?${queryString}`;
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: "خطا در ارتباط با سرور احراز هویت" },
      { status: 502 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");
    if (!action) {
      return NextResponse.json(
        { error: "پارامتر action لازم است" },
        { status: 400 }
      );
    }
    const body = await request.json().catch(() => ({}));
    const res = await fetch(
      `${EXTERNAL_API}?action=${encodeURIComponent(action)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: "خطا در ارتباط با سرور احراز هویت" },
      { status: 502 }
    );
  }
}
