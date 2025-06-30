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

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null;

  return (...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

export function updatedTimeToText(updatedAt: string) {
  const now = new Date();
  const updated = new Date(updatedAt);
  const diff = now.getTime() - updated.getTime();
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const diffYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

  if (diffMinutes < 1) {
    return "just now";
  } else if (diffMinutes < 60) {
    return `${diffMinutes} minutes ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hours ago`;
  } else if (diffDays < 30) {
    return `${diffDays} days ago`;
  } else if (diffMonths < 12) {
    return `${diffMonths} months ago`;
  } else {
    return `${diffYears} years ago`;
  }
}
