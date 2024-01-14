import { Block } from "@/domain/block";
import { useRef } from "react";

interface ISnapLineLayerProps {
  sectionElement: HTMLElement;
  previewBlock: InstanceType<typeof Block>;
  snappableDir: { x: boolean; y: boolean };
}

export const SnapLineLayer = ({ sectionElement, previewBlock, snappableDir }: ISnapLineLayerProps) => {
  const previewBlockParentElement = previewBlock.parent
    ? document.getElementById(previewBlock.parent.id)
    : null;

  const sectionDomRect = useRef(sectionElement.getBoundingClientRect()).current;
  const previewBlockParentDomRect = previewBlockParentElement?.getBoundingClientRect();

  if (!previewBlockParentDomRect) {
    return null;
  }

  const t = previewBlockParentDomRect.top - sectionDomRect.top;
  const l = previewBlockParentDomRect.left - sectionDomRect.left;
  const b = sectionDomRect.bottom - previewBlockParentDomRect.bottom;
  const r = sectionDomRect.right - previewBlockParentDomRect.right;

  return (
    <>
      {snappableDir.x &&
        (previewBlock.xDirection === "l" ? (
          <div
            style={{
              top: t,
              bottom: b,
              left: previewBlock.l,
              height: "unset",
            }}
            className="absolute w-px border border-dashed border-red-400 z-20"
          ></div>
        ) : (
          <div
            style={{
              top: t,
              bottom: b,
              left: previewBlock.l + previewBlock.width,
              height: "unset",
            }}
            className="absolute w-px border border-dashed border-red-400 z-20"
          ></div>
        ))}

      {snappableDir.y &&
        (previewBlock.yDirection === "t" ? (
          <div
            style={{
              left: l,
              right: r,
              top: previewBlock.t,
              width: "unset",
            }}
            className="absolute w-px border border-dashed border-red-400 z-20"
          ></div>
        ) : (
          <div
            style={{
              left: l,
              right: r,
              top: previewBlock.t + previewBlock.height,
              width: "unset",
            }}
            className="absolute w-px border border-dashed border-red-400 z-20"
          ></div>
        ))}
    </>
  );
};
