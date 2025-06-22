"use client";

import { FrameCanvas } from "@/domain/block";
import { IRendererBlockProps } from "@/type";
import { getBlockStyle } from "@/util";
import { RendererFactory } from "../factory";

interface IFrameProps extends IRendererBlockProps<FrameCanvas> {}

export const FrameRenderer = ({ block }: IFrameProps) => {
  const style = getBlockStyle(block, false);

  return (
    <div style={style}>
      {block.children.map((child) => (
        <RendererFactory key={child.id} block={child} />
      ))}
    </div>
  );
};
