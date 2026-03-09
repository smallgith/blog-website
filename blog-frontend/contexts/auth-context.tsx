"use client";

import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { authApi, getApiErrorMessage } from "@/lib/api";
import { clearToken, extractAccessToken, getToken, setToken } from "@/lib/auth";
import type { LoginPayload, RegisterPayload, User } from "@/types/user";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const me = await authApi.me();
    setUser(me);
  }, []);

  useEffect(() => {
    const storedToken = getToken();
    if (!storedToken) {
      setIsLoading(false);
      return;
    }

    setTokenState(storedToken);
    refreshUser()
      .catch(() => {
        clearToken();
        setTokenState(null);
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, [refreshUser]);

  const login = useCallback(async (payload: LoginPayload) => {
    try {
      const loginResponse = await authApi.login(payload);
      const accessToken = extractAccessToken(loginResponse);
      setToken(accessToken);
      setTokenState(accessToken);
      await refreshUser();
      toast.success("Login successful");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
      throw error;
    }
  }, [refreshUser]);

  const register = useCallback(async (payload: RegisterPayload) => {
    try {
      await authApi.register(payload);
      toast.success("Registration successful. Please login.");
    } catch (error) {
      const message = getApiErrorMessage(error);
      toast.error(message);
      throw new Error(message);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // Logout should still clear local session if backend endpoint differs.
    } finally {
      clearToken();
      setTokenState(null);
      setUser(null);
      toast.success("Logged out");
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      isLoading,
      login,
      register,
      logout,
      refreshUser,
    }),
    [user, token, isLoading, login, register, logout, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
