"use client";

import { getEmptyImage } from "react-dnd-html5-backend";
import { twMerge } from "tailwind-merge";
import { ImageBlock } from "@/domain/block";
import { useImageBlockProps, useImageBlockDrag } from "@/component/block";
import { ResizeMixin } from "@/component/mixin";
import { HoverLayer } from "@/component/layer";
import { IBlockProps } from "@/type";
import { isAutoLayouted } from "@/util";

interface IImageProps extends IBlockProps<InstanceType<typeof ImageBlock>> {}

export const Image = ({ block, isPreview }: IImageProps) => {
  const { block: image, element, setElement, isSelected, ...blockProps } = useImageBlockProps(block);
  const [{ isDragging }, dragRef, previewRef] = useImageBlockDrag(image);

  return (
    <div
      ref={(ele) => {
        setElement(ele);
        dragRef(ele);
        previewRef(getEmptyImage());
      }}
      className={twMerge(
        "group bg-yellow-200",
        !isPreview && isDragging && "opacity-0",
        isAutoLayouted(image) && "opacity-100"
      )}
      {...blockProps}
    >
      {!isSelected && !image.isSiblingResizing() && <HoverLayer />}
      {isSelected && element && <ResizeMixin element={element} block={image} />}
      {/*  eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.url}
        alt="image"
        className="w-full h-full object-cover pointer-events-none"
        draggable={false}
      />
    </div>
  );
};
