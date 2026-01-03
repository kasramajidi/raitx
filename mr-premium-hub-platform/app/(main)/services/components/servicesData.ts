import React from "react";
import { 
  HiAcademicCap, 
  HiPaperAirplane, 
  HiHome,
  HiDotsHorizontal,
  HiCreditCard,
  HiGlobe
} from "react-icons/hi";
import { SiPaypal, SiMastercard } from "react-icons/si";
import { HiOutlineTemplate } from "react-icons/hi";
import { SiDigitalocean } from "react-icons/si";
import { FaBitcoin } from "react-icons/fa";
import { BiTransfer } from "react-icons/bi";

export interface Service {
  id: string;
  label: string;
  labelEn?: string;
  href: string;
  icon: React.ReactNode;
  description: string;
  category: "payment" | "travel" | "education" | "crypto" | "other";
}

export const services: Service[] = [
  {
    id: "paypal",
    label: "پی پال",
    labelEn: "PayPal",
    href: "/services/paypal",
    icon: React.createElement(SiPaypal, { className: "text-3xl sm:text-4xl md:text-5xl text-[#0070BA]" }),
    description: "نقد کردن درآمد پی پال و پرداخت با پی پال",
    category: "payment",
  },
  {
    id: "mastercard",
    label: "مسترکارت",
    labelEn: "MasterCard",
    href: "/services/mastercard",
    icon: React.createElement(SiMastercard, { className: "text-3xl sm:text-4xl md:text-5xl text-[#EB001B]" }),
    description: "دریافت و استفاده از کارت‌های اعتباری بین‌المللی",
    category: "payment",
  },
  {
    id: "credit-cards",
    label: "کارت های اعتباری",
    labelEn: "Credit Cards",
    href: "/services/credit-cards",
    icon: React.createElement(HiCreditCard, { className: "text-3xl sm:text-4xl md:text-5xl text-[#ff5538]" }),
    description: "دریافت انواع کارت‌های اعتباری بین‌المللی",
    category: "payment",
  },
  {
    id: "crypto",
    label: "ارز دیجیتال",
    labelEn: "Cryptocurrency",
    href: "/services/crypto",
    icon: React.createElement(FaBitcoin, { className: "text-3xl sm:text-4xl md:text-5xl text-[#F7931A]" }),
    description: "خرید و فروش ارزهای دیجیتال",
    category: "crypto",
  },
  {
    id: "transfer",
    label: "حواله ارزی",
    labelEn: "Money Transfer",
    href: "/services/transfer",
    icon: React.createElement(BiTransfer, { className: "text-3xl sm:text-4xl md:text-5xl text-[#1a3760]" }),
    description: "ارسال حواله ارزی به سراسر جهان",
    category: "payment",
  },
  {
    id: "toefl",
    label: "پرداخت تافل",
    labelEn: "TOEFL iBT",
    href: "/services/toefl",
    icon: React.createElement(HiAcademicCap, { className: "text-3xl sm:text-4xl md:text-5xl text-[#ff5538]" }),
    description: "پرداخت هزینه آزمون تافل",
    category: "education",
  },
  {
    id: "gre",
    label: "پرداخت جی آر ای",
    labelEn: "GRE",
    href: "/services/gre",
    icon: React.createElement(HiAcademicCap, { className: "text-3xl sm:text-4xl md:text-5xl text-[#1a3760]" }),
    description: "پرداخت هزینه آزمون GRE",
    category: "education",
  },
  {
    id: "university",
    label: "پرداخت امور دانشگاهی",
    labelEn: "University Payments",
    href: "/services/university",
    icon: React.createElement(HiAcademicCap, { className: "text-3xl sm:text-4xl md:text-5xl text-[#0070BA]" }),
    description: "پرداخت هزینه‌های دانشگاهی و اپلیکیشن فی",
    category: "education",
  },
  {
    id: "tickets",
    label: "بلیط هواپیما، قطار و اتوبوس",
    labelEn: "Tickets",
    href: "/services/tickets",
    icon: React.createElement(HiPaperAirplane, { className: "text-3xl sm:text-4xl md:text-5xl text-[#ff5538]" }),
    description: "خرید بلیط هواپیما، قطار و اتوبوس",
    category: "travel",
  },
  {
    id: "hotel",
    label: "هتل و گردشی تفریحی",
    labelEn: "Hotels & Tourism",
    href: "/services/hotel",
    icon: React.createElement(HiHome, { className: "text-3xl sm:text-4xl md:text-5xl text-[#81B441]" }),
    description: "رزرو هتل و خدمات گردشگری",
    category: "travel",
  },
  {
    id: "embassy",
    label: "وقت سفارت کشورها",
    labelEn: "Embassy Appointments",
    href: "/services/embassy",
    icon: React.createElement(HiGlobe, { className: "text-3xl sm:text-4xl md:text-5xl text-[#1a3760]" }),
    description: "پرداخت هزینه ویزا و رزرو وقت سفارت",
    category: "travel",
  },
  {
    id: "themeforest",
    label: "تم فارست",
    labelEn: "Theme Forest",
    href: "/services/themeforest",
    icon: React.createElement(HiOutlineTemplate, { className: "text-3xl sm:text-4xl md:text-5xl text-[#81B441]" }),
    description: "خرید قالب و افزونه از تم فارست",
    category: "other",
  },
  {
    id: "digitalocean",
    label: "دیجیتال اوشن",
    labelEn: "Digital Ocean",
    href: "/services/digitalocean",
    icon: React.createElement(SiDigitalocean, { className: "text-3xl sm:text-4xl md:text-5xl text-[#0080FF]" }),
    description: "پرداخت هزینه سرویس‌های دیجیتال اوشن",
    category: "other",
  },
  {
    id: "currency",
    label: "نقد کردن درآمد ارزی",
    labelEn: "Currency Exchange",
    href: "/services/currency",
    icon: React.createElement(BiTransfer, { className: "text-3xl sm:text-4xl md:text-5xl text-[#ff5538]" }),
    description: "تبدیل و نقد کردن درآمدهای ارزی",
    category: "payment",
  },
  {
    id: "other",
    label: "سایر پرداخت ها",
    labelEn: "Other Payments",
    href: "/services/other",
    icon: React.createElement(HiDotsHorizontal, { className: "text-3xl sm:text-4xl md:text-5xl text-gray-600" }),
    description: "سایر خدمات پرداخت و ارزی",
    category: "other",
  },
];

export const serviceCategories = [
  { id: "all", label: "همه خدمات", value: "all" },
  { id: "payment", label: "پرداخت", value: "payment" },
  { id: "travel", label: "مسافرتی", value: "travel" },
  { id: "education", label: "دانشگاهی", value: "education" },
  { id: "crypto", label: "ارز دیجیتال", value: "crypto" },
  { id: "other", label: "سایر", value: "other" },
];

