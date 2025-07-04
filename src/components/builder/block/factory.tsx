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
} from "@/domain/builder";
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
  FrameCanvasProperties,
  FrameRowProperties,
  FrameColProperties,
  ImageProperties,
  TextProperties,
  FrameCanvasTreeNode,
  FrameRowTreeNode,
  FrameColTreeNode,
  ImageTreeNode,
  SectionCanvasTreeNode,
  SectionRowTreeNode,
  SectionColTreeNode,
  TextTreeNode,
  ContainerTreeNode,
  ContainerProperties,
  ContainerRenderer,
  SectionRenderer,
  FrameRenderer,
  FrameRowRenderer,
  FrameColRenderer,
  TextRenderer,
  ImageRenderer,
} from "@/components/builder/block";
import { SectionRowRenderer } from "./section-row/renderer";
import { SectionColRenderer } from "./section-col/renderer";

interface IBlockFactoryProps extends IBlockProps<Block> {}

export const BlockFactory = ({ block, isPreview }: IBlockFactoryProps) => {
  return block.type === "FRAME_CANVAS" ? (
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
  );
};

export const PropertiesFactory = ({ block }: { block: Block }) => {
  return block.type === "CONTAINER" ? (
    <ContainerProperties block={block as InstanceType<typeof ContainerBlock>} />
  ) : block.type === "SECTION_CANVAS" ? (
    <SectionCanvasProperties block={block as InstanceType<typeof SectionBlock>} />
  ) : block.type === "SECTION_ROW" ? (
    <SectionRowProperties block={block as InstanceType<typeof SectionRowBlock>} />
  ) : block.type === "SECTION_COL" ? (
    <SectionColProperties block={block as InstanceType<typeof SectionColBlock>} />
  ) : block.type === "FRAME_CANVAS" ? (
    <FrameCanvasProperties block={block as InstanceType<typeof FrameBlock>} />
  ) : block.type === "FRAME_ROW" ? (
    <FrameRowProperties block={block as InstanceType<typeof FrameRowBlock>} />
  ) : block.type === "FRAME_COL" ? (
    <FrameColProperties block={block as InstanceType<typeof FrameColBlock>} />
  ) : block.type === "TEXT" ? (
    <TextProperties block={block as InstanceType<typeof TextBlock>} />
  ) : block.type === "IMAGE" ? (
    <ImageProperties block={block as InstanceType<typeof ImageBlock>} />
  ) : (
    <></>
  );
};

export const TreeNodeFactory = ({ block, depth }: { block: Block; depth: number }) => {
  return block.type === "CONTAINER" ? (
    <ContainerTreeNode block={block as InstanceType<typeof ContainerBlock>} depth={depth} />
  ) : block.type === "SECTION_CANVAS" ? (
    <SectionCanvasTreeNode block={block as InstanceType<typeof SectionBlock>} depth={depth} />
  ) : block.type === "SECTION_ROW" ? (
    <SectionRowTreeNode block={block as InstanceType<typeof SectionRowBlock>} depth={depth} />
  ) : block.type === "SECTION_COL" ? (
    <SectionColTreeNode block={block as InstanceType<typeof SectionColBlock>} depth={depth} />
  ) : block.type === "FRAME_CANVAS" ? (
    <FrameCanvasTreeNode block={block as InstanceType<typeof FrameBlock>} depth={depth} />
  ) : block.type === "FRAME_ROW" ? (
    <FrameRowTreeNode block={block as InstanceType<typeof FrameRowBlock>} depth={depth} />
  ) : block.type === "FRAME_COL" ? (
    <FrameColTreeNode block={block as InstanceType<typeof FrameColBlock>} depth={depth} />
  ) : block.type === "TEXT" ? (
    <TextTreeNode block={block as InstanceType<typeof TextBlock>} depth={depth} />
  ) : block.type === "IMAGE" ? (
    <ImageTreeNode block={block as InstanceType<typeof ImageBlock>} depth={depth} />
  ) : (
    <></>
  );
};

export const RendererFactory = ({ block }: { block: Block }) => {
  return block.type === "CONTAINER" ? (
    <ContainerRenderer block={block as InstanceType<typeof ContainerBlock>} />
  ) : block.type === "SECTION_CANVAS" ? (
    <SectionRenderer block={block as InstanceType<typeof SectionBlock>} />
  ) : block.type === "SECTION_ROW" ? (
    <SectionRowRenderer block={block as InstanceType<typeof SectionRowBlock>} />
  ) : block.type === "SECTION_COL" ? (
    <SectionColRenderer block={block as InstanceType<typeof SectionColBlock>} />
  ) : block.type === "FRAME_CANVAS" ? (
    <FrameRenderer block={block as InstanceType<typeof FrameBlock>} />
  ) : block.type === "FRAME_ROW" ? (
    <FrameRowRenderer block={block as InstanceType<typeof FrameRowBlock>} />
  ) : block.type === "FRAME_COL" ? (
    <FrameColRenderer block={block as InstanceType<typeof FrameColBlock>} />
  ) : block.type === "TEXT" ? (
    <TextRenderer block={block as InstanceType<typeof TextBlock>} />
  ) : block.type === "IMAGE" ? (
    <ImageRenderer block={block as InstanceType<typeof ImageBlock>} />
  ) : (
    <></>
  );
};
