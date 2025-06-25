import { useDefaultBlockDrag } from "@/hooks";
import { ImageBlock } from "@/domain/builder";

export const useImageBlockDrag = (image: InstanceType<typeof ImageBlock>) => {
  return useDefaultBlockDrag({
    block: image,
    options: { canDrag: () => !image.isSiblingResizing() && !image.isResizing() },
  });
};
