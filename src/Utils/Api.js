import { clearAuthData } from "./StorageUtils";

async function handleTokenRefresh(response) {
  const newToken = response.headers.get("x-refresh-token");
  if (newToken) {
    const options = JSON.parse(localStorage.getItem("options")) || {};
    const headers = options.headers || {};
    headers["Authorization"] = `Bearer ${newToken}`;
    options.headers = headers;
    localStorage.setItem("options", JSON.stringify(options));
    localStorage.setItem("token", newToken);
  }
}

export async function login(post) {
  if (!post) return null;

  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}Auth/Login`,
    {
      method: "POST",
      body: JSON.stringify(post),
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    const error = new Error("Failed to Login.");
    error.status = response.status;
    throw error;
  }

  const data = await response.json();

  const token = data.accessToken;
  if (token) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    localStorage.setItem("token", token);
    localStorage.setItem("options", JSON.stringify(options));
  }

  return data;
}


export async function verifyLogOn() {
  const options = JSON.parse(localStorage.getItem("options"));
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}Auth/verifyLogOn`,
    options
  );

  await handleTokenRefresh(response);

  if (response.status === 401) return false;

  if (!response.ok) {
    const error = new Error("Failed to verifyLogOn.");
    error.status = response.status;
    throw error;
  }

  const data = await response.json();

  if (token) {
    const decoded = decodeJwt(token);
    if (decoded) {
      const nowSec = Math.floor(Date.now() / 1000);
      const expired = decoded.exp && decoded.exp < nowSec;

      data.user.id = decoded.id ?? data.user.id;
      data.user.customerId = decoded.CustomerId ?? data.user.customerId;
      data.user.role = decoded.Role ?? decoded.role ?? data.user.role;
      data.user.tokenExpired = expired;
    }
  }

  console.log("✅ verifyLogOn fixed user:", data.user);
  return data;
}

function base64UrlToString(base64Url) {
  try {
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) base64 += "=";
    const json = atob(base64);
    return decodeURIComponent(
      json
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  } catch (e) {
    console.error("base64UrlToString failed:", e);
    return null;
  }
}

export function decodeJwt(token) {
  if (!token) return null;
  try {
    const raw = token.startsWith("Bearer ") ? token.slice(7) : token;
    const parts = raw.split(".");
    if (parts.length !== 3) throw new Error("Invalid JWT format");
    const payloadStr = base64UrlToString(parts[1]);
    if (!payloadStr) return null;

    const decoded = JSON.parse(payloadStr);

    return decoded;
  } catch (err) {
    console.error("❌ Failed to decode JWT:", err);
    return null;
  }
}

export function isJwtExpired(payload) {
  if (!payload) return true;
  if (!payload.exp) return false;
  const nowSec = Math.floor(Date.now() / 1000);
  return payload.exp <= nowSec;
}

export async function logout() {
  const options = JSON.parse(localStorage.getItem("options"));

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}Auth/Logout`,
      options
    );

    if (response.status === 401 || !response.ok) {
      clearAuthData();
      window.location.href = "/login";
      return;
    }

    clearAuthData();
    window.location.href = "/login";

    return await response.json();
  } catch (error) {
    console.error("Logout error:", error);
    clearAuthData();
    window.location.href = "/login";
    throw error;
  }
}
