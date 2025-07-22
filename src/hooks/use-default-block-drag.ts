import { Block } from "@/domain/builder";
import { hasDragMixin } from "@/shared/util";
import { useDrag } from "react-dnd";
import { useGlobalContext } from "@/hooks";
import { BlockDragOptions } from "@/type";
import { useBlockHistory } from "./use-block-history";

interface IUseDefaultBlockDragProps {
  block: InstanceType<typeof Block>;
  options?: BlockDragOptions;
}

export const useDefaultBlockDrag = ({ block, options }: IUseDefaultBlockDragProps, dependencies?: any[]) => {
  const { setCurrentBlock } = useGlobalContext();
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();
  const { canDrag, ...restOptions } = options ?? {};

  return useDrag(
    () => ({
      type: "BLOCK",
      item: block,
      end() {
        setCurrentBlock(block);
      },
      canDrag: canDrag ? canDrag : () => hasDragMixin(block),
      collect: (monitor) => {
        const itemType = monitor.getItemType();
        if (itemType !== "BLOCK") {
          return { isDragging: false };
        }
        const isDragging = monitor.isDragging() || monitor.getItem()?.id === block.id;
        if (isDragging) {
          startCaptureSnapshot(`drag-${block.id}`);
        }
        return { isDragging };
      },
      options: { dropEffect: "move" },
      ...restOptions,
    }),
    dependencies ?? [block]
  );
};
