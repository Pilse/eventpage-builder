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
  useRef,
  useState,
} from "react";
import { DragSourceMonitor } from "react-dnd";
import { useDomain } from "./use-domain";
import { BlockType } from "@/type";
import { GlobalContext } from "@/domain/context";

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
  const globalContextRef = useRef(new GlobalContext());

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

  const handleClick = (e: MouseEvent) => {
    setIsSelected(true);
    globalContextRef.current.setCurrentBlock(block);
    e.stopPropagation();
  };

  const handleBlur = () => {
    setIsSelected(false);
    globalContextRef.current.setCurrentBlock(null);
  };

  const handleDragStart = () => {
    if (!hasResizeMixin(block) || block.isResizing()) {
      return;
    }

    setIsSelected(false);
    globalContextRef.current.setCurrentBlock(null);
  };

  useLayoutEffect(() => {
    if (block.parent && hasChildrenMixin(block.parent)) {
      block.parent.replaceChild(block);
    }
  }, [block]);

  return {
    tabIndex: -1,
    id: block.id,
    "data-block-type": block.type,
    element,
    onBlur: handleBlur,
    onClick: handleClick,
    onDragStart: handleDragStart,
    setElement,
    style,
    block,
    isSelected,
  };
};
