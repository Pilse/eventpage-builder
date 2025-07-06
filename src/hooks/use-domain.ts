"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";
import { Constructor } from "@/type";
import { IS_PROXY } from "@/constant";

export const useDomain = <T extends InstanceType<Constructor>>(
  domainInstance: T,
  _listeners?: Function[]
) => {
  const emitChange = useCallback(() => {
    if (_listeners) {
      for (const listener of _listeners) {
        listener();
      }
    } else {
      for (const listener of listeners.current) {
        listener();
      }
    }
  }, [_listeners]);

  const proxyObject = useCallback(
    (target: T) => {
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
    },
    [domainInstance, emitChange]
  );

  const listeners = useRef<Function[]>([]);
  const domainInstanceRef = useRef<T>(proxyObject(domainInstance));

  const getSnapshot = useCallback(() => {
    return domainInstanceRef.current;
  }, []);

  const subscribe = useCallback(
    (listener: Function) => {
      if (_listeners) {
        _listeners.push(() => {
          domainInstanceRef.current = proxyObject(domainInstance);
          listener();
        });
      } else {
        listeners.current = [...listeners.current, listener];
      }
      return () => {
        if (_listeners) {
          const idx = _listeners.indexOf(listener);
          if (idx) {
            _listeners.splice(idx, 1);
          }
        } else {
          listeners.current = listeners.current.filter((l: Function) => l !== listener);
        }
      };
    },
    [_listeners, domainInstance, proxyObject]
  );

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
};
