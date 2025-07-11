import { useCallback, useRef } from "react";

export function useRAF<T extends (...args: any[]) => void>(callback: T): (...args: Parameters<T>) => void {
  const callbackRef = useRef(callback);
  const rafIdRef = useRef<number | null>(null);

  // callback이 변경될 때마다 ref 업데이트
  callbackRef.current = callback;

  const rafCallback = useCallback((...args: Parameters<T>) => {
    // 이전 RAF가 실행 중이면 취소
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    // 새로운 RAF 요청
    rafIdRef.current = requestAnimationFrame(() => {
      callbackRef.current(...args);
      rafIdRef.current = null;
    });
  }, []);

  return rafCallback;
}
