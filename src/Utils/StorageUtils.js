export const clearAuthData = (extraKeys = []) => {
  const authKeys = ["token", "accessToken", "user", "options", ...extraKeys];
  authKeys.forEach((key) => localStorage.removeItem(key));
};

clearAuthData(); 
clearAuthData(["sessionId", "refreshToken"]); 
