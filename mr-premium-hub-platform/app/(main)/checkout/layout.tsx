import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تسویه حساب",
  description:
    "تسویه حساب و تکمیل سفارش در مسترپریمیوم هاب - وارد کردن اطلاعات صورتحساب و پرداخت",
  keywords: ["تسویه حساب", "پرداخت", "سفارش", "صورتحساب", "مسترپریمیوم هاب"],
  openGraph: {
    title: "تسویه حساب | مسترپریمیوم هاب",
    description: "تسویه حساب و تکمیل سفارش در مسترپریمیوم هاب",
    type: "website",
  },
  alternates: {
    canonical: "/checkout",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

