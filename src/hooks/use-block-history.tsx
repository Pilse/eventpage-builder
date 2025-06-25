import { Block } from "@/domain/builder";
import { createContext, useCallback, useContext, type JSX } from "react";
import { BlockHistory } from "@/domain/builder/history";
import { useGlobalContext, useDomain } from "@/hooks";
import { useHotkeys } from "react-hotkeys-hook";

interface IHBlockistoryContext {
  startCaptureSnapshot: (id: string) => void;
  endCaptureSnapshot: (id: string) => void;
  undo: () => void;
  redo: () => void;
}

const BlockHistoryContext = createContext<IHBlockistoryContext>({
  startCaptureSnapshot: () => {},
  endCaptureSnapshot: () => {},
  undo: () => {},
  redo: () => {},
});

interface IBlockHistoryProviderProps {
  root: InstanceType<typeof Block>;
  children: ({ root, historyId }: { root: InstanceType<typeof Block>; historyId: string }) => JSX.Element;
}

export const BlockHistoryProvider = ({ root, children }: IBlockHistoryProviderProps) => {
  const history = useDomain(new BlockHistory(root));
  const globalContext = useGlobalContext();

  const undo = useCallback(() => {
    globalContext.currentBlock = null;
    history.undo();
  }, [globalContext, history]);

  const redo = useCallback(() => {
    globalContext.currentBlock = null;
    history.redo();
  }, [globalContext, history]);

  useHotkeys("mod+z", () => {
    undo();
  });

  useHotkeys("mod+shift+z", () => {
    redo();
  });

  const startCaptureSnapshot = useCallback(
    (id: string) => {
      history.startCaptureSnapshot(id);
    },
    [history]
  );

  const endCaptureSnapshot = useCallback(
    (id: string) => {
      history.endCaptureSnapshot(id);
    },
    [history]
  );

  return (
    <BlockHistoryContext.Provider
      value={{
        startCaptureSnapshot,
        endCaptureSnapshot,
        undo,
        redo,
      }}
    >
      {children({ root: history.getRoot(), historyId: history.historyId })}
    </BlockHistoryContext.Provider>
  );
};

export const useBlockHistory = () => {
  return useContext(BlockHistoryContext);
};
