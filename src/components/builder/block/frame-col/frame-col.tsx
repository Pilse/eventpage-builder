"use client";

import { getEmptyImage } from "react-dnd-html5-backend";
import { twMerge } from "tailwind-merge";
import { FrameColBlock } from "@/domain/builder";
import { ChildrenMixin, ResizeMixin } from "@/components/builder/mixin";
import { FrameBlockTypeLayer, HoverLayer } from "@/components/builder/layer";
import { IBlockProps } from "@/type";
import {
  useFrameColBlockDrag,
  useFrameColBlockDrop,
  useFrameColBlockProps,
} from "@/components/builder/block";
import { isAutoLayouted } from "@/shared/util";

interface IFrameColProps extends IBlockProps<InstanceType<typeof FrameColBlock>> {}

export const FrameCol = ({ block, isPreview }: IFrameColProps) => {
  const { block: frameCol, element, setElement, isSelected, ...blockProps } = useFrameColBlockProps(block);
  const [{ isDragging: isCurrentDragging }, dragRef, previewRef] = useFrameColBlockDrag(frameCol);
  const [{ isCurrentOver, isDragging }, dropRef] = useFrameColBlockDrop(
    frameCol,
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
        "group bg-blue-200",
        !isPreview && isCurrentDragging && "opacity-0",
        isAutoLayouted(frameCol) && "opacity-100"
      )}
      {...blockProps}
    >
      {!isSelected && (
        <HoverLayer
          useProgrammaticHovered={isDragging || block.isHovered}
          programmaticHovered={isCurrentOver || block.isHovered}
        />
      )}
      {isSelected && element && <ResizeMixin element={element} block={frameCol} />}
      {(block.isHovered || isSelected || isCurrentOver) && <FrameBlockTypeLayer block={frameCol} />}
      <ChildrenMixin block={frameCol} />
    </div>
  );
};
