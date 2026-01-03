import { Service } from "../../components/servicesData";

interface ServiceDetailContentProps {
  service: Service;
}

const serviceDetails: Record<string, { features: string[]; steps: string[]; note?: string; description?: string }> = {
  paypal: {
    features: [
      "نقد کردن موجودی پی پال به ریال",
      "پرداخت با پی پال برای خریدهای آنلاین",
      "تبدیل ارز با نرخ روز",
      "پردازش سریع و امن",
      "پشتیبانی 24 ساعته",
      "امنیت بالا در تراکنش‌ها",
    ],
    steps: [
      "ثبت درخواست در سایت",
      "واریز موجودی پی پال",
      "تایید توسط کارشناسان",
      "دریافت مبلغ به ریال",
    ],
    note: "نرخ تبدیل بر اساس نرخ روز بازار محاسبه می‌شود.",
    description: "خدمات پی پال ما شامل نقد کردن موجودی پی پال به ریال و پرداخت با پی پال برای خریدهای آنلاین است. ما با سال‌ها تجربه در این زمینه، بهترین نرخ‌ها و سریع‌ترین پردازش را به شما ارائه می‌دهیم.",
  },
  tickets: {
    features: [
      "خرید بلیط هواپیما",
      "خرید بلیط قطار",
      "خرید بلیط اتوبوس",
      "رزرو هتل",
      "پشتیبانی در تمام مراحل",
      "امکان کنسل و تغییر",
    ],
    steps: [
      "جستجوی بلیط مورد نظر",
      "انتخاب تاریخ و مسیر",
      "تکمیل اطلاعات مسافر",
      "پرداخت و دریافت بلیط",
    ],
    note: "امکان کنسل و تغییر بلیط با توجه به قوانین خطوط هوایی وجود دارد.",
    description: "ما خدمات خرید بلیط هواپیما، قطار و اتوبوس را برای مسیرهای داخلی و بین‌المللی ارائه می‌دهیم. همچنین می‌توانید برای رزرو هتل نیز از خدمات ما استفاده کنید.",
  },
};

export default function ServiceDetailContent({ service }: ServiceDetailContentProps) {
  const details = serviceDetails[service.id] || {
    features: [
      "خدمات با کیفیت و تضمین شده",
      "پشتیبانی 24 ساعته",
      "پردازش سریع",
      "امنیت بالا",
      "نرخ‌های رقابتی",
      "پردازش در کوتاه‌ترین زمان",
    ],
    steps: [
      "ثبت درخواست",
      "بررسی و تایید",
      "انجام خدمت",
      "تایید نهایی",
    ],
    description: "ما با سال‌ها تجربه در زمینه خدمات ارزی و پرداخت‌های بین‌المللی، آماده ارائه بهترین خدمات به شما هستیم.",
  };

  return (
    <>
      {/* Description */}
      {details.description && (
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 mb-6">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-3 sm:mb-4 text-right flex items-center gap-2">
            <span className="w-1 h-6 bg-[#ff5538] rounded"></span>
            درباره {service.label}
          </h2>
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-700 leading-6 sm:leading-7 text-justify sm:text-right">
            {details.description}
          </p>
        </div>
      )}

      {/* Features and Steps */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Features */}
          <div>
            <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-3 sm:mb-4 text-right flex items-center gap-2">
              <span className="w-1 h-6 bg-[#ff5538] rounded"></span>
              ویژگی‌های خدمت
            </h2>
            <ul className="space-y-2.5 sm:space-y-3 text-right">
              {details.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                  <span className="text-[#ff5538] mt-1 flex-shrink-0">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div>
            <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-3 sm:mb-4 text-right flex items-center gap-2">
              <span className="w-1 h-6 bg-[#ff5538] rounded"></span>
              مراحل انجام کار
            </h2>
            <ol className="space-y-2.5 sm:space-y-3 text-right">
              {details.steps.map((step, index) => (
                <li key={index} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                  <span className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#ff5538]/10 text-[#ff5538] flex items-center justify-center text-[10px] sm:text-xs font-bold border-2 border-[#ff5538]/20">
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {details.note && (
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg border-r-4 border-blue-500">
            <p className="text-xs sm:text-sm text-blue-800 text-right">
              <strong>نکته:</strong> {details.note}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

