import { useDefaultBlockDrag } from "@/hooks";
import { SectionRowBlock } from "@/domain/block";

export const useSectionRowBlockDrag = (sectionRow: InstanceType<typeof SectionRowBlock>) => {
  return useDefaultBlockDrag({
    block: sectionRow,
    options: { canDrag: () => !sectionRow.isResizing() && !sectionRow.isChildResizing() },
  });
};
