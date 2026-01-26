"use client";

import { Service } from "../../components/servicesData";
import { HiCheckCircle, HiShieldCheck, HiClock, HiCurrencyDollar, HiRefresh, HiX, HiCreditCard, HiSupport } from "react-icons/hi";
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
    icon: <MdSimCard className="text-white text-3xl md:text-4xl" />,
    title: "خرید انواع سیمکارت بین المللی",
    description: "دسترسی به معتبرترین سیم کارت‌های بین‌المللی از کشورهای مختلف",
  },
  {
    icon: <HiRefresh className="text-white text-3xl md:text-4xl" />,
    title: "شارژ سریع و آسان",
    description: "امکان شارژ سریع و آسان سیم کارت در هر زمان و مکان",
  },
  {
    icon: (
      <div className="relative">
        <HiCreditCard className="text-white text-3xl md:text-4xl" />
        <HiX className="text-white text-2xl md:text-3xl absolute -top-1 -right-1" />
      </div>
    ),
    title: "بدون نیاز به کارت اعتباری بین‌المللی",
    description: "خرید و شارژ بدون نیاز به کارت اعتباری بین‌المللی",
  },
  {
    icon: <HiClock className="text-white text-3xl md:text-4xl" />,
    title: "تحویل در ۲ الی ۴ روز کاری",
    description: "تحویل سریع سیم کارت در ۲ الی ۴ روز کاری",
  },
];

const virtualNumberBenefits = [
  {
    icon: <HiSupport className="text-white text-2xl sm:text-3xl" />,
    title: "پشتیبانی ۲۴ ساعته",
    description: "پشتیبانی کامل در تمام ساعات شبانه روز",
  },
  {
    icon: (
      <div className="relative">
        <HiCreditCard className="text-white text-2xl sm:text-3xl" />
        <HiX className="text-white text-xl sm:text-2xl absolute -top-1 -right-1" />
      </div>
    ),
    title: "بدون نیاز به کارت اعتباری",
    description: "خرید بدون نیاز به کارت اعتباری بین‌المللی",
  },
  {
    icon: <HiClock className="text-white text-2xl sm:text-3xl" />,
    title: "سرویس سریع",
    description: "دریافت فوری شماره مجازی پس از پرداخت",
  },
  {
    icon: <HiShieldCheck className="text-white text-2xl sm:text-3xl" />,
    title: "امنیت بالا",
    description: "حفظ حریم خصوصی و امنیت اطلاعات",
  },
  {
    icon: <HiCheckCircle className="text-white text-2xl sm:text-3xl" />,
    title: "مدت زمان تحویل",
    description: "فوری",
  },
];

export default function ServiceBenefits({ service }: ServiceBenefitsProps) {
  const isInternationalSim = service.id === "international-sim";
  const isVirtualNumber = service.id === "virtual-number";

  return (
    <>
      {isInternationalSim && (
        <>
          {/* Benefits Box */}
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 lg:p-10 mb-6">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
              خرید معتبرترین سیم کارت‌های بین المللی برای سفرهای خارجی
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-7 md:leading-8 text-right mb-6 md:mb-8">
              اگر قصد و یا تجربه سفر به کشورهای خارجی را داشته باشید، میدانید که خرید سیم کارت های بین المللی تا چه حد می‌توانند چالش‌های ارتباطی شما را از لحاظ سرویس‌دهی، سهولت تماس، اتصال به اینترنت و همچنین هزینه برطرف سازند!
            </p>
            <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-7 md:leading-8 text-right mb-8 md:mb-10">
              با استفاده از خدمات مستر پریمیوم هاب می‌توانید در کوتاه‌ترین زمان ممکن و بدون نیاز به داشتن حساب ارزی و کارت اعتباری بین المللی، تنها با پرداخت معادل ریالی سرویس، معتبرترین سیم کارت‌های بین المللی را خریداری کنید.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {internationalSimBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-center mb-5 md:mb-6">
                    <div className="bg-blue-900 w-20 h-20 md:w-24 md:h-24 rounded-lg flex items-center justify-center shadow-md">
                      {benefit.icon}
                    </div>
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4 text-center min-h-12 md:min-h-14 flex items-center justify-center">
                    {benefit.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-6 md:leading-7 text-right">
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

