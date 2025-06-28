import { debounce } from "@/shared/util/utils";
import { useCallback, useRef } from "react";

export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const debounced = useRef(
    debounce(
      ((...args: Parameters<T>) => {
        callbackRef.current(...args);
      }) as T,
      delay
    )
  );

  return useCallback((...args: Parameters<T>) => {
    debounced.current(...args);
  }, []);
}
