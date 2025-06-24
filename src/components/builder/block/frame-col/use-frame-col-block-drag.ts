import { useDefaultBlockDrag } from "@/hooks";
import { FrameColBlock } from "@/domain/block";

export const useFrameColBlockDrag = (frameCol: InstanceType<typeof FrameColBlock>) => {
  return useDefaultBlockDrag({
    block: frameCol,
    options: { canDrag: () => !frameCol.isResizing() && !frameCol.isChildResizing() },
  });
};
