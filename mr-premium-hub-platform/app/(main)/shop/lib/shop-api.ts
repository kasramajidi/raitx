const SHOP_API = "https://mrpremiumhub.org/api.ashx?action=shop";

export type ApiShopItem = {
  id?: number | string;
  title?: string;
  groups?: string;
  price?: number;
  value?: number;
  img?: string;
  video?: string;
  text?: string;
  UserComments?: string | UserCommentItem[];
  NumberOfComments?: number;
  Score?: number;
  [key: string]: unknown;
};

/** یک نظر کاربر از API */
export interface UserCommentItem {
  id?: string | number;
  author?: string;
  content?: string;
  date?: string;
  rating?: number;
  status?: string;
  [key: string]: unknown;
}

function parseUserComments(value: string | UserCommentItem[] | undefined): UserCommentItem[] {
  if (value == null) return [];
  if (Array.isArray(value)) return value.filter((c) => c && (c.content || c.author));
  if (typeof value !== "string") return [];
  const s = value.trim();
  if (!s) return [];
  try {
    const parsed = JSON.parse(s) as unknown;
    return Array.isArray(parsed) ? parsed.filter((c) => c && (c.content || c.author)) : [];
  } catch {
    return [];
  }
}

function mapGroupToMainCategoryId(groups: string): "currency" | "exams" | "embassy" | "apply" | "giftcards" | "other" {
  const g = (groups ?? "").toLowerCase();
  if (/پرداخت|ارزی|ویزا|مستر|پی پال/.test(groups ?? "")) return "currency";
  if (/آزمون|تافل|آیلتس|جی آر ای|ایلتس|ثبت نام/.test(groups ?? "")) return "exams";
  if (/سفارت|ویزا|وقت مصاحبه/.test(groups ?? "")) return "embassy";
  if (/اپلای|دانشگاه|شهریه|اپلیکیشن/.test(groups ?? "")) return "apply";
  if (/گیفت|کارت/.test(groups ?? "")) return "giftcards";
  return "other";
}

export interface ShopProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  isNew: boolean;
  category: string;
  brand: string;
  createdAt: string;
  sales: number;
  description: string;
  mainCategoryId: "currency" | "exams" | "embassy" | "apply" | "giftcards" | "other";
  productType: "service";
  /** نظرات کاربران از API */
  userComments?: UserCommentItem[];
}

export function mapApiItemToShopProduct(item: ApiShopItem, index: number): ShopProduct {
  const id = Number(item.id ?? item.ID ?? index + 1) || index + 1;
  const name = String(item.title ?? item.name ?? item.Name ?? "—");
  const groups = String(item.groups ?? item.category ?? item.Category ?? "—");
  const price = Math.max(0, Number(item.price ?? item.Price ?? 0));
  const image = String(item.img ?? item.image ?? "/Images/Shop/product-pic1.jpg").trim() || "/Images/Shop/product-pic1.jpg";
  const rawText = String(item.text ?? "").trim() || "خرید از مستر پریمیوم هاب.";
  const description =
    rawText
      .replace(/\r\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .join("\n\n") || "خرید از مستر پریمیوم هاب.";
  const userComments = parseUserComments(item.UserComments);
  const reviewsCount = userComments.length || Math.max(0, Number(item.NumberOfComments ?? 0));
  const score = Number(item.Score ?? 5);
  return {
    id,
    name,
    price,
    image,
    rating: score,
    reviews: reviewsCount,
    isNew: false,
    category: groups,
    brand: "—",
    createdAt: new Date().toISOString().slice(0, 10),
    sales: Math.max(0, Number(item.value ?? item.stock ?? 0)),
    description,
    mainCategoryId: mapGroupToMainCategoryId(groups),
    productType: "service",
    userComments: userComments.length > 0 ? userComments : undefined,
  };
}

export async function fetchShopProducts(): Promise<ShopProduct[]> {
  const res = await fetch(SHOP_API, { method: "GET", cache: "no-store" });
  const data = await res.json();
  if (!res.ok) throw new Error(typeof data?.message === "string" ? data.message : "خطا در دریافت محصولات");
  const raw = Array.isArray(data) ? data : data?.data ?? data?.list ?? data?.items ?? [];
  if (!Array.isArray(raw)) return [];
  return raw.map((item: ApiShopItem, i: number) => mapApiItemToShopProduct(item, i));
}

/** دریافت یک محصول با نظرات از API (برای صفحهٔ جزئیات) */
export async function fetchProductById(id: number | string): Promise<ShopProduct | null> {
  const productId = typeof id === "string" ? parseInt(id, 10) : id;
  if (Number.isNaN(productId)) return null;
  try {
    const res = await fetch(`${SHOP_API}&id=${productId}`, { method: "GET", cache: "no-store" });
    const data = await res.json();
    if (!res.ok) return null;
    const raw = data?.data ?? data?.item ?? data;
    const item = Array.isArray(raw) ? raw[0] : raw;
    if (!item || typeof item !== "object") return null;
    return mapApiItemToShopProduct(item as ApiShopItem, 0);
  } catch {
    return null;
  }
}

/** ارسال نظر جدید برای محصول (در صورت پشتیبانی API) */
export async function submitProductComment(
  productId: number | string,
  payload: { author: string; email: string; content: string; rating: number }
): Promise<{ ok: boolean; message?: string }> {
  try {
    const res = await fetch("https://mrpremiumhub.org/api.ashx?action=comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, ...payload }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { ok: false, message: (data?.message ?? data?.error ?? "خطا در ثبت نظر") as string };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : "خطا در ارسال نظر" };
  }
}
