"use client";

import { getEmptyImage } from "react-dnd-html5-backend";
import { twMerge } from "tailwind-merge";
import { FrameRowBlock } from "@/domain/builder";
import { ChildrenMixin, ResizeMixin } from "@/components/builder/mixin";
import { FrameBlockTypeLayer, HoverLayer } from "@/components/builder/layer";
import { IBlockProps } from "@/type";
import {
  BlockContextMenu,
  useFrameRowBlockDrag,
  useFrameRowBlockDrop,
  useFrameRowBlockProps,
} from "@/components/builder/block";
import { isAutoLayouted } from "@/shared/util";

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
    <BlockContextMenu block={frameRow}>
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
        {!isSelected && (
          <HoverLayer
            useProgrammaticHovered={isDragging || block.isHovered}
            programmaticHovered={isCurrentOver || block.isHovered}
          />
        )}
        {isSelected && element && <ResizeMixin element={element} block={frameRow} />}
        {(block.isHovered || isSelected || isCurrentOver) && <FrameBlockTypeLayer block={frameRow} />}
        <ChildrenMixin block={frameRow} />
      </div>
    </BlockContextMenu>
  );
};
