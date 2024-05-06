"use client";

import { IBlockProps } from "@/type";
import { Block, FrameBlock, FrameColBlock, FrameRowBlock, TextBlock } from "@/domain/block";
import { Frame, FrameCol, Text, FrameRow } from "@/component/block";

interface IBlockFactoryProps extends IBlockProps<Block> {}

export const BlockFactory = ({ block, isPreview }: IBlockFactoryProps) => {
  return (
    <>
      {block.type === "FRAME_CANVAS" ? (
        <Frame block={block as InstanceType<typeof FrameBlock>} isPreview={isPreview} />
      ) : block.type === "FRAME_ROW" ? (
        <FrameRow block={block as InstanceType<typeof FrameRowBlock>} isPreview={isPreview} />
      ) : block.type === "FRAME_COL" ? (
        <FrameCol block={block as InstanceType<typeof FrameColBlock>} isPreview={isPreview} />
      ) : block.type === "TEXT" ? (
        <Text block={block as InstanceType<typeof TextBlock>} isPreview={isPreview} />
      ) : (
        <></>
      )}
    </>
  );
};
