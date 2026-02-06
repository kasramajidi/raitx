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
      <div className="relative h-12 sm:h-14 md:h-16 lg:h-20 xl:h-20 w-auto flex items-center justify-center">
        <Image
          src="/Images/Logo/logo.png"
          alt={alt}
          width={450}
          height={120}
          className="h-full w-auto object-contain object-center"
          sizes="(max-width: 640px) 160px, (max-width: 768px) 200px, (max-width: 1024px) 240px, 280px"
          priority
        />
      </div>
    </Link>
  );
}

