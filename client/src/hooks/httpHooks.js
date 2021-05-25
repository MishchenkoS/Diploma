import { useCallback, useState } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback( async (url, method = "GET", body = null, headers = {}) => {
    setLoading(true);
    
    if(body) {
      body = JSON.stringify(body);
      headers['Content-Type'] = 'application/json';
    }

    console.log(body);

    try {
      const response = await fetch(url, {
        method, body, headers
      });
      const data = await response.json();

      console.log(data);

      if(!response.ok) {
        throw new Error(data.message || 'Что-то пошло не так');
      }

      setLoading(false);

      return data;

    } catch (error) {
      setLoading(false);
      setError(error.message);
      throw error;
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);
 
  return {
    loading,
    request,
    error,
    clearError
  };
}