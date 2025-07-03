import { useCallback } from "react";
import { useGlobalContext } from "./use-global-context";
import { Block, BlockFactory } from "@/domain/builder";
import { hasChildrenMixin } from "@/shared/util";
import { useNewBlock } from "./use-new-block";

export const useCopyPasteBlock = () => {
  const globalContext = useGlobalContext();
  const { isAddable, addNewBlock } = useNewBlock();

  const copyBlock = useCallback((block: Block) => {
    navigator.clipboard.writeText(JSON.stringify(block.serialize()));
  }, []);

  const pasteBlock = useCallback(
    (text: string) => {
      if (!isAddable) {
        return;
      }

      const copiedBlock = JSON.parse(text);
      const isSameBlock = globalContext.currentBlock?.id === copiedBlock.id;

      const parent =
        globalContext.currentBlock && hasChildrenMixin(globalContext.currentBlock) && isSameBlock
          ? globalContext.currentBlock.parent?.getClosestParent()
          : globalContext.currentBlock?.getClosestParent();

      if (!parent) {
        return;
      }

      const block = BlockFactory.create(copiedBlock, parent);
      addNewBlock(block.type, block.serialize(), parent);
    },
    [addNewBlock, globalContext, isAddable]
  );

  return { copyBlock, pasteBlock };
};
