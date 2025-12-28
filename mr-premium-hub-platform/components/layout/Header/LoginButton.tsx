"use client";

import Link from "next/link";
import { HiOutlineLogin } from "react-icons/hi";

interface LoginButtonProps {
  isAuthenticated?: boolean;
}

export default function LoginButton({ isAuthenticated = false }: LoginButtonProps) {
  if (isAuthenticated) {
    return null;
  }

  return (
    <Link
      href="/auth"
      className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#0066FF] hover:bg-[#0052CC] active:bg-[#003D99] text-white px-2.5 min-[500px]:px-3 sm:px-4 md:px-4 py-1.5 min-[500px]:py-2 sm:py-2.5 rounded-lg font-medium text-xs min-[500px]:text-xs sm:text-sm transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
      aria-label="ورود / ثبت نام"
    >
      <HiOutlineLogin className="text-sm min-[500px]:text-base sm:text-lg flex-shrink-0" />
      <span className="whitespace-nowrap hidden min-[500px]:inline">ورود / ثبت نام</span>
    </Link>
  );
}

