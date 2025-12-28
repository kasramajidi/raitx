"use client";

import Image from "next/image";

export default function FooterRight() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-56 h-24 sm:w-64 sm:h-28 md:w-72 md:h-32 lg:w-80 lg:h-36">
        <Image
          src="/Images/Logo/acee0043-fe87-4b79-bab2-de8e09a1ebd0 (1).png"
          alt="لوگو شرکت"
          fill
          className="object-contain"
        />
      </div>

      <div className="text-center space-y-1 hidden md:block">
        <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
          Mr Premium Hub، پلتفرم معتبر و امن برای نقد کردن درآمدهای ارزی
        </p>
        <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
          پرداخت‌های بین‌المللی با بهترین نرخ و سریع‌ترین زمان
        </p>
        <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
          خدمات متنوع: پی‌پال، مسترکارت، پرداخت سفارت و آزمون‌های بین‌المللی
        </p>
        <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
          پشتیبانی ۲۴ ساعته و تضمین امنیت تمامی تراکنش‌ها
        </p>
      </div>
    </div>
  );
}

