import { FrameBlock } from "@/domain/block";
import { useDefaultBlockDrop } from "@/hooks";

export const useFrameBlockDrop = (
  frame: InstanceType<typeof FrameBlock>,
  element: HTMLElement | null,
  isDragging: boolean,
  isPreview?: boolean
) => {
  return useDefaultBlockDrop(
    {
      hover: (item) => {
        if (isDragging) {
          return;
        }

        frame.hovered(item);
      },
      canDrop: () => !isDragging && !isPreview,
      drop: (item, monitor) => {
        const currentOffset = monitor.getSourceClientOffset();
        if (!currentOffset || !element) {
          return;
        }

        const sectionElement = element.closest("[data-block-type='SECTION']");
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
