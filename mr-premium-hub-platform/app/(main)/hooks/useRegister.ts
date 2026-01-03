"use client";

import { useState } from "react";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  id: string;
  username: string;
  email: string;
}

interface UseRegisterCallbacks {
  onSuccess?: (data: RegisterResponse, variables: RegisterData) => void;
  onError?: (error: any) => void;
}

export function useRegister(
  onSuccess?: (data: RegisterResponse, variables: RegisterData) => void,
  onError?: (error: any) => void
) {
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const result: RegisterResponse = await response.json();
      onSuccess?.(result, data);
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

