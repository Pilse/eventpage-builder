"use client";

import { Image } from "@/domain/block";
import { IRendererBlockProps } from "@/type";
import { getBlockStyle } from "@/util";

interface IImageProps extends IRendererBlockProps<Image> {}

export const ImageRenderer = ({ block }: IImageProps) => {
  const style = getBlockStyle(block, false);

  return (
    <div style={style}>
      {/*  eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={block.url}
        alt={block.filename}
        className="w-full h-full object-cover pointer-events-none"
        style={{ borderRadius: style.borderRadius }}
        draggable={false}
      />
    </div>
  );
};
