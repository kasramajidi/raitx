/**
 * API داده‌های حساب کاربری — با ارسال کوکی برای داده‌های کاربر لاگین‌شده
 */

const PROXY = "/api/auth-proxy";
const fetchOpts: RequestInit = { credentials: "include", cache: "no-store" };

/** کلید localStorage برای شمارهٔ ورود (همان که کد اس‌ام‌اس براش فرستاده شده) */
export const LOGIN_PHONE_KEY = "loginPhone";

export interface UserProfile {
  name?: string;
  username?: string;
  phone?: string;
  email?: string;
}

/** پاسخ API مربوط به action=users (طبق mrpremiumhub.org/api.ashx?action=users) */
export interface UsersApiItem {
  name?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  userPhone?: string;
  phoneNumber?: string;
  isban?: boolean;
  cardNumber?: string;
  totalBalance?: number;
  availableBalance?: number;
  blockedBalance?: number;
}

function pickPhone(obj: Record<string, unknown> | null | undefined): string | undefined {
  if (!obj || typeof obj !== "object") return undefined;
  const raw =
    obj.phone ??
    obj.Phone ??
    obj.mobile ??
    obj.Mobile ??
    obj.userPhone ??
    obj.UserPhone ??
    obj.phoneNumber ??
    obj.PhoneNumber ??
    obj.tel;
  return typeof raw === "string" ? raw : undefined;
}

/** مقدار شبیه ایمیل را برای مقایسهٔ شماره قبول نمی‌کند */
function asPhoneOnly(value: string | undefined | null): string {
  if (value == null || typeof value !== "string") return "";
  const t = value.trim();
  return t.includes("@") ? "" : t;
}

/** نرمال‌سازی شماره برای مقایسه: 09... / 98... / 9... → 98xxxxxxxxx (۱۲ رقم) */
function normalizePhoneForComparison(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("98") && digits.length >= 12) return digits.slice(0, 12);
  if (digits.startsWith("0") && digits.length >= 11) return "98" + digits.slice(1, 11);
  if (digits.startsWith("9") && digits.length >= 10) return "98" + digits.slice(0, 10);
  return digits;
}

/** دریافت شمارهٔ ورود از localStorage (فقط سمت کلاینت) */
export function getLoginPhoneFromStorage(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(LOGIN_PHONE_KEY);
  } catch {
    return null;
  }
}

/**
 * دریافت کاربر فعلی از action=users.
 * وقتی API آرایه برمی‌گرداند، با شمارهٔ ورود (loginPhone) کاربر لاگین‌شده را پیدا می‌کند تا اطلاعات همان شماره نمایش داده شود.
 */
export async function fetchCurrentUserFromUsersApi(loginPhone?: string | null): Promise<UsersApiItem | null> {
  try {
    const res = await fetch(`${PROXY}?action=users`, fetchOpts);
    if (!res.ok) return null;
    const data = await res.json().catch(() => null);
    if (data?.error) return null;

    const list = Array.isArray(data) ? data : [data];
    if (list.length === 0) return null;

    const loginNormalized = loginPhone ? normalizePhoneForComparison(asPhoneOnly(loginPhone)) : "";

    if (list.length === 1) {
      const user = list[0];
      if (user && typeof user === "object") {
        const u = user as Record<string, unknown>;
        return { ...user, phone: pickPhone(u) } as UsersApiItem;
      }
      return null;
    }

    if (loginNormalized) {
      for (let i = 0; i < list.length; i++) {
        const u = list[i] as Record<string, unknown>;
        const raw = pickPhone(u);
        if (!raw) continue;
        if (asPhoneOnly(raw) && normalizePhoneForComparison(raw) === loginNormalized) {
          return { ...list[i], phone: raw } as UsersApiItem;
        }
      }
    }

    const user = list[0];
    if (user && typeof user === "object") {
      const u = user as Record<string, unknown>;
      return { ...user, phone: pickPhone(u) } as UsersApiItem;
    }
    return null;
  } catch {
    return null;
  }
}

export interface WalletBalance {
  total?: number;
  available?: number;
  blocked?: number;
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  orderType: string;
  lastUpdate: string;
  status: string;
  amount?: string;
  currencyAmount?: string;
}

export interface SupportTicket {
  id: string;
  title: string;
  status: string;
  lastUpdate: string;
  messageNumber?: string;
}

function toOrderItem(raw: Record<string, unknown>): OrderItem {
  const id = String(raw.id ?? raw.ID ?? raw.orderId ?? "");
  const orderNumber = String(raw.orderNumber ?? raw.OrderNumber ?? raw.id ?? raw.ID ?? "");
  const orderType = String(raw.orderType ?? raw.OrderType ?? raw.product ?? raw.Product ?? "—");
  const lastUpdate = String(raw.lastUpdate ?? raw.LastUpdate ?? raw.date ?? raw.Date ?? raw.updatedAt ?? "—");
  const status = String(raw.status ?? raw.Status ?? "—");
  const amount = raw.amount != null ? String(raw.amount) : undefined;
  const currencyAmount = raw.currencyAmount != null ? String(raw.currencyAmount) : amount;
  return { id, orderNumber, orderType, lastUpdate, status, amount, currencyAmount };
}

/** دریافت پروفایل کاربر (در صورت پشتیبانی بک‌اند: action=UserProfile یا GetProfile) */
export async function fetchUserProfile(): Promise<UserProfile | null> {
  try {
    const res = await fetch(`${PROXY}?action=UserProfile`, fetchOpts);
    if (!res.ok) return null;
    const data = await res.json().catch(() => ({}));
    if (data?.error) return null;
    return {
      name: data.name ?? data.Name ?? data.username ?? data.UserName,
      username: data.username ?? data.UserName,
      phone: pickPhone(data as Record<string, unknown>),
      email: data.email ?? data.Email,
    };
  } catch {
    return null;
  }
}

/** دریافت نام و پروفایل کاربر از API — اولویت با action=users. با شمارهٔ ورود، کاربر درست از آرایه انتخاب می‌شود. */
export async function fetchUserProfileFallback(): Promise<UserProfile | null> {
  const loginPhone = getLoginPhoneFromStorage();
  const fromUsers = await fetchCurrentUserFromUsersApi(loginPhone);
  const usersPhone = pickPhone(fromUsers as Record<string, unknown>);
  if (fromUsers?.name || fromUsers?.email || usersPhone) {
    return {
      name: fromUsers?.name ?? undefined,
      username: fromUsers?.name ?? undefined,
      phone: usersPhone ?? undefined,
      email: fromUsers?.email ?? undefined,
    };
  }

  // اگر در مرورگر هستیم، LoginCookie با کوکی فعلی را امتحان کن
  if (typeof window !== "undefined") {
    try {
      const { getAuthCookie } = await import("@/app/(main)/auth/lib/cookie");
      const cookie = getAuthCookie();
      if (cookie) {
        const res = await fetch(
          `${PROXY}?action=LoginCookie&Cookie=${encodeURIComponent(cookie)}`,
          fetchOpts
        );
        if (res.ok) {
          const data = await res.json().catch(() => ({}));
          if (!data?.error) {
            const name =
              data.name ??
              data.Name ??
              data.username ??
              data.UserName ??
              data.fullName ??
              data.FullName ??
              data.displayName;
            if (name) {
              return {
                name: String(name),
                username: data.username ?? data.UserName ?? data.name ?? data.Name,
                phone: pickPhone(data as Record<string, unknown>),
                email: data.email ?? data.Email,
              };
            }
          }
        }
      }
    } catch {
      // ادامه با actionهای دیگر
    }
  }

  const actions = [
    "UserProfile",
    "GetProfile",
    "Profile",
    "UserInfo",
    "GetUser",
    "User",
    "GetUserInfo",
    "CurrentUser",
    "Me",
    "Account",
  ];
  for (const action of actions) {
    try {
      const res = await fetch(`${PROXY}?action=${action}`, fetchOpts);
      if (!res.ok) continue;
      const data = await res.json().catch(() => ({}));
      if (data?.error || !data) continue;
      const name =
        data.name ??
        data.Name ??
        data.username ??
        data.UserName ??
        data.fullName ??
        data.FullName ??
        data.displayName;
      if (name) {
        return {
          name: String(name),
          username: data.username ?? data.UserName ?? data.name ?? data.Name,
          phone: pickPhone(data as Record<string, unknown>),
          email: data.email ?? data.Email,
        };
      }
    } catch {
      continue;
    }
  }
  return null;
}

function pickNumber(obj: Record<string, unknown>, ...keys: string[]): number | undefined {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "number" && !Number.isNaN(v)) return v;
    if (typeof v === "string") {
      const n = Number(v);
      if (!Number.isNaN(n)) return n;
    }
  }
  return undefined;
}

/** موجودی کیف پول — اول از action=users، بعد action=Wallet. total=کل، available=در دسترس، blocked=بلوکه‌شده */
export async function fetchWalletBalance(): Promise<WalletBalance> {
  const fromUsers = await fetchCurrentUserFromUsersApi();
  const u = fromUsers as Record<string, unknown> | null | undefined;
  if (u && typeof u === "object") {
    const total = pickNumber(u, "totalBalance", "TotalBalance", "total_balance", "total");
    const available = pickNumber(u, "availableBalance", "AvailableBalance", "available_balance", "available");
    const blocked = pickNumber(u, "blockedBalance", "BlockedBalance", "blocked_balance", "blocked");
    if (total != null || available != null || blocked != null) {
      return {
        total: total ?? undefined,
        available: available ?? total ?? undefined,
        blocked: blocked ?? 0,
      };
    }
  }
  try {
    const res = await fetch(`${PROXY}?action=Wallet`, fetchOpts);
    if (!res.ok) return {};
    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    if (data?.error) return {};
    const obj = data;
    const nested = [obj, obj.data, obj.wallet, obj.balance].filter(
      (x): x is Record<string, unknown> => x != null && typeof x === "object"
    );
    for (const d of nested) {
      const total = pickNumber(d, "totalBalance", "TotalBalance", "total", "Total", "wallet", "Wallet");
      const available = pickNumber(d, "availableBalance", "AvailableBalance", "available", "Available");
      const blocked = pickNumber(d, "blockedBalance", "BlockedBalance", "blocked", "Blocked");
      if (total != null || available != null || blocked != null) {
        return {
          total: total ?? undefined,
          available: available ?? total ?? undefined,
          blocked: blocked ?? 0,
        };
      }
    }
    return {};
  } catch {
    return {};
  }
}

/** آخرین سفارش‌های کاربر */
export async function fetchRecentOrders(limit = 10): Promise<OrderItem[]> {
  try {
    const res = await fetch(`${PROXY}?action=Order`, fetchOpts);
    if (!res.ok) return [];
    const data = await res.json().catch(() => ({}));
    const list = Array.isArray(data) ? data : data?.data ?? data?.list ?? data?.items ?? data?.orders ?? [];
    if (!Array.isArray(list)) return [];
    return list.slice(0, limit).map((item: Record<string, unknown>) => toOrderItem(item));
  } catch {
    return [];
  }
}

/** آخرین درخواست‌های پشتیبانی فقط همین کاربر (فیلتر سمت سرور با شمارهٔ ورود؛ بدون شماره لیست خالی برمی‌گردد) */
export async function fetchRecentSupportTickets(): Promise<SupportTicket[]> {
  try {
    const loginPhone = getLoginPhoneFromStorage();
    if (!loginPhone?.trim()) return [];
    const qs = `?phone=${encodeURIComponent(loginPhone.trim())}`;
    const res = await fetch(`/api/support/conversations${qs}`, { ...fetchOpts, credentials: "include" });
    if (!res.ok) return [];
    const list = await res.json().catch(() => []);
    if (!Array.isArray(list)) return [];
    return list.slice(0, 10).map((c: Record<string, unknown>) => ({
      id: String(c.id ?? ""),
      title: String(c.userName ?? c.userPhone ?? "پشتیبانی"),
      status: String(c.status ?? "در حال بررسی"),
      lastUpdate: String(c.updatedAt ?? c.createdAt ?? ""),
      messageNumber: String(c.id ?? ""),
    }));
  } catch {
    return [];
  }
}

/**
 * درخواست لینک پرداخت برای افزایش اعتبار کیف پول.
 * API: action=pay&phone=98...&money=...&cardNumber=...&Name=...
 * در صورت موفقیت آدرس درگاه پرداخت برمی‌گردد.
 */
export async function requestWalletPaymentLink(params: {
  phone: string;
  money: number;
  cardNumber: string;
  name: string;
}): Promise<string> {
  const phoneNorm = normalizePhoneForComparison(asPhoneOnly(params.phone));
  if (!phoneNorm) throw new Error("شماره تماس معتبر نیست.");
  if (!params.money || params.money <= 0) throw new Error("مبلغ را وارد کنید.");
  const card = params.cardNumber.replace(/\D/g, "");
  if (card.length < 16) throw new Error("شماره کارت باید ۱۶ رقم باشد.");
  const nameTrim = params.name.trim();
  if (!nameTrim) throw new Error("نام و نام خانوادگی را وارد کنید.");

  const qs = new URLSearchParams({
    action: "pay",
    phone: phoneNorm,
    money: String(params.money),
    cardNumber: card.slice(-16),
    Name: nameTrim,
  });
  const res = await fetch(`${PROXY}?${qs.toString()}`, { ...fetchOpts, method: "GET" });
  const contentType = res.headers.get("content-type") ?? "";
  const text = await res.text();

  if (!res.ok) {
    let errMsg = "دریافت لینک پرداخت ناموفق بود.";
    try {
      const data = JSON.parse(text) as { error?: string };
      if (data?.error) errMsg = data.error;
    } catch {
      if (text) errMsg = text.slice(0, 200);
    }
    throw new Error(errMsg);
  }

  const DIRECTPAY_BASE = "https://api.directpay.finance/api/pardakht/payment";

  const trimmed = text.trim();

  if (contentType.includes("application/json")) {
    try {
      const data = JSON.parse(text) as Record<string, unknown>;
      const url =
        typeof data.url === "string"
          ? data.url
          : typeof data.paymentUrl === "string"
            ? data.paymentUrl
            : typeof data.link === "string"
              ? data.link
              : typeof data.redirect === "string"
                ? data.redirect
                : typeof (data as { data?: string }).data === "string"
                  ? (data as { data: string }).data
                  : null;
      if (url && url.startsWith("http")) return url;
      const token = typeof data.token === "string" ? data.token.trim() : null;
      if (token) return `${DIRECTPAY_BASE}?token=${encodeURIComponent(token)}`;
    } catch {
      // fallback
    }
  }

  if (trimmed.startsWith("http")) return trimmed;
  if (/^[a-zA-Z0-9_-]+$/.test(trimmed)) {
    return `${DIRECTPAY_BASE}?token=${encodeURIComponent(trimmed)}`;
  }
  const match = trimmed.match(/https?:\/\/[^\s"']+/);
  if (match) return match[0];
  throw new Error("لینک پرداخت از سرور دریافت نشد. پاسخ: " + trimmed.slice(0, 80));
}
