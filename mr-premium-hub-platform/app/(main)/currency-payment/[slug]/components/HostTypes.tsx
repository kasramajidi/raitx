"use client";

import Link from "next/link";
import { MdCloud, MdStorage, MdComputer, MdPublic } from "react-icons/md";
import { HiServer, HiGlobe } from "react-icons/hi";

interface HostType {
  id: string;
  title: string;
  description: string;
  titleEn: string;
  href: string;
  icon: React.ReactNode;
}

const hostTypes: HostType[] = [
  {
    id: "cloud-host",
    title: "هاست ابری",
    description: "هاست ابری با قابلیت مقیاس‌پذیری",
    titleEn: "Cloud Hosting",
    href: "/currency-payment/cloud-host",
    icon: <MdCloud className="text-white text-2xl sm:text-3xl" />,
  },
  {
    id: "dedicated-host",
    title: "هاست اختصاصی",
    description: "سرور اختصاصی با منابع کامل",
    titleEn: "Dedicated Hosting",
    href: "/currency-payment/dedicated-host",
    icon: <HiServer className="text-white text-2xl sm:text-3xl" />,
  },
  {
    id: "shared-host",
    title: "هاست اشتراکی",
    description: "مناسب برای وب‌سایت‌های کوچک و متوسط",
    titleEn: "Shared Hosting",
    href: "/currency-payment/shared-host",
    icon: <MdStorage className="text-white text-2xl sm:text-3xl" />,
  },
  {
    id: "hetzner-host",
    title: "هاست Hetzner",
    description: "هاست آلمانی Hetzner با کیفیت بالا",
    titleEn: "Hetzner Hosting",
    href: "/currency-payment/hetzner-host",
    icon: <MdComputer className="text-white text-2xl sm:text-3xl" />,
  },
  {
    id: "godaddy-host",
    title: "هاست GoDaddy",
    description: "هاست معتبر GoDaddy با پشتیبانی کامل",
    titleEn: "GoDaddy Hosting",
    href: "/currency-payment/godaddy-host",
    icon: <HiGlobe className="text-white text-2xl sm:text-3xl" />,
  },
  {
    id: "vps-host",
    title: "سرور مجازی VPS",
    description: "سرور مجازی با کنترل کامل",
    titleEn: "VPS Hosting",
    href: "/currency-payment/vps-host",
    icon: <MdPublic className="text-white text-2xl sm:text-3xl" />,
  },
];

export default function HostTypes() {
  return (
    <div className="bg-gray-50 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6 mb-6">
      <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2 sm:mb-3 text-center">
        انواع هاست خارجی
      </h2>
      <p className="text-xs sm:text-sm text-gray-600 text-center mb-4 sm:mb-6">
        خرید انواع هاست‌های خارجی از بهترین ارائه‌دهندگان جهان از طریق مستر پریمیوم هاب
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {hostTypes.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-center justify-center mb-3">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-[#1a3760] flex items-center justify-center">
                {item.icon}
              </div>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1 text-center">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 text-center mb-2 leading-5">
              {item.description}
            </p>
            <p className="text-xs text-gray-500 text-center mb-3">
              {item.titleEn}
            </p>
            <p className="text-xs sm:text-sm text-[#ff5538] font-medium text-center flex justify-center group-hover:text-[#1a3760] transition-colors duration-200">
              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                مشاهده جزئیات
                <span className="shrink-0 rtl:rotate-180">←</span>
              </span>
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
