"use client";

import { Container } from "@/domain/builder";
import { ChildrenMixin } from "@/components/builder/mixin";
import { IRendererBlockProps } from "@/type";
import { getBlockStyle } from "@/util";
import { RendererFactory } from "../factory";

interface IContainerProps extends IRendererBlockProps<Container> {}

export const ContainerRenderer = ({ block }: IContainerProps) => {
  const style = getBlockStyle(block, false);

  return (
    <main className="flex flex-col items-center justify-center mx-auto" style={style}>
      {block.children.map((child) => (
        <RendererFactory key={child.id} block={child} />
      ))}
    </main>
  );
};
