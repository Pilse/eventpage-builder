import { Block, FrameRowBlock } from "@/domain/builder";
import { useDefaultBlockDrop } from "@/hooks";
import { getClosestSectionBlockEle } from "@/shared/util";
import { DropTargetMonitor } from "react-dnd";

export const useFrameRowBlockDrop = (
  frameRow: InstanceType<typeof FrameRowBlock>,
  element: HTMLElement | null,
  isDragging: boolean,
  isPreview?: boolean
) => {
  const isDraggingDeep = (monitor: DropTargetMonitor) => {
    const currentDragged = monitor.getItem() as InstanceType<typeof Block> | null;
    return currentDragged !== null && [...currentDragged].some((block) => block.id === frameRow.id);
  };

  return useDefaultBlockDrop(
    {
      hover: (item, monitor) => {
        if (isDragging || isDraggingDeep(monitor) || !monitor.isOver({ shallow: true })) {
          return;
        }

        const currentOffset = monitor.getSourceClientOffset();
        if (!currentOffset || !element) {
          return;
        }

        const { x: draggedOffsetX, y: draggedOffsetY } = currentOffset;
        const { x: frameRowOffsetX, y: frameRowOffsetY } = element.getBoundingClientRect();
        const offsetFromFrameRow = {
          x: draggedOffsetX - frameRowOffsetX,
          y: draggedOffsetY - frameRowOffsetY,
        };

        frameRow.hovered(item, offsetFromFrameRow);
      },
      canDrop: (_, monitor) => !isDraggingDeep(monitor) && !isDragging && !isPreview,
      drop: (item, monitor) => {
        const currentOffset = monitor.getSourceClientOffset();
        if (!currentOffset || !element) {
          return;
        }

        const sectionElement = getClosestSectionBlockEle(element);
        if (!sectionElement) {
          return;
        }

        const sectionDomRect = sectionElement.getBoundingClientRect();
        const frameDomRect = element.getBoundingClientRect();

        frameRow.dropped(item, currentOffset, sectionDomRect, frameDomRect);
      },
    },
    [element, isDragging]
  );
};
