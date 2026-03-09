const TOKEN_KEY = "blog_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}

export function extractAccessToken(payload: unknown): string {
  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid login response");
  }

  const obj = payload as Record<string, unknown>;

  if (typeof obj.token === "string") return obj.token;
  if (typeof obj.value === "string") return obj.value;
  if (typeof obj.accessToken === "string") return obj.accessToken;

  throw new Error("Token not found in login response");
}
