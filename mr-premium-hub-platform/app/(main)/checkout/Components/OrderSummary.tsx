"use client";

import React, { useState } from "react";
import type { CartItem } from "@/app/(main)/context/CartContext";
import type { StoredOrderDetailItem } from "@/app/(main)/lib/cart-storage";

interface OrderSummaryProps {
  items: CartItem[];
  getTotalPrice: () => number;
  formatPrice: (price: number) => string;
  /** جزئیات سفارش ذخیره‌شده از سبد (ایندکس به صورت رشته "0", "1", ...) */
  orderDetailsFromStorage?: Record<string, StoredOrderDetailItem> | null;
  /** با کلیک روی «ثبت سفارش و ادامه» فراخوانی می‌شود؛ روش پرداخت انتخاب‌شده را می‌گیرد و سفارش را به API می‌فرستد */
  onConfirmOrder?: (paymentGateway: string) => void | Promise<void>;
}

const PAYMENT_GATEWAYS = [
  { id: "card-to-card", label: "کارت به کارت", description: "انتقال مستقیم به کارت ما" },
  { id: "bank-transfer", label: "واریز بانکی", description: "واریز به شماره حساب اعلام‌شده" },
  { id: "coordinate", label: "هماهنگی با کارشناس", description: "تماس کارشناس برای تعیین روش پرداخت" },
] as const;

export default function OrderSummary({
  items,
  getTotalPrice,
  formatPrice,
  orderDetailsFromStorage = null,
  onConfirmOrder,
}: OrderSummaryProps) {
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState<string>(PAYMENT_GATEWAYS[0].id);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const getItemSubtitle = (item: CartItem): string => {
    const p = item.product as CartItem["product"] & { productType?: string; denominations?: { id: string; label: string }[] };
    if (p.productType === "service") return "خدمات ارزی / پرداخت ارزی";
    if (p.productType === "gift_card" && p.denominations?.length && item.selectedWarranty) {
      const d = p.denominations.find((x) => x.id === item.selectedWarranty);
      return d ? `مبلغ: ${d.label}` : getWarrantyText(item.selectedWarranty);
    }
    if (item.selectedWarranty) return `گارانتی: ${getWarrantyText(item.selectedWarranty)}`;
    return "";
  };

  const subtotal = getTotalPrice();
  const fastOrderFee = (orderDetailsFromStorage && items.length > 0)
    ? items.reduce((sum, item, index) => {
        if (orderDetailsFromStorage[String(index)]?.fastOrder) {
          return sum + Math.round((item.finalPrice * item.quantity) * 0.01);
        }
        return sum;
      }, 0)
    : 0;
  const total = subtotal + fastOrderFee;

  return (
    <div className="lg:col-span-2">
      <div className="sticky top-8 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="text-lg font-medium text-gray-900 text-right mb-4">
            سفارش شما
          </h3>
          <div className="text-sm space-y-3">
            {items.map((item: CartItem, index: number) => (
              <div key={index} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                <h4 className="font-medium text-gray-900 text-sm mb-1">
                  {item.product.name}
                </h4>
                <div className="text-xs text-gray-600 space-y-0.5">
                  {getItemSubtitle(item) && <p>{getItemSubtitle(item)}</p>}
                  <p>تعداد: {item.quantity}</p>
                  {(item.product as CartItem["product"] & { productType?: string }).productType !== "service" && (
                    <p>رنگ: {getColorName(item.selectedColor)}</p>
                  )}
                  {orderDetailsFromStorage?.[String(index)]?.fastOrder && (
                    <span className="inline-block mt-1 text-[#ff5538] font-medium">سفارش سریع (۱٪)</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">جمع جزء:</span>
              <span className="font-medium text-gray-900 text-sm">
                {formatPrice(subtotal)}
              </span>
            </div>
            {fastOrderFee > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">کارمزد سفارش سریع (۱٪):</span>
                <span className="font-medium text-gray-900 text-sm">
                  {formatPrice(fastOrderFee)}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-700 font-medium text-sm">مجموع:</span>
              <span className="font-semibold text-[#ff5538] text-base">
                {formatPrice(total)}
              </span>
            </div>
          </div>
        </div>

        {/* کد تخفیف */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p
            className="text-sm text-gray-700 text-center cursor-pointer hover:text-[#ff5538] transition-colors"
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
            کد تخفیف دارید؟ برای وارد کردن کد اینجا کلیک کنید
          </p>
          {showDiscountInput && (
            <div className="mt-4 space-y-3">
              <input
                type="text"
                placeholder="کد تخفیف خود را وارد کنید"
                className="w-full h-11 bg-gray-50 border border-gray-200 rounded-lg px-3 text-center text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#ff5538] focus:border-transparent text-sm"
                aria-label="کد تخفیف"
              />
              <button
                type="button"
                className="w-full bg-[#ff5538] text-white py-2.5 px-4 font-medium text-sm hover:opacity-90 transition-opacity rounded-lg"
              >
                اعمال کد تخفیف
              </button>
            </div>
          )}
        </div>

        {/* بخش پرداخت ارزی و ثبت سفارش */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 text-right mb-4 flex items-center gap-2 justify-end">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
            پرداخت ارزی و ثبت سفارش
          </h3>
          {/* انتخاب درگاه پرداخت */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-800 text-right mb-3">انتخاب روش پرداخت</h4>
            <div className="space-y-2 border border-gray-200 rounded-xl overflow-hidden bg-gray-50/50">
              {PAYMENT_GATEWAYS.map((gateway) => (
                <label
                  key={gateway.id}
                  className={`flex items-center gap-3 p-3 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors ${
                    selectedGateway === gateway.id ? "bg-[#ff5538]/10 border-r-4 border-r-[#ff5538]" : "hover:bg-gray-100/80"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment-gateway"
                    value={gateway.id}
                    checked={selectedGateway === gateway.id}
                    onChange={() => setSelectedGateway(gateway.id)}
                    className="w-4 h-4 text-[#ff5538] border-gray-300 focus:ring-[#ff5538]"
                  />
                  <div className="flex-1 text-right">
                    <span className="font-medium text-gray-900 text-sm block">{gateway.label}</span>
                    <span className="text-xs text-gray-500">{gateway.description}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
          <div className="bg-amber-50/80 border border-amber-200/60 rounded-xl px-4 py-3 mb-4">
            <p className="text-xs text-amber-900 text-right leading-relaxed">
              پس از ثبت سفارش، کارشناسان ما برای هماهنگی روش پرداخت ارزی با شما تماس خواهند گرفت.
            </p>
          </div>
          <p className="text-xs text-gray-500 text-right mb-5 leading-relaxed">
            اطلاعات شما صرفاً برای پردازش سفارش و پشتیبانی استفاده می‌شود.
          </p>
          <button
            type="button"
            disabled={isSubmitting || !onConfirmOrder}
            onClick={async () => {
              if (!onConfirmOrder || isSubmitting) return;
              setIsSubmitting(true);
              try {
                await onConfirmOrder(selectedGateway);
              } finally {
                setIsSubmitting(false);
              }
            }}
            className="w-full bg-[#ff5538] text-white py-3.5 px-6 rounded-xl font-medium text-base hover:opacity-90 transition-opacity shadow-md shadow-[#ff5538]/25 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "در حال ثبت…" : "ثبت سفارش و ادامه"}
          </button>
        </div>
      </div>
    </div>
  );
}
