"use client";

import { SectionRow } from "@/domain/builder";
import { IRendererBlockProps } from "@/type";
import { getBlockStyle } from "@/util";
import { RendererFactory } from "../factory";

interface ISectionColProps extends IRendererBlockProps<SectionRow> {}

export const SectionRowRenderer = ({ block }: ISectionColProps) => {
  const style = getBlockStyle(block, false);

  return (
    <section style={style}>
      {block.children.map((child) => (
        <RendererFactory key={child.id} block={child} />
      ))}
    </section>
  );
};
