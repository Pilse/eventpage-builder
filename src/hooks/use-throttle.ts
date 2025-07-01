import { throttle } from "@/shared/util/utils";
import { useCallback, useRef } from "react";

export function useThrottle<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const throttled = useRef(
    throttle(
      ((...args: Parameters<T>) => {
        callbackRef.current(...args);
      }) as T,
      delay
    )
  );

  return useCallback((...args: Parameters<T>) => {
    throttled.current(...args);
  }, []);
}
