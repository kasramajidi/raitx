"use client";

import Link from "next/link";
import { HiAcademicCap, HiDocumentText } from "react-icons/hi";
import { FaChartLine, FaUsers } from "react-icons/fa";

interface StudentPaymentService {
  id: string;
  title: string;
  description: string;
  titleEn: string;
  href: string;
  icon: React.ReactNode;
  iconColor: string;
}

const studentPaymentServices: StudentPaymentService[] = [
  {
    id: "ea-payment",
    title: "پرداخت هزینه EA",
    description: "پرداخت هزینه‌های مربوط به معماری سازمانی",
    titleEn: "EA Payment",
    href: "/currency-payment/student-payment",
    icon: <FaChartLine className="text-3xl" />,
    iconColor: "text-green-700",
  },
  {
    id: "pmi-membership",
    title: "عضویت در PMI",
    description: "پرداخت هزینه عضویت در انجمن مدیریت پروژه",
    titleEn: "PMI Membership",
    href: "/currency-payment/student-payment",
    icon: <FaUsers className="text-3xl" />,
    iconColor: "text-green-700",
  },
  {
    id: "journal-publication",
    title: "چاپ مقاله در مجلات خارجی",
    description: "پرداخت هزینه چاپ مقاله در مجلات معتبر بین‌المللی",
    titleEn: "International Journal Publication",
    href: "/currency-payment/student-payment",
    icon: <HiDocumentText className="text-3xl" />,
    iconColor: "text-green-700",
  },
];

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "فعالیت‌های علمی بین‌المللی",
  description: "پرداخت هزینه ارزیابی مدارک، شرکت در رویدادهای علمی و سایر هزینه‌های تحصیلی در کوتاه‌ترین زمان",
  numberOfItems: 3,
  itemListElement: studentPaymentServices.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.title,
    description: item.description,
    url: `https://mrpremiumhub.com${item.href}`,
  })),
};

export default function StudentPaymentServices() {
  return (
    <section
      aria-labelledby="student-payment-services-heading"
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <p className="text-xs sm:text-sm text-blue-600 font-semibold text-center mb-2">
        سایر پرداخت‌های تحصیلی
      </p>
      <h2
        id="student-payment-services-heading"
        className="text-base md:text-lg font-bold text-gray-900 mb-2 text-center"
      >
        فعالیت‌های علمی بین‌المللی
      </h2>
      <p className="text-sm text-gray-600 mb-6 text-center leading-relaxed max-w-3xl mx-auto">
        پرداخت هزینه ارزیابی مدارک، شرکت در رویدادهای علمی و سایر هزینه‌های تحصیلی در کوتاه‌ترین زمان
      </p>
      <nav
        aria-label="فعالیت‌های علمی بین‌المللی"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {studentPaymentServices.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            title={item.title}
            aria-label={`${item.title} - ${item.description}`}
            className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200 group flex flex-col"
          >
            <div className="flex items-center justify-center mb-5">
              <div
                className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center"
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
            <p className="text-xs text-gray-500 text-center mb-4">
              {item.titleEn}
            </p>
            <div className="text-sm text-blue-600 font-semibold text-center mt-auto pt-2">
              <span className="inline-flex items-center gap-1.5">
                ثبت درخواست
                <span className="text-blue-400">&lt;</span>
              </span>
            </div>
          </Link>
        ))}
      </nav>
    </section>
  );
}
