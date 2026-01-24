import Image from "next/image";
import { Service } from "../../components/servicesData";
import { HiCheckCircle, HiShieldCheck, HiClock, HiCurrencyDollar } from "react-icons/hi";

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

const internationalSimHighlight = {
  title: "مزیت‌های سیم‌کارت بین‌المللی برای سفر",
  description:
    "با یک سیم‌کارت بین‌المللی، ارتباط شما در سفر پایدارتر است و بدون دغدغه هزینه‌های غیرمنتظره می‌توانید تماس، پیامک و اینترنت را مدیریت کنید.",
  bullets: [
    "پوشش چندکشوری بدون نیاز به تعویض سیم‌کارت",
    "امکان شارژ آنلاین قبل یا حین سفر",
    "فعال‌سازی سریع و پشتیبانی پاسخ‌گو",
  ],
  imageSrc: "/Images/IMG_20251230_185043_308.jpg",
  imageAlt: "سیم‌کارت بین‌المللی",
};

export default function ServiceBenefits({ service }: ServiceBenefitsProps) {
  const isInternationalSim = service.id === "international-sim";

  return (
    <>
      {isInternationalSim && (
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="order-2 lg:order-1 text-right space-y-3 sm:space-y-4">
              <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
                {internationalSimHighlight.title}
              </h2>
              <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 leading-6 sm:leading-7">
                {internationalSimHighlight.description}
              </p>
              <ul className="space-y-2.5 sm:space-y-3 text-right">
                {internationalSimHighlight.bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                    <span className="text-[#ff5538] mt-1 flex-shrink-0">✓</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <div className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-100">
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={internationalSimHighlight.imageSrc}
                    alt={internationalSimHighlight.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 420px, 100vw"
                  />
                </div>
              </div>
            </div>
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
              <div className={`${benefit.color} ${benefit.iconColor} p-2 sm:p-3 rounded-lg flex-shrink-0`}>
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

