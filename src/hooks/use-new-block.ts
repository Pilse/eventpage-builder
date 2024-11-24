import { useGlobalContext } from "./use-global-context";
import { Block, BlockFactory } from "@/domain/block";
import { hasDropColMixin, hasDropRowMixin } from "@/util";
import { useBlockHistory } from "./use-block-history";
import { useCallback } from "react";
import { ChildrenMixinBlockType } from "@/domain/mixin";

export const useNewBlock = () => {
  const { setCurrentBlock, currentBlock } = useGlobalContext();
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();

  const getInitalLayout = useCallback((parent: Block, current: Block) => {
    return hasDropRowMixin(parent)
      ? {
          position: "absolute",
          t: 0,
          l: current.id === parent.id ? parent.width : current.l + 1,
          b: 0,
          r: 0,
          width: 100,
          height: 100,
          widthType: "fixed",
          heightType: "fill",
        }
      : hasDropColMixin(parent)
      ? {
          position: "absolute",
          t: current.id === parent.id ? parent.height : current.t + 1,
          l: 0,
          b: 0,
          r: 100,
          width: 100,
          height: 100,
          widthType: "fill",
          heightType: "fixed",
        }
      : {
          position: "absolute",
          t: parent.height / 2 - 50,
          l: parent.width / 2 - 50,
          b: parent.height / 2,
          r: parent.width / 2,
          width: 100,
          height: 100,
          widthType: "fixed",
          heightType: "fixed",
        };
  }, []);

  const addNewBlock = useCallback(
    <T extends Omit<ReturnType<Block["serialize"]>, "id">>(type: T["type"], serialized: Partial<T>) => {
      if (!currentBlock) {
        return null;
      }

      let parent: ChildrenMixinBlockType | null = currentBlock.getClosestParent();
      if (parent?.type.startsWith("SECTION") && type.startsWith("SECTION")) {
        parent = parent.parent?.getClosestParent() ?? null;
      }

      if (!parent) {
        return null;
      }

      const { width, height, widthType, heightType, ...position } = getInitalLayout(parent, currentBlock);
      const newBlock = BlockFactory.create(
        {
          type,
          width,
          height,
          widthType,
          heightType,
          pt: 0,
          pr: 0,
          pb: 0,
          pl: 0,
          ...serialized,
          ...position,
        },
        parent
      );
      startCaptureSnapshot(`add-${parent.id}`);
      parent.addChild(newBlock);
      if (hasDropRowMixin(parent) || hasDropColMixin(parent)) {
        parent.autoLayout();
      }
      setCurrentBlock(newBlock);
      endCaptureSnapshot(`add-${parent.id}`);
    },
    [currentBlock, endCaptureSnapshot, getInitalLayout, setCurrentBlock, startCaptureSnapshot]
  );

  return {
    isAddable: !!currentBlock,
    addNewBlock,
  };
};
