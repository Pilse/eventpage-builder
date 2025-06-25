"use client";

import { SectionCol } from "@/domain/builder";
import { IRendererBlockProps } from "@/type";
import { getBlockStyle } from "@/shared/util";
import { RendererFactory } from "../factory";

interface ISectionColProps extends IRendererBlockProps<SectionCol> {}

export const SectionColRenderer = ({ block }: ISectionColProps) => {
  const style = getBlockStyle(block, false);

  return (
    <section style={style}>
      {block.children.map((child) => (
        <RendererFactory key={child.id} block={child} />
      ))}
    </section>
  );
};
