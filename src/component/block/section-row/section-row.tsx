"use client";

import { getEmptyImage } from "react-dnd-html5-backend";
import { twMerge } from "tailwind-merge";
import { SectionRowBlock } from "@/domain/block";
import { ChildrenMixin, ResizeMixin } from "@/component/mixin";
import { HoverLayer } from "@/component/layer";
import { IBlockProps } from "@/type";
import { useSectionRowBlockDrag, useSectionRowBlockDrop, useSectionRowBlockProps } from "@/component/block";
import { isAutoLayouted } from "@/util";

interface ISectionRowProps extends IBlockProps<InstanceType<typeof SectionRowBlock>> {}

export const SectionRow = ({ block, isPreview }: ISectionRowProps) => {
  const {
    block: sectionRow,
    element,
    setElement,
    isSelected,
    ...blockProps
  } = useSectionRowBlockProps(block);
  const [{ isDragging: isCurrentDragging }, dragRef, previewRef] = useSectionRowBlockDrag(sectionRow);
  const [{ isCurrentOver, isDragging }, dropRef] = useSectionRowBlockDrop(
    sectionRow,
    element,
    isCurrentDragging,
    isPreview
  );

  return (
    <section
      ref={(ele) => {
        setElement(ele);
        dragRef(ele);
        if (isPreview || !isCurrentDragging) {
          dropRef(ele);
        }
        previewRef(getEmptyImage());
      }}
      className={twMerge(
        "group bg-green-300",
        !isPreview && isCurrentDragging && "opacity-0",
        isAutoLayouted(sectionRow) && "opacity-100"
      )}
      {...blockProps}
    >
      {!isSelected && <HoverLayer useProgrammaticHovered={isDragging} programmaticHovered={isCurrentOver} />}
      {isSelected && element && <ResizeMixin vertical element={element} block={sectionRow} />}
      <ChildrenMixin block={sectionRow} />
    </section>
  );
};
