"use client";

import { FrameCanvas } from "@/domain/builder";
import { IRendererBlockProps } from "@/type";
import { getBlockStyle } from "@/shared/util";
import { RendererFactory } from "../factory";
import { getUserEvents } from "@/shared/user-event";

interface IFrameProps extends IRendererBlockProps<FrameCanvas> {}

export const FrameRenderer = ({ block }: IFrameProps) => {
  const style = getBlockStyle(block, false);
  const userEvents = getUserEvents(block);

  return (
    <div style={style} {...userEvents}>
      {block.children.map((child) => (
        <RendererFactory key={child.id} block={child} />
      ))}
    </div>
  );
};
