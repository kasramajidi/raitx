import { NextRequest, NextResponse } from "next/server";
import { listConversations } from "@/lib/support-store";

const ADMIN_COOKIE_NAME = "admin_session";

function isAdmin(request: NextRequest): boolean {
  return request.cookies.get(ADMIN_COOKIE_NAME)?.value === "authenticated";
}

/** نرمال‌سازی شماره برای مقایسه: 09... / 98... → 98xxxxxxxxx */
function normalizePhone(phone: string | undefined | null): string {
  if (phone == null || typeof phone !== "string") return "";
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("98") && digits.length >= 12) return digits.slice(0, 12);
  if (digits.startsWith("0") && digits.length >= 11) return "98" + digits.slice(1, 11);
  if (digits.startsWith("9") && digits.length >= 10) return "98" + digits.slice(0, 10);
  return digits;
}

function toPayload(c: { id: string; clientId: string; userName?: string; userPhone?: string; createdAt: string; updatedAt: string; messages: { text: string; createdAt: string }[] }) {
  return {
    id: c.id,
    clientId: c.clientId,
    userName: c.userName,
    userPhone: c.userPhone,
    createdAt: c.createdAt,
    updatedAt: c.updatedAt,
    messageCount: c.messages.length,
    lastMessage:
      c.messages.length > 0
        ? {
            text: c.messages[c.messages.length - 1].text.slice(0, 60),
            createdAt: c.messages[c.messages.length - 1].createdAt,
          }
        : null,
  };
}

/** لیست مکالمات: ادمین = همه، کاربر عادی = فقط مکالمات خودش (با ارسال شماره) */
export async function GET(request: NextRequest) {
  const all = listConversations();

  if (isAdmin(request)) {
    return NextResponse.json(all.map(toPayload));
  }

  const userPhoneRaw =
    request.nextUrl.searchParams.get("phone") ??
    request.headers.get("x-user-phone") ??
    "";
  const userPhoneNorm = normalizePhone(userPhoneRaw);
  if (!userPhoneNorm) {
    return NextResponse.json([]);
  }

  const filtered = all.filter((c) => {
    if (!c.userPhone) return false;
    return normalizePhone(c.userPhone) === userPhoneNorm;
  });

  return NextResponse.json(filtered.map(toPayload));
}
