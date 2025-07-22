"use client";

import { Section } from "@/domain/builder";
import { IRendererBlockProps } from "@/type";
import { getBlockStyle } from "@/shared/util";
import { RendererFactory } from "../factory";
import { getUserEvents } from "@/shared/user-event";

interface ISectionProps extends IRendererBlockProps<Section> {}

export const SectionRenderer = ({ block }: ISectionProps) => {
  const style = getBlockStyle(block, false);
  const userEvents = getUserEvents(block);

  return (
    <section style={style} {...userEvents}>
      {block.children.map((child) => (
        <RendererFactory key={child.id} block={child} />
      ))}
    </section>
  );
};
