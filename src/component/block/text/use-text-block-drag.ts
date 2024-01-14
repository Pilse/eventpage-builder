import { useDefaultBlockDrag } from "@/hooks";
import { TextBlock } from "@/domain/block";

export const useTextBlockDrag = (text: InstanceType<typeof TextBlock>) => {
  return useDefaultBlockDrag({ block: text, canDrag: () => !text.isResizing() });
};
