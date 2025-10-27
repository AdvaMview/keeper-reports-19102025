import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body
          ? JSON.stringify(requestConfig.body)
          : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      // אם מצופה blob (לייצוא Excel, CSV וכו’)
      if (requestConfig.responseType === "blob") {
        const blobData = await response.blob();
        applyData(blobData);
      } else {
        const data = await response.json();
        applyData(data);
      }
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }

    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    setError,
    sendRequest,
  };
};

export default useHttp;
