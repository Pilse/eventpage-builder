import { SectionBlock } from "@/domain/block";
import { useDefaultBlockDrop } from "@/hooks";
import { hasChildrenMixin } from "@/util";

export const useSectionBlockDrop = (
  section: InstanceType<typeof SectionBlock>,
  element: HTMLElement | null
) => {
  return useDefaultBlockDrop(
    {
      hover: (item) => {
        section.hovered(item);
      },
      drop: (item, monitor) => {
        const currentOffset = monitor.getSourceClientOffset();
        if (!currentOffset || !element) {
          return;
        }

        const sectionDomRect = element.getBoundingClientRect();

        section.dropped(item, currentOffset, sectionDomRect, sectionDomRect);
      },
    },
    [element, section]
  );
};
