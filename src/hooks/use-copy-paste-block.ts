import { useCallback } from "react";
import { useGlobalContext } from "./use-global-context";
import { Block, BlockFactory, DropCanvasMixin } from "@/domain/builder";
import { hasChildrenMixin, hasDropCanvasMixin } from "@/shared/util";
import { useNewBlock } from "./use-new-block";

export const useCopyPasteBlock = () => {
  const globalContext = useGlobalContext();
  const { isAddable, addNewBlock } = useNewBlock();

  const copyBlock = useCallback((block: Block) => {
    navigator.clipboard.writeText(JSON.stringify(block.serialize()));
  }, []);

  const pasteBlock = useCallback(
    (text: string, block?: Block) => {
      if (!isAddable && !block) {
        return;
      }

      const currentBlock = block ?? globalContext.currentBlock;

      const copiedBlock = JSON.parse(text);
      const isSameBlock = currentBlock?.id === copiedBlock.id;

      const parent =
        currentBlock && hasChildrenMixin(currentBlock) && isSameBlock
          ? currentBlock.parent?.getClosestParent()
          : currentBlock?.getClosestParent();

      if (!parent) {
        return;
      }

      if (hasDropCanvasMixin(parent)) {
        const t = copiedBlock.t > parent.height / 2 ? parent.height / 2 : copiedBlock.t;
        const l = copiedBlock.l > parent.width / 2 ? parent.width / 2 : copiedBlock.l;
        const newBlock = BlockFactory.create(copiedBlock, parent);
        newBlock.t = t;
        newBlock.l = l;
        newBlock._centerX = newBlock.getCenterX() - parent.getCenterX();
        newBlock._centerY = newBlock.getCenterY() - parent.getCenterY();
        addNewBlock(newBlock.type, newBlock.serialize(), parent);
      } else {
        const newBlock = BlockFactory.create(copiedBlock, parent);
        addNewBlock(newBlock.type, newBlock.serialize(), parent);
      }
    },
    [addNewBlock, globalContext, isAddable]
  );

  return { copyBlock, pasteBlock };
};
