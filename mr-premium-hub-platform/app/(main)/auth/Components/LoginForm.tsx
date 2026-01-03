"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import SubmitButton from "./SubmitButton";
import { useLogin } from "../../hooks/useLogin";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSwitchToRegister?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const mutation = useLogin(
    (data) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        window.dispatchEvent(
          new CustomEvent("userLogin", { detail: { userId: data.user.id } })
        );
      }
      router.push("/my-account");
    },
    (error: unknown) => {
      console.error("Login error:", error);
      // TODO: Add toast notification
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: LoginFormData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    mutation.mutate(data);
  };

  return (
    <div className="w-full flex-1">
      <h2 className="text-xl sm:text-2xl mb-6 sm:mb-8 text-right font-bold text-gray-800">
        ورود
      </h2>
      <div className="bg-white border border-gray-200 shadow-sm md:p-8 p-4 sm:p-6 rounded-lg">
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-6">
            <label
              className="block text-right text-gray-800 text-sm font-semibold mb-2"
              htmlFor="login-email"
            >
              نام کاربری یا ایمیل <span className="text-red-500">*</span>
            </label>
            <input
              id="login-email"
              name="email"
              type="text"
              required
              className="w-full bg-white border border-gray-300 md:p-3 p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-[#ff5538] transition-all"
              placeholder="نام کاربری یا ایمیل را وارد کنید"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-right text-gray-800 text-sm font-semibold mb-2"
              htmlFor="login-password"
            >
              گذرواژه <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="login-password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="w-full bg-white border border-gray-300 md:p-3 p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-[#ff5538] transition-all pr-10"
                placeholder="گذرواژه را وارد کنید"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                tabIndex={-1}
                aria-label={
                  showPassword ? "مخفی کردن گذرواژه" : "نمایش گذرواژه"
                }
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between mb-6 text-sm">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember-me"
                className="md:w-4 md:h-4 w-3 h-3 cursor-pointer text-[#ff5538] focus:ring-[#ff5538]"
              />
              <label
                htmlFor="remember-me"
                className="md:text-sm text-xs text-gray-600 cursor-pointer"
              >
                مرا به خاطر بسپار
              </label>
            </div>
            <a
              href="#"
              className="md:text-sm text-xs text-[#ff5538] hover:opacity-80 transition-opacity"
            >
              گذرواژه خود را فراموش کرده اید؟
            </a>
          </div>
          <SubmitButton disabled={mutation.isLoading}>
            {mutation.isLoading ? (
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
            <div className="mt-4 text-center">
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
    </div>
  );
};

export default LoginForm;
