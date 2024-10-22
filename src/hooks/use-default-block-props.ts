import { Block } from "@/domain/block";
import { hasChildrenMixin, hasResizeMixin } from "@/util";
import {
  CSSProperties,
  Dispatch,
  DragEventHandler,
  FocusEventHandler,
  MouseEvent,
  MouseEventHandler,
  SetStateAction,
  useLayoutEffect,
  useState,
} from "react";
import { DragSourceMonitor } from "react-dnd";
import { BlockType } from "@/type";
import { useGlobalContext, useDomain } from "@/hooks";
import { IS_PROXY } from "@/constant";

export interface IUseDefaultBlockPropsProps<T extends InstanceType<typeof Block>> {
  block: T;
  canDrag: (monitor: DragSourceMonitor) => boolean;
}

export interface IUseDefaultBlockProps<T> {
  tabIndex: number;
  id: string;
  "data-block-type": BlockType;
  element: HTMLElement | null;
  block: T;
  setElement: Dispatch<SetStateAction<HTMLElement | null>>;
  style: CSSProperties;
  onClick: MouseEventHandler;
  onMouseDown: MouseEventHandler;
  onDragStart: DragEventHandler;
  isSelected: boolean;
}

export const useDefaultBlockProps = <T extends InstanceType<typeof Block>>(
  blockInstance: T
): IUseDefaultBlockProps<T> => {
  const [element, setElement] = useState<HTMLElement | null>(null);

  const { currentBlock, setCurrentBlock } = useGlobalContext();
  const block = useDomain(blockInstance);

  const style: CSSProperties = {
    width: block.width === -1 ? "auto" : block.width,
    height: block.height,
    position: block.position,
    top: block.t,
    left: block.l,
    right: block.r,
    bottom: block.b,
  };

  const handleClick = (e: MouseEvent) => {
    setCurrentBlock(block);
    e.stopPropagation();
  };

  const handleMouseDown = (e: MouseEvent) => {
    setCurrentBlock(block);
    e.stopPropagation();
  };

  const handleDragStart = () => {
    if (!hasResizeMixin(block) || block.isResizing()) {
      return;
    }
  };

  useLayoutEffect(() => {
    if (block.parent && hasChildrenMixin(block.parent)) {
      const me = block.parent.findChildById(block.id);
      if (me && !(me as any)[IS_PROXY]) {
        block.parent.replaceChild(block);
      }
    }
  }, [block]);

  return {
    tabIndex: -1,
    id: block.id,
    "data-block-type": block.type,
    element,
    onClick: handleClick,
    onMouseDown: handleMouseDown,
    onDragStart: handleDragStart,
    setElement,
    style,
    block,
    isSelected: !!currentBlock?.id && currentBlock?.id === block.id,
  };
};
