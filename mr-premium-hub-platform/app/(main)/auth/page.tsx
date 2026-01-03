"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/app/(main)/auth/Components/LoginForm";
import RegisterForm from "@/app/(main)/auth/Components/RegisterForm";
import MainContainer from "@/app/(main)/auth/Components/ui/MainContainer";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user) {
        router.push("/my-account");
      }
    }
  }, [router]);

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
