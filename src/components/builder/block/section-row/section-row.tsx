"use client";

import { twMerge } from "tailwind-merge";
import { SectionRowBlock } from "@/domain/builder";
import { ChildrenMixin, ResizeMixin } from "@/components/builder/mixin";
import { HoverLayer, SectionBlockTypeLayer } from "@/components/builder/layer";
import { IBlockProps } from "@/type";
import {
  BlockContextMenu,
  useSectionRowBlockDrop,
  useSectionRowBlockProps,
} from "@/components/builder/block";
import { SectionPreviewBlock } from "../section-preview-block";
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
  const [{ isCurrentOver, isDragging, isOver }, dropRef] = useSectionRowBlockDrop(sectionRow, element);

  return (
    <BlockContextMenu block={sectionRow}>
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
        {(block.isHovered || isSelected || isOver) && <SectionBlockTypeLayer block={sectionRow} />}
        <ChildrenMixin block={sectionRow} />
        <SectionPreviewBlock section={sectionRow} element={element} />
      </section>
    </BlockContextMenu>
  );
};
