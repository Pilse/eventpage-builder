import { useDefaultBlockDrag } from "@/hooks";
import { SectionColBlock } from "@/domain/block";

export const useSectionColBlockDrag = (sectionCol: InstanceType<typeof SectionColBlock>) => {
  return useDefaultBlockDrag({
    block: sectionCol,
    options: { canDrag: () => !sectionCol.isResizing() && !sectionCol.isChildResizing() },
  });
};
