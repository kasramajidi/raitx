"use client";

import Link from "next/link";
import { HiAcademicCap, HiHome, HiDocumentText, HiCurrencyDollar } from "react-icons/hi";
import { FaFlag, FaBook, FaUniversity } from "react-icons/fa";
import { MdAssessment } from "react-icons/md";

interface StudentPayment {
  id: string;
  title: string;
  description: string;
  titleEn: string;
  href: string;
  bgColor: string;
  iconBg: string;
  icon: React.ReactNode;
  iconColor: string;
}

const studentPayments: StudentPayment[] = [
  {
    id: "dormitory",
    title: "پرداخت خوابگاه دانشجویی",
    description: "پرداخت هزینه اجاره خوابگاه‌های دانشجویی",
    titleEn: "Student Dormitory Payment",
    href: "/currency-payment/student-payment",
    bgColor: "bg-green-50",
    iconBg: "bg-green-100",
    icon: <HiHome className="text-3xl" />,
    iconColor: "text-green-700",
  },
  {
    id: "application-fee",
    title: "پرداخت اپلیکیشن فی",
    description: "پرداخت هزینه‌های اپلیکیشن دانشگاه‌ها",
    titleEn: "Application Fee Payment",
    href: "/currency-payment/student-payment",
    bgColor: "bg-gray-50",
    iconBg: "bg-gray-100",
    icon: <HiDocumentText className="text-3xl" />,
    iconColor: "text-gray-700",
  },
  {
    id: "canada-university",
    title: "اپلای دانشگاه‌های کانادا",
    description: "پرداخت هزینه‌های اپلای دانشگاه‌های کانادا",
    titleEn: "Canada University Application",
    href: "/currency-payment/student-payment",
    bgColor: "bg-red-50",
    iconBg: "bg-red-100",
    icon: <FaFlag className="text-2xl" />,
    iconColor: "text-red-600",
  },
  {
    id: "foreign-books",
    title: "خرید PDF کتاب خارجی",
    description: "خرید کتاب‌های درسی و مراجع خارجی",
    titleEn: "Foreign Book PDF Purchase",
    href: "/currency-payment/student-payment",
    bgColor: "bg-green-50",
    iconBg: "bg-green-100",
    icon: <FaBook className="text-2xl" />,
    iconColor: "text-green-700",
  },
  {
    id: "wes-payment",
    title: "پرداخت هزینه WES",
    description: "پرداخت هزینه ارزیابی مدارک تحصیلی WES",
    titleEn: "WES Payment",
    href: "/currency-payment/student-payment",
    bgColor: "bg-gray-50",
    iconBg: "bg-gray-100",
    icon: <MdAssessment className="text-3xl" />,
    iconColor: "text-gray-700",
  },
  {
    id: "tuition-payment",
    title: "پرداخت شهریه دانشگاه",
    description: "پرداخت شهریه دانشگاه‌های خارجی",
    titleEn: "University Tuition Payment",
    href: "/currency-payment/student-payment",
    bgColor: "bg-blue-50",
    iconBg: "bg-blue-100",
    icon: <FaUniversity className="text-2xl" />,
    iconColor: "text-blue-700",
  },
];

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "پرداخت هزینه‌های دانشجویی",
  description: "پرداخت تمامی هزینه‌های دانشجویی و تحصیل در خارج از کشور با مستر پریمیوم هاب",
  numberOfItems: 6,
  itemListElement: studentPayments.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.title,
    description: item.description,
    url: `https://mrpremiumhub.com${item.href}`,
  })),
};

export default function StudentPaymentTypes() {
  return (
    <section
      aria-labelledby="student-payment-types-heading"
      className="bg-gray-50 rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <h2
        id="student-payment-types-heading"
        className="text-base md:text-lg font-bold text-gray-900 mb-2 text-center"
      >
        پرداخت هزینه‌های دانشجویی
      </h2>
      <p className="text-sm text-gray-600 mb-6 text-center leading-relaxed">
        پرداخت تمامی هزینه‌های دانشجویی و تحصیل در خارج از کشور با مستر پریمیوم هاب
      </p>
      <nav
        aria-label="انواع پرداخت‌های دانشجویی"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {studentPayments.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            title={item.title}
            aria-label={`${item.title} - ${item.description}`}
            className={`${item.bgColor} rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200 group flex flex-col`}
          >
            <div className="flex items-center justify-center mb-5">
              <div
                className={`w-14 h-14 rounded-full ${item.iconBg} flex items-center justify-center`}
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
