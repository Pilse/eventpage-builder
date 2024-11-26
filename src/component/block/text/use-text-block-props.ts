import { TextBlock } from "@/domain/block";
import { IUseDefaultBlockProps, useBlockHistory, useDefaultBlockProps } from "@/hooks";
import { hasChildrenMixin } from "@/util";
import { CSSProperties, DragEvent, MouseEvent, useRef, useState } from "react";
import { flushSync } from "react-dom";

interface IUseTextBlockProps extends IUseDefaultBlockProps<InstanceType<typeof TextBlock>> {
  onDoubleClick: () => void;
  onBlur: () => void;
  onInput: (e: MouseEvent<HTMLParagraphElement>) => void;
  isEditing: boolean;
  textStyle: CSSProperties;
  setPargraphRef: (ref: HTMLParagraphElement | null) => void;
}

export const useTextBlockProps = (text: InstanceType<typeof TextBlock>): IUseTextBlockProps => {
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();
  const { block, style, onDragStart, ...defaultProps } = useDefaultBlockProps(text);
  const [pargraphRef, setPargraphRef] = useState<HTMLParagraphElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const contentRef = useRef(text.content);

  const handleDoublicClick = () => {
    const text = document.getElementById(`text-${block.id}`);
    if (!text) {
      return;
    }

    flushSync(() => {
      setIsEditing(true);
    });

    const range = document.createRange();
    range.selectNodeContents(text);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  const handleInput = (e: MouseEvent<HTMLParagraphElement>) => {
    startCaptureSnapshot(`input-${block.id}`);
    const target = e.target as HTMLParagraphElement;
    contentRef.current = target.innerHTML;
  };

  const handleBlur = () => {
    setIsEditing(false);
    if ((isEditing && contentRef.current === "") || contentRef.current === "<br>") {
      if (block.parent && hasChildrenMixin(block.parent)) {
        block.parent.removeChild(block);
      }
    }

    if (block.widthType === "fit") {
      block.width = Math.floor(pargraphRef?.offsetWidth ?? block._width);
    }
    if (block.heightType === "fit") {
      block.height = Math.floor(pargraphRef?.offsetHeight ?? block._height);
    }
    block.content = contentRef.current;
    endCaptureSnapshot(`input-${block.id}`);
  };

  const handleDragStart = (e: DragEvent) => {
    handleBlur();
    onDragStart(e);
  };

  const styleOverride = {
    ...style,
    ...(block.widthType === "fit" ? { width: "fit-content" } : {}),
    ...(block.heightType === "fit" ? { height: "fit-content" } : {}),
  };
  const textStyle: CSSProperties = block.getStyle();

  return {
    block,
    style: styleOverride,
    ...defaultProps,
    onDoubleClick: handleDoublicClick,
    onBlur: handleBlur,
    onInput: handleInput,
    onDragStart: handleDragStart,
    isEditing,
    textStyle,
    setPargraphRef,
  };
};
