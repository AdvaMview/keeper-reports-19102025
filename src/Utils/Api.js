import { clearAuthData  } from "./StorageUtils";

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

  if (data.token) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
    };
    localStorage.setItem("token", data.token);
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

  // ✳️ פענוח ה־JWT אם קיים
  if (token) {
    const decoded = decodeJwt(token);
    if (decoded) {
      data.user = {
        ...data.user,
        role: decoded.Role,
        userId: decoded.id,
        customerId: decoded.CustomerId,
      };
    }
  }

  return data;
}


function decodeJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("❌ Failed to decode JWT:", e);
    return null;
  }
}


export async function GetBIReports() {
  const options = JSON.parse(localStorage.getItem("options"));
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}TrafficReports/GetBIReports`,
    options
  );

  await handleTokenRefresh(response);

  if (response.status === 401) return false;
  if (!response.ok) {
    const error = new Error("Failed to GetBIReports.");
    error.status = response.status;
    throw error;
  }

  return response.json();
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