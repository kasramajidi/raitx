"use client";

import Link from "next/link";
import { MdChildCare, MdPerson, MdSportsSoccer } from "react-icons/md";
import { FaTshirt, FaLaptop, FaSprayCan } from "react-icons/fa";

interface TrendyolCategory {
  id: string;
  title: string;
  description: string;
  titleEn: string;
  href: string;
  icon: React.ReactNode;
  iconBg: string;
}

// آیکون‌های گرافیکی و پررنگ برای هر دسته: کودکان (کودک)، مردانه (پیراهن)، زنانه (شخص)، عطر (بطری)، الکترونیک (لپ‌تاپ)، ورزش (توپ)
const trendyolCategories: TrendyolCategory[] = [
  {
    id: "kids-fashion",
    title: "پوشاک کودکان",
    description: "لباس و کفش کودکان و نوزادان",
    titleEn: "Kids Fashion",
    href: "/currency-payment/trendyol",
    icon: <MdChildCare className="text-white text-3xl sm:text-4xl" />,
    iconBg: "bg-green-500",
  },
  {
    id: "mens-fashion",
    title: "پوشاک مردانه",
    description: "لباس، کفش و اکسسوری مردانه",
    titleEn: "Men's Fashion",
    href: "/currency-payment/trendyol",
    icon: <FaTshirt className="text-white text-3xl sm:text-4xl" />,
    iconBg: "bg-sky-500",
  },
  {
    id: "womens-fashion",
    title: "پوشاک زنانه",
    description: "انواع لباس، کفش و لوازم جانبی زنانه",
    titleEn: "Women's Fashion",
    href: "/currency-payment/trendyol",
    icon: <MdPerson className="text-white text-3xl sm:text-4xl" />,
    iconBg: "bg-pink-500",
  },
  {
    id: "perfume-cosmetics",
    title: "عطر و ادکلن",
    description: "عطر، ادکلن و لوازم آرایشی",
    titleEn: "Perfume & Cosmetics",
    href: "/currency-payment/trendyol",
    icon: <FaSprayCan className="text-white text-3xl sm:text-4xl" />,
    iconBg: "bg-emerald-500",
  },
  {
    id: "electronics",
    title: "لوازم الکترونیکی",
    description: "گجت‌ها و لوازم الکترونیکی",
    titleEn: "Electronics",
    href: "/currency-payment/trendyol",
    icon: <FaLaptop className="text-white text-3xl sm:text-4xl" />,
    iconBg: "bg-purple-500",
  },
  {
    id: "sports-outdoor",
    title: "لوازم ورزشی",
    description: "تجهیزات ورزشی و فعالیت‌های بیرونی",
    titleEn: "Sports & Outdoor",
    href: "/currency-payment/trendyol",
    icon: <MdSportsSoccer className="text-white text-3xl sm:text-4xl" />,
    iconBg: "bg-orange-500",
  },
];

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "دسته‌بندی محصولات ترندیول",
  description: "خرید از انواع دسته‌بندی‌های محصولات ترندیول از طریق مستر پریمیوم هاب",
  numberOfItems: 6,
  itemListElement: trendyolCategories.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.title,
    description: item.description,
    url: `https://mrpremiumhub.com${item.href}`,
  })),
};

export default function TrendyolCategories() {
  return (
    <section
      aria-labelledby="trendyol-categories-heading"
      className="bg-gray-50 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6 mb-6"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <h2
        id="trendyol-categories-heading"
        className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2 sm:mb-3 text-center flex items-center justify-center gap-2"
      >
        <span className="w-1 h-6 bg-[#ff5538] rounded hidden sm:block" aria-hidden></span>
        دسته‌بندی محصولات ترندیول
        <span className="w-1 h-6 bg-[#ff5538] rounded hidden sm:block" aria-hidden></span>
      </h2>
      <p className="text-xs sm:text-sm text-gray-600 text-center mb-5 sm:mb-6 max-w-2xl mx-auto leading-relaxed">
        خرید از انواع دسته‌بندی‌های محصولات ترندیول از طریق مستر پریمیوم هاب
      </p>
      <nav
        aria-label="دسته‌بندی محصولات ترندیول برای خرید"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
      >
        {trendyolCategories.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            title={`شروع خرید از ${item.title}`}
            aria-label={`شروع خرید از ${item.title} - ${item.description}`}
            className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#ff5538]/20 hover:-translate-y-0.5 transition-all duration-300 group flex flex-col h-full"
          >
            <div className="flex items-center justify-center mb-4">
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full ${item.iconBg} flex items-center justify-center shadow-md group-hover:scale-110 group-hover:shadow-lg transition-transform duration-300`}
                aria-hidden
              >
                {item.icon}
              </div>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5 text-center">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 text-center mb-2 leading-6 flex-1">
              {item.description}
            </p>
            <p className="text-xs text-gray-500 text-center mb-4 not-italic font-medium">
              {item.titleEn}
            </p>
            <p className="text-xs sm:text-sm text-[#1a3760] font-semibold text-center flex justify-center group-hover:text-[#ff5538] transition-colors duration-200 mt-auto">
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                شروع خرید
                <span className="shrink-0 rtl:rotate-180">&lt;</span>
              </span>
            </p>
          </Link>
        ))}
      </nav>
    </section>
  );
}
