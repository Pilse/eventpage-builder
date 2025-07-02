"use client";

import { Text } from "@/domain/builder";
import { IRendererBlockProps } from "@/type";
import { getBlockStyle, getTextStyle, getTextWrapperStyle } from "@/shared/util";
import { getUserEvents } from "@/shared/user-event";

interface ITextProps extends IRendererBlockProps<Text> {}

export const TextRenderer = ({ block }: ITextProps) => {
  const style = getBlockStyle(block, false);
  const textStyle = getTextStyle(block);
  const userEvents = getUserEvents(block);

  return (
    <div style={{ ...style, ...getTextWrapperStyle(block) }} {...userEvents}>
      <p
        className="w-full h-full text-black"
        style={textStyle}
        dangerouslySetInnerHTML={{ __html: block.content }}
      ></p>
    </div>
  );
};
