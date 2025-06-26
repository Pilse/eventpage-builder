import { useCallback, useState } from "react";

export const useServerAction = <T extends (...args: any[]) => Promise<any>>(fn: T) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const action = useCallback(
    async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
      setLoading(true);
      try {
        const res = await fn(...args);
        return res;
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fn]
  );

  return { action, loading, error };
};
