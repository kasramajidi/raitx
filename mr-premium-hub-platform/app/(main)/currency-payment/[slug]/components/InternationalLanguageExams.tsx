"use client";

import Link from "next/link";
import { HiDocumentText, HiGlobe, HiChatAlt, HiAcademicCap } from "react-icons/hi";
import { FaMobileAlt, FaGlobeAmericas, FaBook } from "react-icons/fa";

interface LanguageExam {
  id: string;
  title: string;
  description: string;
  titleEn: string;
  href: string;
  icon: React.ReactNode;
  iconColor: string;
}

const languageExams: LanguageExam[] = [
  {
    id: "pte",
    title: "آزمون PTE",
    description: "آزمون انگلیسی آکادمیک پیرسون",
    titleEn: "PTE",
    href: "/shop",
    icon: <HiDocumentText className="text-4xl" />,
    iconColor: "text-blue-500",
  },
  {
    id: "duolingo",
    title: "آزمون دولینگو",
    description: "آزمون آنلاین زبان انگلیسی",
    titleEn: "Duolingo",
    href: "/shop",
    icon: <FaMobileAlt className="text-3xl" />,
    iconColor: "text-green-500",
  },
  {
    id: "ielts",
    title: "آزمون آیلتس",
    description: "سیستم بین‌المللی آزمون زبان انگلیسی",
    titleEn: "IELTS",
    href: "/shop",
    icon: <FaGlobeAmericas className="text-3xl" />,
    iconColor: "text-indigo-500",
  },
  {
    id: "toefl",
    title: "آزمون تافل",
    description: "آزمون انگلیسی به عنوان زبان خارجی",
    titleEn: "TOEFL",
    href: "/shop",
    icon: <FaBook className="text-3xl" />,
    iconColor: "text-[#ff5538]",
  },
];

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "آزمون‌های زبان بین‌المللی",
  description: "آزمون‌های زبان نیز قابل ثبت نام هستند",
  numberOfItems: 4,
  itemListElement: languageExams.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.title,
    description: item.description,
    url: `https://mrpremiumhub.com${item.href}`,
  })),
};

export default function InternationalLanguageExams() {
  return (
    <section
      aria-labelledby="international-language-exams-heading"
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <h2
        id="international-language-exams-heading"
        className="text-base md:text-lg font-bold text-gray-900 mb-2 text-center"
      >
        آزمون‌های زبان بین‌المللی
      </h2>
      <p className="text-sm text-blue-600 mb-6 text-center leading-relaxed">
        آزمون‌های زبان نیز قابل ثبت نام هستند
      </p>
      <nav
        aria-label="آزمون‌های زبان بین‌المللی"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {languageExams.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            title={`ثبت نام ${item.title}`}
            aria-label={`ثبت نام ${item.title} - ${item.description}`}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 group flex flex-col"
          >
            <div className="flex items-center justify-center mb-5">
              <div
                className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center shadow-sm"
                aria-hidden
              >
                <span className={item.iconColor}>{item.icon}</span>
              </div>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-3 text-center min-h-[48px] flex items-center justify-center">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 text-center mb-3 leading-relaxed min-h-[42px]">
              {item.description}
            </p>
            <p className="text-xs text-gray-500 text-center">
              {item.titleEn}
            </p>
          </Link>
        ))}
      </nav>
    </section>
  );
}
