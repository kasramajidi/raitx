import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";
import { fetchShopProducts } from "@/app/(main)/shop/lib/shop-api";

export const metadata: Metadata = {
  title: "خدمات ارزی و پرداخت ارزی | مستر پریمیوم هاب",
  description:
    "نقد درآمد پی‌پال، پرداخت با مسترکارت، پرداخت هزینه ویزا و سفارت، ثبت‌نام آزمون‌های بین‌المللی، خرید بلیت هواپیما و هتل. قیمت‌ها از پنل مدیریت قابل تنظیم است.",
  keywords: [
    "خدمات ارزی",
    "پرداخت ارزی",
    "نقد پی‌پال",
    "مسترکارت",
    "ویزا و سفارت",
    "ثبت نام آزمون",
    "بلیت هواپیما",
    "مستر پریمیوم هاب",
  ],
  openGraph: {
    title: "خدمات ارزی | مستر پریمیوم هاب",
    description: "خدمات ارزی و پرداخت ارزی با بهترین نرخ و پشتیبانی ۲۴/۷",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://mrpremiumhub.com"}/services`,
    siteName: "مسترپریمیوم هاب",
    locale: "fa_IR",
  },
  alternates: {
    canonical: "/services",
  },
};

export default async function ServicesPage() {
  let initialProducts: Awaited<ReturnType<typeof fetchShopProducts>> = [];
  try {
    initialProducts = await fetchShopProducts();
  } catch {
    // client will refetch on error
  }
  return <ServicesPageClient initialProducts={initialProducts} />;
}
