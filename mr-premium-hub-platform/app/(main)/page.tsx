import type { Metadata } from "next";
import {
  Hero,
  ServicesSection,
  PaymentMethods,
  TravelPayments,
  ExamRegistration,
  VisaPayments,
} from "@/app/(main)/components/home";

export const metadata: Metadata = {
  title: "خانه",
  description:
    "مسترپریمیوم هاب - نقد کردن درآمدهای ارزی، پرداخت با پی پال و مستر کارت، پرداخت هزینه ویزا و سفارت، ثبت نام آزمون‌های بین‌المللی، خرید بلیت هواپیما و هتل",
  keywords: [
    "نقد کردن درآمد ارزی",
    "پرداخت پی پال",
    "پرداخت مستر کارت",
    "پرداخت ویزا",
    "پرداخت هزینه سفارت",
    "ثبت نام آزمون بین‌المللی",
    "خرید بلیت هواپیما",
    "پرداخت هتل",
    "مسترپریمیوم هاب",
    "Mr Premium Hub",
  ],
  openGraph: {
    title: "مسترپریمیوم هاب | خدمات پرداخت ارزی و پی پال",
    description:
      "نقد کردن درآمدهای ارزی، پرداخت با پی پال و مستر کارت، پرداخت هزینه ویزا و سفارت، ثبت نام آزمون‌های بین‌المللی",
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "خدمات پرداخت ارزی و نقد کردن درآمد",
    provider: {
      "@type": "Organization",
      name: "مسترپریمیوم هاب",
      alternateName: "Mr Premium Hub",
    },
    areaServed: "IR",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "خدمات پرداخت ارزی",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "نقد کردن درآمد پی پال",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "پرداخت با پی پال",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "پرداخت هزینه ویزا و سفارت",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "ثبت نام آزمون‌های بین‌المللی",
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <main className="min-h-screen bg-white">
        <Hero />
        <ServicesSection />
        <PaymentMethods />
        <TravelPayments />
        <ExamRegistration />
        <VisaPayments />
      </main>
    </>
  );
}

