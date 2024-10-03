"use client";

import { Block } from "@/domain/block";
import { useSyncExternalStore } from "react";

type GlobalContext = {
  currentBlock: InstanceType<typeof Block> | null;
  history: ((...args: unknown[]) => void)[];
  addHistory: (history: (...args: unknown[]) => void) => void;
  undo: () => void;
  setCurrentBlock: (block: InstanceType<typeof Block> | null) => void;
};

let globalContext: GlobalContext = {
  currentBlock: null,
  history: [],

  setCurrentBlock(block: InstanceType<typeof Block> | null) {
    globalContext = { ...globalContext, currentBlock: block };
    globalContextStore.emitChange();
  },

  addHistory(history: (...args: unknown[]) => void) {
    globalContext = { ...globalContext, history: [...globalContext.history, history] };
  },

  undo() {
    const history = globalContext.history;
    if (history.length === 0) {
      return;
    }

    const lastHistory = history[history.length - 1];
    lastHistory();
    globalContext = { ...globalContext, history: history.slice(0, history.length - 1) };
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
