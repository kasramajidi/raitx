"use client";

import React, { useState } from "react";
import type { CartItem } from "@/app/(main)/context/CartContext";

interface OrderSummaryProps {
  items: CartItem[];
  getTotalPrice: () => number;
  formatPrice: (price: number) => string;
}

export default function OrderSummary({
  items,
  getTotalPrice,
  formatPrice,
}: OrderSummaryProps) {
  const [showDiscountInput, setShowDiscountInput] = useState(false);

  const toggleDiscountInput = () => {
    setShowDiscountInput(!showDiscountInput);
  };

  const getWarrantyText = (warrantyId: string): string => {
    if (warrantyId === "36") return "36 ماهه";
    if (warrantyId === "18") return "18 ماهه";
    return "12 ماهه";
  };

  const getColorName = (colorValue: string): string => {
    if (colorValue === "black") return "مشکی";
    if (colorValue === "white") return "سفید";
    if (colorValue === "red") return "قرمز";
    return "آبی";
  };

  return (
    <div className="lg:col-span-2">
      <div className="sticky top-8 space-y-6">
        <div className="bg-white p-6 space-y-4">
          <h3 className="text-lg font-medium text-gray-900 text-right mb-4">
            سفارش شما
          </h3>
          <div className="text-sm space-y-3">
            {items.map((item: CartItem, index: number) => (
              <div key={index} className="bg-gray-50 p-3">
                <h4 className="font-medium text-gray-900 text-sm mb-2">
                  {item.product.name}
                </h4>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>گارانتی: {getWarrantyText(item.selectedWarranty)}</p>
                  <p>تعداد: {item.quantity}</p>
                  <p>رنگ: {getColorName(item.selectedColor)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">جمع جزء:</span>
              <span className="font-medium text-gray-900 text-sm">
                {formatPrice(getTotalPrice())}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">مجموع:</span>
              <span className="font-semibold text-gray-900 text-base">
                {formatPrice(getTotalPrice())}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6">
          <p
            className="text-sm text-gray-700 text-center cursor-pointer hover:text-[#ff5538] transition-colors mb-4"
            onClick={toggleDiscountInput}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleDiscountInput();
              }
            }}
          >
            کد تخفیف دارید؟ برای نوشتن کد اینجا کلیک کنید
          </p>

          {showDiscountInput && (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="کد تخفیف خود را وارد کنید"
                className="w-full h-11 bg-white border-b border-gray-300 px-3 text-center text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
                aria-label="کد تخفیف"
              />
              <button
                type="button"
                className="w-full bg-[#ff5538] text-white py-2.5 px-4 font-medium text-sm hover:opacity-90 transition-opacity"
              >
                اعمال کد تخفیف
              </button>
            </div>
          )}
        </div>

        <div className="bg-white p-6">
          <div className="bg-gray-50 px-3 py-3 mb-4">
            <p className="text-xs text-gray-700 text-center">
              با عرض پوزش، به نظر می‌رسد هیچ روش پرداختی موجود نیست. اگر به کمک
              نیاز دارید یا می‌خواهید ترتیبات دیگری را انجام دهید، لطفا با ما
              تماس بگیرید.
            </p>
          </div>

          <div className="text-center mb-4">
            <p className="text-xs text-gray-600 leading-relaxed">
              اطلاعات شخصی شما برای پردازش سفارش شما، پشتیبانی از تجربه شما در
              سراسر این وب سایت و برای اهدافی که در سیاست حفظ حریم خصوصی ذکر شده
              است استفاده می‌شود.
            </p>
          </div>

          <button
            type="button"
            className="bg-[#ff5538] text-white px-8 py-3 w-full cursor-pointer hover:opacity-90 transition-opacity text-sm font-medium"
          >
            ثبت سفارش
          </button>
        </div>
      </div>
    </div>
  );
}
