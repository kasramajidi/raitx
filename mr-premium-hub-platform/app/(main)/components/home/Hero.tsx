"use client";

import Image from "next/image";
import { useState } from "react";

export default function Hero() {
  const [amount, setAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("دلار آمریکا");

  const currencies = [
    "دلار استرالیا",
    "یورو",
    "دلار آمریکا",
    "لیر",
    "دلار پی پال",
    "دلار کانادا",
  ];

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/Images/Baner/Layer 5.png"
          alt="مسترپریمیوم هاب - خدمات پرداخت ارزی و نقد کردن درآمد پی پال"
          fill
          className="object-cover object-center"
          priority
          quality={100}
          sizes="100vw"
        />
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.80), rgba(0, 0, 0, 0.85))"
          }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
          <div className="flex-1 text-center lg:text-right space-y-3 sm:space-y-4 md:space-y-6 text-white w-full">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight px-2">
              نقد کردن درآمدهای ارزی
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto lg:mx-0 px-2">
              با Mr Premium Hub، درآمدهای ارزی خود را به راحتی و با بهترین نرخ تبدیل کنید. 
              ما با سال‌ها تجربه در زمینه پرداخت‌های بین‌المللی، خدمات متنوعی از جمله نقد کردن 
              پی‌پال، پرداخت هزینه‌های سفارت، خرید بلیت هواپیما و هتل، و ثبت نام آزمون‌های بین‌المللی 
              را ارائه می‌دهیم. امنیت و سرعت در انجام تراکنش‌ها، اولویت اصلی ماست.
            </p>
          </div>

          <div className="w-full max-w-full sm:max-w-md lg:w-auto lg:min-w-[380px] xl:min-w-[420px] px-2 sm:px-0">
            <div className="bg-white/98 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-2xl border border-white/20 w-full">
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                    محاسبه گر قیمت
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600">
                    در کمتر از ۱۰ ساعت پیش!
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      مبلغ ارزی را وارد کنید
                    </label>
                    <div className="flex gap-1.5 sm:gap-2">
                      <input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0"
                        className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      />
                      <button className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-xs sm:text-sm text-gray-700 transition-colors whitespace-nowrap">
                        مبلغ
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                      انتخاب ارز
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2">
                      {currencies.map((currency) => (
                        <button
                          key={currency}
                          onClick={() => setSelectedCurrency(currency)}
                          className={`px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 rounded-lg font-medium text-xs sm:text-sm transition-all ${
                            selectedCurrency === currency
                              ? "bg-blue-600 text-white shadow-md"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {currency}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

