import { Block } from "@/domain/block";
import { hasDragMixin } from "@/util";
import { useDrag } from "react-dnd";
import { useGlobalContext } from "@/hooks";
import { BlockDragOptions } from "@/type";

interface IUseDefaultBlockDragProps {
  block: InstanceType<typeof Block>;
  options?: BlockDragOptions;
}

export const useDefaultBlockDrag = ({ block, options }: IUseDefaultBlockDragProps, dependencies?: any[]) => {
  const { setCurrentBlock } = useGlobalContext();
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
        return { isDragging: monitor.isDragging() || monitor.getItem()?.id === block.id };
      },
      options: { dropEffect: "move" },
      ...restOptions,
    }),
    [...(dependencies ?? [])]
  );
};
