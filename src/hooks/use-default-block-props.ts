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
  useLayoutEffect,
  useState,
} from "react";
import { DragSourceMonitor } from "react-dnd";
import { BlockType } from "@/type";
import { useGlobalContext, useDomain } from "@/hooks";
import { IS_PROXY } from "@/constant";
import { rgbaToCss, rgbaToHexColor } from "@/util/color";

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
  onMouseEnter: MouseEventHandler;
  onMouseMove: MouseEventHandler;
  onMouseLeave: MouseEventHandler;
  onDragStart: DragEventHandler;
  isSelected: boolean;
}

export const useDefaultBlockProps = <T extends InstanceType<typeof Block>>(
  blockInstance: T
): IUseDefaultBlockProps<T> => {
  const [element, setElement] = useState<HTMLElement | null>(null);

  const { currentBlock, setCurrentBlock } = useGlobalContext();
  const block = useDomain(blockInstance, blockInstance._listeners);

  const isSelected = currentBlock?.id === block.id;
  const useConstraint = block.parent && !isAutoLayouted(block) && !isSelected;

  const style: CSSProperties = {
    width: block.width,
    height: block.height,
    position: block.position,
    top: useConstraint ? (block.parent?.height ?? 0) / 2 - (block._centerY + block.height / 2) : block.t,
    left: useConstraint ? (block.parent?.width ?? 0) / 2 - (block._centerX + block.width / 2) : block.l,
    right: block.r,
    bottom: block.b,
    backgroundColor: rgbaToCss(block.backgroundColor),
    boxShadow: `${block.shadow.x}px ${block.shadow.y}px ${block.shadow.blur}px ${
      block.shadow.spread
    }px ${rgbaToCss(block.shadow.color)} ${
      block.borderPosition === "inside"
        ? `,inset 0px 0px 0px ${block.borderWidth}px #${rgbaToHexColor(block.borderColor)}`
        : ""
    }`,
    outline:
      block.borderPosition === "outside"
        ? `${block.borderWidth}px solid #${rgbaToHexColor(block.borderColor)}`
        : "none",
    borderRadius: `${block.borderRadiusT}px ${block.borderRadiusR}px ${block.borderRadiusB}px ${block.borderRadiusL}px`,
  };

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
    block.isHovered = false;
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
    onMouseEnter: handleMouseEnter,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    setElement,
    style,
    block,
    isSelected: !!currentBlock?.id && currentBlock?.id === block.id,
  };
};
