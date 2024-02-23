import { useDefaultBlockDrag } from "@/hooks";
import { FrameRowBlock } from "@/domain/block";

export const useFrameRowBlockDrag = (frameRow: InstanceType<typeof FrameRowBlock>) => {
  return useDefaultBlockDrag({
    block: frameRow,
    canDrag: () => !frameRow.isResizing() && !frameRow.isChildResizing(),
  });
};
