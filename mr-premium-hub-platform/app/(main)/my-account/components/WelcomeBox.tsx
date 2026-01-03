"use client";

import React from "react";

export default function WelcomeBox() {
  let username = "کاربر";
  if (typeof window !== "undefined") {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user && user.username) username = user.username;
    } catch {}
  }
  
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-6 w-full">
      <div className="flex-shrink-0">
        <div className="w-20 h-20 bg-gradient-to-br from-[#ff5538] to-[#ff7742] rounded-2xl flex items-center justify-center shadow-lg shadow-[#ff5538]/20">
          <span className="text-white text-3xl font-bold">
            {username.charAt(0).toUpperCase()}
          </span>
        </div>
      </div>
      <div className="flex-1 text-right">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          سلام {username} 👋
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed">
          به پیشخوان خود خوش آمدید. از منوی کناری برای دسترسی سریع استفاده کنید.
        </p>
      </div>
    </div>
  );
}

