"use client";

import Image from "next/image";
import { useState } from "react";
import { HiArrowUp } from "react-icons/hi";

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
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Images/Baner/Layer 5.png"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
          quality={100}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/80 to-black/85"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Right Side - Text Content */}
          <div className="flex-1 text-center lg:text-right space-y-4 md:space-y-6 text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              نقد کردن درآمدهای ارزی
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
              نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
            </p>
          </div>

          {/* Left Side - Calculator Card */}
          <div className="w-full lg:w-auto lg:min-w-[380px] xl:min-w-[420px]">
            <div className="bg-white/98 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20">
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    محاسبه گر قیمت
                  </h2>
                  <p className="text-sm md:text-base text-gray-600">
                    در کمتر از ۱۰ ساعت پیش!
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      مبلغ ارزی را وارد کنید
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      />
                      <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-700 transition-colors">
                        مبلغ
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      انتخاب ارز
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {currencies.map((currency) => (
                        <button
                          key={currency}
                          onClick={() => setSelectedCurrency(currency)}
                          className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
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

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
          <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center animate-bounce cursor-pointer hover:bg-yellow-500 transition-colors">
            <HiArrowUp className="text-white text-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

