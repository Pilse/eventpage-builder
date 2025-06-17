import { useRef } from "react";
import { hasChildrenMixin, hasDropColMixin, hasDropRowMixin } from "@/util";
import { useBlockHistory } from "@/hooks";
import { Block } from "@/domain/block";
import { useDefaultTreeDrop } from "@/component/tree";

export const IUseDefaultFrameTreeDrop = <T extends Block>(block: T) => {
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();
  const treeNodeRef = useRef<HTMLDivElement>(null);

  const [{ isOver, canDrop, isCurrentOver }, dropRef] = useDefaultTreeDrop({
    hover: (_, monitor) => {
      if (!treeNodeRef.current) {
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
      const curParent = block.hoveredDir === "center" ? block : block.parent;

      if (!prevParent || !curParent || !hasChildrenMixin(prevParent) || !hasChildrenMixin(curParent)) {
        return;
      }
      startCaptureSnapshot(`${block.id}-tree-drop`);

      if (prevParent.id === curParent.id) {
        curParent.swapChildren(prevParent, curParent);
        if (hasDropColMixin(curParent) || hasDropRowMixin(curParent)) {
          curParent.autoLayout();
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
        prevParent.autoLayout();
      }
      if (hasDropColMixin(curParent) || hasDropRowMixin(curParent)) {
        curParent.autoLayout();
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
