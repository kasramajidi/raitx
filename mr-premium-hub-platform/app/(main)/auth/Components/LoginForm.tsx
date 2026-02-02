"use client";

import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import SubmitButton from "./SubmitButton";
import { login, requestSmsPass } from "@/app/(main)/auth/lib/auth-api";
import { setAuthCookie } from "@/app/(main)/auth/lib/cookie";

const AUTH_STORAGE_KEY = "loginval";

interface LoginFormProps {
  initialPhone?: string;
  onSwitchToRegister?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  initialPhone = "",
  onSwitchToRegister,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState(initialPhone);
  const [pass, setPass] = useState("");
  useEffect(() => {
    setPhone(initialPhone ?? "");
  }, [initialPhone]);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [smsLoading, setSmsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const p = phone.trim();
    const pw = pass.trim();
    if (!p || !pw) {
      setError("شماره تماس و رمز یکبار مصرف را وارد کنید.");
      return;
    }
    setLoading(true);
    try {
      const data = await login({ phone: p, pass: pw });
      if (data.cookie) {
        setAuthCookie(data.cookie, rememberMe);
        if (typeof localStorage !== "undefined") {
          localStorage.setItem(AUTH_STORAGE_KEY, data.cookie);
        }
        setSuccess("ورود با موفقیت انجام شد.");
        setPass("");
        // در صورت تمایل می‌توان ریدایرکت کرد، مثلاً به /
      } else {
        setError((data as { error?: string }).error || "ورود ناموفق بود.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در ارتباط با سرور.");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestSms = async () => {
    const p = phone.trim();
    if (!p) {
      setError("شماره تماس را وارد کنید.");
      return;
    }
    setError("");
    setSuccess("");
    setSmsLoading(true);
    try {
      const data = await requestSmsPass(p);
      const apiError = (data as { error?: string }).error;
      if (apiError) {
        setError(apiError);
        setSmsLoading(false);
        return;
      }
      const code =
        typeof (data as { pass?: string }).pass === "string"
          ? (data as { pass: string }).pass
          : typeof (data as { code?: string }).code === "string"
            ? (data as { code: string }).code
            : typeof (data as { otp?: string }).otp === "string"
              ? (data as { otp: string }).otp
              : null;
      if (code) {
        setPass(code);
        setSuccess(
          `رمز یکبار مصرف: ${code} (در فیلد رمز قرار گرفت؛ در صورت عدم دریافت اس‌ام‌اس از همین استفاده کنید.)`
        );
      } else {
        setSuccess("رمز یکبار مصرف به شماره شما ارسال شد.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در ارسال رمز.");
    } finally {
      setSmsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl mb-8 text-center font-semibold text-gray-900">
        ورود
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
            htmlFor="login-phone"
          >
            شماره تماس
          </label>
          <input
            id="login-phone"
            name="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="مثال: ۰۹۰۴۴۲۸۴۵۲۵"
            className="w-full bg-white border-b border-gray-300 py-2.5 focus:outline-none focus:border-[#ff5538] transition-colors"
          />
        </div>
        <div>
          <label
            className="block text-right text-gray-700 text-sm mb-1.5"
            htmlFor="login-pass"
          >
            رمز یکبار مصرف (اس‌ام‌اس)
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                id="login-pass"
                name="pass"
                type={showPassword ? "text" : "password"}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="رمز ارسال‌شده را وارد کنید"
                className="w-full bg-white border-b border-gray-300 py-2.5 focus:outline-none focus:border-[#ff5538] transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                tabIndex={-1}
                aria-label={showPassword ? "مخفی کردن رمز" : "نمایش رمز"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <button
              type="button"
              onClick={handleRequestSms}
              disabled={smsLoading}
              className="whitespace-nowrap px-3 py-2.5 border border-[#ff5538] text-[#ff5538] rounded-lg hover:bg-[#ff5538] hover:text-white transition-colors disabled:opacity-50 text-sm"
            >
              {smsLoading ? "در حال ارسال…" : "دریافت رمز"}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm pt-2">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 cursor-pointer text-[#ff5538] focus:ring-[#ff5538]"
          />
          <label
            htmlFor="remember-me"
            className="text-sm text-gray-600 cursor-pointer"
          >
            مرا به خاطر بسپار
          </label>
        </div>
        <SubmitButton disabled={loading}>
          {loading ? "در حال ورود…" : "ورود"}
        </SubmitButton>
        {onSwitchToRegister && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              حساب کاربری ندارید؟{" "}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-[#ff5538] hover:opacity-80 cursor-pointer transition-opacity font-medium"
              >
                عضویت
              </button>
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
