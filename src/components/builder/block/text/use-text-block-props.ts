import { TextBlock } from "@/domain/builder";
import { IUseDefaultBlockProps, useBlockHistory, useDefaultBlockProps } from "@/hooks";
import {
  getTextStyle,
  getTextWrapperStyle,
  hasChildrenMixin,
  hasDropColMixin,
  hasDropRowMixin,
} from "@/shared/util";
import { rgbaToCss } from "@/shared/util/color";
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
  const { block, style, isSelected, ...defaultProps } = useDefaultBlockProps(text);
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

  const handleDragStart = () => {
    handleBlur();
  };

  // block의 widhthType과 heightType이 fit일 때,
  // width와 height가 변경된 크기가 반영되지 않은 경우가 있음 (속성 패널에서 변경시)
  // effect를 이용하여 렌더링 후에 크기 업데이트를 보장
  useLayoutEffect(() => {
    if (!pargraphRef) {
      return;
    }

    const paragraphRect = pargraphRef.getBoundingClientRect();
    if (
      paragraphRect.width === 0 &&
      paragraphRect.height === 0 &&
      paragraphRect.top === 0 &&
      paragraphRect.left === 0
    ) {
      return;
    }

    const offsetWidth = Math.floor(pargraphRef.offsetWidth);
    const offsetHeight = Math.floor(pargraphRef.offsetHeight);
    const centerX = block.getCenterX();
    const centerY = block.getCenterY();
    if (block.widthType === "fit" && block._width !== offsetWidth) {
      block._width = offsetWidth;
    }
    if (block._centerX !== centerX) {
      block._centerX = centerX;
    }
    if (block.heightType === "fit" && block._height !== offsetHeight) {
      block._height = offsetHeight;
    }
    if (block._centerY !== centerY) {
      block._centerY = centerY;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [block.widthType, block.heightType, block.content, pargraphRef]);

  const wrapperStyle: CSSProperties = {
    ...style,
    ...getTextWrapperStyle(block),
  };
  const textStyle: CSSProperties = getTextStyle(block);

  if (!isEditing && !isSelected && block._content !== block.content) {
    handleBlur();
  }

  return {
    block,
    isSelected,
    style: wrapperStyle,
    ...defaultProps,
    onDoubleClick: handleDoublicClick,
    onBlur: handleBlur,
    onInput: handleInput,
    isEditing,
    textStyle,
    setPargraphRef,
  };
};
