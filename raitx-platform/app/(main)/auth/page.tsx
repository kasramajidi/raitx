"use client";

import { useState, useEffect } from "react";
import LoginForm from "@/app/(main)/auth/Components/LoginForm";
import RegisterForm from "@/app/(main)/auth/Components/RegisterForm";
import MainContainer from "@/app/(main)/auth/Components/ui/MainContainer";

function getInitialState() {
  if (typeof window === "undefined")
    return { next: undefined as string | undefined, modeRegister: false, initialPhone: "" };
  const p = new URLSearchParams(window.location.search);
  return {
    next: p.get("next") ?? undefined,
    modeRegister: p.get("mode") === "register",
    initialPhone: "",
  };
}

export default function AuthPage() {
  const [state, setState] = useState(getInitialState);
  const [isLogin, setIsLogin] = useState(!state.modeRegister);
  const [initialPhone, setInitialPhone] = useState(state.initialPhone);

  useEffect(() => {
    const s = getInitialState();
    setState(s);
    setIsLogin(!s.modeRegister);
  }, []);

  return (
    <main className="min-h-screen bg-white pt-8 sm:pt-12 md:pt-16 pb-8 sm:pb-12 md:pb-16">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-md">
        <MainContainer>
          {isLogin ? (
            <LoginForm
              initialPhone={initialPhone}
              onSwitchToRegister={() => setIsLogin(false)}
              redirectNext={state.next}
            />
          ) : (
            <RegisterForm
              onSwitchToLogin={(phone) => {
                setInitialPhone(phone ?? "");
                setIsLogin(true);
              }}
            />
          )}
        </MainContainer>
      </div>
    </main>
  );
}
