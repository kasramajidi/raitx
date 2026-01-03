"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";
import MainContainer from "./Components/ui/MainContainer";

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
    <main className="min-h-screen bg-gray-50 pt-4 sm:pt-6 md:pt-8 lg:pt-4 pb-4 sm:pb-6 md:pb-8 lg:pb-10">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-4xl">
        <MainContainer>
          <div className="pt-2 sm:pt-4 md:pt-6 pb-6 sm:pb-8 md:pb-10 lg:pb-12">
            {isLogin ? (
              <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
            ) : (
              <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
            )}
          </div>
        </MainContainer>
      </div>
    </main>
  );
}
