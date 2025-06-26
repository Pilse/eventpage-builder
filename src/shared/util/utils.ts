import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function throttle<T extends (...args: any[]) => void>(callback: T, delay: number) {
  let lastCall = 0;
  let timeoutId: NodeJS.Timeout | null = null;

  return function (...args: Parameters<T>) {
    const now = Date.now();

    const remaining = delay - (now - lastCall);
    if (remaining <= 0) {
      lastCall = now;
      callback(...args);
    } else if (!timeoutId) {
      // 마지막 호출 이후 delay가 지나지 않았다면 예약
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        timeoutId = null;
        callback(...args);
      }, remaining);
    }
  };
}
