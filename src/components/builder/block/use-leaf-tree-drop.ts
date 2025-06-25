import { useDefaultTreeDrop } from "../tree";
import { useRef } from "react";
import { hasChildrenMixin, hasDropColMixin, hasDropRowMixin } from "@/shared/util";
import { useBlockHistory } from "@/hooks";
import { Block } from "@/domain/builder";

export const useLeafTreeDrop = <T extends Block>(block: T) => {
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
      const middleY = (bounding.top + bounding.bottom) / 2;

      block.hoveredDir = offsetY < middleY ? "top" : "bottom";
    },
    drop: (item) => {
      if (!treeNodeRef.current || !block.hoveredDir) {
        return;
      }

      const prevParent = item.parent;
      const curParent = block.parent;

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
      } else {
        curParent.addChildAfter(item, block);
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
