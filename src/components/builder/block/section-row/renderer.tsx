"use client";

import { SectionRow } from "@/domain/builder";
import { IRendererBlockProps } from "@/type";
import { getBlockStyle } from "@/shared/util";
import { RendererFactory } from "../factory";
import { getUserEvents } from "@/shared/user-event";

interface ISectionColProps extends IRendererBlockProps<SectionRow> {}

export const SectionRowRenderer = ({ block }: ISectionColProps) => {
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
