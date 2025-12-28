"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ServicesDropdown from "./ServicesDropdown";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "صفحه اصلی", href: "/" },
  { label: "اخبار و مقالات", href: "/news" },
  { label: "سوالات متداول", href: "/faq" },
  { label: "درباره ما", href: "/about" },
  { label: "ارتباط با ما", href: "/contact" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-3 min-[500px]:gap-4 md:gap-5 lg:gap-6 xl:gap-8 whitespace-nowrap overflow-visible" aria-label="منوی اصلی">
      <Link
        href="/"
        className={`
          relative text-xs min-[500px]:text-sm md:text-sm font-medium transition-colors duration-200 cursor-pointer
          ${pathname === "/" 
            ? "text-gray-900 font-semibold" 
            : "text-gray-600 hover:text-gray-900"
          }
          after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:bg-gray-900 after:transition-all after:duration-200
          hover:after:w-full
        `}
      >
        صفحه اصلی
      </Link>
      
      <ServicesDropdown />

      {navLinks.slice(1).map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`
              relative text-xs min-[500px]:text-sm md:text-sm font-medium transition-colors duration-200 cursor-pointer
              ${isActive 
                ? "text-gray-900 font-semibold" 
                : "text-gray-600 hover:text-gray-900"
              }
              after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:bg-gray-900 after:transition-all after:duration-200
              hover:after:w-full
            `}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

