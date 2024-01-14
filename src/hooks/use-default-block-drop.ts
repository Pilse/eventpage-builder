import { Block } from "@/domain/block";
import { DropTargetMonitor, useDrop } from "react-dnd";

interface IUseDefaultBlockDropProps {
  hover?: (item: Block, monitor: DropTargetMonitor<Block>) => void;
  canDrop?: (item: Block, monitor: DropTargetMonitor<Block>) => boolean;
  drop: (item: Block, monitor: DropTargetMonitor<Block>) => void;
}

export const useDefaultBlockDrop = (
  { hover, canDrop, drop }: IUseDefaultBlockDropProps,
  dependencies?: any[]
) => {
  return useDrop(
    () => ({
      hover,
      drop,
      accept: "BLOCK",
      canDrop: canDrop ?? (() => true),
      collect: (monitor) => {
        return {
          isOver: monitor.isOver(),
          isCurrentOver: monitor.isOver({ shallow: true }),
          isDragging: monitor.getItem() !== null,
        };
      },
    }),
    [...(dependencies ?? [])]
  );
};
