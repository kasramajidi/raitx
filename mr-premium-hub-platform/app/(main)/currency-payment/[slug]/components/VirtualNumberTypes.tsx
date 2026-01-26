"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { SiOpenai, SiPaypal, SiGoogle } from "react-icons/si";
import { MdShare, MdPhone } from "react-icons/md";
import ReactCountryFlag from "react-country-flag";

interface VirtualNumberType {
  id: string;
  title: string;
  subtitle: string;
  titleEn: string;
  href: string;
  icon?: React.ReactNode;
  flagCode?: string;
  iconColor: string;
}

const virtualNumberTypes: VirtualNumberType[] = [
  {
    id: "openai-virtual-number",
    title: "شماره مجازی OpenAI",
    subtitle: "شماره مجازی برای ثبت نام در OpenAI",
    titleEn: "OpenAI Virtual Number",
    href: "/currency-payment/openai-virtual-number",
    icon: <SiOpenai className="text-white text-3xl sm:text-4xl" />,
    iconColor: "bg-green-600",
  },
  {
    id: "usa-virtual-number",
    title: "شماره مجازی آمریکا",
    subtitle: "شماره مجازی آمریکا برای سرویسهای مختلف",
    titleEn: "USA Virtual Number",
    href: "/currency-payment/usa-virtual-number",
    icon: (
      <ReactCountryFlag
        countryCode="US"
        svg
        style={{
          width: "3.5rem",
          height: "3.5rem",
        }}
        title="US"
        className="rounded-lg"
      />
    ),
    iconColor: "bg-red-600",
  },
  {
    id: "paypal-virtual-number",
    title: "شماره مجازی PayPal",
    subtitle: "شماره مجازی برای تایید حساب PayPal",
    titleEn: "PayPal Virtual Number",
    href: "/currency-payment/paypal-virtual-number",
    icon: <SiPaypal className="text-white text-3xl sm:text-4xl" />,
    iconColor: "bg-blue-600",
  },
  {
    id: "social-media-virtual-number",
    title: "شماره مجازی شبکه های اجتماعی",
    subtitle: "شماره مجازی برای ثبت نام در شبکه های اجتماعی",
    titleEn: "Social Media Virtual Number",
    href: "/currency-payment/social-media-virtual-number",
    icon: <MdShare className="text-white text-3xl sm:text-4xl" />,
    iconColor: "bg-purple-600",
  },
  {
    id: "whatsapp-virtual-number",
    title: "شماره مجازی WhatsApp",
    subtitle: "شماره مجازی برای ایجاد حساب WhatsApp",
    titleEn: "WhatsApp Virtual Number",
    href: "/currency-payment/whatsapp-virtual-number",
    icon: <FaWhatsapp className="text-white text-3xl sm:text-4xl" />,
    iconColor: "bg-green-500",
  },
  {
    id: "google-voice-number",
    title: "شماره مجازی Google Voice",
    subtitle: "شماره مجازی Google Voice با قیمت ۹ دلار",
    titleEn: "Google Voice Number",
    href: "/currency-payment/google-voice-number",
    icon: (
      <div className="flex items-center justify-center gap-1">
        <SiGoogle className="text-white text-2xl sm:text-3xl" />
        <MdPhone className="text-white text-xl sm:text-2xl" />
      </div>
    ),
    iconColor: "bg-orange-600",
  },
];

export default function VirtualNumberTypes() {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 mb-6">
      <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-center">
        انواع شماره مجازی
      </h2>
      <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 text-center mb-4 sm:mb-6">
        خرید انواع شماره های مجازی برای سرویسهای مختلف از طریق مستر پریمیوم هاب
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {virtualNumberTypes.map((virtualNumber) => (
          <Link
            key={virtualNumber.id}
            href={virtualNumber.href}
            className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-400 group"
          >
            <div className="flex flex-col items-center text-center">
              {/* Icon */}
              <div className="mb-4 sm:mb-5">
                {virtualNumber.id === "usa-virtual-number" ? (
                  <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl ${virtualNumber.iconColor} flex items-center justify-center overflow-hidden shadow-md`}>
                    {virtualNumber.icon}
                  </div>
                ) : (
                  <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl ${virtualNumber.iconColor} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}>
                    {virtualNumber.icon}
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors min-h-10 flex items-center justify-center">
                {virtualNumber.title}
              </h3>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-gray-600 leading-5 sm:leading-6 mb-2 sm:mb-3 min-h-10">
                {virtualNumber.subtitle}
              </p>

              {/* English Label */}
              <p className="text-[10px] sm:text-xs text-gray-400 mb-3 sm:mb-4">
                {virtualNumber.titleEn}
              </p>

              {/* View Details Link */}
              <div className="mt-auto flex items-center justify-center gap-1 text-blue-600 text-xs sm:text-sm font-medium group-hover:text-blue-700 transition-colors">
                <span>مشاهده جزئیات</span>
                <span className="text-sm">&lt;</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
