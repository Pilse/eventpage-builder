"use client";

import { twMerge } from "tailwind-merge";
import { SectionRowBlock } from "@/domain/builder";
import { ChildrenMixin, ResizeMixin } from "@/components/builder/mixin";
import { DragSnapLineLayer, HoverLayer, SectionBlockTypeLayer } from "@/components/builder/layer";
import { IBlockProps } from "@/type";
import {
  PreviewBlock,
  useSectionPreviewBlock,
  useSectionRowBlockDrop,
  useSectionRowBlockProps,
} from "@/components/builder/block";
import { isAutoLayouted } from "@/shared/util";

interface ISectionRowProps extends IBlockProps<InstanceType<typeof SectionRowBlock>> {}

export const SectionRow = ({ block }: ISectionRowProps) => {
  const {
    block: sectionRow,
    element,
    setElement,
    isSelected,
    ...blockProps
  } = useSectionRowBlockProps(block);
  const [{ isCurrentOver, isDragging }, dropRef] = useSectionRowBlockDrop(sectionRow, element);
  const { previewBlock, snappableDir } = useSectionPreviewBlock(sectionRow, element);

  return (
    <section
      ref={(ele) => {
        setElement(ele);
        dropRef(ele);
      }}
      className={twMerge("group bg-green-300", isAutoLayouted(sectionRow) && "opacity-100")}
      {...blockProps}
    >
      {!isSelected && (
        <HoverLayer
          useProgrammaticHovered={isDragging || block.isHovered}
          programmaticHovered={isCurrentOver || block.isHovered}
        />
      )}
      {isSelected && element && <ResizeMixin vertical element={element} block={sectionRow} />}
      {previewBlock && !isAutoLayouted(previewBlock) && element && (
        <DragSnapLineLayer sectionElement={element} block={previewBlock} snappableDir={snappableDir} />
      )}
      <SectionBlockTypeLayer block={sectionRow} />
      <ChildrenMixin block={sectionRow} />
      {previewBlock && <PreviewBlock block={previewBlock} />}
    </section>
  );
};
