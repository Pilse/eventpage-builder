import { TextBlock } from "@/domain/block";
import { IUseDefaultBlockProps, useBlockHistory, useDefaultBlockProps } from "@/hooks";
import { hasChildrenMixin, hasDropColMixin, hasDropRowMixin } from "@/util";
import { CSSProperties, DragEvent, MouseEvent, useLayoutEffect, useRef, useState } from "react";
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
  const { block, style, onDragStart, isSelected, ...defaultProps } = useDefaultBlockProps(text);
  const [pargraphRef, setPargraphRef] = useState<HTMLParagraphElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const contentRef = useRef(block._content);

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
    block._content = target.innerHTML;

    if (block.widthType === "fit") {
      block.width = Math.floor(pargraphRef?.offsetWidth ?? block._width);
    } else {
      block._width = Math.floor(pargraphRef?.offsetWidth ?? block._width);
    }
    if (block.heightType === "fit") {
      block.height = Math.floor(pargraphRef?.offsetHeight ?? block._height);
    } else {
      block._height = Math.floor(pargraphRef?.offsetHeight ?? block._height);
    }

    const parent = block.parent;
    if (
      (block.widthType === "fit" || block.heightType === "fit") &&
      parent &&
      (hasDropRowMixin(parent) || hasDropColMixin(parent))
    ) {
      parent.autoLayout();
    }
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

    block._content = contentRef.current;
    block.content = block._content;
    endCaptureSnapshot(`input-${block.id}`);
  };

  const handleDragStart = (e: DragEvent) => {
    handleBlur();
    onDragStart(e);
  };

  // block의 widhthType과 heightType이 fit일 때,
  // width와 height가 변경된 크기가 반영되지 않은 경우가 있음 (속성 패널에서 변경시)
  // effect를 이용하여 렌더링 후에 크기 업데이트를 보장
  useLayoutEffect(() => {
    if (!pargraphRef) {
      return;
    }

    if (block.widthType === "fit") {
      block._width = Math.floor(pargraphRef.offsetWidth);
    }
    if (block.heightType === "fit") {
      block._height = Math.floor(pargraphRef.offsetHeight);
    }
  }, [block.widthType, block.heightType, block, pargraphRef]);

  const styleOverride = {
    ...style,
    ...(block.widthType === "fit" ? { width: "max-content" } : {}),
    ...(block.heightType === "fit" ? { height: "fit-content" } : {}),
  };
  const textStyle: CSSProperties = {
    padding: `${block.pt}px ${block.pr}px ${block.pb}px ${block.pl}px`,
  };

  if (!isEditing && !isSelected && block._content !== block.content) {
    handleBlur();
  }

  return {
    block,
    isSelected,
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
