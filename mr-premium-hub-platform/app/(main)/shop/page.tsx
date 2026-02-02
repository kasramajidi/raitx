import type { Metadata } from "next";
import ShopPageClient from "./components/ShopPageClient";
import { fetchShopProducts } from "./lib/shop-api";

export const metadata: Metadata = {
  title: "فروشگاه گیفت کارت و خدمات مالی دیجیتال",
  description:
    "خرید و فروش گیفت کارت‌های معتبر بین‌المللی؛ استیم، گوگل پلی، اپل، ایکس‌باکس، پلی‌استیشن، نتفلیکس، اسپاتیفای، آمازون و سایر پلتفرم‌ها. تحویل فوری و پشتیبانی ۲۴/۷ از مستر پریمیوم هاب.",
  keywords: [
    "فروشگاه گیفت کارت",
    "گیفت کارت استیم",
    "گیفت کارت گوگل پلی",
    "گیفت کارت اپل",
    "گیفت کارت ایکس‌باکس",
    "گیفت کارت پلی‌استیشن",
    "گیفت کارت نتفلیکس",
    "خرید گیفت کارت",
    "خدمات مالی دیجیتال",
    "مستر پریمیوم هاب",
  ],
  openGraph: {
    title: "فروشگاه گیفت کارت | مستر پریمیوم هاب",
    description:
      "خرید گیفت کارت‌های معتبر بین‌المللی با تحویل فوری و پشتیبانی ۲۴/۷",
    type: "website",
  },
  alternates: {
    canonical: "/shop",
  },
};

export default async function ShopPage() {
  let initialProducts: Awaited<ReturnType<typeof fetchShopProducts>> = [];
  try {
    initialProducts = await fetchShopProducts();
  } catch {
    // Client will show error/retry when user refetches
  }
  const shopJsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "فروشگاه مستر پریمیوم هاب",
    description:
      "خرید و فروش گیفت کارت‌های معتبر بین‌المللی و خدمات مالی دیجیتال؛ تحویل فوری و پشتیبانی ۲۴/۷",
    url: `${
      process.env.NEXT_PUBLIC_SITE_URL || "https://mrpremiumhub.com"
    }/shop`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(shopJsonLd) }}
      />
      <ShopPageClient initialProducts={initialProducts} />
    </>
  );
}
