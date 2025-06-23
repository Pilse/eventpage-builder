"use client";

import { Section } from "@/domain/block";
import { IRendererBlockProps } from "@/type";
import { getBlockStyle } from "@/util";
import { RendererFactory } from "../factory";

interface ISectionProps extends IRendererBlockProps<Section> {}

export const SectionRenderer = ({ block }: ISectionProps) => {
  const style = getBlockStyle(block, false);

  return (
    <section style={style}>
      {block.children.map((child) => (
        <RendererFactory key={child.id} block={child} />
      ))}
    </section>
  );
};
