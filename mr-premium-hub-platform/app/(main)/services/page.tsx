import type { Metadata } from "next";
import { ServicesHeader, ServicesGrid } from "./components";

export const metadata: Metadata = {
  title: "خدمات ما",
  description: "خدمات پرداخت ارزی، مسافرتی، دانشگاهی و سایر خدمات بین‌المللی مسترپریمیوم هاب",
  keywords: [
    "خدمات",
    "پرداخت ارزی",
    "پی پال",
    "کارت اعتباری",
    "مسافرتی",
    "دانشگاهی",
    "مسترپریمیوم هاب",
  ],
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-8 sm:pt-10 md:pt-12 pb-6 sm:pb-8 md:pb-10">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        <ServicesHeader />
        <ServicesGrid />
      </div>
    </main>
  );
}

