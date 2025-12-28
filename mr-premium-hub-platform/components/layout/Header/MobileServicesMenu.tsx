"use client";

import { useState } from "react";
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

interface MobileServicesMenuProps {
  onClose: () => void;
}

export default function MobileServicesMenu({ onClose }: MobileServicesMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isActive = pathname?.startsWith("/services");

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between px-6 py-3 text-base font-medium transition-colors duration-200 relative cursor-pointer
          ${
            isActive
              ? "text-gray-900 bg-gray-50 border-r-4 border-gray-900"
              : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          }
        `}
      >
        <span>خدمات</span>
        <HiChevronDown 
          className={`text-xl transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      {isOpen && (
        <div className="bg-gray-50">
          {services.map((service) => {
            const isServiceActive = pathname === service.href;
            return (
              <Link
                key={service.href}
                href={service.href}
                onClick={handleClose}
                className={`
                  flex items-center gap-3 px-10 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150
                  ${isServiceActive ? "bg-gray-100 border-r-4 border-red-500" : ""}
                `}
              >
                {service.icon && (
                  <div className="shrink-0 text-gray-500">
                    {service.icon}
                  </div>
                )}
                <div className="flex-1 flex flex-col">
                  <span className="text-sm font-medium">{service.label}</span>
                  {service.labelEn && (
                    <span className="text-xs text-gray-500">{service.labelEn}</span>
                  )}
                </div>
                <HiChevronLeft className="text-gray-400 shrink-0" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

