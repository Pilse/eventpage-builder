import { Block, Text } from "@/domain/block";
import { CSSProperties } from "react";
import { isAutoLayouted } from "./mixin";
import { rgbaToCss, rgbaToHexColor } from "./color";

export const getBlockStyle = (block: Block, isSelected: boolean) => {
  const useConstraint = block.parent && !isAutoLayouted(block) && !isSelected;

  return {
    width: block.width,
    height: block.height,
    position: block.position,
    top: useConstraint ? (block.parent?.height ?? 0) / 2 - (block._centerY + block.height / 2) : block.t,
    left: useConstraint ? (block.parent?.width ?? 0) / 2 - (block._centerX + block.width / 2) : block.l,
    right: block.r,
    bottom: block.b,
    backgroundColor: rgbaToCss(block.backgroundColor),
    boxShadow: `${block.shadow.x}px ${block.shadow.y}px ${block.shadow.blur}px ${
      block.shadow.spread
    }px ${rgbaToCss(block.shadow.color)} ${
      block.borderPosition === "inside"
        ? `,inset 0px 0px 0px ${block.borderWidth}px #${rgbaToHexColor(block.borderColor)}`
        : ""
    }`,
    outline:
      block.borderPosition === "outside"
        ? `${block.borderWidth}px solid #${rgbaToHexColor(block.borderColor)}`
        : "none",
    borderRadius: `${block.borderRadiusT}px ${block.borderRadiusR}px ${block.borderRadiusB}px ${block.borderRadiusL}px`,
  } satisfies CSSProperties;
};

export const getTextWrapperStyle = (block: Text) => {
  return {
    ...(block.widthType === "fit" ? { width: "max-content" } : {}),
    ...(block.heightType === "fit" ? { height: "fit-content" } : {}),
    display: "flex",
  } satisfies CSSProperties;
};

export const getTextStyle = (block: Text) => {
  return {
    padding: `${block.pt}px ${block.pr}px ${block.pb}px ${block.pl}px`,
    fontFamily: `${block.fontName}${block.fontWeight ? `-${block.fontWeight}` : ""}`,
    fontWeight: block.fontWeight,
    fontSize: block.fontSize,
    color: rgbaToCss(block.fontColor),
    lineHeight: block.lineHeight,
    letterSpacing: `${block.letterSpacing}px`,
    textAlign: block.textAlign,
    textShadow: `${block.textShadow.x}px ${block.textShadow.y}px ${block.textShadow.blur}px ${rgbaToCss(
      block.textShadow.color
    )}`,
  } satisfies CSSProperties;
};
