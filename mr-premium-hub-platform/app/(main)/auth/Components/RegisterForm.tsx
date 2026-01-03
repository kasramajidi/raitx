"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useRegister } from "../../hooks/useRegister";
import { useLogin } from "../../hooks/useLogin";

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

interface RegisterFormProps {
  onSwitchToLogin?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const loginMutation = useLogin(
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
      console.error("Auto login error:", error);
      router.push("/auth");
    }
  );

  const mutation = useRegister(
    (data, variables) => {
      loginMutation.mutate({
        email: variables.email,
        password: variables.password,
      });
    },
    (error: unknown) => {
      console.error("Registration error:", error);
      // TODO: Add toast notification
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: RegisterFormData = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    mutation.mutate(data);
  };

  return (
    <div className="w-full flex-1">
      <h2 className="text-xl sm:text-2xl mb-6 sm:mb-8 text-right font-bold text-gray-800 mt-0">
        عضویت
      </h2>
      <div className="bg-white border border-gray-200 shadow-sm md:p-8 p-4 sm:p-6 rounded-lg">
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-6">
            <label
              className="block text-right text-gray-800 text-sm font-semibold mb-2"
              htmlFor="register-username"
            >
              نام کاربری <span className="text-red-500">*</span>
            </label>
            <input
              id="register-username"
              name="username"
              type="text"
              required
              className="w-full bg-white border border-gray-300 md:p-3 p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-[#ff5538] transition-all"
              placeholder="نام کاربری را وارد کنید"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-right text-gray-800 text-sm font-semibold mb-2"
              htmlFor="register-email"
            >
              آدرس ایمیل <span className="text-red-500">*</span>
            </label>
            <input
              id="register-email"
              name="email"
              type="email"
              required
              className="w-full bg-white border border-gray-300 md:p-3 p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-[#ff5538] transition-all"
              placeholder="ایمیل را وارد کنید"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-right text-gray-800 text-sm font-semibold mb-2"
              htmlFor="register-password"
            >
              گذرواژه <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="register-password"
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

          <p className="text-xs text-gray-600 mb-6 text-right leading-relaxed">
            اطلاعات شخصی شما برای پردازش سفارش شما استفاده می‌شود و پشتیبانی از
            تجربه شما در این وبسایت و برای اهداف دیگری که در{" "}
            <a
              href="#"
              className="text-[#ff5538] hover:opacity-80 transition-opacity"
            >
              سیاست حفظ حریم خصوصی
            </a>{" "}
            توضیح داده شده است.
          </p>

          <button
            type="submit"
            className="w-full cursor-pointer bg-[#ff5538] text-white md:py-3 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md font-medium"
            disabled={mutation.isLoading || loginMutation.isLoading}
          >
            {mutation.isLoading || loginMutation.isLoading ? (
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
                {mutation.isLoading ? "در حال ارسال..." : "در حال ورود..."}
              </span>
            ) : (
              "عضویت"
            )}
          </button>
          {onSwitchToLogin && (
            <div className="mt-4 text-center">
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
    </div>
  );
};

export default RegisterForm;
