"use client";

import { useState } from "react";
import { Service } from "../../components/servicesData";
import { HiPlus, HiMinus } from "react-icons/hi";

interface ServiceFAQProps {
  service: Service;
}

const faqsByService: Record<string, { question: string; answer: string }[]> = {
  paypal: [
    {
      question: "نرخ تبدیل پی پال به ریال چگونه محاسبه می‌شود؟",
      answer: "نرخ تبدیل بر اساس نرخ روز بازار ارز محاسبه می‌شود و در زمان ثبت درخواست به شما اعلام می‌شود.",
    },
    {
      question: "مدت زمان نقد کردن موجودی پی پال چقدر است؟",
      answer: "پس از تایید درخواست، موجودی شما معمولاً در همان روز یا حداکثر 24 ساعت به حساب ریالی شما واریز می‌شود.",
    },
    {
      question: "آیا می‌توانم موجودی پی پال را به دلار دریافت کنم؟",
      answer: "بله، در صورت تمایل می‌توانید موجودی خود را به دلار یا سایر ارزها دریافت کنید.",
    },
  ],
  tickets: [
    {
      question: "آیا می‌توانم بلیط را کنسل یا تغییر دهم؟",
      answer: "بله، امکان کنسل یا تغییر بلیط وجود دارد اما قوانین و هزینه‌های مربوطه بسته به خط هوایی متفاوت است.",
    },
    {
      question: "برای کدام خطوط هوایی می‌توانم بلیط خریداری کنم؟",
      answer: "ما بلیط تمام خطوط هوایی معتبر را ارائه می‌دهیم. برای اطلاع از لیست کامل با ما تماس بگیرید.",
    },
    {
      question: "آیا خدمات رزرو هتل نیز ارائه می‌دهید؟",
      answer: "بله، ما خدمات رزرو هتل در سراسر جهان را نیز ارائه می‌دهیم.",
    },
  ],
};

export default function ServiceFAQ({ service }: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = faqsByService[service.id] || [
    {
      question: "چگونه می‌توانم از این خدمت استفاده کنم؟",
      answer: "برای استفاده از این خدمت، کافی است فرم درخواست را تکمیل کنید. کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت.",
    },
    {
      question: "مدت زمان انجام خدمت چقدر است؟",
      answer: "مدت زمان انجام خدمت بسته به نوع خدمت متفاوت است. معمولاً بین 24 تا 72 ساعت کاری طول می‌کشد.",
    },
    {
      question: "هزینه این خدمت چگونه محاسبه می‌شود؟",
      answer: "هزینه بر اساس نوع خدمت و مبلغ تراکنش محاسبه می‌شود. برای اطلاع از هزینه دقیق با ما تماس بگیرید.",
    },
  ];

  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 mb-6">
      <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-right flex items-center gap-2">
        <span className="w-1 h-6 bg-[#ff5538] rounded"></span>
        سوالات متداول درباره {service.label}
      </h2>
      <div className="space-y-3 sm:space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-3 sm:p-4 text-right hover:bg-gray-50 transition-colors"
            >
              <span className="text-xs sm:text-sm font-medium text-gray-900 flex-1 pr-3">
                {faq.question}
              </span>
              <div
                className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                  openIndex === index
                    ? "bg-[#ff5538] text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {openIndex === index ? (
                  <HiMinus className="h-3 w-3 sm:h-4 sm:w-4" />
                ) : (
                  <HiPlus className="h-3 w-3 sm:h-4 sm:w-4" />
                )}
              </div>
            </button>
            {openIndex === index && (
              <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                <p className="text-[10px] sm:text-xs text-gray-600 leading-5 sm:leading-6 text-right">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

