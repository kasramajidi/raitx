"use client";

import Link from "next/link";
import ReactCountryFlag from "react-country-flag";

interface SimCardType {
  id: string;
  title: string;
  subtitle: string;
  titleEn: string;
  href: string;
  flagCode?: string;
  icon?: React.ReactNode;
}

const simCardTypes: SimCardType[] = [
  {
    id: "austria-sim",
    title: "خرید سیم کارتهای اتریش",
    subtitle: "سیم کارتهای اتریش با کیفیت بالا",
    titleEn: "Austria SIM Cards",
    href: "/currency-payment/austria-sim",
    flagCode: "AT",
  },
  {
    id: "ee-uk-sim",
    title: "سیم کارت EE انگلستان",
    subtitle: "سیم کارت اختصاصی انگلستان",
    titleEn: "EE UK SIM Card",
    href: "/currency-payment/ee-uk-sim",
    flagCode: "GB",
  },
  {
    id: "world-sim",
    title: "سیم کارت بین المللی World Sim",
    subtitle: "سیم کارت جهانی با پوشش گسترده",
    titleEn: "World Sim International",
    href: "/currency-payment/world-sim",
    icon: (
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-600 flex items-center justify-center">
        <span className="text-white text-2xl sm:text-3xl">🌍</span>
      </div>
    ),
  },
  {
    id: "asda-sim",
    title: "سیم کارت فیزیکی ASDA",
    subtitle: "سیم کارت ASDA با قیمت مناسب",
    titleEn: "ASDA Physical SIM",
    href: "/currency-payment/asda-sim",
    icon: (
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-600 flex items-center justify-center">
        <span className="text-white text-lg sm:text-xl font-bold">ASDA</span>
      </div>
    ),
  },
  {
    id: "georgia-sim",
    title: "سیم کارت فیزیکی گرجستان",
    subtitle: "سیم کارت فیزیکی گرجستان",
    titleEn: "Georgia Physical SIM",
    href: "/currency-payment/georgia-sim",
    flagCode: "GE",
  },
  {
    id: "estonia-sim",
    title: "سیم کارت بین المللی استونی",
    subtitle: "سیم کارت استونی برای اروپا",
    titleEn: "Estonia International SIM",
    href: "/currency-payment/estonia-sim",
    flagCode: "EE",
  },
];

export default function SimCardTypes() {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 mb-6">
      <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-center">
        خرید انواع سیم کارت خارجی و بین المللی
      </h2>
      <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 text-center mb-4 sm:mb-6">
        خرید معتبرترین سیم کارت‌های بین المللی از طریق خدمت پرداخت ارزی مستر پریمیوم هاب
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {simCardTypes.map((simCard) => (
          <Link
            key={simCard.id}
            href={simCard.href}
            className="bg-white rounded-lg p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-blue-300 group"
          >
            <div className="flex flex-col items-center text-center">
              {/* Icon/Flag */}
              <div className="mb-3 sm:mb-4">
                {simCard.flagCode ? (
                  <ReactCountryFlag
                    countryCode={simCard.flagCode}
                    svg
                    style={{
                      width: "4rem",
                      height: "4rem",
                    }}
                    title={simCard.flagCode}
                    className="rounded-lg"
                  />
                ) : (
                  simCard.icon
                )}
              </div>

              {/* Title */}
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {simCard.title}
              </h3>

              {/* Subtitle */}
              <p className="text-[10px] sm:text-xs text-gray-600 leading-5 sm:leading-6 mb-2">
                {simCard.subtitle}
              </p>

              {/* English Label */}
              <p className="text-[9px] sm:text-[10px] text-gray-400">
                {simCard.titleEn}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
