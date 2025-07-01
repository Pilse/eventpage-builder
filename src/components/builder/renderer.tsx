"use client";

import { RendererFactory } from "./block";
import { BlockFactory, Container } from "@/domain/builder";

interface IRendererProps {
  block: ReturnType<Container["serialize"]>;
}

export const Renderer = ({ block }: IRendererProps) => {
  return <RendererFactory block={BlockFactory.deserialize(block, null)} />;
};
