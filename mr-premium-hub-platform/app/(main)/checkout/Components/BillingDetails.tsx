"use client";

import React from "react";

export default function BillingDetails() {
  return (
    <div className="lg:col-span-3">
      <div className="bg-white p-6">
        <h3 className="text-xl font-medium text-gray-900 text-right mb-6">
          جزئیات صورتحساب
        </h3>

        <form className="space-y-5" aria-label="فرم اطلاعات صورتحساب">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 text-right mb-1.5"
                htmlFor="first-name"
              >
                نام <span className="text-red-500">*</span>
              </label>
              <input
                id="first-name"
                type="text"
                placeholder="نام"
                className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
                required
                aria-required="true"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 text-right mb-1.5"
                htmlFor="last-name"
              >
                نام خانوادگی <span className="text-red-500">*</span>
              </label>
              <input
                id="last-name"
                type="text"
                placeholder="نام خانوادگی"
                className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
                required
                aria-required="true"
              />
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 text-right mb-1.5"
              htmlFor="company"
            >
              نام شرکت (اختیاری)
            </label>
            <input
              id="company"
              type="text"
              placeholder="نام شرکت"
              className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 text-right mb-1.5"
              htmlFor="country"
            >
              کشور / منطقه <span className="text-red-500">*</span>
            </label>
            <select
              id="country"
              className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
              required
              aria-required="true"
            >
              <option value="iran">ایران</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 text-right mb-1.5"
                htmlFor="province"
              >
                استان <span className="text-red-500">*</span>
              </label>
              <select
                id="province"
                className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
                required
                aria-required="true"
              >
                <option value="">یک گزینه انتخاب نمائید...</option>
                <option value="tehran">تهران</option>
                <option value="isfahan">اصفهان</option>
                <option value="shiraz">شیراز</option>
                <option value="mashhad">مشهد</option>
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 text-right mb-1.5"
                htmlFor="city"
              >
                شهر <span className="text-red-500">*</span>
              </label>
              <input
                id="city"
                type="text"
                placeholder="شهر"
                className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
                required
                aria-required="true"
              />
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 text-right mb-1.5"
              htmlFor="address"
            >
              آدرس خیابان <span className="text-red-500">*</span>
            </label>
            <input
              id="address"
              type="text"
              placeholder="نام خیابان و پلاک خانه"
              className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
              required
              aria-required="true"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 text-right mb-1.5"
              htmlFor="apartment"
            >
              آپارتمان، مجتمع، واحد و... (اختیاری)
            </label>
            <input
              id="apartment"
              type="text"
              placeholder="آپارتمان، مجتمع، واحد و..."
              className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
            />
          </div>

          <div className="bg-gray-50 p-4">
            <h4 className="text-sm font-medium text-gray-700 text-right mb-2">
              توضیحات سفارش
            </h4>
            <textarea
              id="order-notes"
              placeholder="توضیحات اضافی برای سفارش خود بنویسید (اختیاری)"
              className="w-full h-20 bg-white border-b border-gray-300 px-3 py-2 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors resize-none text-sm"
              rows={3}
              aria-label="توضیحات سفارش"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
