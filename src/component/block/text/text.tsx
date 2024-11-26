"use client";

import { getEmptyImage } from "react-dnd-html5-backend";
import { twMerge } from "tailwind-merge";
import { TextBlock } from "@/domain/block";
import { useTextBlockDrag, useTextBlockProps } from "@/component/block";
import { ResizeMixin } from "@/component/mixin";
import { HoverLayer } from "@/component/layer";
import { IBlockProps } from "@/type";
import { isAutoLayouted } from "@/util";

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
    <div
      ref={(ele) => {
        setElement(ele);
        dragRef(ele);
        previewRef(getEmptyImage());
      }}
      className={twMerge(
        "group bg-sky-200",
        !isPreview && isDragging && "opacity-0",
        isAutoLayouted(text) && "opacity-100"
      )}
      {...blockProps}
    >
      {!isEditing && !isSelected && !text.isSiblingResizing() && <HoverLayer />}
      {isSelected && element && <ResizeMixin element={element} block={text} />}
      <p
        ref={(ele) => {
          setPargraphRef(ele);
          if (ele && text.widthType === "fit") {
            text.width = Math.floor(ele.offsetWidth);
          }
          if (ele && text.heightType === "fit") {
            text.height = Math.floor(ele.offsetHeight);
          }
        }}
        style={textStyle}
        id={`text-${block.id}`}
        spellCheck={false}
        onDoubleClick={onDoubleClick}
        onClick={(e) => e.stopPropagation()}
        onBlur={onBlur}
        onInput={onInput}
        contentEditable={isEditing}
        className="w-full h-full outline-none [&>*]:pointer-events-none text-black"
        dangerouslySetInnerHTML={{ __html: text.content }}
      ></p>
    </div>
  );
};
