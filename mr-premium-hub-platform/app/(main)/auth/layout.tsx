import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ورود و ثبت نام | مسترپریمیوم هاب",
  description:
    "ورود به حساب کاربری یا ایجاد حساب جدید در مسترپریمیوم هاب - دسترسی به تمام خدمات",
  keywords: [
    "ورود",
    "ثبت نام",
    "حساب کاربری",
    "مسترپریمیوم هاب",
    "احراز هویت",
  ],
  alternates: {
    canonical: "/auth",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

