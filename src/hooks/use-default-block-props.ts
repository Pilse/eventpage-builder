import { Block } from "@/domain/block";
import { hasChildrenMixin, hasResizeMixin, isAutoLayouted } from "@/util";
import {
  CSSProperties,
  Dispatch,
  DragEventHandler,
  FocusEventHandler,
  MouseEvent,
  MouseEventHandler,
  SetStateAction,
  useState,
} from "react";
import { DragSourceMonitor, useDragDropManager } from "react-dnd";
import { useDomain } from ".";
import { BlockType } from "@/type";

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
  onBlur: FocusEventHandler;
  onDragStart: DragEventHandler;
  isSelected: boolean;
}

export const useDefaultBlockProps = <T extends InstanceType<typeof Block>>(
  blockInstance: T
): IUseDefaultBlockProps<T> => {
  const [isSelected, setIsSelected] = useState(false);
  const [element, setElement] = useState<HTMLElement | null>(null);

  const block = useDomain(blockInstance);

  const style: CSSProperties = {
    width: block.width,
    height: block.height,
    position: block.position,
    top: block.t,
    left: block.l,
    right: block.r,
    bottom: block.b,
  };

  const onClick = (e: MouseEvent) => {
    setIsSelected(true);
    e.stopPropagation();
  };

  const onBlur = () => {
    setIsSelected(false);
  };

  const onDragStart = () => {
    if (!hasResizeMixin(block) || block.isResizing()) {
      return;
    }

    setIsSelected(false);
  };

  return {
    tabIndex: -1,
    id: block.id,
    "data-block-type": block.type,
    element,
    onBlur,
    onClick,
    onDragStart,
    setElement,
    style,
    block,
    isSelected,
  };
};
