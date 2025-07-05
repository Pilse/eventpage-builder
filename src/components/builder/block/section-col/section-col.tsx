"use client";

import { twMerge } from "tailwind-merge";
import { SectionColBlock } from "@/domain/builder";
import { ChildrenMixin, ResizeMixin } from "@/components/builder/mixin";
import { HoverLayer, SectionBlockTypeLayer } from "@/components/builder/layer";
import { IBlockProps } from "@/type";
import {
  BlockContextMenu,
  useSectionColBlockDrop,
  useSectionColBlockProps,
} from "@/components/builder/block";
import { SectionPreviewBlock } from "../section-preview-block";
import { isAutoLayouted } from "@/shared/util";

interface ISectionColProps extends IBlockProps<InstanceType<typeof SectionColBlock>> {}

export const SectionCol = ({ block }: ISectionColProps) => {
  const {
    block: sectionCol,
    element,
    setElement,
    isSelected,
    ...blockProps
  } = useSectionColBlockProps(block);
  const [{ isCurrentOver, isDragging, isOver }, dropRef] = useSectionColBlockDrop(sectionCol, element);

  return (
    <BlockContextMenu block={sectionCol}>
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
        {(block.isHovered || isSelected || isOver) && <SectionBlockTypeLayer block={sectionCol} />}
        <ChildrenMixin block={sectionCol} />
        <SectionPreviewBlock section={sectionCol} element={element} />
      </section>
    </BlockContextMenu>
  );
};
