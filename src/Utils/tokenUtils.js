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