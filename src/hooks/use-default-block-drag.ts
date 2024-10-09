import { Block } from "@/domain/block";
import { hasDragMixin } from "@/util";
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
        endCaptureSnapshot(`drag-${block.id}`);
      },
      canDrag: canDrag ? canDrag : () => hasDragMixin(block),
      collect: (monitor) => {
        const isDragging = monitor.isDragging() || monitor.getItem()?.id === block.id;
        if (isDragging) {
          startCaptureSnapshot(`drag-${block.id}`);
        }
        return { isDragging };
      },
      options: { dropEffect: "move" },
      ...restOptions,
    }),
    [...(dependencies ?? [])]
  );
};
