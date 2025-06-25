import { useDefaultBlockDrag } from "@/hooks";
import { FrameRowBlock } from "@/domain/builder";

export const useFrameRowBlockDrag = (frameRow: InstanceType<typeof FrameRowBlock>) => {
  return useDefaultBlockDrag({
    block: frameRow,
    options: { canDrag: () => !frameRow.isResizing() && !frameRow.isChildResizing() },
  });
};
