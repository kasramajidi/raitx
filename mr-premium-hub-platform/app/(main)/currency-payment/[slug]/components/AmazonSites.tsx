"use client";

import Link from "next/link";
import { HiShoppingBag, HiOutlineSparkles } from "react-icons/hi";
import { MdStore, MdLocalShipping } from "react-icons/md";
import { BiCart } from "react-icons/bi";

interface AmazonSite {
  id: string;
  title: string;
  description: string;
  titleEn: string;
  href: string;
  icon: React.ReactNode;
  iconBg: string;
}

// ترتیب و آیکون‌ها مطابق تصویر: انگلیس (آبی)، آمریکا (قرمز)، کانادا (سبز)، آلمان (نارنجی)، ایتالیا (بنفش)، استرالیا (آبی روشن)
const amazonSites: AmazonSite[] = [
  {
    id: "amazon-uk",
    title: "آمازون انگلیس",
    description: "خرید از آمازون انگلیس با ارسال به ایران",
    titleEn: "Amazon UK",
    href: "/shop",
    icon: <HiOutlineSparkles className="text-white text-2xl sm:text-3xl" />,
    iconBg: "bg-blue-500",
  },
  {
    id: "amazon-usa",
    title: "آمازون آمریکا",
    description: "خرید از آمازون آمریکا با بهترین قیمت",
    titleEn: "Amazon USA",
    href: "/shop",
    icon: <MdStore className="text-white text-2xl sm:text-3xl" />,
    iconBg: "bg-red-500",
  },
  {
    id: "amazon-canada",
    title: "آمازون کانادا",
    description: "دسترسی به محصولات آمازون کانادا",
    titleEn: "Amazon Canada",
    href: "/shop",
    icon: <HiShoppingBag className="text-white text-2xl sm:text-3xl" />,
    iconBg: "bg-green-500",
  },
  {
    id: "amazon-germany",
    title: "آمازون آلمان",
    description: "خرید از آمازون آلمان با کیفیت اروپایی",
    titleEn: "Amazon Germany",
    href: "/shop",
    icon: <BiCart className="text-white text-2xl sm:text-3xl" />,
    iconBg: "bg-[#ff5538]",
  },
  {
    id: "amazon-italy",
    title: "آمازون ایتالیا",
    description: "دسترسی به محصولات منحصر به فرد ایتالیا",
    titleEn: "Amazon Italy",
    href: "/shop",
    icon: <BiCart className="text-white text-2xl sm:text-3xl" />,
    iconBg: "bg-purple-500",
  },
  {
    id: "amazon-australia",
    title: "آمازون استرالیا",
    description: "خرید از آمازون استرالیا با ارسال سریع",
    titleEn: "Amazon Australia",
    href: "/shop",
    icon: <MdLocalShipping className="text-white text-2xl sm:text-3xl" />,
    iconBg: "bg-sky-400",
  },
];

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "سایت‌های آمازون برای خرید با ارسال به ایران",
  description: "خرید از انواع سایت‌های آمازون در سراسر جهان از طریق مستر پریمیوم هاب",
  numberOfItems: 6,
  itemListElement: amazonSites.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.title,
    description: item.description,
    url: `https://mrpremiumhub.com${item.href}`,
  })),
};

export default function AmazonSites() {
  return (
    <section
      aria-labelledby="amazon-sites-heading"
      className="bg-gray-50 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6 mb-6"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <h2
        id="amazon-sites-heading"
        className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2 sm:mb-3 text-center flex items-center justify-center gap-2"
      >
        <span className="w-1 h-6 bg-[#ff5538] rounded hidden sm:block" aria-hidden></span>
        سایت‌های آمازون
        <span className="w-1 h-6 bg-[#ff5538] rounded hidden sm:block" aria-hidden></span>
      </h2>
      <p className="text-xs sm:text-sm text-gray-600 text-center mb-5 sm:mb-6 max-w-2xl mx-auto leading-relaxed">
        خرید از انواع سایت‌های آمازون در سراسر جهان از طریق مستر پریمیوم هاب
      </p>
      <nav aria-label="سایت‌های آمازون برای خرید" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {amazonSites.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            title={`شروع خرید از ${item.title}`}
            aria-label={`شروع خرید از ${item.title} - ${item.description}`}
            className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#ff5538]/20 hover:-translate-y-0.5 transition-all duration-300 group flex flex-col h-full"
          >
            <div className="flex items-center justify-center mb-4">
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full ${item.iconBg} flex items-center justify-center shadow-md group-hover:scale-110 group-hover:shadow-lg transition-transform duration-300`}
                aria-hidden
              >
                {item.icon}
              </div>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5 text-center">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 text-center mb-2 leading-6 flex-1">
              {item.description}
            </p>
            <p className="text-xs text-gray-500 text-center mb-4 not-italic font-medium">
              {item.titleEn}
            </p>
            <p className="text-xs sm:text-sm text-[#1a3760] font-semibold text-center flex justify-center group-hover:text-[#ff5538] transition-colors duration-200 mt-auto">
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                شروع خرید از {item.title}
                <span className="shrink-0 rtl:rotate-180">&lt;</span>
              </span>
            </p>
          </Link>
        ))}
      </nav>
    </section>
  );
}
