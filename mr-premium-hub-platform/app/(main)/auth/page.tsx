"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/app/(main)/auth/Components/LoginForm";
import RegisterForm from "@/app/(main)/auth/Components/RegisterForm";
import MainContainer from "@/app/(main)/auth/Components/ui/MainContainer";

const AUTH_STORAGE_KEY = "loginval";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const user = localStorage.getItem("user");
    const token = localStorage.getItem(AUTH_STORAGE_KEY);
    if (user && token) {
      router.push("/my-account");
      return;
    }
    setCheckingSession(false);
  }, [router]);

  if (checkingSession) {
    return (
      <main className="min-h-screen bg-white pt-8 sm:pt-12 md:pt-16 pb-8 sm:pb-12 md:pb-16">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-md flex items-center justify-center min-h-[200px]">
          <div className="w-8 h-8 border-2 border-[#ff5538] border-t-transparent rounded-full animate-spin" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-8 sm:pt-12 md:pt-16 pb-8 sm:pb-12 md:pb-16">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-md">
        <MainContainer>
          {isLogin ? (
            <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </MainContainer>
      </div>
    </main>
  );
}
