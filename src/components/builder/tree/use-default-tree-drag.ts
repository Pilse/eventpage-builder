import { Block } from "@/domain/builder";
import { useDrag } from "react-dnd";
import { useBlockHistory, useGlobalContext } from "@/hooks";
import { BlockDragOptions } from "@/type";

interface IUseDefaultBlockDragProps {
  block: InstanceType<typeof Block>;
  dragType?: string;
  options?: BlockDragOptions;
}

export const useDefaultTreeDrag = (
  { block, dragType = "TREE", options }: IUseDefaultBlockDragProps,
  dependencies?: any[]
) => {
  const { setCurrentBlock } = useGlobalContext();
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();
  const { canDrag, ...restOptions } = options ?? {};

  return useDrag(
    () => ({
      type: dragType,
      item: block,
      end() {
        setCurrentBlock(block);
        endCaptureSnapshot(`drag-${block.id}`);
      },
      collect: (monitor) => {
        const itemType = monitor.getItemType();
        if (itemType !== dragType) {
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
    [...(dependencies ?? [])]
  );
};
