import { SNAP_THRESHOLD } from "@/constant";
import { BlockFactory, SectionBlock } from "@/domain/block";
import { useDefaultBlockDrop } from "@/hooks";
import { hasChildrenMixin } from "@/util";

export const useSectionBlockDrop = (
  section: InstanceType<typeof SectionBlock>,
  element: HTMLElement | null
) => {
  return useDefaultBlockDrop(
    {
      hover: (item) => {
        if (!item.parent) {
          return;
        }

        if (item.parent.id !== section.id && hasChildrenMixin(item.parent)) {
          item.parent.removeChild(item);
          item.parent = section;
          section.addChild(item);
        }
      },
      drop: (item, monitor) => {
        const currentOffset = monitor.getSourceClientOffset();
        if (!currentOffset || !element) {
          return;
        }

        if (item.parent && item.parent.id !== section.id) {
          const sectionDomRect = element.getBoundingClientRect();
          const deserializedBlock = BlockFactory.deserialize(item.serialize(), section);
          deserializedBlock.updateCoords(currentOffset, sectionDomRect);
          const snappedCoords = section.getSnappedCoords(
            deserializedBlock,
            currentOffset,
            sectionDomRect,
            sectionDomRect,
            SNAP_THRESHOLD
          );
          deserializedBlock.updateCoords(snappedCoords, sectionDomRect);
          section.addChild(deserializedBlock);
          if (hasChildrenMixin(item.parent)) {
            item.parent.removeChild(item);
          }
          return;
        }

        const sectionDomRect = element.getBoundingClientRect();
        item.updateCoords(currentOffset, sectionDomRect);
        const snappedCoords = section.getSnappedCoords(
          item,
          currentOffset,
          sectionDomRect,
          sectionDomRect,
          SNAP_THRESHOLD
        );
        item.updateCoords(snappedCoords, sectionDomRect);
      },
    },
    [element, section]
  );
};
