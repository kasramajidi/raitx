/**
 * Auth API – منطق اتصال به بک‌اند api.ashx
 * بدون ذخیره رمز عبور.
 */

const API_BASE =
  typeof window !== "undefined"
    ? (process.env.NEXT_PUBLIC_AUTH_API ?? "https://mrpremiumhub.org/api.ashx")
    : "https://mrpremiumhub.org/api.ashx";

function buildUrl(action: string): string {
  const separator = API_BASE.includes("?") ? "&" : "?";
  return `${API_BASE}${separator}action=${action}`;
}

export type LoginResponse = {
  cookie?: string;
  loginval?: string;
  ok?: boolean;
  user?: { id: string; username?: string; email?: string };
  [key: string]: unknown;
};

export type SignupResponse = {
  id?: string;
  ok?: boolean;
  message?: string;
  [key: string]: unknown;
};

/**
 * ورود با شناسه (ایمیل، نام کاربری یا شماره تماس) و رمز
 * بک‌اند پارامتر را با نام phone می‌پذیرد؛ مقدار می‌تواند ایمیل، نام کاربری یا شماره باشد.
 * مقدار برگشتی cookie برای ذخیره است؛ رمز ذخیره نمی‌شود.
 */
export async function loginWithPhoneAndPass(
  identifier: string,
  pass: string
): Promise<LoginResponse> {
  const trimmed = String(identifier).trim().replace(/\s/g, "");
  const trimmedPass = String(pass).trim();
  if (!trimmed || !trimmedPass) {
    throw new Error("ایمیل، نام کاربری یا شماره تماس و رمز عبور را وارد کنید.");
  }
  const url =
    buildUrl("login") +
    "&phone=" +
    encodeURIComponent(trimmed) +
    "&pass=" +
    encodeURIComponent(trimmedPass);
  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  let data: LoginResponse;
  try {
    data = (await res.json()) as LoginResponse;
  } catch {
    throw new Error("پاسخ سرور نامعتبر است. دوباره تلاش کنید.");
  }
  if (!res.ok) {
    const msg = (data as { message?: string })?.message ?? "اطلاعات ورود اشتباه است.";
    throw new Error(msg);
  }
  return data;
}

/**
 * اعتبارسنجی نشست با کوکی ذخیره‌شده (ورود مجدد با cookie/localStorage)
 */
export async function loginWithCookie(cookieValue: string): Promise<LoginResponse> {
  const trimmed = String(cookieValue).trim();
  if (!trimmed) {
    throw new Error("نشست معتبری یافت نشد.");
  }
  const url = buildUrl("LoginCookie") + "&Cookie=" + encodeURIComponent(trimmed);
  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  let data: LoginResponse;
  try {
    data = (await res.json()) as LoginResponse;
  } catch {
    throw new Error("پاسخ سرور نامعتبر است.");
  }
  if (!res.ok) {
    throw new Error("نشست منقضی یا نامعتبر است.");
  }
  return data;
}

/**
 * ثبت‌نام – مطابق بک‌اند: name, email, phone (رمز در بک‌اند جدا مدیریت می‌شود)
 */
export async function signup(payload: {
  name: string;
  email: string;
  phone: string;
}): Promise<SignupResponse> {
  const name = String(payload.name).trim();
  const email = String(payload.email).trim();
  const phone = String(payload.phone).trim().replace(/\s/g, "");
  if (!name || !email) {
    throw new Error("نام و ایمیل را وارد کنید.");
  }
  const url = buildUrl("signup");
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, phone: phone || email }),
  });
  let data: SignupResponse;
  try {
    data = (await res.json()) as SignupResponse;
  } catch {
    throw new Error("پاسخ سرور نامعتبر است. دوباره تلاش کنید.");
  }
  if (!res.ok) {
    const msg = (data as { message?: string })?.message ?? "خطای سرور. لطفاً دوباره تلاش کنید.";
    throw new Error(msg);
  }
  // بک‌اند ممکن است با 200 و ok: false ثبت تکراری را اعلام کند
  if ((data as { ok?: boolean }).ok === false) {
    const msg =
      (data as { message?: string })?.message ??
      "این ایمیل یا نام کاربری قبلاً ثبت شده است. وارد شوید یا از فراموشی رمز استفاده کنید.";
    throw new Error(msg);
  }
  return data;
}
