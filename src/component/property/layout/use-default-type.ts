import {
  Block,
  BlockFactory,
  FrameCanvas,
  FrameCol,
  FrameRow,
  Section,
  SectionCol,
  SectionRow,
} from "@/domain/block";
import { useBlockHistory, useGlobalContext } from "@/hooks";
import { hasChildrenMixin, hasDropColMixin, hasDropRowMixin } from "@/util";
import { useCallback, useMemo } from "react";

export const useDefaultLayoutType = <
  T extends Section | SectionRow | SectionCol | FrameCanvas | FrameCol | FrameRow
>(
  block: T
) => {
  const globalContext = useGlobalContext();
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();

  const onTypeChange = useCallback(
    (type: "stack" | "free", after?: () => void) => {
      startCaptureSnapshot(`${block.id}-property-layout-type`);
      const currentBaseType = block.type.split("_")[0];
      if (currentBaseType !== "FRAME" && currentBaseType !== "SECTION") {
        throw new Error(`Invalid type: ${block.type}`);
      }

      const newType: Block["type"] =
        type === "stack" ? `${currentBaseType}_COL` : `${currentBaseType}_CANVAS`;
      const newBlock = BlockFactory.create({ ...block.serialize(), type: newType }, block.parent);

      if (block.parent && !hasDropColMixin(block.parent) && !hasDropRowMixin(block.parent)) {
        newBlock.l -= block.parent.pl;
        newBlock.t -= block.parent.pt;
      }

      if (hasDropColMixin(newBlock) || hasDropRowMixin(newBlock)) {
        newBlock.autoLayout();
      } else if (hasChildrenMixin(newBlock)) {
        newBlock.children.forEach((child) => {
          if (child.widthType === "fill") {
            child.widthType = "fixed";
          }
          if (child.heightType === "fill") {
            child.heightType = "fixed";
          }
          child.l -= newBlock.pl;
          child.t -= newBlock.pt;
        });
      }

      const parent = block.parent;
      if (!parent) {
        throw new Error("Parent is not found");
      }

      if (hasChildrenMixin(parent)) {
        parent.addChild(newBlock);
        parent.swapChildren(block, newBlock);
        parent.removeChild(block);
      }

      if (hasDropColMixin(parent) || hasDropRowMixin(parent)) {
        parent.autoLayout();
      }

      globalContext.setCurrentBlock(newBlock);
      after?.();
      endCaptureSnapshot(`${block.id}-property-layout-type`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot, globalContext]
  );

  const onDirectionChange = useCallback(
    (direction: "row" | "column", after?: () => void) => {
      startCaptureSnapshot(`${block.id}-property-layout-direction`);
      const currentBaseType = block.type.split("_")[0];
      if (currentBaseType !== "FRAME" && currentBaseType !== "SECTION") {
        throw new Error(`Invalid type: ${block.type}`);
      }

      const newType: Block["type"] =
        direction === "row" ? `${currentBaseType}_ROW` : `${currentBaseType}_COL`;
      const newBlock = BlockFactory.create({ ...block.serialize(), type: newType }, block.parent);

      if (block.parent && !hasDropColMixin(block.parent) && !hasDropRowMixin(block.parent)) {
        newBlock.l -= block.parent.pl;
        newBlock.t -= block.parent.pt;
      }

      if (hasDropColMixin(newBlock) || hasDropRowMixin(newBlock)) {
        newBlock.autoLayout();
      }

      const parent = block.parent;
      if (!parent) {
        throw new Error("Parent is not found");
      }

      if (hasChildrenMixin(parent)) {
        parent.addChild(newBlock);
        parent.swapChildren(block, newBlock);
        parent.removeChild(block);
      }

      if (hasDropColMixin(parent) || hasDropRowMixin(parent)) {
        parent.autoLayout();
      }

      globalContext.setCurrentBlock(newBlock);
      after?.();
      endCaptureSnapshot(`${block.id}-property-layout-direction`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot, globalContext]
  );

  const typeValue = useMemo<"stack" | "free">(() => {
    if (block.type.includes("COL") || block.type.includes("ROW")) {
      return "stack";
    }

    return "free";
  }, [block.type]);

  const directionValue = useMemo<"row" | "column">(() => {
    if (block.type.includes("ROW")) {
      return "row";
    }

    return "column";
  }, [block.type]);

  return {
    onTypeChange,
    onDirectionChange,
    typeValue,
    directionValue,
  };
};
