"use client";

import { Block } from "@/domain/builder";
import { useSyncExternalStore } from "react";

type GlobalContext = {
  currentBlock: InstanceType<typeof Block> | null;
  setCurrentBlock: (block: InstanceType<typeof Block> | null) => void;
};

let globalContext: GlobalContext = {
  currentBlock: null,

  setCurrentBlock(block: InstanceType<typeof Block> | null) {
    if (globalContext.currentBlock === block) {
      return;
    }
    globalContext = { ...globalContext, currentBlock: block };
    globalContextStore.emitChange();
  },
};

const listeners = new Set<any>();
const globalContextStore = {
  subscribe(listener: any) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  getSnapshot() {
    return globalContext;
  },

  emitChange() {
    for (const listener of listeners) {
      listener();
    }
  },
};

export const useGlobalContext = () => {
  return useSyncExternalStore(
    globalContextStore.subscribe,
    globalContextStore.getSnapshot,
    globalContextStore.getSnapshot
  );
};
