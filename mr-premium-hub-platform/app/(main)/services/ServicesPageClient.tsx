"use client";

import React from "react";
import Link from "next/link";
import { ShopProductsProvider } from "@/app/(main)/shop/context/ShopProductsContext";
import type { ShopProduct } from "@/app/(main)/shop/lib/shop-api";
import ServicesSection from "./components/ServicesSection";

interface ServicesPageClientProps {
  initialProducts?: ShopProduct[];
}

export default function ServicesPageClient({ initialProducts = [] }: ServicesPageClientProps) {
  return (
    <ShopProductsProvider initialProducts={initialProducts}>
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6 sm:py-8">
          <nav className="mb-4 sm:mb-6" aria-label="مسیر صفحه">
            <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
              <Link href="/" className="text-[#ff5538] hover:opacity-80 transition-opacity">
                خانه
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-800 font-medium">خدمات</span>
            </div>
          </nav>
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-6 sm:mb-8" aria-labelledby="services-hero-heading">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#ff5538]/10 flex items-center justify-center mb-4 text-[#ff5538]">
                <svg className="w-8 h-8 sm:w-9 sm:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 id="services-hero-heading" className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                خدمات ارزی و پرداخت ارزی
              </h1>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl leading-relaxed">
                نقد درآمد پی‌پال، پرداخت با مسترکارت، پرداخت هزینه ویزا و سفارت، ثبت‌نام آزمون‌های بین‌المللی، خرید بلیت هواپیما و هتل و سایر خدمات. قیمت‌ها از پنل مدیریت تنظیم می‌شود.
              </p>
            </div>
          </section>
          <ServicesSection />
        </div>
      </main>
    </ShopProductsProvider>
  );
}
