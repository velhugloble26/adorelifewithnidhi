export function authHeaders(json = true): HeadersInit {
  const headers: Record<string, string> = {};
  if (json) headers["Content-Type"] = "application/json";
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

export async function apiRequest<T = unknown>(url: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(url, { ...init, headers: { ...authHeaders(!(init.body instanceof FormData)), ...init.headers } });
  const payload = await response.json().catch(() => ({ success: false, message: "Invalid server response." }));
  if (!response.ok || payload.success === false) {
    const details = Array.isArray(payload.errors) ? payload.errors.join(" ") : payload.errors;
    throw new Error(details || payload.message || `Request failed (${response.status}).`);
  }
  return payload;
}
