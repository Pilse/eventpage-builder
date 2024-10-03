import { useDefaultBlockDrag } from "@/hooks";
import { FrameBlock } from "@/domain/block";
import { BlockDragOptions } from "@/type";

export const useFrameBlockDrag = (frame: InstanceType<typeof FrameBlock>, options?: BlockDragOptions) => {
  return useDefaultBlockDrag({
    block: frame,
    options: { canDrag: () => !frame.isResizing() && !frame.isChildResizing(), ...options },
  });
};
