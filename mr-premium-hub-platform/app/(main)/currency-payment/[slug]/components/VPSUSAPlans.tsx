"use client";

import Link from "next/link";
import { HiChip, HiDatabase, HiGlobe } from "react-icons/hi";

const plans = [
  {
    id: "pro",
    title: "پلن حرفه‌ای",
    subtitle: "سرور مجازی آمریکا حرفه‌ای",
    price: "25",
    period: "ماهانه",
    features: [
      "۲ هسته پردازنده",
      "۲ گیگابایت رم",
      "۴۰ گیگابایت فضای ذخیره‌سازی",
      "ترافیک نامحدود",
      "پهنای باند بالا",
    ],
    bgClass: "bg-[#ff5538]/5",
    buttonText: "سفارش پلن حرفه‌ای",
  },
  {
    id: "basic",
    title: "پلن پایه",
    subtitle: "سرور مجازی آمریکا پایه",
    price: "15",
    period: "ماهانه",
    features: [
      "۱ هسته پردازنده",
      "۱ گیگابایت رم",
      "۲۰ گیگابایت فضای ذخیره‌سازی",
      "ترافیک نامحدود",
      "پهنای باند بالا",
    ],
    bgClass: "bg-[#1a3760]/5",
    buttonText: "سفارش پلن پایه",
  },
];

export default function VPSUSAPlans() {
  return (
    <section
      aria-labelledby="vps-usa-plans-heading"
      className="rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6"
    >
      <h2
        id="vps-usa-plans-heading"
        className="text-lg md:text-xl font-bold text-gray-900 mb-2 text-center"
      >
        ویژگی‌ها و امکانات پلن‌های سرور مجازی آمریکا
      </h2>
      <p className="text-sm text-gray-600 mb-6 text-center leading-relaxed">
        پلن‌های مختلف سرور مجازی آمریکا برای نیازهای مختلف شما
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`${plan.bgClass} rounded-xl p-6 shadow-sm border border-gray-100 hover:border-[#ff5538]/20 hover:shadow-md transition-all duration-200`}
          >
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {plan.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{plan.subtitle}</p>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-2xl font-bold text-[#ff5538]">${plan.price}</span>
              <span className="text-sm text-gray-500">/ {plan.period}</span>
            </div>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <span className="text-[#ff5538] shrink-0">
                    {i < 3 ? (
                      i === 0 ? (
                        <HiChip className="text-lg" />
                      ) : i === 1 ? (
                        <HiDatabase className="text-lg" />
                      ) : (
                        <HiGlobe className="text-lg" />
                      )
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-[#ff5538]" />
                    )}
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href="/shop"
              className="block w-full bg-[#ff5538] hover:bg-[#e54d32] text-white text-center font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              {plan.buttonText}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
