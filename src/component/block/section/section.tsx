"use client";

import { SectionBlock } from "@/domain/block";
import { ChildrenMixin } from "@/component/mixin";
import {
  BlockFactory,
  useSectionBlockDrop,
  useSectionBlockProps,
  useSectionPreviewBlock,
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
  const { previewBlock } = useSectionPreviewBlock(section, element);
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
      <ChildrenMixin block={section} />
      {previewBlock && (
        <div className="absolute pointer-events-none">
          <BlockFactory block={previewBlock} isPreview />
        </div>
      )}
    </section>
  );
};
