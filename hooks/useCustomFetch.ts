import { useState, useCallback } from "react";

interface FetchOptions {
  method?: string;
  headers?: { [key: string]: string };
  body?: any;
}

interface FetchResult<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  fetchData: (url: string, options?: FetchOptions) => void;
}

function useCustomFetch<T>(): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async (url: string, options?: FetchOptions) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: options?.method || "GET",
        headers: {
          "Content-Type": "application/json",
          ...(options?.headers || {}),
        },
        body: options?.body ? JSON.stringify(options.body) : null,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, fetchData };
}

export default useCustomFetch;
