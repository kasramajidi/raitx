"use client";

import { useState } from "react";
import { Service } from "../../components/servicesData";

interface ServiceFormProps {
  service: Service;
}

export default function ServiceForm({ service }: ServiceFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6">
      <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-right">
        درخواست {service.label}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs sm:text-sm text-gray-700 mb-1.5 text-right">
              نام و نام خانوادگی
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 rounded-lg border border-gray-200 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-transparent text-right"
              placeholder="نام خود را وارد کنید"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm text-gray-700 mb-1.5 text-right">
              ایمیل
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 rounded-lg border border-gray-200 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-transparent text-right"
              placeholder="email@example.com"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs sm:text-sm text-gray-700 mb-1.5 text-right">
              شماره تماس
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 rounded-lg border border-gray-200 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-transparent text-right"
              placeholder="09123456789"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm text-gray-700 mb-1.5 text-right">
              مبلغ (ریال)
            </label>
            <input
              type="number"
              required
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 rounded-lg border border-gray-200 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-transparent text-right"
              placeholder="مبلغ را وارد کنید"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs sm:text-sm text-gray-700 mb-1.5 text-right">
            توضیحات (اختیاری)
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 rounded-lg border border-gray-200 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-transparent resize-none text-right"
            placeholder="توضیحات اضافی را اینجا وارد کنید"
          />
        </div>
        <button
          type="submit"
          className="w-full text-white text-xs sm:text-sm font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#ff5538' }}
        >
          ارسال درخواست
        </button>
      </form>
    </div>
  );
}

