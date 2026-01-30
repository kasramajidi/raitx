"use client";

import Link from "next/link";
import { HiAcademicCap } from "react-icons/hi";

interface LanguageExam {
  id: string;
  title: string;
  description: string;
  titleEn: string;
  href: string;
}

const languageExams: LanguageExam[] = [
  {
    id: "ielts",
    title: "ثبت نام آزمون آیلتس",
    description: "آزمون آیلتس برای مهاجرت و تحصیل",
    titleEn: "IELTS",
    href: "/currency-payment/language-exam",
  },
  {
    id: "toefl",
    title: "ثبت نام آزمون TOEFL iBT",
    description: "آزمون تافل برای تحصیل در خارج",
    titleEn: "TOEFL iBT",
    href: "/currency-payment/language-exam",
  },
  {
    id: "duolingo",
    title: "ثبت نام آزمون Duolingo",
    description: "آزمون آنلاین زبان انگلیسی",
    titleEn: "Duolingo English Test",
    href: "/currency-payment/language-exam",
  },
  {
    id: "pte",
    title: "ثبت نام آزمون PTE",
    description: "آزمون زبان انگلیسی برای مهاجرت و تحصیل",
    titleEn: "PTE Academic",
    href: "/currency-payment/language-exam",
  },
  {
    id: "naati",
    title: "ثبت نام آزمون ناتی NAATI",
    description: "آزمون مترجمی برای مهاجرت به استرالیا",
    titleEn: "NAATI CCL",
    href: "/currency-payment/language-exam",
  },
  {
    id: "gre",
    title: "ثبت نام آزمون GRE",
    description: "آزمون ورودی دانشگاه‌های آمریکا",
    titleEn: "GRE General Test",
    href: "/currency-payment/language-exam",
  },
  {
    id: "ielts-indicator",
    title: "آزمون آیلتس Indicator",
    description: "آزمون آنلاین آیلتس",
    titleEn: "IELTS Indicator",
    href: "/currency-payment/language-exam",
  },
];

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "انواع آزمون زبان",
  description: "پرداخت هزینه ثبت نام تمامی آزمون‌های زبان در سراسر دنیا از طریق مستر پریمیوم هاب",
  numberOfItems: 7,
  itemListElement: languageExams.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.title,
    description: item.description,
    url: `https://mrpremiumhub.com${item.href}`,
  })),
};

export default function LanguageExamTypes() {
  return (
    <section
      aria-labelledby="language-exam-types-heading"
      className="bg-gray-50 rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <div className="flex items-center gap-2 mb-3">
        <span className="w-1 h-6 bg-[#ff5538] rounded" aria-hidden></span>
        <h2
          id="language-exam-types-heading"
          className="text-base md:text-lg font-bold text-gray-900"
        >
          انواع آزمون زبان
        </h2>
      </div>
      <p className="text-sm text-gray-600 mb-6 leading-relaxed">
        پرداخت هزینه ثبت نام تمامی آزمون‌های زبان در سراسر دنیا از طریق مستر پریمیوم هاب
      </p>
      <nav
        aria-label="انواع آزمون‌های زبان برای ثبت نام"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {languageExams.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            title={`ثبت نام ${item.title}`}
            aria-label={`ثبت نام ${item.title} - ${item.description}`}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200 group flex flex-col"
          >
            <div className="flex items-center justify-center mb-5">
              <div
                className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center"
                aria-hidden
              >
                <HiAcademicCap className="text-[#ff5538] text-3xl" />
              </div>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-3 text-center min-h-[48px] flex items-center justify-center">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 text-center mb-3 leading-relaxed min-h-[42px]">
              {item.description}
            </p>
            <p className="text-xs text-gray-500 text-center mb-4">
              {item.titleEn}
            </p>
            <div className="text-sm text-gray-900 font-semibold text-center mt-auto pt-2 border-t border-gray-100">
              <span className="inline-flex items-center gap-1.5">
                ثبت نام
                <span className="text-gray-400">&lt;</span>
              </span>
            </div>
          </Link>
        ))}
      </nav>
    </section>
  );
}
