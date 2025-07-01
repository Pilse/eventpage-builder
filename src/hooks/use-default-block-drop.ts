import { Block } from "@/domain/builder";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { useBlockHistory } from "./use-block-history";
import { useThrottle } from "./use-throttle";

interface IUseDefaultBlockDropProps {
  hover?: (item: Block, monitor: DropTargetMonitor<Block>) => void;
  canDrop?: (item: Block, monitor: DropTargetMonitor<Block>) => boolean;
  drop: (item: Block, monitor: DropTargetMonitor<Block>) => void;
}

export const useDefaultBlockDrop = (
  { hover, canDrop, drop }: IUseDefaultBlockDropProps,
  dependencies?: any[]
) => {
  const debouncedHover = useThrottle(hover ?? (() => {}), 60);
  const { endCaptureSnapshot } = useBlockHistory();

  return useDrop(
    () => ({
      hover: debouncedHover,
      drop: (item, monitor) => {
        drop(item, monitor);
        endCaptureSnapshot(`drag-${item.id}`);
      },
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
