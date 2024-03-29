"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";
import { Constructor } from "@/type";

export const useDomain = <T extends InstanceType<Constructor>>(domainInstance: T) => {
  const listeners = useRef<Function[]>([]);
  const domainInstanceRef = useRef<T>(
    (() => {
      const proxyObject = (target: T) => {
        return new Proxy(target, {
          set(target, property, newValue, receiver) {
            if (Reflect.get(target, property, receiver) === newValue) {
              Reflect.set(target, property, newValue, receiver);
              return true;
            }

            Reflect.set(target, property, newValue, receiver);
            domainInstanceRef.current = proxyObject(target);
            emitChange();
            return true;
          },
        });
      };

      return proxyObject(domainInstance);
    })()
  );

  const getSnapshot = useCallback(() => {
    return domainInstanceRef.current;
  }, []);

  const subscribe = useCallback((listener: Function) => {
    listeners.current = [...listeners.current, listener];
    return () => {
      listeners.current = listeners.current.filter((l: Function) => l !== listener);
    };
  }, []);

  const emitChange = useCallback(() => {
    for (const listener of listeners.current) {
      listener();
    }
  }, []);

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
};
