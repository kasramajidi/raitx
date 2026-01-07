import { Service } from "../../components/servicesData";
import {
  HiCheckCircle,
  HiShieldCheck,
  HiClock,
  HiCurrencyDollar,
  HiLocationMarker,
  HiCreditCard,
  HiRefresh,
  HiDeviceMobile,
} from "react-icons/hi";
import { BiShoppingBag } from "react-icons/bi";
import { MdPayment, MdAccountBalance } from "react-icons/md";

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

const visaCardBenefits = [
  {
    icon: <HiLocationMarker className="text-2xl sm:text-3xl text-white" />,
    title: "پرداخت های بین المللی",
    description:
      "با استفاده از ویزا کارت می‌توانید به‌سادگی انواع پرداخت‌های بین‌المللی از جمله هزینه آزمون‌های زبان، رزرو بلیط، خریدهای اینترنتی و سایر تراکنش‌های ارزی را انجام دهید. این کارت‌ها راهکاری مطمئن و سریع برای انجام پرداخت‌های خارجی بدون محدودیت‌های رایج محسوب می‌شوند.",
    color: "bg-blue-900",
  },
  {
    icon: <BiShoppingBag className="text-2xl sm:text-3xl text-white" />,
    title: "خرید از فروشگاه های خارجی",
    description:
      "ویزا کارت امکان خرید و انجام پرداخت در فروشگاه‌ها و وب‌سایت‌های معتبر بسیاری از کشورهای جهان را برای کاربران فراهم می‌کند.",
    color: "bg-blue-900",
  },
  {
    icon: <HiCreditCard className="text-2xl sm:text-3xl text-white" />,
    title: "برداشت وجه از دستگاه های خودپرداز",
    description:
      "با داشتن ویزا کارت، می‌توانید بدون نیاز به حمل وجه نقد، در بسیاری از کشورها از طریق دستگاه‌های خودپرداز (ATM) وجه نقد برداشت نمایید.",
    color: "bg-blue-900",
  },
];

const visaGiftBenefits = [
  {
    icon: <HiCurrencyDollar className="text-2xl sm:text-3xl text-white" />,
    title: "هزینه صدور متناسب",
    description: "هزینه صدور بسته به مقدار درخواستی متفاوت میباشد.",
    color: "bg-blue-900",
  },
  {
    icon: <HiRefresh className="text-2xl sm:text-3xl text-white" />,
    title: "امکان بازگشت پول",
    description:
      "در صورت کنسل شدن خرید شما امکان بازگشت پول به کارتها (Refund) وجود دارد.",
    color: "bg-blue-900",
  },
  {
    icon: <MdPayment className="text-2xl sm:text-3xl text-white" />,
    title: "پرداخت در سایتهای خارجی",
    description:
      "این کارتها مجازی میباشند و قابلیت پرداخت در سایتهای خارجی را دارند.",
    color: "bg-blue-900",
  },
];

const creditCardBenefits = [
  {
    icon: <MdAccountBalance className="text-2xl sm:text-3xl text-white" />,
    title: "حساب بانکی زراعت بانک ترکیه",
    description:
      "حساب بانکی شما صادره از زراعت بانک ترکیه بوده و افتتاح حساب بر پایه ارز اصلی لیر می باشد.",
    color: "bg-blue-900",
  },
  {
    icon: <HiDeviceMobile className="text-2xl sm:text-3xl text-white" />,
    title: "خدمات بانکداری الکترونیک",
    description:
      "حساب ها دارای اینترنت بانک و موبایل بانک و اس ام اس بانک میباشند.",
    color: "bg-blue-900",
  },
  {
    icon: <HiCurrencyDollar className="text-2xl sm:text-3xl text-white" />,
    title: "امکان افزایش سقف خرید",
    description:
      "جهت افزایش سقف خرید از این کارت قبل از افتتاح حساب باید هماهنگی لازم انجام گردد.",
    color: "bg-blue-900",
  },
];

export default function ServiceBenefits({ service }: ServiceBenefitsProps) {
  const isVisaCard =
    service.id === "visa-virtual" || service.id === "visa-physical";
  const isVisaGift = service.id === "visa-gift";
  const isCreditCard = service.id === "credit-card";

  return (
    <>
      {isVisaCard && (
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 mb-6">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            مزایای داشتن ویزا کارت
          </h2>
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 text-center mb-4 sm:mb-6 leading-5 sm:leading-6">
            از جمله مزایای خرید انواع ویزا کارت مجازی و فیزیکی میتوان به موارد
            زیر اشاره داشت:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {visaCardBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 sm:p-5 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <div
                    className={`${benefit.color} p-3 sm:p-4 rounded-lg sm:rounded-xl flex items-center justify-center`}
                  >
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 text-center">
                  {benefit.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-600 leading-5 sm:leading-6 text-justify sm:text-right">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {isVisaGift && (
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 mb-6">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            مزایای خرید ویزا کارت هدیه
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {visaGiftBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 sm:p-5 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <div
                    className={`${benefit.color} p-3 sm:p-4 rounded-lg sm:rounded-xl flex items-center justify-center`}
                  >
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 text-center">
                  {benefit.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-600 leading-5 sm:leading-6 text-justify sm:text-right">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {isCreditCard && (
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 mb-6">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            مزایای کردیت کارت
          </h2>
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 text-center mb-4 sm:mb-6 leading-5 sm:leading-6">
            کردیت کارت یکی از انواع کارت‌های اعتباری بانکی است که امکان خرید تا
            سقف معین را با دپوزیت نقدی فراهم میکند.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {creditCardBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 sm:p-5 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <div
                    className={`${benefit.color} p-3 sm:p-4 rounded-lg sm:rounded-xl flex items-center justify-center`}
                  >
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 text-center">
                  {benefit.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-600 leading-5 sm:leading-6 text-justify sm:text-right">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
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
              <div
                className={`${benefit.color} ${benefit.iconColor} p-2 sm:p-3 rounded-lg shrink-0`}
              >
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
