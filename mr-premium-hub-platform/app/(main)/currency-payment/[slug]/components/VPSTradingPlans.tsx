"use client";

import Link from "next/link";
import { HiChip, HiDatabase, HiGlobe } from "react-icons/hi";

const plans = [
  {
    id: "ram-8",
    title: "پلن رم ۸",
    subtitle: "مناسب برای ترید حرفه‌ای",
    price: "30",
    period: "۱ ماهه",
    features: [
      "پردازنده (CPU): ۴ هسته‌ای",
      "رم (RAM): ۸۱۹۲ مگابایت",
      "هارد: ۴۰ گیگابایت",
      "ترافیک: ۴ ترابایت",
      "پهنای باند بالا",
    ],
    bgClass: "bg-[#ff5538]/5",
  },
  {
    id: "ram-6",
    title: "پلن رم ۶",
    subtitle: "مناسب برای ترید متوسط",
    price: "20",
    period: "۱ ماهه",
    features: [
      "پردازنده (CPU): ۲ هسته‌ای",
      "رم (RAM): ۶ گیگ",
      "هارد: ۳۰ گیگ SSD",
      "ترافیک: ۶ ترابایت",
      "پهنای باند ۱ گیگابیت اشتراکی",
    ],
    bgClass: "bg-[#1a3760]/5",
  },
];

export default function VPSTradingPlans() {
  return (
    <section
      aria-labelledby="vps-trading-plans-heading"
      className="rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6"
    >
      <h2
        id="vps-trading-plans-heading"
        className="text-lg md:text-xl font-bold text-gray-900 mb-2 text-center"
      >
        ویژگی‌ها و امکانات سرور مجازی ترید (Trade)
      </h2>
      <p className="text-sm text-gray-600 mb-6 text-center leading-relaxed">
        پلن‌های مختلف سرور مجازی ترید برای نیازهای متفاوت شما
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
              <span className="text-sm text-gray-500">USD</span>
              <span className="text-2xl font-bold text-[#ff5538]">{plan.price}</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">{plan.period}</p>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <span className="text-blue-500 shrink-0">
                    {i < 3 ? (
                      i === 0 ? (
                        <HiChip className="text-lg" />
                      ) : i === 1 ? (
                        <HiDatabase className="text-lg" />
                      ) : (
                        <HiGlobe className="text-lg" />
                      )
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
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
              ثبت درخواست
            </Link>
            <p className="text-xs text-gray-500 text-center mt-3">
              سالیانه ۱۰٪ تخفیف
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
