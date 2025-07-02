"use client";

import { SectionRow } from "@/domain/builder";
import { IRendererBlockProps } from "@/type";
import { getBlockStyle } from "@/shared/util";
import { RendererFactory } from "../factory";
import { getUserEvents } from "@/shared/user-event";

interface ISectionColProps extends IRendererBlockProps<SectionRow> {}

export const SectionRowRenderer = ({ block }: ISectionColProps) => {
  const { backgroundImage, backgroundRepeat, backgroundPosition, backgroundSize, ...style } = getBlockStyle(
    block,
    false
  );
  const userEvents = getUserEvents(block);

  return (
    <section style={{ ...style, width: "100%" }}>
      <div
        style={{
          width: style.width,
          height: style.height,
          margin: "0 auto",
          position: "relative",
          backgroundImage,
          backgroundRepeat,
          backgroundPosition,
          backgroundSize,
        }}
        {...userEvents}
      >
        {block.children.map((child) => (
          <RendererFactory key={child.id} block={child} />
        ))}
      </div>
    </section>
  );
};
