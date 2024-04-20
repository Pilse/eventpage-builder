import { Block } from "@/domain/block";
import { getBlockEleById } from "@/util";

interface ISnapLineLayerProps {
  sectionElement: HTMLElement;
  block: InstanceType<typeof Block>;
  snappableDir: {
    x: "l" | "r" | "c" | boolean;
    y: "t" | "b" | "c" | boolean;
  };
  layoutFrom: "block" | "domRect";
}

export const SnapLineLayer = ({ sectionElement, block, snappableDir, layoutFrom }: ISnapLineLayerProps) => {
  const parentEle = block.parent ? getBlockEleById(block.parent.id) : null;
  const ele = getBlockEleById(block.id);
  const blockDomRect = ele?.getBoundingClientRect();
  const sectionDomRect = sectionElement.getBoundingClientRect();
  const parentDomRect = parentEle?.getBoundingClientRect();

  if (!parentDomRect || !blockDomRect) {
    return null;
  }

  const t = parentDomRect.top - sectionDomRect.top;
  const l = parentDomRect.left - sectionDomRect.left;
  const b = sectionDomRect.bottom - parentDomRect.bottom;
  const r = sectionDomRect.right - parentDomRect.right;

  return (
    <>
      {snappableDir.x === "l" ? (
        <div
          style={{
            top: t,
            bottom: b,
            left: layoutFrom === "block" ? block.l : blockDomRect.left - sectionDomRect.left,
            height: "unset",
          }}
          className="absolute w-px border border-dashed border-red-400 z-20 pointer-events-none"
        ></div>
      ) : snappableDir.x === "r" ? (
        <div
          style={{
            top: t,
            bottom: b,
            left:
              layoutFrom === "block"
                ? block.l + block.width
                : blockDomRect.left - sectionDomRect.left + blockDomRect.width,
            height: "unset",
          }}
          className="absolute w-px border border-dashed border-red-400 z-20 pointer-events-none"
        ></div>
      ) : snappableDir.x === "c" ? (
        <div
          style={{
            top: t,
            bottom: b,
            left:
              layoutFrom === "block"
                ? block.l + block.width
                : blockDomRect.left - sectionDomRect.left + blockDomRect.width / 2,
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
            top: layoutFrom === "block" ? block.t : blockDomRect.top - sectionDomRect.top,
            width: "unset",
          }}
          className="absolute w-px border border-dashed border-red-400 z-20 pointer-events-none"
        ></div>
      ) : snappableDir.y === "b" ? (
        <div
          style={{
            left: l,
            right: r,
            top:
              layoutFrom === "block"
                ? block.t + block.height
                : blockDomRect.top - sectionDomRect.top + blockDomRect.height,
            width: "unset",
          }}
          className="absolute w-px border border-dashed border-red-400 z-20 pointer-events-none"
        ></div>
      ) : snappableDir.y === "c" ? (
        <div
          style={{
            left: l,
            right: r,
            top:
              layoutFrom === "block"
                ? block.t + block.height / 2
                : blockDomRect.top + blockDomRect.height / 2,
            width: "unset",
          }}
          className="absolute w-px border border-dashed border-red-400 z-20 pointer-events-none"
        ></div>
      ) : null}
    </>
  );
};
