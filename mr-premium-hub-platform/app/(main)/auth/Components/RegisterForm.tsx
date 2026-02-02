"use client";

import React, { useState } from "react";
import SubmitButton from "./SubmitButton";
import { signup } from "@/app/(main)/auth/lib/auth-api";

interface RegisterFormProps {
  onSwitchToLogin?: (phone?: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const n = name.trim();
    const em = email.trim();
    const p = phone.trim();
    if (!n || !em || !p) {
      setError("نام، ایمیل و شماره تماس را وارد کنید.");
      return;
    }
    setLoading(true);
    try {
      const data = await signup({ name: n, email: em, phone: p });
      if ((data as { error?: string }).error) {
        setError((data as { error?: string }).error);
      } else {
        try {
          await fetch("/api/register-log", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: n, email: em, phone: p }),
          });
        } catch {
          // نادیده؛ فقط برای لاگ محلی
        }
        setSuccess("ثبت‌نام با موفقیت انجام شد. برای ورود از فرم ورود و رمز یکبار مصرف استفاده کنید.");
        setName("");
        setEmail("");
        setPhone("");
        onSwitchToLogin?.(p);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در ارتباط با سرور.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl mb-8 text-center font-semibold text-gray-900">
        عضویت
      </h2>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {error && (
          <p className="text-sm text-red-600 bg-red-50 py-2 px-3 rounded">
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm text-green-600 bg-green-50 py-2 px-3 rounded">
            {success}
          </p>
        )}
        <div>
          <label
            className="block text-right text-gray-700 text-sm mb-1.5"
            htmlFor="register-name"
          >
            نام
          </label>
          <input
            id="register-name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="نام را وارد کنید"
            className="w-full bg-white border-b border-gray-300 py-2.5 focus:outline-none focus:border-[#ff5538] transition-colors"
          />
        </div>
        <div>
          <label
            className="block text-right text-gray-700 text-sm mb-1.5"
            htmlFor="register-email"
          >
            آدرس ایمیل
          </label>
          <input
            id="register-email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ایمیل را وارد کنید"
            className="w-full bg-white border-b border-gray-300 py-2.5 focus:outline-none focus:border-[#ff5538] transition-colors"
          />
        </div>
        <div>
          <label
            className="block text-right text-gray-700 text-sm mb-1.5"
            htmlFor="register-phone"
          >
            شماره تماس
          </label>
          <input
            id="register-phone"
            name="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="مثال: ۰۹۰۴۴۲۸۴۵۲۵"
            className="w-full bg-white border-b border-gray-300 py-2.5 focus:outline-none focus:border-[#ff5538] transition-colors"
          />
        </div>

        <p className="text-xs text-gray-500 pt-2 text-center leading-relaxed">
          با عضویت، شما{" "}
          <a
            href="#"
            className="text-[#ff5538] hover:opacity-80 transition-opacity"
          >
            شرایط استفاده
          </a>{" "}
          و{" "}
          <a
            href="#"
            className="text-[#ff5538] hover:opacity-80 transition-opacity"
          >
            حریم خصوصی
          </a>{" "}
          را می‌پذیرید.
        </p>

        <SubmitButton disabled={loading}>
          {loading ? "در حال ثبت‌نام…" : "عضویت"}
        </SubmitButton>
        {onSwitchToLogin && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              قبلاً ثبت‌نام کرده‌اید؟{" "}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-[#ff5538] hover:opacity-80 cursor-pointer transition-opacity font-medium"
              >
                ورود
              </button>
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
