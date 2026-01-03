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
    (data: { user: { id: string }; token: string }) => {
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
    (
      data: { id: string; username: string; email: string },
      variables: RegisterFormData
    ) => {
      // Store user data temporarily before auto-login
      if (typeof window !== "undefined") {
        const userData = {
          id: data.id,
          username: data.username,
          email: data.email,
        };
        localStorage.setItem("user", JSON.stringify(userData));
      }
      
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
    <div className="w-full">
      <h2 className="text-2xl mb-8 text-center font-semibold text-gray-900">
        عضویت
      </h2>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label
            className="block text-right text-gray-700 text-sm mb-1.5"
            htmlFor="register-username"
          >
            نام کاربری
          </label>
          <input
            id="register-username"
            name="username"
            type="text"
            required
            className="w-full bg-white border-b border-gray-300 py-2.5 focus:outline-none focus:border-[#ff5538] transition-colors"
            placeholder="نام کاربری را وارد کنید"
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
            required
            className="w-full bg-white border-b border-gray-300 py-2.5 focus:outline-none focus:border-[#ff5538] transition-colors"
            placeholder="ایمیل را وارد کنید"
          />
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
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="w-full bg-white border-b border-gray-300 py-2.5 focus:outline-none focus:border-[#ff5538] transition-colors pr-10"
              placeholder="گذرواژه را وارد کنید"
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
