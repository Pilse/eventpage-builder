"use client";

import { getEmptyImage } from "react-dnd-html5-backend";
import { twMerge } from "tailwind-merge";
import { TextBlock } from "@/domain/builder";
import { BlockContextMenu, useTextBlockDrag, useTextBlockProps } from "@/components/builder/block";
import { ResizeMixin } from "@/components/builder/mixin";
import { HoverLayer } from "@/components/builder/layer";
import { IBlockProps } from "@/type";
import { isAutoLayouted } from "@/shared/util";
import { useMemo } from "react";
import { off } from "process";

interface ITextProps extends IBlockProps<InstanceType<typeof TextBlock>> {}

export const Text = ({ block, isPreview }: ITextProps) => {
  const {
    block: text,
    element,
    setElement,
    isSelected,
    isEditing,
    onBlur,
    onDoubleClick,
    onInput,
    textStyle,
    setPargraphRef,
    ...blockProps
  } = useTextBlockProps(block);
  const [{ isDragging }, dragRef, previewRef] = useTextBlockDrag(text);

  return (
    <BlockContextMenu block={text}>
      <div
        ref={(ele) => {
          setElement(ele);
          dragRef(ele);
          previewRef(getEmptyImage());
        }}
        key={text.content}
        className={twMerge(
          "group",
          !isPreview && isDragging && "opacity-0",
          isAutoLayouted(text) && "opacity-100"
        )}
        {...blockProps}
      >
        {!isEditing && !isSelected && !text.isSiblingResizing() && (
          <HoverLayer
            useProgrammaticHovered={isDragging || block.isHovered}
            programmaticHovered={block.isHovered}
          />
        )}
        {isSelected && element && <ResizeMixin element={element} block={text} />}
        <p
          ref={(ele) => {
            setPargraphRef(ele);
            if (ele && text.widthType === "fit" && text._width !== Math.floor(ele.offsetWidth)) {
              text._width = Math.floor(ele.offsetWidth);
            }
            if (ele && text.heightType === "fit" && text._height !== Math.floor(ele.offsetHeight)) {
              text._height = Math.floor(ele.offsetHeight);
            }
          }}
          key={text.content}
          style={textStyle}
          id={`text-${block.id}`}
          spellCheck={false}
          onDoubleClick={onDoubleClick}
          onClick={(e) => e.stopPropagation()}
          onBlur={onBlur}
          onInput={onInput}
          contentEditable={isEditing}
          className="w-full h-full outline-none [&>*]:pointer-events-none text-black"
          // @see https://github.com/facebook/react/issues/31600
          // @see https://github.com/facebook/react/pull/32773
          dangerouslySetInnerHTML={useMemo(() => ({ __html: text.content }), [text.content])}
        ></p>
      </div>
    </BlockContextMenu>
  );
};
