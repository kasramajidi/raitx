"use client";

import { useState } from "react";

interface LoginData {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  username?: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface UseLoginCallbacks {
  onSuccess?: (data: LoginResponse) => void;
  onError?: (error: any) => void;
}

export function useLogin(
  onSuccess?: (data: LoginResponse) => void,
  onError?: (error: any) => void
) {
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async (data: LoginData) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const result: LoginResponse = await response.json();
      onSuccess?.(result);
    } catch (error) {
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mutate,
    isLoading,
  };
}

