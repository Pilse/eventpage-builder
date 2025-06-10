"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";
import { Constructor } from "@/type";
import { IS_PROXY } from "@/constant";

export const useDomain = <T extends InstanceType<Constructor>>(domainInstance: T) => {
  const listeners = useRef<Function[]>([]);
  const domainInstanceRef = useRef<T>(
    (() => {
      const proxyObject = (target: T) => {
        return new Proxy(target, {
          set(target, property, newValue, receiver) {
            const originalValue = Reflect.get(target, property, receiver);
            if (originalValue === newValue) {
              return true;
            }

            Reflect.set(target, property, newValue, receiver);

            if (typeof property === "string" && property.startsWith("_")) {
              return true;
            }

            domainInstanceRef.current = proxyObject(domainInstance);
            emitChange();
            return true;
          },
          get(target, property, receiver) {
            if (property === IS_PROXY) {
              return true;
            }

            return Reflect.get(target, property, receiver);
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
