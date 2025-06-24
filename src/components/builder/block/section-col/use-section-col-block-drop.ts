import { Block, SectionColBlock } from "@/domain/block";
import { useDefaultBlockDrop } from "@/hooks";
import { getClosestSectionBlockEle } from "@/util";
import { DropTargetMonitor } from "react-dnd";

export const useSectionColBlockDrop = (
  sectionCol: InstanceType<typeof SectionColBlock>,
  element: HTMLElement | null
) => {
  const isDraggingDeep = (monitor: DropTargetMonitor) => {
    const currentDragged = monitor.getItem() as InstanceType<typeof Block> | null;
    return currentDragged !== null && [...currentDragged].some((block) => block.id === sectionCol.id);
  };

  return useDefaultBlockDrop(
    {
      hover: (item, monitor) => {
        if (isDraggingDeep(monitor) || !monitor.isOver({ shallow: true })) {
          return;
        }

        const currentOffset = monitor.getSourceClientOffset();
        if (!currentOffset || !element) {
          return;
        }

        const { x: draggedOffsetX, y: draggedOffsetY } = currentOffset;
        const { x: sectionColOffsetX, y: sectionColOffsetY } = element.getBoundingClientRect();
        const offsetFromSectionCol = {
          x: draggedOffsetX - sectionColOffsetX,
          y: draggedOffsetY - sectionColOffsetY,
        };

        sectionCol.hovered(item, offsetFromSectionCol);
      },
      canDrop: (_, monitor) => !isDraggingDeep(monitor),
      drop: (item, monitor) => {
        const currentOffset = monitor.getSourceClientOffset();
        if (!currentOffset || !element) {
          return;
        }

        const sectionDomRect = element.getBoundingClientRect();

        sectionCol.dropped(item, currentOffset, sectionDomRect, sectionDomRect);
      },
    },
    [element]
  );
};
