"use client";

import { getEmptyImage } from "react-dnd-html5-backend";
import { twMerge } from "tailwind-merge";
import { TextBlock } from "@/domain/block";
import { useTextBlockDrag, useTextBlockProps } from "@/component/block";
import { ResizeMixin } from "@/component/mixin";
import { HoverLayer } from "@/component/layer";
import { IBlockProps } from "@/type";
import { isAutoLayouted } from "@/util";

interface ITextProps extends IBlockProps<InstanceType<typeof TextBlock>> {}

export const Text = ({ block, isPreview }: ITextProps) => {
  const { block: text, element, setElement, isSelected, ...blockProps } = useTextBlockProps(block);
  const [{ isDragging }, dragRef, previewRef] = useTextBlockDrag(text);

  return (
    <div
      ref={(ele) => {
        setElement(ele);
        dragRef(ele);
        previewRef(getEmptyImage());
      }}
      className={twMerge(
        "group bg-sky-200",
        !isPreview && isDragging && "opacity-0",
        isAutoLayouted(text) && "opacity-100"
      )}
      {...blockProps}
    >
      {!isSelected && !text.isSiblingResizing() && <HoverLayer />}
      {isSelected && element && <ResizeMixin element={element} block={text} />}
      <p className="w-full h-full">{text.getContent()}</p>
    </div>
  );
};
