"use client";

import { Image } from "@/domain/builder";
import { IRendererBlockProps } from "@/type";
import { getBlockStyle } from "@/shared/util";
import { getUserEvents } from "@/shared/user-event";

interface IImageProps extends IRendererBlockProps<Image> {}

export const ImageRenderer = ({ block }: IImageProps) => {
  const style = getBlockStyle(block, false);
  const userEvents = getUserEvents(block);

  return (
    <div style={style} {...userEvents}>
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
