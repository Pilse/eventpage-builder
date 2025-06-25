import { useDefaultBlockDrag } from "@/hooks";
import { TextBlock } from "@/domain/builder";

export const useTextBlockDrag = (text: InstanceType<typeof TextBlock>) => {
  return useDefaultBlockDrag({
    block: text,
    options: { canDrag: () => !text.isSiblingResizing() && !text.isResizing() },
  });
};
