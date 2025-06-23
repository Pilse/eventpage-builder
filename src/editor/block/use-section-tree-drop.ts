import { useDefaultTreeDrop } from "../tree";
import { useRef } from "react";
import { hasChildrenMixin, hasDropColMixin, hasDropRowMixin } from "@/util";
import { useBlockHistory } from "@/hooks";
import { SectionBlock, SectionColBlock, SectionRowBlock } from "@/domain/block";

export const useSectionTreeDrop = <
  T extends
    | InstanceType<typeof SectionBlock>
    | InstanceType<typeof SectionColBlock>
    | InstanceType<typeof SectionRowBlock>
>(
  block: T
) => {
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();
  const treeNodeRef = useRef<HTMLDivElement>(null);

  const [{ isOver, canDrop, isCurrentOver }, dropRef] = useDefaultTreeDrop({
    accept: ["SECTION", "TREE"],
    hover: (item, monitor) => {
      if (!treeNodeRef.current) {
        return;
      }

      if (hasChildrenMixin(block) && block.hasChlidDeep(item)) {
        return;
      }

      const bounding = treeNodeRef.current.getBoundingClientRect();
      const offsetY = monitor.getClientOffset()?.y ?? 0;
      const middleY = (bounding.top + bounding.bottom) / 2;

      const isSectionFamily =
        item.type === "SECTION_CANVAS" || item.type === "SECTION_COL" || item.type === "SECTION_ROW";

      if (isSectionFamily) {
        block.hoveredDir = offsetY < middleY ? "top" : "bottom";
        return;
      }

      block.hoveredDir = "center";
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
