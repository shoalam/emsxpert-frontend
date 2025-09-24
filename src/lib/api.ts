// lib/api.ts
export const BASE_URL =
  `${process.env.NEXT_PUBLIC_API_URL}/api/v1` || "http://localhost:8080"; // e.g. "https://api.example.com" or "" for same origin

import type { LoginResponse, RefreshResponse } from "@/types/auth";

/**
 * In-memory access token only (cleared on page unload).
 * Do NOT persist to localStorage.
 */
let accessToken: string | null = null;
export const setAccessToken = (token: string | null) => {
  accessToken = token;
};
export const clearAccessToken = () => {
  accessToken = null;
};

/**
 * Concurrency: if multiple requests get 401 at once, we should only call /auth/refresh once.
 */
let refreshPromise: Promise<string | null> | null = null;

/**
 * Build a full URL from an endpoint. Accepts endpoints that start with '/' or are full URLs.
 */
function buildUrl(endpoint: string) {
  if (/^https?:\/\//i.test(endpoint)) return endpoint;
  return `${BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
}

type ApiFetchOptions = RequestInit & {
  // internal flag to indicate this is a retry after refresh (to avoid infinite loops)
  _retry?: boolean;
};

/**
 * Generic apiFetch - returns Response. Use helper methods below (getJson) to parse JSON with types.
 */
export async function apiFetch(
  endpoint: string,
  options: ApiFetchOptions = {}
): Promise<Response> {
  const url = buildUrl(endpoint);

  const headers = new Headers(options.headers ?? {});
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const res = await fetch(url, {
    credentials: "include", // send cookies (refresh token etc.)
    ...options,
    headers,
  });

  // If unauthorized and we haven't retried yet -> try refresh and retry the original request
  if (res.status === 401 && !options._retry) {
    const newToken = await ensureRefreshedToken();
    if (newToken) {
      // token updated in memory — retry original request once
      return apiFetch(endpoint, { ...options, _retry: true });
    } else {
      // failed to refresh, clear token
      clearAccessToken();
      return res;
    }
  }

  return res;
}

/**
 * Convenience helper: perform a fetch and parse JSON typed as T.
 * Throws if response is not ok (status outside 200-299).
 */
export async function getJson<T = any>(
  endpoint: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const res = await apiFetch(endpoint, options);
  if (!res.ok) {
    // try to parse body if present for better error messages
    let body: any = null;
    try {
      body = await res.json();
    } catch {
      // ignore
    }
    const err = new Error(`Request failed with status ${res.status}`);
    (err as any).status = res.status;
    (err as any).body = body;
    throw err;
  }
  return res.json() as Promise<T>;
}

/**
 * Ensures there's a fresh access token in memory by calling /auth/refresh once.
 * Uses refreshPromise to handle concurrent callers.
 * Returns the new access token (or null if refresh failed).
 */
async function ensureRefreshedToken(): Promise<string | null> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const url = buildUrl("/auth/refresh");
      const res = await fetch(url, {
        method: "POST",
        credentials: "include", // critical: send httpOnly refresh cookie
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        // refresh failed (e.g. 401/403)
        return null;
      }

      const data = (await res.json()) as RefreshResponse;
      const newToken = data?.accessToken ?? null;
      if (newToken) setAccessToken(newToken);
      return newToken;
    } catch (e) {
      return null;
    } finally {
      // reset promise after completion so future refreshes can occur
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

/**
 * Helper to call login endpoint. It stores the returned access token in memory.
 * Assumes server sets refresh token in httpOnly cookie.
 */
export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const url = buildUrl("/auth/login");
  const res = await fetch(url, {
    method: "POST",
    credentials: "include", // server may set refresh cookie
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    let body = null;
    try {
      body = await res.json();
    } catch {}
    const err = new Error("Login failed");
    (err as any).status = res.status;
    (err as any).body = body;
    throw err;
  }

  const data = (await res.json()) as LoginResponse;
  if (data?.accessToken) setAccessToken(data.accessToken);
  return data;
}

/**
 * Helper to call logout endpoint and clear in-memory token.
 */
export async function logout(): Promise<void> {
  try {
    const url = buildUrl("/auth/logout");
    await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    clearAccessToken();
  }
}
