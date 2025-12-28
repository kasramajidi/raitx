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
      <div className="relative h-8 sm:h-9 md:h-10 lg:h-12 xl:h-14 w-auto flex items-center justify-center">
        <Image
          src="/Images/Logo/logo stock copy 2.png"
          alt={alt}
          width={180}
          height={60}
          className="h-full w-auto object-contain"
          priority
        />
      </div>
    </Link>
  );
}

