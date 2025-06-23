import { Block, SectionRowBlock } from "@/domain/block";
import { useDefaultBlockDrop } from "@/hooks";
import { getClosestSectionBlockEle } from "@/util";
import { DropTargetMonitor } from "react-dnd";

export const useSectionRowBlockDrop = (
  sectionRow: InstanceType<typeof SectionRowBlock>,
  element: HTMLElement | null
) => {
  const isDraggingDeep = (monitor: DropTargetMonitor) => {
    const currentDragged = monitor.getItem() as InstanceType<typeof Block> | null;
    return currentDragged !== null && [...currentDragged].some((block) => block.id === sectionRow.id);
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
        const { x: sectionRowOffsetX, y: sectionRowOffsetY } = element.getBoundingClientRect();
        const offsetFromSectionRow = {
          x: draggedOffsetX - sectionRowOffsetX,
          y: draggedOffsetY - sectionRowOffsetY,
        };

        sectionRow.hovered(item, offsetFromSectionRow);
      },
      canDrop: (_, monitor) => !isDraggingDeep(monitor),
      drop: (item, monitor) => {
        const currentOffset = monitor.getSourceClientOffset();
        if (!currentOffset || !element) {
          return;
        }

        const sectionDomRect = element.getBoundingClientRect();

        sectionRow.dropped(item, currentOffset, sectionDomRect, sectionDomRect);
      },
    },
    [element]
  );
};
