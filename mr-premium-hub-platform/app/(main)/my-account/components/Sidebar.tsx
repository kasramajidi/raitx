"use client";

import React from "react";
import { useRouter } from "next/navigation";

const menuItems = [
  { label: "پیشخوان", value: "dashboard" },
  { label: "سفارش ها", value: "orders" },
  { label: "دانلودها", value: "downloads" },
  { label: "آدرس ها", value: "addresses" },
  { label: "جزئیات حساب", value: "accountDetails" },
  { label: "خروج", value: "logout" },
];

interface SidebarProps {
  active: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({ active, onSectionChange }: SidebarProps) {
  const router = useRouter();

  const handleClick = (value: string) => {
    if (value === "logout") {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent('userLogout'));
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        router.push("/auth", { scroll: false });
      }
    } else {
      onSectionChange(value);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm">
      {menuItems.map((item) => (
        <button
          key={item.value}
          className={`w-full text-right px-4 py-3 rounded-xl transition-all duration-200 font-medium cursor-pointer mb-1 text-sm
            ${active === item.value 
              ? "bg-[#ff5538] text-white shadow-md shadow-[#ff5538]/20" 
              : "bg-transparent text-gray-700 hover:bg-gray-50 hover:text-[#ff5538]"}`}
          onClick={() => handleClick(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

