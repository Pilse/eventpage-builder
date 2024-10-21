import { Block } from "@/domain/block";
import { createContext, useCallback, useContext } from "react";
import { BlockHistory } from "@/domain/history";
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
  children: ({ root }: { root: InstanceType<typeof Block> }) => JSX.Element;
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

  return (
    <BlockHistoryContext.Provider
      value={{
        startCaptureSnapshot: history.startCaptureSnapshot.bind(history),
        endCaptureSnapshot: history.endCaptureSnapshot.bind(history),
        undo,
        redo,
      }}
    >
      {children({ root: history.getRoot() })}
    </BlockHistoryContext.Provider>
  );
};

export const useBlockHistory = () => {
  return useContext(BlockHistoryContext);
};
