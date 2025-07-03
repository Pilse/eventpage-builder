import { hasChildrenMixin, hasDropColMixin, hasDropRowMixin } from "@/shared/util";
import { useBlockHistory } from "./use-block-history";
import { useGlobalContext } from "./use-global-context";
import { Block } from "@/domain/builder";
import { useCallback } from "react";

export const useDeleteBlock = () => {
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();
  const globalContext = useGlobalContext();

  const deleteBlock = useCallback(
    (block?: Block) => {
      const currentBlock = block ?? globalContext.currentBlock;
      if (!currentBlock) {
        return;
      }

      if (!currentBlock || currentBlock.type === "CONTAINER") {
        return;
      }

      const parent = currentBlock.parent;
      if (parent && hasChildrenMixin(parent)) {
        startCaptureSnapshot(`remove-${parent.id}`);
        parent.removeChild(currentBlock);
        if (hasDropColMixin(parent) || hasDropRowMixin(parent)) {
          parent.autoLayout();
        }

        globalContext.setCurrentBlock(parent);
        endCaptureSnapshot(`remove-${parent.id}`);
      }
    },
    [endCaptureSnapshot, globalContext, startCaptureSnapshot]
  );

  return { deleteBlock };
};
