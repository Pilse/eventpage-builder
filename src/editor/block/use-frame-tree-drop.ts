import { useDefaultTreeDrop } from "../tree";
import { useRef } from "react";
import { hasChildrenMixin, hasDropColMixin, hasDropRowMixin } from "@/util";
import { useBlockHistory } from "@/hooks";
import { FrameBlock, FrameColBlock, FrameRowBlock } from "@/domain/block";

export const useFrameTreeDrop = <
  T extends
    | InstanceType<typeof FrameBlock>
    | InstanceType<typeof FrameColBlock>
    | InstanceType<typeof FrameRowBlock>
>(
  block: T
) => {
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();
  const treeNodeRef = useRef<HTMLElement | null>(null);

  const [{ isOver, canDrop, isCurrentOver }, dropRef] = useDefaultTreeDrop({
    hover: (item, monitor) => {
      if (!treeNodeRef.current) {
        return;
      }

      if (block.id === item.id) {
        return;
      }

      if (hasChildrenMixin(item) && item.hasChlidDeep(block)) {
        return;
      }

      const bounding = treeNodeRef.current.getBoundingClientRect();
      const offsetY = monitor.getClientOffset()?.y ?? 0;
      const oneThirdY = bounding.top + (bounding.bottom - bounding.top) / 3;
      const twoThirdY = bounding.top + (2 * (bounding.bottom - bounding.top)) / 3;

      if (offsetY < oneThirdY) {
        block.hoveredDir = "top";
      } else if (offsetY > twoThirdY) {
        block.hoveredDir = "bottom";
      } else {
        block.hoveredDir = "center";
      }
    },
    drop: (item) => {
      if (!treeNodeRef.current || !block.hoveredDir) {
        return;
      }

      const prevParent = item.parent;
      const curParent = block.hoveredDir === "center" ? block : block.parent;

      if (!prevParent || !curParent || !hasChildrenMixin(prevParent) || !hasChildrenMixin(curParent)) {
        return;
      }
      startCaptureSnapshot(`${block.id}-tree-drop`);

      if (prevParent.id === curParent.id) {
        curParent.swapChildren(item, block);
        if (hasDropColMixin(curParent) || hasDropRowMixin(curParent)) {
          curParent.autoLayout("order");
        }
        return;
      }

      prevParent.removeChild(item);
      if (block.hoveredDir === "top") {
        curParent.addChildBefore(item, block);
      } else if (block.hoveredDir === "bottom") {
        curParent.addChildAfter(item, block);
      } else {
        curParent.addChild(item);
      }

      if (hasDropColMixin(prevParent) || hasDropRowMixin(prevParent)) {
        prevParent.autoLayout("order");
      }
      if (hasDropColMixin(curParent) || hasDropRowMixin(curParent)) {
        curParent.autoLayout("order");
      }

      endCaptureSnapshot(`${block.id}-tree-drop`);
      block.hoveredDir = null;
    },
  });

  if (!isOver && block.hoveredDir !== null) {
    block.hoveredDir = null;
  }

  return {
    canDrop,
    isOver,
    isCurrentOver,
    dropRef,
    treeNodeRef,
  };
};
