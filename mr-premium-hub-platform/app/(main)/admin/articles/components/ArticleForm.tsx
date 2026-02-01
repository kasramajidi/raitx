"use client";

import React, { useState } from "react";
import { categories as shopCategories } from "@/app/(main)/shop/components/productsData";

export interface RelatedServiceForm {
  title: string;
  description: string;
  image: string;
  link: string;
}

export interface ArticleFormData {
  title: string;
  category: string;
  content?: string;
  status?: string;
  slug?: string;
  image?: string;
  date?: string;
  headings?: string;
  relatedService?: RelatedServiceForm;
}

interface ArticleFormProps {
  article?: {
    id: string;
    title: string;
    category: string;
    content?: string;
    status: string;
    slug?: string;
    image?: string;
    date?: string;
    headings?: string;
    relatedService?: RelatedServiceForm;
  };
  onClose: () => void;
  onSave: (article: ArticleFormData) => void;
}

export default function ArticleForm({
  article,
  onClose,
  onSave,
}: ArticleFormProps) {
  const [formData, setFormData] = useState<ArticleFormData>({
    title: article?.title || "",
    category: article?.category || "",
    content: article?.content || "",
    status: article?.status || "پیش‌نویس",
    slug: article?.slug ?? "",
    image: article?.image ?? "/Images/gift-card-guide.jpg",
    date: article?.date ?? "",
    headings: article?.headings ?? "",
    relatedService: article?.relatedService,
  });

  const isAddMode = !article;

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      ...(isAddMode ? { slug: title.replace(/\s+/g, "-") } : {}),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
          <h2 className="text-xl font-medium text-gray-900">
            {article ? "ویرایش مقاله" : "افزودن مقاله جدید (POST)"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              عنوان مقاله <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
            />
          </div>
          {/* اسلاگ، تصویر، تاریخ — هم برای افزودن هم برای ویرایش (PATCH) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              اسلاگ (برای آدرس)
            </label>
            <input
              type="text"
              value={formData.slug ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              placeholder="مثال: راهنمای-کامل-خرید-گیفت-کارت"
              className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              مسیر تصویر
            </label>
            <input
              type="text"
              value={formData.image ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              placeholder="/Images/gift-card-guide.jpg"
              className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              تاریخ (اختیاری)
            </label>
            <input
              type="text"
              value={formData.date ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              placeholder="مثال: 24 ژانویه 2026"
              className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              دسته‌بندی <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
            >
              <option value="">انتخاب کنید...</option>
              {shopCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              محتوا (هر پاراگراف در یک خط) <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={10}
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              placeholder="هر خط = یک پاراگراف در آرایه content"
              className="w-full bg-white border-b border-gray-300 px-3 py-2 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors resize-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              عناوین (headings) — هر خط یک عنوان
            </label>
            <textarea
              rows={4}
              value={formData.headings ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, headings: e.target.value })
              }
              placeholder="گیفت کارت چیست؟&#10;انواع گیفت کارت&#10;..."
              className="w-full bg-white border-b border-gray-300 px-3 py-2 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors resize-none text-sm"
            />
          </div>
          {isAddMode && (
            <>
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <p className="text-sm font-medium text-gray-700">سرویس مرتبط (relatedService) — اختیاری</p>
                <input
                  type="text"
                  value={formData.relatedService?.title ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      relatedService: {
                        ...formData.relatedService,
                        title: e.target.value,
                        description: formData.relatedService?.description ?? "",
                        image: formData.relatedService?.image ?? "",
                        link: formData.relatedService?.link ?? "",
                      },
                    })
                  }
                  placeholder="عنوان (مثلاً: فروشگاه گیفت کارت)"
                  className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
                />
                <input
                  type="text"
                  value={formData.relatedService?.description ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      relatedService: {
                        ...formData.relatedService,
                        title: formData.relatedService?.title ?? "",
                        description: e.target.value,
                        image: formData.relatedService?.image ?? "",
                        link: formData.relatedService?.link ?? "",
                      },
                    })
                  }
                  placeholder="توضیح (مثلاً: خرید انواع گیفت کارت...)"
                  className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
                />
                <input
                  type="text"
                  value={formData.relatedService?.image ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      relatedService: {
                        ...formData.relatedService,
                        title: formData.relatedService?.title ?? "",
                        description: formData.relatedService?.description ?? "",
                        image: e.target.value,
                        link: formData.relatedService?.link ?? "",
                      },
                    })
                  }
                  placeholder="مسیر تصویر (مثلاً: /Images/shop-banner.jpg)"
                  className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
                />
                <input
                  type="text"
                  value={formData.relatedService?.link ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      relatedService: {
                        ...formData.relatedService,
                        title: formData.relatedService?.title ?? "",
                        description: formData.relatedService?.description ?? "",
                        image: formData.relatedService?.image ?? "",
                        link: e.target.value,
                      },
                    })
                  }
                  placeholder="لینک (مثلاً: /shop)"
                  className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
                />
              </div>
            </>
          )}
          {!isAddMode && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                وضعیت
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
              >
                <option value="پیش‌نویس">پیش‌نویس</option>
                <option value="منتشر شده">منتشر شده</option>
              </select>
            </div>
          )}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="bg-[#ff5538] text-white px-6 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              ذخیره
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

