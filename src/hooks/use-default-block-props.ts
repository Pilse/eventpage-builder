import { Block } from "@/domain/builder";
import { getBlockStyle, isAutoLayouted } from "@/shared/util";
import { CSSProperties, Dispatch, MouseEvent, MouseEventHandler, SetStateAction, useState } from "react";
import { DragSourceMonitor } from "react-dnd";
import { BlockType } from "@/type";
import { useGlobalContext, useDomain } from "@/hooks";

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
  onMouseDown?: MouseEventHandler;
  onMouseEnter?: MouseEventHandler;
  onMouseMove?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
  isSelected: boolean;
}

export const useDefaultBlockProps = <T extends InstanceType<typeof Block>>(
  blockInstance: T
): IUseDefaultBlockProps<T> => {
  const [element, setElement] = useState<HTMLElement | null>(null);

  const { currentBlock, setCurrentBlock, isResizing } = useGlobalContext();
  const block = useDomain(blockInstance, blockInstance._listeners);

  const isSelected = currentBlock?.id === block.id;
  const useConstraint = block.parent && !isAutoLayouted(block) && !isSelected;

  const style: CSSProperties = getBlockStyle(block, isSelected);

  const handleClick = (e: MouseEvent) => {
    setCurrentBlock(block);
    e.stopPropagation();
  };

  const handleMouseDown = (e: MouseEvent) => {
    setCurrentBlock(block);
    if (useConstraint) {
      block.t = (block.parent?.height ?? 0) / 2 - (block._centerY + block.height / 2);
      block.l = (block.parent?.width ?? 0) / 2 - (block._centerX + block.width / 2);
    }
    e.stopPropagation();
  };

  const handleMouseEnter = () => {
    block.isHovered = true;
    let parent = block.parent;
    while (parent) {
      if (parent.isHovered) {
        parent.isHovered = false;
      }
      parent = parent.parent;
    }
  };

  const handleMouseMove = () => {
    if (block.isHovered) {
      return;
    }

    block.isHovered = true;
    let parent = block.parent;
    while (parent) {
      if (parent.isHovered) {
        parent.isHovered = false;
      }
      parent = parent.parent;
    }
  };

  const handleMouseLeave = () => {
    if (!block.isHovered) {
      return;
    }

    block.isHovered = false;
  };

  return {
    tabIndex: -1,
    id: block.id,
    "data-block-type": block.type,
    element,
    onClick: handleClick,
    onMouseDown: isResizing ? undefined : handleMouseDown,
    onMouseEnter: isResizing ? undefined : handleMouseEnter,
    onMouseMove: isResizing ? undefined : handleMouseMove,
    onMouseLeave: isResizing ? undefined : handleMouseLeave,
    setElement,
    style,
    block,
    isSelected: !!currentBlock?.id && currentBlock?.id === block.id,
  };
};
