"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import SubmitButton from "./SubmitButton";
import { loginWithPhoneAndPass, loginWithCookie } from "../lib/auth-api";
import { setAuthCookie, getAuthCookie, deleteAuthCookie } from "../lib/cookie";

const AUTH_STORAGE_KEY = "loginval";

type LoginFormValues = {
  /** ایمیل، نام کاربری یا شماره تماس – به API به‌صورت پارامتر phone ارسال می‌شود */
  identifier: string;
  password: string;
  rememberMe: boolean;
};

interface LoginFormProps {
  onSwitchToRegister?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: { identifier: "", password: "", rememberMe: false },
  });

  // ورود مجدد با Cookie / Storage – در مونت اول چک می‌کنیم
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(AUTH_STORAGE_KEY) : null;
    const cookieVal = typeof window !== "undefined" ? getAuthCookie() : "";
    const token = stored || cookieVal;
    if (!token) return;

    let cancelled = false;
    loginWithCookie(token)
      .then((data) => {
        if (cancelled) return;
        const cookieToStore = data?.cookie ?? data?.loginval ?? token;
        if (cookieToStore) {
          localStorage.setItem(AUTH_STORAGE_KEY, cookieToStore);
          const user = data?.user;
          if (user) {
            localStorage.setItem(
              "user",
              JSON.stringify({
                id: user.id ?? "",
                username: user.username ?? user.email ?? "",
                email: user.email ?? "",
              })
            );
          }
          window.dispatchEvent(new CustomEvent("userLogin"));
          router.push("/my-account");
        }
      })
      .catch(() => {
        if (!cancelled) {
          localStorage.removeItem(AUTH_STORAGE_KEY);
          deleteAuthCookie();
        }
      });
    return () => {
      cancelled = true;
    };
  }, [router]);

  const onSubmit = async (values: LoginFormValues) => {
    setFormError(null);
    setLoading(true);
    try {
      const identifier = String(values.identifier).trim();
      const pass = String(values.password).trim();
      const res = await loginWithPhoneAndPass(identifier, pass);

      const cookieValue = res?.cookie ?? res?.loginval;
      if (!cookieValue) {
        setFormError("اطلاعات ورود اشتباه است. ایمیل، نام کاربری یا شماره تماس و رمز عبور را بررسی کنید.");
        return;
      }

      // ذخیره فقط کوکی/توکن؛ رمز عبور هرگز ذخیره نمی‌شود
      const rememberMe = Boolean(values.rememberMe);
      setAuthCookie(cookieValue, rememberMe);
      localStorage.setItem(AUTH_STORAGE_KEY, cookieValue);

      const user = res?.user;
      if (user) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: user.id ?? "",
            username: user.username ?? user.email ?? "",
            email: user.email ?? "",
          })
        );
      }
      window.dispatchEvent(new CustomEvent("userLogin"));
      router.push("/my-account");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "خطا در ارتباط با سرور. اتصال اینترنت را بررسی کنید.";
      setFormError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl mb-8 text-center font-semibold text-gray-900">
        ورود
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {formError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg py-2.5 px-3 text-right">
            {formError}
          </p>
        )}
        <div>
          <label
            className="block text-right text-gray-700 text-sm mb-1.5"
            htmlFor="login-identifier"
          >
            ایمیل، نام کاربری یا شماره تماس
          </label>
          <input
            id="login-identifier"
            type="text"
            placeholder="ایمیل، نام کاربری یا شماره تماس را وارد کنید"
            className="w-full bg-white border-b border-gray-300 py-2.5 focus:outline-none focus:border-[#ff5538] transition-colors"
            {...register("identifier", {
              required: "ایمیل، نام کاربری یا شماره تماس را وارد کنید.",
              minLength: { value: 2, message: "مقدار وارد شده معتبر نیست." },
            })}
          />
          {errors.identifier?.message && (
            <p className="text-red-500 text-xs mt-1 text-right">
              {errors.identifier.message}
            </p>
          )}
        </div>
        <div>
          <label
            className="block text-right text-gray-700 text-sm mb-1.5"
            htmlFor="login-password"
          >
            گذرواژه
          </label>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="گذرواژه را وارد کنید"
              className="w-full bg-white border-b border-gray-300 py-2.5 focus:outline-none focus:border-[#ff5538] transition-colors pr-10"
              {...register("password", {
                required: "گذرواژه را وارد کنید.",
                minLength: { value: 1, message: "گذرواژه را وارد کنید." },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              tabIndex={-1}
              aria-label={showPassword ? "مخفی کردن گذرواژه" : "نمایش گذرواژه"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password?.message && (
            <p className="text-red-500 text-xs mt-1 text-right">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between text-sm pt-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember-me"
              className="w-4 h-4 cursor-pointer text-[#ff5538] focus:ring-[#ff5538]"
              {...register("rememberMe")}
            />
            <label
              htmlFor="remember-me"
              className="text-sm text-gray-600 cursor-pointer"
            >
              مرا به خاطر بسپار
            </label>
          </div>
          <a
            href="#"
            className="text-sm text-[#ff5538] hover:opacity-80 transition-opacity"
          >
            فراموشی گذرواژه؟
          </a>
        </div>
        <SubmitButton disabled={loading}>
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              در حال ورود...
            </span>
          ) : (
            "ورود"
          )}
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
