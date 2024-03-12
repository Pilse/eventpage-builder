import { Block } from "@/domain/block";
import { useRef } from "react";

interface ISnapLineLayerProps {
  sectionElement: HTMLElement;
  previewBlock: InstanceType<typeof Block>;
  snappableDir: {
    x: "l" | "r" | "c" | boolean;
    y: "t" | "b" | "c" | boolean;
  };
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
      {snappableDir.x === "l" ? (
        <div
          style={{
            top: t,
            bottom: b,
            left: previewBlock.l,
            height: "unset",
          }}
          className="absolute w-px border border-dashed border-red-400 z-20 pointer-events-none"
        ></div>
      ) : snappableDir.x === "r" ? (
        <div
          style={{
            top: t,
            bottom: b,
            left: previewBlock.l + previewBlock.width,
            height: "unset",
          }}
          className="absolute w-px border border-dashed border-red-400 z-20 pointer-events-none"
        ></div>
      ) : snappableDir.x === "c" ? (
        <div
          style={{
            top: t,
            bottom: b,
            left: previewBlock.l + previewBlock.width / 2,
            height: "unset",
          }}
          className="absolute w-px border border-dashed border-red-400 z-20 pointer-events-none"
        ></div>
      ) : null}

      {snappableDir.y === "t" ? (
        <div
          style={{
            left: l,
            right: r,
            top: previewBlock.t,
            width: "unset",
          }}
          className="absolute w-px border border-dashed border-red-400 z-20 pointer-events-none"
        ></div>
      ) : snappableDir.y === "b" ? (
        <div
          style={{
            left: l,
            right: r,
            top: previewBlock.t + previewBlock.height,
            width: "unset",
          }}
          className="absolute w-px border border-dashed border-red-400 z-20 pointer-events-none"
        ></div>
      ) : snappableDir.y === "c" ? (
        <div
          style={{
            left: l,
            right: r,
            top: previewBlock.t + previewBlock.height / 2,
            width: "unset",
          }}
          className="absolute w-px border border-dashed border-red-400 z-20 pointer-events-none"
        ></div>
      ) : null}
    </>
  );
};
