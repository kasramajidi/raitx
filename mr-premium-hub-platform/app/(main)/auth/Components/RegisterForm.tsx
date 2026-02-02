"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { signup } from "../lib/auth-api";

type RegisterFormValues = {
  username: string;
  email: string;
  password: string;
};

interface RegisterFormProps {
  onSwitchToLogin?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: { username: "", email: "", password: "" },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setFormError(null);
    setLoading(true);
    try {
      await signup({
        name: values.username.trim(),
        email: values.email.trim(),
        phone: values.email.trim(),
      });
      if (onSwitchToLogin) {
        onSwitchToLogin();
      } else {
        router.push("/auth");
      }
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
        عضویت
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
            htmlFor="register-username"
          >
            نام کاربری
          </label>
          <input
            id="register-username"
            type="text"
            placeholder="نام کاربری را وارد کنید"
            className="w-full bg-white border-b border-gray-300 py-2.5 focus:outline-none focus:border-[#ff5538] transition-colors"
            {...register("username", {
              required: "نام کاربری را وارد کنید.",
              minLength: { value: 2, message: "نام کاربری باید حداقل ۲ کاراکتر باشد." },
            })}
          />
          {errors.username?.message && (
            <p className="text-red-500 text-xs mt-1 text-right">
              {errors.username.message}
            </p>
          )}
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
            type="email"
            placeholder="ایمیل را وارد کنید"
            className="w-full bg-white border-b border-gray-300 py-2.5 focus:outline-none focus:border-[#ff5538] transition-colors"
            {...register("email", {
              required: "آدرس ایمیل را وارد کنید.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "یک آدرس ایمیل معتبر وارد کنید.",
              },
            })}
          />
          {errors.email?.message && (
            <p className="text-red-500 text-xs mt-1 text-right">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label
            className="block text-right text-gray-700 text-sm mb-1.5"
            htmlFor="register-password"
          >
            گذرواژه
          </label>
          <div className="relative">
            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              placeholder="گذرواژه را وارد کنید"
              className="w-full bg-white border-b border-gray-300 py-2.5 focus:outline-none focus:border-[#ff5538] transition-colors pr-10"
              {...register("password", {
                required: "گذرواژه را وارد کنید.",
                minLength: { value: 6, message: "گذرواژه باید حداقل ۶ کاراکتر باشد." },
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

        <button
          type="submit"
          className="w-full cursor-pointer bg-[#ff5538] text-white py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          disabled={loading}
        >
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
              در حال ارسال...
            </span>
          ) : (
            "عضویت"
          )}
        </button>
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
