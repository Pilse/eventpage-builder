import { SNAP_THRESHOLD } from "@/constant";
import { ResizeMixin as RedizeMixinDomain } from "@/domain/mixin";
import {
  getBlockEleById,
  getClosestSectionBlockEle,
  hasDropColMixin,
  hasDropRowMixin,
  hasResizeSnapMixin,
} from "@/util";
import { ResizeSnapLineLayer } from "@/component/layer";
import { MouseEvent, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useBlockHistory } from "@/hooks";

interface IResizableDirection {
  t: boolean;
  b: boolean;
  l: boolean;
  r: boolean;
}

interface IResizeMixinProps {
  element: HTMLElement;
  block: InstanceType<ReturnType<typeof RedizeMixinDomain>>;
  vertical?: boolean;
}

export const ResizeMixin = ({ element, block, vertical }: IResizeMixinProps) => {
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

  const resized =
    block.resizableDir.resizable("t") ||
    block.resizableDir.resizable("r") ||
    block.resizableDir.resizable("b") ||
    block.resizableDir.resizable("l");
  return (
    <>
      {/* top */}
      {vertical ? (
        <div className="z-10 absolute -top-0.5 left-0 h-0.5 bg-[#0090FF] w-full"></div>
      ) : (
        <div
          onMouseDown={(e) => handleMouseDown(e, { t: true })}
          className="z-10 absolute -top-0.5 left-0 h-0.5 bg-[#0090FF] w-full cursor-row-resize"
        ></div>
      )}

      {/* left */}
      {vertical ? (
        <div className="z-10 absolute -top-0.5 -bottom-0.5 -left-0.5  bg-[#0090FF] w-0.5"></div>
      ) : (
        <div
          onMouseDown={(e) => handleMouseDown(e, { l: true })}
          className="z-10 absolute top-0 -left-0.5 h-full bg-[#0090FF] w-0.5 cursor-col-resize"
        ></div>
      )}

      {/* right */}
      {vertical ? (
        <div className="z-10 absolute -top-0.5 -bottom-0.5 -right-0.5  bg-[#0090FF] w-0.5"></div>
      ) : (
        <div
          onMouseDown={(e) => handleMouseDown(e, { r: true })}
          className="z-10 absolute top-0 -right-0.5 h-full bg-[#0090FF] w-0.5 cursor-col-resize"
        ></div>
      )}

      {/* bottom */}
      <div
        onMouseDown={(e) => handleMouseDown(e, { b: true })}
        className="z-10 absolute -bottom-0.5 left-0 h-0.5 bg-[#0090FF] w-full cursor-row-resize"
      >
        {vertical && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="14"
            viewBox="0 0 24 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded bg-[#0090FF] text-white"
          >
            <circle cx="12" cy="7" r="1" />
            <circle cx="19" cy="7" r="1" />
            <circle cx="5" cy="7" r="1" />
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        )}
      </div>

      {!vertical && (
        <>
          {/* top-left corner */}
          <div
            onMouseDown={(e) => handleMouseDown(e, { t: true, l: true })}
            className="z-10 absolute -top-1 -left-1 border-2 border-[#0090FF] w-2 h-2 cursor-nwse-resize bg-[white]"
          ></div>

          {/* top-right corner */}
          <div
            onMouseDown={(e) => handleMouseDown(e, { t: true, r: true })}
            className="z-10 absolute -top-1 -right-1 border-2 border-[#0090FF] w-2 h-2 cursor-nesw-resize bg-[white]"
          ></div>

          {/* bottom-left corner */}
          <div
            onMouseDown={(e) => handleMouseDown(e, { b: true, l: true })}
            className="z-10 absolute -bottom-1 -left-1 border-2 border-[#0090FF] w-2 h-2 cursor-nesw-resize bg-[white]"
          ></div>

          {/* bottom-right corner */}
          <div
            onMouseDown={(e) => handleMouseDown(e, { b: true, r: true })}
            className="z-10 absolute -bottom-1 -right-1 border-2 border-[#0090FF] w-2 h-2 cursor-nwse-resize bg-[white]"
          ></div>
        </>
      )}

      {resized &&
        parentElement.current &&
        sectionElement.current &&
        createPortal(
          <ResizeSnapLineLayer
            sectionElement={sectionElement.current}
            block={block}
            snappableDir={snappableDir.current}
          />,
          sectionElement.current
        )}
    </>
  );
};
