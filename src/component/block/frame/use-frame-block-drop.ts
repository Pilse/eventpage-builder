import { BlockFactory, FrameBlock } from "@/domain/block";
import { useDefaultBlockDrop } from "@/hooks";
import { hasChildrenMixin } from "@/util";
import { SNAP_THRESHOLD } from "@/constant";

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

        if (!item.parent) {
          return;
        }

        if (item.parent.id !== frame.id && hasChildrenMixin(item.parent)) {
          item.parent.removeChild(item);
          item.parent = frame;
          frame.addChild(item);
        }
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

        if (item.parent && item.parent?.id !== frame.id) {
          const sectionDomRect = sectionElement.getBoundingClientRect();
          const frameDomRect = element.getBoundingClientRect();
          const deserializedBlock = BlockFactory.deserialize(item.serialize(), item.parent);
          deserializedBlock.updateCoords(currentOffset, frameDomRect);
          const { canSnapToX, canSnapToY, ...snappedCoords } = frame.getSnappedCoords(
            deserializedBlock,
            currentOffset,
            sectionDomRect,
            frameDomRect,
            SNAP_THRESHOLD
          );
          deserializedBlock.updateCoords(snappedCoords, frameDomRect);
          frame.addChild(deserializedBlock);
          if (hasChildrenMixin(item.parent)) {
            item.parent.removeChild(item);
          }
          return;
        }

        const sectionDomRect = sectionElement.getBoundingClientRect();
        const frameDomRect = element.getBoundingClientRect();
        item.updateCoords(currentOffset, frameDomRect);
        const { canSnapToX, canSnapToY, ...snappedCoords } = frame.getSnappedCoords(
          item,
          currentOffset,
          sectionDomRect,
          frameDomRect,
          SNAP_THRESHOLD
        );
        item.updateCoords(snappedCoords, frameDomRect);
      },
    },
    [element, isDragging]
  );
};
