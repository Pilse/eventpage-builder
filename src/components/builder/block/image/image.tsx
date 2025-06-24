"use client";

import { getEmptyImage } from "react-dnd-html5-backend";
import { twMerge } from "tailwind-merge";
import { ImageBlock } from "@/domain/block";
import { useImageBlockProps, useImageBlockDrag } from "@/components/builder/block";
import { ResizeMixin } from "@/components/builder/mixin";
import { HoverLayer } from "@/components/builder/layer";
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
        "group",
        !isPreview && isDragging && "opacity-0",
        isAutoLayouted(image) && "opacity-100"
      )}
      {...blockProps}
    >
      {!isSelected && !image.isSiblingResizing() && (
        <HoverLayer
          useProgrammaticHovered={block.isHovered || isDragging}
          programmaticHovered={block.isHovered}
        />
      )}
      {isSelected && element && <ResizeMixin element={element} block={image} />}
      {/*  eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.url}
        alt="image"
        className="w-full h-full object-cover pointer-events-none"
        style={{ borderRadius: blockProps.style.borderRadius }}
        draggable={false}
      />
    </div>
  );
};
