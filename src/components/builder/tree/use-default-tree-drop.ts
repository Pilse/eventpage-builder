import { Block } from "@/domain/builder";
import { DropTargetMonitor, useDrop } from "react-dnd";

interface IUseDefaultBlockDropProps {
  hover?: (item: Block, monitor: DropTargetMonitor<Block>) => void;
  canDrop?: (item: Block, monitor: DropTargetMonitor<Block>) => boolean;
  drop: (item: Block, monitor: DropTargetMonitor<Block>) => void;
  accept?: string[];
}

export const useDefaultTreeDrop = (
  { hover, canDrop, drop, accept = ["TREE"] }: IUseDefaultBlockDropProps,
  dependencies?: any[]
) => {
  return useDrop(
    () => ({
      hover,
      drop,
      accept,
      canDrop: canDrop ?? (() => true),
      collect: (monitor) => {
        return {
          isOver: accept.includes(monitor.getItemType() as string) && monitor.isOver(),
          isCurrentOver:
            accept.includes(monitor.getItemType() as string) && monitor.isOver({ shallow: true }),
          canDrop: accept.includes(monitor.getItemType() as string) && monitor.canDrop(),
        };
      },
    }),
    [...(dependencies ?? [])]
  );
};
