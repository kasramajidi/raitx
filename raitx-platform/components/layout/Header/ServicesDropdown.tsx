"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { HiChevronDown } from "react-icons/hi";

interface ServiceItem {
  label: string;
  href: string;
}

const services: ServiceItem[] = [
  { label: "کارت های اعتباری", href: "/valid-cards/" },
  { label: "پرداخت ارزی", href: "/currency-payment/" },
];

export default function ServicesDropdown() {
  const pathname = usePathname();
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const isActive =
    pathname?.startsWith("/valid-cards") ||
    pathname?.startsWith("/currency-payment");

  // بستن منو با کلیک بیرون وقتی باز است (تجربهٔ بهتر با JS)
  useEffect(() => {
    const el = detailsRef.current;
    if (!el) return;
    const onMouseDown = (e: MouseEvent) => {
      if (!el.hasAttribute("open")) return;
      if (el.contains(e.target as Node)) return;
      el.removeAttribute("open");
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  return (
    <details
      ref={detailsRef}
      className="relative overflow-visible services-dropdown-details"
      aria-label="زیرمنوی خدمات"
    >
      <summary
        className={`
          list-none cursor-pointer flex items-center gap-1 text-xs min-[500px]:text-xs md:text-sm lg:text-sm font-medium transition-colors duration-200 whitespace-nowrap px-1 md:px-2
          [&::-webkit-details-marker]:hidden [&::marker]:hidden
          ${
            isActive
              ? "text-[#ff5538] font-bold"
              : "text-gray-700 hover:text-[#ff5538]"
          }
          after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:bg-[#ff5538] after:transition-all after:duration-200
          hover:after:w-full
          ${isActive ? "after:w-full" : ""}
        `}
      >
        خدمات
        <HiChevronDown className="text-base transition-transform duration-200 shrink-0 [.services-dropdown-details[open]_&]:rotate-180" />
      </summary>
      {services.length > 0 && (
        <div role="menu" className="absolute top-full left-0 rtl:left-auto rtl:right-0 mt-2 w-56 min-w-[12rem] bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-[100]">
          {services.map((service) => {
            const isServiceActive =
              pathname === service.href ||
              pathname?.startsWith(service.href.replace(/\/$/, "") + "/");
            return (
              <a
                key={service.href}
                href={service.href}
                role="menuitem"
                className={`
                  block w-full text-right px-4 py-2.5 text-sm transition-colors duration-150 border-b border-gray-100 last:border-b-0
                  ${
                    isServiceActive
                      ? "text-gray-900 font-medium bg-gray-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }
                `}
              >
                {service.label}
              </a>
            );
          })}
        </div>
      )}
    </details>
  );
}
