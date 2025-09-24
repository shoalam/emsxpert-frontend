// providers/AuthProvider.tsx
"use client";

import React, { createContext, useEffect, useState, ReactNode } from "react";
import { getJson } from "@/lib/api"; // used if you want typed helper. Not required here.

type AuthContextValue = {
  loading: boolean;
  isAuthenticated: boolean;
  // add methods or user info here if you want
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // Call refresh to get new access token (server reads refresh cookie)
        const res = await fetch("/auth/refresh", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          const data = (await res.json()) as { accessToken?: string };
          if (data?.accessToken) {
            // use the lib method so shared token state is set
            const { setAccessToken } = await import("@/lib/api");
            setAccessToken(data.accessToken);
            if (mounted) setIsAuthenticated(true);
          } else {
            if (mounted) setIsAuthenticated(false);
          }
        } else {
          if (mounted) setIsAuthenticated(false);
        }
      } catch (e) {
        if (mounted) setIsAuthenticated(false);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ loading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
