"use client";

import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  alt?: string;
}

export default function Logo({ 
  alt = "لوگو شرکت"
}: LogoProps) {
  return (
    <Link 
      href="/" 
      className="inline-flex items-center group transition-opacity hover:opacity-90 cursor-pointer"
      aria-label="صفحه اصلی"
    >
      <div className="relative h-20 sm:h-22 md:h-24  w-auto flex items-center justify-center">
        <Image
          src="/Images/Logo/acee0043-fe87-4b79-bab2-de8e09a1ebd0 (1).png"
          alt={alt}
          width={450}
          height={120}
          className="h-full w-auto object-contain"
          priority
        />
      </div>
    </Link>
  );
}

