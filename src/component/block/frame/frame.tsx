"use client";

import { getEmptyImage } from "react-dnd-html5-backend";
import { twMerge } from "tailwind-merge";
import { FrameBlock } from "@/domain/block";
import { ChildrenMixin, ResizeMixin } from "@/component/mixin";
import { useFrameBlockDrag, useFrameBlockDrop, useFrameBlockProps } from "@/component/block";
import { HoverLayer } from "@/component/layer";
import { IBlockProps } from "@/type";
import { isAutoLayouted } from "@/util";

interface IFrameProps extends IBlockProps<InstanceType<typeof FrameBlock>> {}

export const Frame = ({ block, isPreview }: IFrameProps) => {
  const { block: frame, element, setElement, isSelected, ...blockProps } = useFrameBlockProps(block);
  const [{ isDragging: isCurrentDragging }, dragRef, previewRef] = useFrameBlockDrag(frame);
  const [{ isCurrentOver, isDragging }, dropRef] = useFrameBlockDrop(
    frame,
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
        "group bg-neutral-100",
        !isPreview && isCurrentDragging && "opacity-0",
        isAutoLayouted(frame) && "opacity-100"
      )}
      {...blockProps}
    >
      {!isSelected && (
        <HoverLayer
          useProgrammaticHovered={isDragging || block.isHovered}
          programmaticHovered={isCurrentOver || block.isHovered}
        />
      )}
      {isSelected && element && <ResizeMixin element={element} block={frame} />}
      <ChildrenMixin block={frame} />
    </div>
  );
};
