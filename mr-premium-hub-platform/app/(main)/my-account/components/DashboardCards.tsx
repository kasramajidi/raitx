"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { User, Heart, LogOut, Map, Download, List } from "lucide-react";

const cards = [
  { icon: <List size={28} className="mx-auto text-gray-400 group-hover:text-[#ff5538]" />, label: "سفارش ها", section: "orders" },
  { icon: <Download size={28} className="mx-auto text-gray-400 group-hover:text-[#ff5538]" />, label: "دانلود ها", section: "downloads" },
  { icon: <Map size={28} className="mx-auto text-gray-400 group-hover:text-[#ff5538]" />, label: "آدرس", section: "addresses" },
  { icon: <LogOut size={28} className="mx-auto text-gray-400 group-hover:text-[#ff5538]" />, label: "خروج", section: "logout" },
  { icon: <Heart size={28} className="mx-auto text-gray-400 group-hover:text-[#ff5538]" />, label: "علاقمندی", section: "favorites" },
  { icon: <User size={28} className="mx-auto text-gray-400 group-hover:text-[#ff5538]" />, label: "جزئیات حساب", section: "accountDetails" },
];

export default function DashboardCards() {
  const router = useRouter();

  const handleCardClick = (section: string) => {
    if (section === "logout") {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent('userLogout'));
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        router.push("/auth", { scroll: false });
      }
    } else if (section === "favorites") {
      router.push("/my-account/favorites", { scroll: false });
    } else {
      router.push(`/my-account/${section}`, { scroll: false });
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white rounded-xl p-5 flex flex-col items-center justify-center min-h-[110px] cursor-pointer group border border-gray-100 hover:border-[#ff5538]/30 hover:shadow-lg hover:shadow-[#ff5538]/5 transition-all duration-200"
          onClick={() => handleCardClick(card.section)}
        >
          <div className="w-12 h-12 rounded-lg bg-gray-50 group-hover:bg-[#ff5538]/10 flex items-center justify-center mb-3 transition-colors duration-200">
            <span className="group-hover:text-[#ff5538] text-gray-400 transition-colors duration-200">
              {card.icon}
            </span>
          </div>
          <div className="text-xs md:text-sm group-hover:text-[#ff5538] text-gray-700 font-medium transition-colors duration-200 text-center">
            {card.label}
          </div>
        </div>
      ))}
    </div>
  );
}

