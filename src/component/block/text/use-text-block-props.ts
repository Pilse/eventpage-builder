import { TextBlock } from "@/domain/block";
import { IUseDefaultBlockProps, useBlockHistory, useDefaultBlockProps } from "@/hooks";
import { MouseEvent, useRef, useState } from "react";
import { flushSync } from "react-dom";

interface IUseTextBlockProps extends IUseDefaultBlockProps<InstanceType<typeof TextBlock>> {
  onDoubleClick: () => void;
  onBlur: () => void;
  onInput: (e: MouseEvent<HTMLParagraphElement>) => void;
  isEditing: boolean;
}

export const useTextBlockProps = (text: InstanceType<typeof TextBlock>): IUseTextBlockProps => {
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();
  const defaultProps = useDefaultBlockProps(text);
  const [isEditing, setIsEditing] = useState(false);
  const contentRef = useRef(text.getContent());

  const handleDoublicClick = () => {
    const text = document.getElementById(`text-${defaultProps.block.id}`);
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
    startCaptureSnapshot(`input-${defaultProps.block.id}`);
    const target = e.target as HTMLParagraphElement;
    contentRef.current = target.innerHTML;
  };

  const handleBlur = () => {
    setIsEditing(false);
    defaultProps.block.setContent(contentRef.current);
    endCaptureSnapshot(`input-${defaultProps.block.id}`);
  };

  return {
    ...defaultProps,
    onDoubleClick: handleDoublicClick,
    onBlur: handleBlur,
    onInput: handleInput,
    isEditing,
  };
};
