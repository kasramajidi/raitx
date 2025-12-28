"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiChevronDown, HiChevronLeft } from "react-icons/hi";
import { 
  HiAcademicCap, 
  HiPaperAirplane, 
  HiHome,
  HiDotsHorizontal
} from "react-icons/hi";
import { SiPaypal, SiMastercard } from "react-icons/si";
import { HiOutlineTemplate } from "react-icons/hi";
import { SiDigitalocean } from "react-icons/si";

interface ServiceItem {
  label: string;
  labelEn?: string;
  href: string;
  icon?: React.ReactNode;
}

const services: ServiceItem[] = [
  { label: "پرداخت تافل", labelEn: "TOEFL iBT", href: "/services/toefl" },
  { label: "پرداخت جی آر ای", labelEn: "GRE", href: "/services/gre" },
  { label: "نقد کردن درآمد ارزی", href: "/services/currency" },
  { 
    label: "پرداخت امور دانشگاهی", 
    href: "/services/university",
    icon: <HiAcademicCap className="text-lg" />
  },
  { 
    label: "بلیط هواپیما، قطار و اتوبوس", 
    href: "/services/tickets",
    icon: <HiPaperAirplane className="text-lg" />
  },
  { 
    label: "هتل و گردشی تفریحی", 
    href: "/services/hotel",
    icon: <HiHome className="text-lg" />
  },
  { label: "وقت سفارت کشورها", href: "/services/embassy" },
  { 
    label: "پی پال", 
    labelEn: "PayPal", 
    href: "/services/paypal",
    icon: <SiPaypal className="text-lg text-[#0070BA]" />
  },
  { 
    label: "مسترکارت", 
    labelEn: "MasterCard", 
    href: "/services/mastercard",
    icon: <SiMastercard className="text-lg text-[#EB001B]" />
  },
  { 
    label: "تم فارست", 
    labelEn: "Theme Forest", 
    href: "/services/themeforest",
    icon: <HiOutlineTemplate className="text-lg text-[#81B441]" />
  },
  { 
    label: "دیجیتال اوشن", 
    labelEn: "Digital Ocean", 
    href: "/services/digitalocean",
    icon: <SiDigitalocean className="text-lg text-[#0080FF]" />
  },
  { 
    label: "سایر پرداخت ها", 
    href: "/services/other",
    icon: <HiDotsHorizontal className="text-lg" />
  },
];

export default function ServicesDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const isActive = pathname?.startsWith("/services");

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative flex items-center gap-1 text-xs min-[500px]:text-sm md:text-sm font-medium transition-colors duration-200 cursor-pointer
          ${isActive 
            ? "text-gray-900 font-semibold" 
            : "text-gray-600 hover:text-gray-900"
          }
          after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:bg-gray-900 after:transition-all after:duration-200
          hover:after:w-full
        `}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        خدمات
        <HiChevronDown 
          className={`text-base transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 max-h-[600px] overflow-y-auto">
          {services.map((service) => {
            const isServiceActive = pathname === service.href;
            return (
              <Link
                key={service.href}
                href={service.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150
                  ${isServiceActive ? "bg-gray-50 border-r-2 border-red-500" : ""}
                `}
              >
                {service.icon && (
                  <div className="shrink-0 text-gray-500">
                    {service.icon}
                  </div>
                )}
                <div className="flex-1 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{service.label}</span>
                    {service.labelEn && (
                      <span className="text-xs text-gray-500">{service.labelEn}</span>
                    )}
                  </div>
                  <HiChevronLeft className="text-gray-400 shrink-0" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

