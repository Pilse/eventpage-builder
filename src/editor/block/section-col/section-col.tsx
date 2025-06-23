"use client";

import { twMerge } from "tailwind-merge";
import { SectionColBlock } from "@/domain/block";
import { ChildrenMixin, ResizeMixin } from "@/editor/mixin";
import { DragSnapLineLayer, HoverLayer, SectionBlockTypeLayer } from "@/editor/layer";
import { IBlockProps } from "@/type";
import {
  PreviewBlock,
  useSectionColBlockDrop,
  useSectionColBlockProps,
  useSectionPreviewBlock,
} from "@/editor/block";
import { isAutoLayouted } from "@/util";

interface ISectionColProps extends IBlockProps<InstanceType<typeof SectionColBlock>> {}

export const SectionCol = ({ block }: ISectionColProps) => {
  const {
    block: sectionCol,
    element,
    setElement,
    isSelected,
    ...blockProps
  } = useSectionColBlockProps(block);
  const [{ isCurrentOver, isDragging }, dropRef] = useSectionColBlockDrop(sectionCol, element);
  const { previewBlock, snappableDir } = useSectionPreviewBlock(sectionCol, element);

  return (
    <section
      ref={(ele) => {
        setElement(ele);
        dropRef(ele);
      }}
      className={twMerge("group bg-blue-200", isAutoLayouted(sectionCol) && "opacity-100")}
      {...blockProps}
    >
      {!isSelected && (
        <HoverLayer
          useProgrammaticHovered={isDragging || block.isHovered}
          programmaticHovered={isCurrentOver || block.isHovered}
        />
      )}
      {isSelected && element && <ResizeMixin vertical element={element} block={sectionCol} />}
      {previewBlock && !isAutoLayouted(previewBlock) && element && (
        <DragSnapLineLayer sectionElement={element} block={previewBlock} snappableDir={snappableDir} />
      )}
      <SectionBlockTypeLayer block={sectionCol} />
      <ChildrenMixin block={sectionCol} />
      {previewBlock && <PreviewBlock block={previewBlock} />}
    </section>
  );
};
