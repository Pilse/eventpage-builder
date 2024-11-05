"use client";

import { twMerge } from "tailwind-merge";
import { SectionColBlock } from "@/domain/block";
import { ChildrenMixin, ResizeMixin } from "@/component/mixin";
import { DragSnapLineLayer, HoverLayer } from "@/component/layer";
import { IBlockProps } from "@/type";
import {
  PreviewBlock,
  useSectionColBlockDrop,
  useSectionColBlockProps,
  useSectionPreviewBlock,
} from "@/component/block";
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
      {!isSelected && <HoverLayer useProgrammaticHovered={isDragging} programmaticHovered={isCurrentOver} />}
      {isSelected && element && <ResizeMixin vertical element={element} block={sectionCol} />}
      {previewBlock && !isAutoLayouted(previewBlock) && element && (
        <DragSnapLineLayer sectionElement={element} block={previewBlock} snappableDir={snappableDir} />
      )}
      <ChildrenMixin block={sectionCol} />
      {previewBlock && <PreviewBlock block={previewBlock} />}
    </section>
  );
};
