"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useShopProducts } from "@/app/(main)/shop/context/ShopProductsContext";
import { useCart, type CartItem } from "@/app/(main)/context/CartContext";
import { createInvoice, getLoginPhoneFromStorage, normalizePhoneForComparison } from "@/app/(main)/my-account/lib/my-account-api";
import type { ShopProduct } from "@/app/(main)/shop/lib/shop-api";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
}

export default function ServicesSection() {
  const { products, loading, error, refetch } = useShopProducts();
  const router = useRouter();
  const { addToCart } = useCart();
  const [submittingId, setSubmittingId] = useState<number | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);

  const handleRegisterOrder = async (product: ShopProduct) => {
    setOrderError(null);
    setSubmittingId(product.id);
    try {
      const loginPhone = getLoginPhoneFromStorage();
      if (!loginPhone?.trim()) {
        router.push("/auth?next=/services");
        return;
      }
      const userid = normalizePhoneForComparison(loginPhone);
      if (!userid) {
        setOrderError("شماره تماس معتبر برای ثبت سفارش یافت نشد.");
        return;
      }
      const ok = await createInvoice([
        {
          shopid: product.id,
          userid,
          quantity: 1,
          isPaid: false,
          paymentStatus: "not payed",
          price: product.price,
        },
      ]);
      if (!ok) {
        setOrderError("ثبت سفارش در سامانه انجام نشد. لطفاً دوباره تلاش کنید.");
        return;
      }
      const cartItem: CartItem = {
        product: { ...product },
        quantity: 1,
        selectedColor: "",
        selectedWarranty: "",
        finalPrice: product.price,
      };
      addToCart(cartItem);
      router.push("/cart");
    } finally {
      setSubmittingId(null);
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-red-700 text-sm">
        <p className="font-medium mb-2">خطا در بارگذاری خدمات</p>
        <p className="mb-4">{error}</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="bg-[#ff5538] text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
        >
          تلاش مجدد
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-10 h-10 border-2 border-[#ff5538]/30 border-t-[#ff5538] rounded-full animate-spin" aria-hidden />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p>در حال حاضر خدمتی برای نمایش وجود ندارد.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orderError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
          {orderError}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((service) => (
          <article
            key={service.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow"
          >
            <div className="aspect-video bg-gray-100 flex items-center justify-center shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={service.image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                {service.name}
              </h2>
              {service.category && service.category !== "—" && (
                <p className="text-xs text-gray-500 mb-2">{service.category}</p>
              )}
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1 mb-4">
                {service.description}
              </p>
              <div className="flex items-center justify-between gap-4 mt-auto">
                <span className="text-base font-bold text-[#ff5538] tabular-nums">
                  {formatPrice(service.price)}
                </span>
                <button
                  type="button"
                  onClick={() => handleRegisterOrder(service)}
                  disabled={submittingId === service.id}
                  className="shrink-0 bg-[#ff5538] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#e54d32] transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {submittingId === service.id ? "در حال ثبت…" : "ثبت سفارش"}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
