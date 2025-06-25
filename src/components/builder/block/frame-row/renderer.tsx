"use client";

import { FrameRow } from "@/domain/builder";
import { IRendererBlockProps } from "@/type";
import { getBlockStyle } from "@/util";
import { RendererFactory } from "../factory";

interface IFrameRowProps extends IRendererBlockProps<FrameRow> {}

export const FrameRowRenderer = ({ block }: IFrameRowProps) => {
  const style = getBlockStyle(block, false);

  return (
    <div style={style}>
      {block.children.map((child) => (
        <RendererFactory key={child.id} block={child} />
      ))}
    </div>
  );
};
