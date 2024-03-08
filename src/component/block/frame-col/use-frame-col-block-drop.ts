import { Block, FrameColBlock } from "@/domain/block";
import { useDefaultBlockDrop } from "@/hooks";
import { getClosestSectionBlockEle } from "@/util";
import { DropTargetMonitor } from "react-dnd";

export const useFrameColBlockDrop = (
  frameCol: InstanceType<typeof FrameColBlock>,
  element: HTMLElement | null,
  isDragging: boolean,
  isPreview?: boolean
) => {
  const isDraggingDeep = (monitor: DropTargetMonitor) => {
    const currentDragged = monitor.getItem() as InstanceType<typeof Block> | null;
    return currentDragged !== null && [...currentDragged].some((block) => block.id === frameCol.id);
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
        const { x: frameColOffsetX, y: frameColOffsetY } = element.getBoundingClientRect();
        const offsetFromFrameCol = {
          x: draggedOffsetX - frameColOffsetX,
          y: draggedOffsetY - frameColOffsetY,
        };

        frameCol.hovered(item, offsetFromFrameCol);
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

        frameCol.dropped(item, currentOffset, sectionDomRect, frameDomRect);
      },
    },
    [element, isDragging]
  );
};
