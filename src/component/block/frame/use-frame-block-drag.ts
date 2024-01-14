import { useDefaultBlockDrag } from "@/hooks";
import { FrameBlock } from "@/domain/block";

export const useFrameBlockDrag = (frame: InstanceType<typeof FrameBlock>) => {
  return useDefaultBlockDrag({
    block: frame,
    canDrag: () => !frame.isResizing() && !frame.isChildResizing(),
  });
};
