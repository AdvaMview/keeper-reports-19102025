import { clearAuthData } from "./StorageUtils";
import moment from "moment";
import { decodeJwt } from "./tokenUtils";

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

export const getBIReports = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}TrafficReports/GetBIReports`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }, //,
        //body: JSON.stringify({}),
      }
    );

    if (!response.ok) {
      console.warn("⚠️ Server returned status:", response.status);
      return [];
    }

    const data = await response.json().catch(() => []);
    console.log("✅ BI Reports loaded:", data);
    return data;
  } catch (err) {
    console.error("❌ Error fetching BI reports:", err);
    return [];
  }
};

// export const getExceptionData = async (dataSource, token) => {
//   try {
//     const response = await fetch(
//       `${process.env.REACT_APP_API_BASE_URL}TrafficReports/GetBIReports`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(dataSource),
//       }
//     );

//     if (!response.ok) throw new Error("Failed to load data");

//     const data = await response.json();
//     console.log("✅ Server response:", data);
//     return data;
//   } catch (err) {
//     console.error("❌ getExceptionData failed:", err);
//     throw err;
//   }
// };

export const exportToExcel = async (
  dataSource,
  tableName,
  token,
  exceptionId,
  excelFileName
) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}RadioException/ExportToExcel`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          DataSourceModel: dataSource,
          Table: tableName,
        }),
      }
    );

    if (!response.ok) throw new Error("Failed to export Excel");

    const blob = await response.blob();
    const urlBlob = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = urlBlob;
    link.setAttribute(
      "download",
      `${exceptionId ?? ""}-${excelFileName}-${moment().format(
        "DDMMYYYYHHmmss"
      )}.xlsx`
    );
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error("❌ exportToExcel failed:", err);
    throw err;
  }
};

export const exportToCsv = async (
  dataSource,
  tableName,
  token,
  exceptionId,
  excelFileName
) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}RadioException/ExportToCsv`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          DataSourceModel: dataSource,
          Table: tableName,
        }),
      }
    );

    if (!response.ok) throw new Error("Failed to export CSV");

    const blob = await response.blob();
    const urlBlob = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = urlBlob;
    link.setAttribute(
      "download",
      `${exceptionId ?? ""}-${excelFileName}-${moment().format(
        "DDMMYYYYHHmmss"
      )}.csv`
    );
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error("❌ exportToCsv failed:", err);
    throw err;
  }
};

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
