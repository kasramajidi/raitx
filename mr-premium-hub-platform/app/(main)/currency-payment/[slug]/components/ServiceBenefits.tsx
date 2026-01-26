"use client";

import { Service } from "../../components/servicesData";
import { HiCheckCircle, HiShieldCheck, HiClock, HiCurrencyDollar, HiRefresh, HiX, HiCreditCard } from "react-icons/hi";
import { MdSimCard } from "react-icons/md";

interface ServiceBenefitsProps {
  service: Service;
}

const benefits = [
  {
    icon: <HiShieldCheck className="text-2xl sm:text-3xl" />,
    title: "امنیت بالا",
    description: "تمام تراکنش‌ها با بالاترین سطح امنیت انجام می‌شود",
    color: "bg-[#ff5538]/10",
    iconColor: "text-[#ff5538]",
  },
  {
    icon: <HiClock className="text-2xl sm:text-3xl" />,
    title: "پردازش سریع",
    description: "خدمات شما در کوتاه‌ترین زمان ممکن انجام می‌شود",
    color: "bg-[#1a3760]/10",
    iconColor: "text-[#1a3760]",
  },
  {
    icon: <HiCurrencyDollar className="text-2xl sm:text-3xl" />,
    title: "نرخ مناسب",
    description: "بهترین نرخ‌ها و قیمت‌های رقابتی در بازار",
    color: "bg-[#ff5538]/10",
    iconColor: "text-[#ff5538]",
  },
  {
    icon: <HiCheckCircle className="text-2xl sm:text-3xl" />,
    title: "پشتیبانی 24/7",
    description: "پشتیبانی شبانه‌روزی برای پاسخگویی به سوالات شما",
    color: "bg-[#1a3760]/10",
    iconColor: "text-[#1a3760]",
  },
];

const internationalSimBenefits = [
  {
    icon: <MdSimCard className="text-white text-2xl sm:text-3xl" />,
    title: "خرید انواع سیمکارت بین المللی",
    description: "دسترسی به معتبرترین سیم کارت‌های بین‌المللی از کشورهای مختلف",
  },
  {
    icon: <HiRefresh className="text-white text-2xl sm:text-3xl" />,
    title: "شارژ سریع و آسان",
    description: "امکان شارژ سریع و آسان سیم کارت در هر زمان و مکان",
  },
  {
    icon: (
      <div className="relative">
        <HiCreditCard className="text-white text-2xl sm:text-3xl" />
        <HiX className="text-white text-xl sm:text-2xl absolute -top-1 -right-1" />
      </div>
    ),
    title: "بدون نیاز به کارت اعتباری بین‌المللی",
    description: "خرید و شارژ بدون نیاز به کارت اعتباری بین‌المللی",
  },
  {
    icon: <HiClock className="text-white text-2xl sm:text-3xl" />,
    title: "تحویل در ۲ الی ۴ روز کاری",
    description: "تحویل سریع سیم کارت در ۲ الی ۴ روز کاری",
  },
];

export default function ServiceBenefits({ service }: ServiceBenefitsProps) {
  const isInternationalSim = service.id === "international-sim";

  return (
    <>
      {isInternationalSim && (
        <>
          {/* Benefits Box */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 mb-6">
            <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-center">
              خرید معتبرترین سیم کارت‌های بین المللی برای سفرهای خارجی
            </h2>
            <p className="text-[10px] sm:text-xs md:text-sm text-gray-700 leading-6 sm:leading-7 text-justify sm:text-right mb-4 sm:mb-6">
              اگر قصد و یا تجربه سفر به کشورهای خارجی را داشته باشید، میدانید که خرید سیم کارت های بین المللی تا چه حد می‌توانند چالش‌های ارتباطی شما را از لحاظ سرویس‌دهی، سهولت تماس، اتصال به اینترنت و همچنین هزینه برطرف سازند!
            </p>
            <p className="text-[10px] sm:text-xs md:text-sm text-gray-700 leading-6 sm:leading-7 text-justify sm:text-right mb-4 sm:mb-6">
              با استفاده از خدمات نئودیجی می‌توانید در کوتاه‌ترین زمان ممکن و بدون نیاز به داشتن حساب ارزی و کارت اعتباری بین المللی، تنها با پرداخت معادل ریالی سرویس، معتبرترین سیم کارت‌های بین المللی را خریداری کنید.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {internationalSimBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 sm:p-5 shadow-sm"
                >
                  <div className="flex items-center justify-center mb-3 sm:mb-4">
                    <div className="bg-blue-900 w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center">
                      {benefit.icon}
                    </div>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 text-center">
                    {benefit.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-600 leading-5 sm:leading-6 text-right">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 mb-6">
        <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-right flex items-center gap-2">
          <span className="w-1 h-6 bg-[#ff5538] rounded"></span>
          چرا {service.label} را از ما انتخاب کنید؟
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-gray-100 hover:border-[#ff5538]/30 hover:shadow-md transition-all duration-200"
            >
              <div className={`${benefit.color} ${benefit.iconColor} p-2 sm:p-3 rounded-lg shrink-0`}>
                {benefit.icon}
              </div>
              <div className="flex-1 text-right">
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-1">
                  {benefit.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-600 leading-5 sm:leading-6">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

