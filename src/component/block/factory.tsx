"use client";

import { IBlockProps } from "@/type";
import { Block, FrameBlock, TextBlock } from "@/domain/block";
import { Frame, Text } from "@/component/block";

interface IBlockFactoryProps extends IBlockProps<Block> {}

export const BlockFactory = ({ block, isPreview }: IBlockFactoryProps) => {
  return (
    <>
      {block.type === "FRAME" ? (
        <Frame block={block as InstanceType<typeof FrameBlock>} isPreview={isPreview} />
      ) : block.type === "TEXT" ? (
        <Text block={block as InstanceType<typeof TextBlock>} isPreview={isPreview} />
      ) : (
        <></>
      )}
    </>
  );
};
