"use client";

import Link from "next/link";
import { HiTicket, HiDocumentText, HiAcademicCap } from "react-icons/hi";

interface LanguageExamService {
  id: string;
  title: string;
  description: string;
  titleEn: string;
  href: string;
  icon: React.ReactNode;
  iconBg: string;
}

const languageExamServices: LanguageExamService[] = [
  {
    id: "gre-voucher",
    title: "ووچر GRE",
    description: "ووچر تخفیف برای آزمون GRE",
    titleEn: "GRE Voucher",
    href: "/shop",
    icon: <HiTicket className="text-blue-600 text-2xl sm:text-3xl" />,
    iconBg: "bg-blue-50",
  },
  {
    id: "pte-voucher",
    title: "ووچر PTE",
    description: "ووچر تخفیف برای آزمون PTE",
    titleEn: "PTE Voucher",
    href: "/shop",
    icon: <HiTicket className="text-blue-600 text-2xl sm:text-3xl" />,
    iconBg: "bg-blue-50",
  },
  {
    id: "toefl-voucher",
    title: "ووچر TOEFL",
    description: "ووچر تخفیف برای آزمون تافل",
    titleEn: "TOEFL Voucher",
    href: "/shop",
    icon: <HiTicket className="text-blue-600 text-2xl sm:text-3xl" />,
    iconBg: "bg-blue-50",
  },
  {
    id: "score-report",
    title: "ریپورت نمره آزمون",
    description: "دریافت گزارش نمرات آزمون",
    titleEn: "Score Report",
    href: "/shop",
    icon: <HiDocumentText className="text-green-600 text-2xl sm:text-3xl" />,
    iconBg: "bg-green-50",
  },
  {
    id: "magoosh",
    title: "Magoosh",
    description: "دوره‌های آمادگی آنلاین",
    titleEn: "Magoosh",
    href: "/shop",
    icon: <HiAcademicCap className="text-purple-600 text-2xl sm:text-3xl" />,
    iconBg: "bg-purple-50",
  },
  {
    id: "mock-tests",
    title: "تست‌های آزمایشی",
    description: "تست‌های آزمایشی برای آمادگی آزمون",
    titleEn: "Mock Tests",
    href: "/shop",
    icon: <HiDocumentText className="text-teal-600 text-2xl sm:text-3xl" />,
    iconBg: "bg-teal-50",
  },
];

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "خدمات جانبی آزمون‌های زبان",
  description: "خرید انواع ووچر و ماک آزمون زبان برای دستیابی به بهترین نمرات زبان خارجی",
  numberOfItems: 6,
  itemListElement: languageExamServices.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.title,
    description: item.description,
    url: `https://mrpremiumhub.com${item.href}`,
  })),
};

export default function LanguageExamServices() {
  return (
    <section
      aria-labelledby="language-exam-services-heading"
      className="bg-gradient-to-br from-teal-50/30 to-mint-50/30 rounded-lg sm:rounded-xl shadow-sm border border-teal-100/50 p-4 sm:p-5 md:p-6 mb-6"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <p className="text-xs sm:text-sm text-teal-600 font-semibold text-center mb-2">
        خدمات جانبی آزمون‌های زبان
      </p>
      <h2
        id="language-exam-services-heading"
        className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 text-center"
      >
        ووچر، ماک و ریپورت نمره آزمون‌های زبان
      </h2>
      <p className="text-xs sm:text-sm text-gray-600 text-center mb-5 sm:mb-6 max-w-2xl mx-auto leading-relaxed">
        خرید انواع ووچر و ماک آزمون زبان برای دستیابی به بهترین نمرات زبان خارجی
      </p>
      <nav
        aria-label="خدمات جانبی آزمون‌های زبان"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
      >
        {languageExamServices.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            title={`خرید ${item.title}`}
            aria-label={`خرید ${item.title} - ${item.description}`}
            className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-teal-200 hover:-translate-y-0.5 transition-all duration-300 group flex flex-col h-full"
          >
            <div className="flex items-center justify-center mb-4">
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full ${item.iconBg} flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:shadow-md transition-transform duration-300`}
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
            <p className="text-xs sm:text-sm text-teal-600 font-semibold text-center flex justify-center group-hover:text-teal-700 transition-colors duration-200 mt-auto">
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                خرید
                <span className="shrink-0 rtl:rotate-180">&lt;</span>
              </span>
            </p>
          </Link>
        ))}
      </nav>
    </section>
  );
}
