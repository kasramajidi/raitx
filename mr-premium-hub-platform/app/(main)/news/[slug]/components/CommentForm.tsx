"use client";

import { useState } from "react";
import { HiArrowLeft } from "react-icons/hi";

export default function CommentForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({ name: "", email: "", comment: "" });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-200 mt-10">
      <h3 className="text-lg sm:text-xl font-bold mb-6" style={{ color: '#1a3760' }}>
        دیدگاه خود را بنویسید
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              نام شما
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5538] focus:border-transparent outline-none transition-all text-sm"
              placeholder="نام خود را وارد کنید"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              ایمیل شما
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5538] focus:border-transparent outline-none transition-all text-sm"
              placeholder="ایمیل خود را وارد کنید"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            دیدگاه شما
          </label>
          <textarea
            id="comment"
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            rows={5}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5538] focus:border-transparent outline-none transition-all resize-none text-sm"
            placeholder="دیدگاه خود را بنویسید..."
            required
          />
        </div>
        
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#ff5538] to-[#ff7744] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-[#ff5538]/25 transition-all duration-300 hover:scale-105 text-sm"
        >
          <span>ارسال دیدگاه</span>
          <HiArrowLeft className="rotate-180 text-sm" />
        </button>
      </form>
    </div>
  );
}

