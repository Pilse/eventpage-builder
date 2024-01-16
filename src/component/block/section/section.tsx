"use client";

import { SectionBlock } from "@/domain/block";
import { ChildrenMixin } from "@/component/mixin";
import {
  PreviewBlock,
  useSectionBlockDrop,
  useSectionBlockProps,
  useSectionPreviewBlock,
  SnapLineLayer,
} from "@/component/block";
import { IBlockProps } from "@/type";
import { HoverLayer } from "@/component/layer";

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
    <section
      ref={(ele) => {
        dropRef(ele);
        setElement(ele);
      }}
      style={style}
      className="bg-neutral-200"
      {...blockProps}
    >
      <HoverLayer useProgrammaticHovered={isDragging} programmaticHovered={isCurrentOver} />
      {previewBlock && element && (
        <SnapLineLayer sectionElement={element} previewBlock={previewBlock} snappableDir={snappableDir} />
      )}
      <ChildrenMixin block={section} />
      {previewBlock && <PreviewBlock block={previewBlock} />}
    </section>
  );
};
