"use client";

import { FrameCol } from "@/domain/block";
import { IRendererBlockProps } from "@/type";
import { getBlockStyle } from "@/util";
import { RendererFactory } from "../factory";

interface IFrameColProps extends IRendererBlockProps<FrameCol> {}

export const FrameColRenderer = ({ block }: IFrameColProps) => {
  const style = getBlockStyle(block, false);

  return (
    <div style={style}>
      {block.children.map((child) => (
        <RendererFactory key={child.id} block={child} />
      ))}
    </div>
  );
};
