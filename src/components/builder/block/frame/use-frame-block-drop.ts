import { Block, FrameBlock } from "@/domain/builder";
import { useDefaultBlockDrop } from "@/hooks";
import { getClosestSectionBlockEle } from "@/util";
import { DropTargetMonitor } from "react-dnd";

export const useFrameBlockDrop = (
  frame: InstanceType<typeof FrameBlock>,
  element: HTMLElement | null,
  isDragging: boolean,
  isPreview?: boolean
) => {
  const isDraggingDeep = (monitor: DropTargetMonitor) => {
    const currentDragged = monitor.getItem() as InstanceType<typeof Block> | null;
    return currentDragged !== null && [...currentDragged].some((block) => block.id === frame.id);
  };

  return useDefaultBlockDrop(
    {
      hover: (item, monitor) => {
        monitor.getItem();
        if (isDragging || isDraggingDeep(monitor) || !monitor.isOver({ shallow: true })) {
          return;
        }

        frame.hovered(item);
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

        frame.dropped(item, currentOffset, sectionDomRect, frameDomRect);
      },
    },
    [element, isDragging]
  );
};
