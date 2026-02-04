"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  name: string;
  href: string;
  icon: string;
}

const navItems: NavItem[] = [
  { name: "داشبورد", href: "/admin", icon: "📊" },
  { name: "مقالات", href: "/admin/articles", icon: "📝" },
  { name: "محصولات", href: "/admin/products", icon: "🛍️" },
  { name: "سفارشات", href: "/admin/orders", icon: "📦" },
  { name: "کاربران", href: "/admin/users", icon: "👥" },
  { name: "انتقادات و پیشنهادات", href: "/admin/comments", icon: "💬" },
  { name: "کامنت فروشگاه", href: "/admin/shop-comments", icon: "🛒" },
  { name: "کامنت مقاله‌ها", href: "/admin/article-comments", icon: "📄" },
  { name: "پشتیبانی", href: "/admin/support", icon: "💬" },
  { name: "تنظیمات", href: "/admin/settings", icon: "⚙️" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 lg:w-60 bg-white border-l border-gray-200/80 min-h-[calc(100vh-53px)] sticky top-[53px] shrink-0">
      <nav className="p-3 space-y-0.5" aria-label="منوی ادمین">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#ff5538] text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span className="text-base leading-none">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
