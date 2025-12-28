"use client";

import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

const footerLinks: FooterLink[] = [
  { label: "صفحه اصلی", href: "/" },
  { label: "عضویت", href: "/register" },
  { label: "ورود به سامانه", href: "/login" },
  { label: "پرداخت با مستر کارت", href: "/payment/mastercard" },
  { label: "پرداخت با پی پال", href: "/payment/paypal" },
  { label: "پرداخت ناقل", href: "/payment/carrier" },
  { label: "پرداخت هتل خارجی", href: "/payment/hotel" },
  { label: "اخبار و اطلاعیه ها", href: "/news" },
  { label: "مقالات و آموزش ها", href: "/articles" },
];

export default function FooterCenter() {
  return (
    <nav className="flex flex-col items-center space-y-2 md:space-y-3">
      {footerLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm md:text-base text-gray-300 hover:text-white transition-colors duration-200"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

