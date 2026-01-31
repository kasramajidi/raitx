"use client";

import React, { useState, useEffect } from "react";

export interface ShopApiPayload {
  id?: number | string;
  img?: string;
  video?: string;
  price?: number;
  title?: string;
  groups?: string;
  value?: number;
  search?: string;
  UserComments?: string;
  RelatedProducts?: string;
  Specifications?: string;
  Score?: number;
  NumberOfComments?: number;
  brand?: string;
  text?: string;
  inPersonDelivery?: boolean;
}

/** محصول از API با تمام فیلدها برای ویرایش */
export interface ApiProductForEdit {
  id: number | string;
  title?: string;
  groups?: string;
  brand?: string;
  price?: number;
  value?: number;
  img?: string;
  video?: string;
  text?: string;
  Specifications?: string;
  Score?: number;
  NumberOfComments?: number;
  UserComments?: string;
  search?: string;
  RelatedProducts?: string;
  inPersonDelivery?: boolean;
}

interface ProductFormProps {
  product?: ApiProductForEdit;
  onClose: () => void;
  onSave: (data: ShopApiPayload) => void;
}

const API_URL = "https://mrpremiumhub.org/api.ashx?action=shop";

const readFileAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const parseTags = (str: string): string[] => {
  if (!str || typeof str !== "string") return [];
  return str
    .split(/[,،]/)
    .map((s) => s.trim())
    .filter(Boolean);
};

/** نظرات را برای نمایش در فرم به رشتهٔ JSON تبدیل می‌کند (API ممکن است رشته یا آبجکت برگرداند) */
function userCommentsToFormValue(value: string | UserCommentItem[] | undefined): string {
  if (value == null || value === "") return "";
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return "";
  }
}

export default function ProductForm({
  product,
  onClose,
  onSave,
}: ProductFormProps) {
  const [searchTags, setSearchTags] = useState<string[]>(
    parseTags(product?.search ?? "")
  );
  const [searchInput, setSearchInput] = useState("");
  const [relatedTags, setRelatedTags] = useState<string[]>(
    parseTags(product?.RelatedProducts ?? "")
  );
  const [relatedInput, setRelatedInput] = useState("");
  useEffect(() => {
    setSearchTags(parseTags(product?.search ?? ""));
  }, [product?.search]);
  useEffect(() => {
    setRelatedTags(parseTags(product?.RelatedProducts ?? ""));
  }, [product?.RelatedProducts]);
  const [formData, setFormData] = useState<Record<string, string | number | boolean>>({
    img: "",
    video: "",
    price: product?.price ? parsePrice(product.price) : "",
    title: product?.name || "",
    groups: product?.category || "",
    value: product?.stock ?? 0,
    search: "",
    UserComments: "",
    RelatedProducts: "",
    Specifications: "",
    Score: "",
    NumberOfComments: "",
    brand: "",
    text: product?.description || "",
    inPersonDelivery: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const updateField = (key: string, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setError(null);
    setSuccess(null);
  };

  const buildPayload = (): ShopApiPayload => {
    const payload: ShopApiPayload = {};
    if (product?.id != null) payload.id = product.id;
    if (formData.img) payload.img = String(formData.img);
    if (formData.video) payload.video = String(formData.video);
    if (formData.title) payload.title = String(formData.title);
    if (formData.groups) payload.groups = String(formData.groups);
    if (formData.value !== "" && formData.value !== undefined)
      payload.value = Math.max(0, Number(formData.value) ?? 0);
    if (searchTags.length > 0) payload.search = searchTags.join("، ");
    if (relatedTags.length > 0) payload.RelatedProducts = relatedTags.join("، ");
    if (formData.text) payload.text = String(formData.text);
    payload.inPersonDelivery = Boolean(formData.inPersonDelivery);
    return payload;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);
    const payload = buildPayload();

    const isEdit = product?.id != null;
    const url = isEdit ? `${API_URL}&id=${product.id}` : API_URL;
    const method = isEdit ? "PATCH" : "POST";

    try {
      let res: Response;
      try {
        res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (fetchErr) {
        const cause =
          fetchErr instanceof TypeError && fetchErr.message.includes("fetch")
            ? "خطای اتصال به اینترنت یا مسدود بودن دسترسی (CORS)"
            : fetchErr instanceof Error
              ? fetchErr.message
              : "خطا در ارسال درخواست به سرور";
        throw new Error(cause);
      }

      let data: Record<string, unknown> = {};
      try {
        const parsed = await res.json();
        data = typeof parsed === "object" && parsed != null ? parsed : {};
      } catch {
        data = {};
      }

      const isFailed = !res.ok || data.statu === 0;

      if (isFailed) {
        const errMsg =
          (typeof data.error === "string" && data.error) ||
          (typeof data.message === "string" && data.message) ||
          (typeof data.msg === "string" && data.msg) ||
          (typeof data.reason === "string" && data.reason) ||
          (typeof data.detail === "string" && data.detail) ||
          (data.statu === 0 ? "سرور ثبت را رد کرد (statu: 0)" : `خطای سرور (کد: ${res.status})`);
        throw new Error(errMsg);
      }

      setSuccess(isEdit ? "محصول با موفقیت ویرایش شد" : "محصول با موفقیت ثبت شد");
      onSave(payload);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      const cause =
        err instanceof Error
          ? err.message
          : "خطای نامشخص. لطفاً دوباره تلاش کنید.";
      setError(cause);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full h-11 bg-gray-50 border border-gray-200 rounded-lg px-3 text-right text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#ff5538]/30 focus:border-[#ff5538] transition-all text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";
  const sectionTitle = "text-base font-medium text-gray-800 mb-3 pb-2 border-b border-gray-100";

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white rounded-t-xl">
          <h2 className="text-xl font-medium text-gray-900">
            {product ? "ویرایش محصول" : "افزودن محصول جدید"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {success && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm">
              <span className="shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">✓</span>
              <span>{success}</span>
            </div>
          )}
          {error && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              <span className="shrink-0 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white">!</span>
              <div>
                <p className="font-medium mb-0.5">علت خطا:</p>
                <p>{error}</p>
              </div>
            </div>
          )}

          <section>
            <h3 className={sectionTitle}>اطلاعات اصلی محصول</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className={labelClass}>عنوان محصول</label>
                <input
                  type="text"
                  value={String(formData.title ?? "")}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="مثال: گیفت کارت گوگل پلی ۱۰ دلاری"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>دسته‌بندی محصول</label>
                <input
                  type="text"
                  value={String(formData.groups ?? "")}
                  onChange={(e) => updateField("groups", e.target.value)}
                  placeholder="مثال: گیفت کارت"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>ارزش یا موجودی</label>
                <input
                  type="number"
                  min={0}
                  value={formData.value === "" ? "" : Number(formData.value)}
                  onChange={(e) => {
                    const num = parseInt(e.target.value, 10);
                    const clamped = isNaN(num) || num < 0 ? 0 : num;
                    updateField("value", clamped);
                  }}
                  placeholder="مثال: 1000"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className={sectionTitle}>تصاویر و ویدیوی محصول</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>آدرس تصویر محصول</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={String(formData.img ?? "")}
                    onChange={(e) => updateField("img", e.target.value)}
                    placeholder="URL یا آپلود فایل"
                    className={`${inputClass} flex-1`}
                  />
                  <label className="shrink-0 inline-flex items-center gap-1 px-3 h-11 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg cursor-pointer text-sm font-medium text-gray-700 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    آپلود
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            const dataUrl = await readFileAsDataUrl(file);
                            updateField("img", dataUrl);
                          } catch {
                            setError("خطا در خواندن فایل تصویر");
                          }
                          e.target.value = "";
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
              <div>
                <label className={labelClass}>آدرس ویدیوی محصول</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={String(formData.video ?? "")}
                    onChange={(e) => updateField("video", e.target.value)}
                    placeholder="URL یا آپلود فایل"
                    className={`${inputClass} flex-1`}
                  />
                  <label className="shrink-0 inline-flex items-center gap-1 px-3 h-11 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg cursor-pointer text-sm font-medium text-gray-700 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    آپلود
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            const dataUrl = await readFileAsDataUrl(file);
                            updateField("video", dataUrl);
                          } catch {
                            setError("خطا در خواندن فایل ویدیو");
                          }
                          e.target.value = "";
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className={sectionTitle}>توضیحات محصول</h3>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>توضیحات محصول</label>
                <textarea
                  rows={3}
                  value={String(formData.text ?? "")}
                  onChange={(e) => updateField("text", e.target.value)}
                  placeholder="توضیح کامل درباره محصول برای نمایش به کاربر"
                  className={`${inputClass} h-auto py-2 min-h-[80px] resize-none`}
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className={sectionTitle}>سایر تنظیمات محصول</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>کلمات کلیدی جستجو</label>
                <div className="flex flex-wrap gap-2 p-3 min-h-[44px] bg-gray-50 border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-[#ff5538]/20 focus-within:border-[#ff5538] transition-all">
                  {searchTags.map((tag, i) => (
                    <span
                      key={`search-${tag}-${i}`}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-[#ff5538]/10 text-[#ff5538] rounded-lg text-sm font-medium"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() =>
                          setSearchTags((prev) => prev.filter((_, idx) => idx !== i))
                        }
                        className="hover:bg-[#ff5538]/20 rounded p-0.5 transition-colors"
                        aria-label={`حذف ${tag}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === "," || e.key === "،") {
                        e.preventDefault();
                        const val = searchInput.trim();
                        if (val && !searchTags.includes(val)) {
                          setSearchTags((prev) => [...prev, val]);
                          setSearchInput("");
                        }
                      }
                    }}
                    onBlur={() => {
                      const val = searchInput.trim();
                      if (val && !searchTags.includes(val)) {
                        setSearchTags((prev) => [...prev, val]);
                        setSearchInput("");
                      }
                    }}
                    placeholder="کلمه کلیدی را وارد کنید و Enter بزنید"
                    className="flex-1 min-w-[100px] bg-transparent border-none outline-none text-right text-gray-900 text-sm placeholder:text-gray-400"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>محصولات مرتبط (بر اساس عنوان)</label>
                <div className="flex flex-wrap gap-2 p-3 min-h-[44px] bg-gray-50 border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-[#ff5538]/20 focus-within:border-[#ff5538] transition-all">
                  {relatedTags.map((tag, i) => (
                    <span
                      key={`${tag}-${i}`}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-[#ff5538]/10 text-[#ff5538] rounded-lg text-sm font-medium"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() =>
                          setRelatedTags((prev) => prev.filter((_, idx) => idx !== i))
                        }
                        className="hover:bg-[#ff5538]/20 rounded p-0.5 transition-colors"
                        aria-label={`حذف ${tag}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={relatedInput}
                    onChange={(e) => setRelatedInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === "," || e.key === "،") {
                        e.preventDefault();
                        const val = relatedInput.trim();
                        if (val && !relatedTags.includes(val)) {
                          setRelatedTags((prev) => [...prev, val]);
                          setRelatedInput("");
                        }
                      }
                    }}
                    onBlur={() => {
                      const val = relatedInput.trim();
                      if (val && !relatedTags.includes(val)) {
                        setRelatedTags((prev) => [...prev, val]);
                        setRelatedInput("");
                      }
                    }}
                    placeholder="عنوان محصول را وارد کنید و Enter بزنید"
                    className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-right text-gray-900 text-sm placeholder:text-gray-400"
                  />
                </div>
              </div>
              <div className="sm:col-span-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="inPersonDelivery"
                  checked={Boolean(formData.inPersonDelivery)}
                  onChange={(e) =>
                    updateField("inPersonDelivery", e.target.checked)
                  }
                  className="w-4 h-4 rounded border-gray-300 text-[#ff5538] focus:ring-[#ff5538]"
                />
                <label htmlFor="inPersonDelivery" className={labelClass + " mb-0"}>
                  امکان تحویل حضوری محصول
                </label>
              </div>
            </div>
          </section>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-50"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#ff5538] text-white px-6 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "در حال ثبت..." : "ثبت"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
