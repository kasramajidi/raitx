/**
 * API احراز هویت مطابق mrpremiumhub.org (مشابه sign.html).
 * از پروکسی سرور استفاده می‌شود تا CORS و ERR_NETWORK_CHANGED رفع شود.
 */

const API_BASE =
  typeof window !== "undefined" ? "/api/auth-proxy" : "https://mrpremiumhub.org/api.ashx";

/** تبدیل شماره به فرمت API: 09044284525 یا ۰۹۰۴۴۲۸۴۵۲۵ → 989044284525 */
export function normalizePhoneForApi(phone: string): string {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const digits = phone.trim().replace(/\s/g, "");
  let result = "";
  for (let i = 0; i < digits.length; i++) {
    const c = digits[i];
    if (c >= "0" && c <= "9") result += c;
    else {
      const p = persianDigits.indexOf(c);
      if (p !== -1) result += String(p);
    }
  }
  if (result.startsWith("0") && result.length === 11) {
    return "98" + result.slice(1);
  }
  if (result.startsWith("98") && result.length >= 12) return result;
  if (result.startsWith("9") && result.length === 10) return "98" + result;
  return result;
}

  async function postData<T = unknown>(action: string, data: object): Promise<T> {
  const res = await fetch(`${API_BASE}?action=${encodeURIComponent(action)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

async function getData<T = unknown>(url: string): Promise<T> {
  const res = await fetch(`${API_BASE}?action=${url}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

/** پاسخ عمومی API (ممکن است cookie یا پیام خطا برگرداند) */
export interface AuthApiResponse {
  cookie?: string;
  error?: string;
  [key: string]: unknown;
}

/** ثبت‌نام: نام، ایمیل، شماره تماس (فرمت 09... یا ۹۸... قبول است) */
export async function signup(params: {
  name: string;
  email: string;
  phone: string;
}): Promise<AuthApiResponse> {
  const phone = normalizePhoneForApi(params.phone);
  return postData<AuthApiResponse>("signup", { ...params, phone });
}

/** دریافت رمز یکبار مصرف (اس‌ام‌اس). شماره: 09044284525 یا 989044284525 */
export async function requestSmsPass(phone: string): Promise<AuthApiResponse> {
  const normalized = normalizePhoneForApi(phone);
  return getData<AuthApiResponse>(`smspass&phone=${encodeURIComponent(normalized)}`);
}

/** ورود با شماره و رمز اس‌ام‌اس؛ در صورت موفقیت cookie برمی‌گرداند. شماره: 09... یا 98... */
export async function login(params: {
  phone: string;
  pass: string;
}): Promise<AuthApiResponse> {
  const phone = normalizePhoneForApi(params.phone);
  const url = `login&phone=${encodeURIComponent(phone)}&pass=${encodeURIComponent(params.pass)}`;
  return getData<AuthApiResponse>(url);
}

/** ورود با کوکی ذخیره‌شده */
export async function loginWithCookie(cookie: string): Promise<AuthApiResponse> {
  return getData<AuthApiResponse>(
    `LoginCookie&Cookie=${encodeURIComponent(cookie)}`
  );
}
