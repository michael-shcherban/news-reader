import { useCallback, useEffect, useState } from "react";

import { API_URL } from "../variables";
import { Article } from "../model";

export const useGetNews = () => {
  const [data, setData] = useState<Article[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      setData(result.data);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError('Error fetching data:'+ error.message);
      } else {
        setError('Error fetching data:');
      }
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { isLoading, error, data, refetch: fetchData };
}