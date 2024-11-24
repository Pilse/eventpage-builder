"use client";

import { IBlockProps } from "@/type";
import {
  Block,
  ContainerBlock,
  FrameBlock,
  FrameColBlock,
  FrameRowBlock,
  ImageBlock,
  SectionBlock,
  SectionColBlock,
  SectionRowBlock,
  TextBlock,
} from "@/domain/block";
import {
  Frame,
  FrameCol,
  Text,
  FrameRow,
  Section,
  Container,
  Image as ImageComp,
  SectionRow,
  SectionCol,
  SectionCanvasProperties,
  SectionRowProperties,
  SectionColProperties,
} from "@/component/block";

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
      ) : block.type === "IMAGE" ? (
        <ImageComp block={block as InstanceType<typeof ImageBlock>} isPreview={isPreview} />
      ) : block.type === "SECTION_CANVAS" ? (
        <Section block={block as InstanceType<typeof SectionBlock>} isPreview={isPreview} />
      ) : block.type === "SECTION_ROW" ? (
        <SectionRow block={block as InstanceType<typeof SectionRowBlock>} isPreview={isPreview} />
      ) : block.type === "SECTION_COL" ? (
        <SectionCol block={block as InstanceType<typeof SectionColBlock>} isPreview={isPreview} />
      ) : block.type === "CONTAINER" ? (
        <Container block={block as InstanceType<typeof ContainerBlock>} isPreview={isPreview} />
      ) : (
        <></>
      )}
    </>
  );
};

export const PropertiesFactory = ({ block }: { block: Block }) => {
  return block.type === "SECTION_CANVAS" ? (
    <SectionCanvasProperties block={block as InstanceType<typeof SectionBlock>} />
  ) : block.type === "SECTION_ROW" ? (
    <SectionRowProperties block={block as InstanceType<typeof SectionRowBlock>} />
  ) : block.type === "SECTION_COL" ? (
    <SectionColProperties block={block as InstanceType<typeof SectionColBlock>} />
  ) : (
    <></>
  );
};
