"use client";

import Image from "next/image";

export default function FooterRight() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-64 h-28 sm:w-72 sm:h-32 md:w-80 md:h-36 lg:w-96 lg:h-44">
        <Image
          src="/Images/Logo/logo.png"
          alt="لوگو شرکت"
          fill
          className="object-contain object-center"
          sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
        />
      </div>

      <div className="text-center space-y-1 hidden md:block">
        <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
          مستر پریمیوم هاب (Mr Premium Hub) — خدمات ارزی و پرداخت ارزی
        </p>
        <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
          تلفن: <a href="tel:02191320700" className="hover:text-white">۰۲۱-۹۱۳۲۰۷۰۰</a> | ایمیل: <a href="mailto:support@tehranpayment.com" className="hover:text-white">support@tehranpayment.com</a>
        </p>
        <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
          آدرس: تهران، خیابان کارگر شمالی، نبش بزرگراه جلال آل احمد، کوچه چهارم، پلاک ۴۰، طبقه سوم
        </p>
      </div>
    </div>
  );
}

