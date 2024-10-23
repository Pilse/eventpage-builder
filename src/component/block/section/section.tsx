"use client";

import { SectionBlock } from "@/domain/block";
import { ChildrenMixin, ResizeMixin } from "@/component/mixin";
import {
  PreviewBlock,
  useSectionBlockDrop,
  useSectionBlockProps,
  useSectionPreviewBlock,
  NewBlockButtons,
} from "@/component/block";
import { IBlockProps } from "@/type";
import { HoverLayer, DragSnapLineLayer } from "@/component/layer";
import { isAutoLayouted } from "@/util";

interface ISectionProps extends IBlockProps<InstanceType<typeof SectionBlock>> {}

export const Section = ({ block }: ISectionProps) => {
  const {
    block: section,
    element,
    setElement,
    isSelected,
    style,
    ...blockProps
  } = useSectionBlockProps(block);
  const { previewBlock, snappableDir } = useSectionPreviewBlock(section, element);
  const [{ isCurrentOver, isDragging }, dropRef] = useSectionBlockDrop(section, element);

  return (
    <>
      <section
        ref={(ele) => {
          dropRef(ele);
          setElement(ele);
        }}
        style={style}
        className="group bg-neutral-200"
        {...blockProps}
      >
        {!isSelected && (
          <HoverLayer useProgrammaticHovered={isDragging} programmaticHovered={isCurrentOver} />
        )}
        {isSelected && element && <ResizeMixin element={element} block={section} vertical />}
        {previewBlock && !isAutoLayouted(previewBlock) && element && (
          <DragSnapLineLayer sectionElement={element} block={previewBlock} snappableDir={snappableDir} />
        )}
        <ChildrenMixin block={section} />
        {previewBlock && <PreviewBlock block={previewBlock} />}
        <NewBlockButtons parent={section} />
      </section>
    </>
  );
};
