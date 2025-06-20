import { SNAP_THRESHOLD } from "@/constant";
import { ResizeMixin } from "@/domain/mixin";
import {
  getBlockEleById,
  getClosestSectionBlockEle,
  hasDropColMixin,
  hasDropRowMixin,
  hasResizeSnapMixin,
} from "@/util";
import { MouseEvent, useEffect, useRef } from "react";
import { useBlockHistory } from "@/hooks";
import { Card, Flex } from "@radix-ui/themes";
import { ColumnsIcon } from "@radix-ui/react-icons";

interface IResizableDirection {
  t: boolean;
  b: boolean;
  l: boolean;
  r: boolean;
}

interface IResizeMixinProps {
  element: HTMLElement;
  block: InstanceType<ReturnType<typeof ResizeMixin>>;
}

export const ResizeContainerMixin = ({ element, block }: IResizeMixinProps) => {
  const snappableDir = useRef<{
    x: "l" | "r" | "c" | boolean;
    y: "t" | "b" | "c" | boolean;
  }>({ x: false, y: false });
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();
  const sectionElement = useRef<HTMLElement | null>(null);
  const parentElement = useRef<HTMLElement | null>(null);

  const handleMouseDown = (e: MouseEvent, resizableDir: Partial<IResizableDirection>) => {
    startCaptureSnapshot(`resize-${block.id}`);
    if (resizableDir.t || resizableDir.b) {
      block.heightType = "fixed";
    }
    if (resizableDir.l || resizableDir.r) {
      block.widthType = "fixed";
    }
    const elementRect = element.getBoundingClientRect();
    block.setSizeMetric(elementRect, element.scrollLeft, element.scrollTop, e.pageX, e.pageY);
    block.resizableDir.update(resizableDir);
  };

  useEffect(() => {
    if (!block.resizableDir.resizable("t", "l", "b", "r")) {
      return;
    }

    const handleMouseUp = () => {
      block.resetSizeMetric();
      block.resizableDir.update({});
      endCaptureSnapshot(`resize-${block.id}`);
    };

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      block.resize(e);

      const elementRect = element.getBoundingClientRect();
      sectionElement.current = getClosestSectionBlockEle(element) as HTMLElement | null;
      const sectionRect = sectionElement.current?.getBoundingClientRect();

      if (!block.parent) {
        return;
      }

      if (hasDropColMixin(block) || hasDropRowMixin(block)) {
        block.autoLayout();
      }

      if (hasDropColMixin(block.parent) || hasDropRowMixin(block.parent)) {
        block.parent.autoLayout();
      }

      if (!sectionRect) {
        return;
      }

      parentElement.current = getBlockEleById(block.parent.id) as HTMLElement | null;
      const parentRect = parentElement.current?.getBoundingClientRect();

      if (hasResizeSnapMixin(block.parent)) {
        const { snappedToX, snappedToY } = block.parent.resizeSnap(
          block,
          elementRect,
          sectionRect,
          parentRect ?? sectionRect,
          SNAP_THRESHOLD
        );
        snappableDir.current = { x: snappedToX, y: snappedToY };
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [block, element, endCaptureSnapshot]);

  return (
    <>
      {/* right */}
      <div
        onMouseDown={(e) => handleMouseDown(e, { r: true })}
        className="z-10 absolute top-0 -right-1 h-full bg-[#0090FF] w-1 cursor-col-resize"
        style={{ boxShadow: "5px 0px 15px 10px #0091ff23" }}
      ></div>
    </>
  );
};
