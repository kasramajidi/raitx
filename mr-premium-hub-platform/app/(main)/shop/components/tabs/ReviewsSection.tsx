"use client";

import React, { useState } from "react";
import StarRating from "../ui/StarRating";
import type { ShopProduct, UserCommentItem } from "../../lib/shop-api";
import { submitProductComment } from "../../lib/shop-api";
import type { Product } from "../productsData";

type ProductLike = Product | ShopProduct;

function hasUserComments(p: ProductLike | null): p is ShopProduct {
  return p != null && "userComments" in p && Array.isArray((p as ShopProduct).userComments);
}

interface ReviewsSectionProps {
  product: ProductLike | null;
}

const ReviewsSection = React.memo<ReviewsSectionProps>(({ product }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const comments: UserCommentItem[] = hasUserComments(product) ? product.userComments! : [];
  const productName = product?.name ?? "این محصول";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product?.id) return;
    setSubmitMessage(null);
    setSubmitting(true);
    try {
      const result = await submitProductComment(product.id, {
        author: name.trim(),
        email: email.trim(),
        content: comment.trim(),
        rating,
      });
      if (result.ok) {
        setSubmitMessage({ type: "success", text: "نظر شما ثبت شد و پس از تایید نمایش داده می‌شود." });
        setRating(0);
        setComment("");
        if (!saveInfo) {
          setName("");
          setEmail("");
        }
      } else {
        setSubmitMessage({ type: "error", text: result.message ?? "خطا در ثبت نظر." });
      }
    } catch {
      setSubmitMessage({ type: "error", text: "خطا در ارسال نظر. لطفاً دوباره تلاش کنید." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
      <section
        className="bg-white rounded-2xl p-4 sm:p-6"
        aria-label="نظرات"
        itemScope
        itemType="https://schema.org/Review"
      >
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4 text-center">
          نقد و بررسی ها
        </h3>
        {comments.length === 0 ? (
          <div className="text-center text-gray-500">
            <p className="text-sm sm:text-base" itemProp="reviewBody">
              هنوز نظری ثبت نشده است.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {comments.map((c, i) => (
              <li
                key={String(c.id ?? i)}
                className="border border-gray-100 rounded-xl p-4 bg-gray-50/50"
                itemProp="review"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-medium text-gray-900" itemProp="author">
                    {c.author ?? "کاربر"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {c.date ? new Date(c.date).toLocaleDateString("fa-IR") : ""}
                  </span>
                </div>
                {typeof c.rating === "number" && c.rating > 0 && (
                  <div className="flex gap-0.5 mb-2" aria-label={`امتیاز: ${c.rating}`}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={star <= c.rating! ? "text-yellow-400" : "text-gray-200"}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-sm text-gray-700 whitespace-pre-wrap" itemProp="reviewBody">
                  {c.content ?? ""}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="bg-white rounded-2xl p-4 sm:p-6" aria-label="فرم ثبت نظر">
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2 sm:mb-3 text-right">
          اولین نفری باشید که نظر می‌دهید
        </h3>
        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 text-right">
          &quot;{productName}&quot;
        </p>
        <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 text-right">
          آدرس ایمیل شما منتشر نخواهد شد. فیلدهای الزامی با علامت * مشخص شده‌اند.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit} aria-label="فرم ثبت نظر">
          <div>
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700 mb-2 text-right"
            >
              امتیاز شما *
            </label>
            <StarRating rating={rating} onRatingChange={setRating} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              دیدگاه شما *
            </label>
            <textarea
              id="comment"
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="نظر خود را بنویسید..."
              className="w-full h-32 p-3 bg-[#f6f5ff] rounded-lg text-right resize-none focus:outline-none focus:ring-2 focus:ring-[#ff5538] border border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              نام *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="نام خود را وارد کنید"
              className="w-full p-3 bg-[#f6f5ff] rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-[#ff5538] border border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              ایمیل *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ایمیل خود را وارد کنید"
              className="w-full p-3 bg-[#f6f5ff] rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-[#ff5538] border border-transparent"
            />
          </div>

          <div className="flex items-center gap-2 justify-end">
            <input
              type="checkbox"
              id="saveInfo"
              checked={saveInfo}
              onChange={(e) => setSaveInfo(e.target.checked)}
              className="w-4 h-4 text-[#ff5538] bg-gray-100 border-gray-300 rounded focus:ring-[#ff5538]"
            />
            <label htmlFor="saveInfo" className="text-sm text-gray-600">
              نام، ایمیل و وب‌سایت من را در این مرورگر برای دفعه بعدی که نظر می‌دهم ذخیره کن.
            </label>
          </div>

          {submitMessage && (
            <p
              className={`text-sm text-right ${
                submitMessage.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {submitMessage.text}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#ff5538] text-white py-3 px-6 rounded-lg font-bold hover:opacity-90 transition-opacity shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {submitting ? "در حال ثبت..." : "ثبت"}
          </button>
        </form>
      </section>
    </div>
  );
});

ReviewsSection.displayName = "ReviewsSection";

export default ReviewsSection;
