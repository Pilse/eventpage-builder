"use client";

import { Container } from "@/domain/builder";
import { IRendererBlockProps } from "@/type";
import { getBlockStyle } from "@/shared/util";
import { RendererFactory } from "../factory";
import { getUserEvents } from "@/shared/user-event";

interface IContainerProps extends IRendererBlockProps<Container> {}

export const ContainerRenderer = ({ block }: IContainerProps) => {
  const style = getBlockStyle(block, false);
  const userEvents = getUserEvents(block);

  return (
    <main className="mx-auto" style={{ ...style, width: "100%" }} {...userEvents}>
      <div style={{ height: style.height, margin: "0 auto", position: "relative" }}>
        {block.children.map((child) => (
          <RendererFactory key={child.id} block={child} />
        ))}
      </div>
    </main>
  );
};
