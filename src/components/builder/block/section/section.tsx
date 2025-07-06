"use client";

import { SectionBlock } from "@/domain/builder";
import { ChildrenMixin, ResizeMixin } from "@/components/builder/mixin";
import { BlockContextMenu, useSectionBlockDrop, useSectionBlockProps } from "@/components/builder/block";
import { SectionPreviewBlock } from "../section-preview-block";
import { IBlockProps } from "@/type";
import { HoverLayer, SectionBlockTypeLayer } from "@/components/builder/layer";

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
  const [{ isCurrentOver, isDragging, isOver }, dropRef] = useSectionBlockDrop(section, element);

  return (
    <BlockContextMenu block={section}>
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
          <HoverLayer
            useProgrammaticHovered={isDragging || block.isHovered}
            programmaticHovered={isCurrentOver || block.isHovered}
          />
        )}
        {isSelected && element && <ResizeMixin element={element} block={section} vertical />}
        <SectionBlockTypeLayer block={block} />
        <ChildrenMixin block={section} />
        <SectionPreviewBlock section={section} element={element} />
      </section>
    </BlockContextMenu>
  );
};
