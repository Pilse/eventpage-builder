import { Block } from "@/domain/block";
import { hasDragMixin } from "@/util";
import { DragSourceMonitor, useDrag, useDragDropManager } from "react-dnd";

interface IUseDefaultBlockDragProps {
  block: InstanceType<typeof Block>;
  canDrag?: (monitor: DragSourceMonitor) => boolean;
}

export const useDefaultBlockDrag = ({ block, canDrag }: IUseDefaultBlockDragProps, dependencies?: any[]) => {
  return useDrag(
    () => ({
      type: "BLOCK",
      item: block,
      canDrag: canDrag ? canDrag : () => hasDragMixin(block),
      collect: (monitor) => {
        return { isDragging: monitor.isDragging() || monitor.getItem()?.id === block.id };
      },
      options: { dropEffect: "move" },
    }),
    [...(dependencies ?? [])]
  );
};
