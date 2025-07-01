"use client";

import { Section } from "@/domain/builder";
import { IRendererBlockProps } from "@/type";
import { getBlockStyle } from "@/shared/util";
import { RendererFactory } from "../factory";

interface ISectionProps extends IRendererBlockProps<Section> {}

export const SectionRenderer = ({ block }: ISectionProps) => {
  const style = getBlockStyle(block, false);

  return (
    <section style={{ ...style, width: "100%" }}>
      <div style={{ width: style.width, height: style.height, margin: "0 auto", position: "relative" }}>
        {block.children.map((child) => (
          <RendererFactory key={child.id} block={child} />
        ))}
      </div>
    </section>
  );
};
