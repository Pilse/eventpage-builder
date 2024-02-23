"use client";

import { getEmptyImage } from "react-dnd-html5-backend";
import { twMerge } from "tailwind-merge";
import { FrameRowBlock } from "@/domain/block";
import { ChildrenMixin, ResizeMixin } from "@/component/mixin";
import { HoverLayer } from "@/component/layer";
import { IBlockProps } from "@/type";
import { useFrameRowBlockDrag, useFrameRowBlockDrop, useFrameRowBlockProps } from "@/component/block";
import { isAutoLayouted } from "@/util";

interface IFrameRowProps extends IBlockProps<InstanceType<typeof FrameRowBlock>> {}

export const FrameRow = ({ block, isPreview }: IFrameRowProps) => {
  const { block: frameRow, element, setElement, isSelected, ...blockProps } = useFrameRowBlockProps(block);
  const [{ isDragging: isCurrentDragging }, dragRef, previewRef] = useFrameRowBlockDrag(frameRow);
  const [{ isCurrentOver, isDragging }, dropRef] = useFrameRowBlockDrop(
    frameRow,
    element,
    isCurrentDragging,
    isPreview
  );

  return (
    <div
      ref={(ele) => {
        setElement(ele);
        dragRef(ele);
        if (isPreview || !isCurrentDragging) {
          dropRef(ele);
        }
        previewRef(getEmptyImage());
      }}
      className={twMerge(
        "group bg-green-300",
        !isPreview && isCurrentDragging && "opacity-0",
        isAutoLayouted(frameRow) && "opacity-100"
      )}
      {...blockProps}
    >
      {!isSelected && <HoverLayer useProgrammaticHovered={isDragging} programmaticHovered={isCurrentOver} />}
      {isSelected && element && <ResizeMixin element={element} block={frameRow} />}
      <ChildrenMixin block={frameRow} />
    </div>
  );
};
