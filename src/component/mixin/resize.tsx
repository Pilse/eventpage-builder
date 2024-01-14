import { ResizeMixin as RedizeMixinDomain } from "@/domain/mixin";
import { MouseEvent, useEffect } from "react";

interface IResizableDirection {
  t: boolean;
  b: boolean;
  l: boolean;
  r: boolean;
}

interface IResizeMixinProps {
  element: HTMLElement;
  block: InstanceType<ReturnType<typeof RedizeMixinDomain>>;
}

export const ResizeMixin = ({ element, block }: IResizeMixinProps) => {
  const handleMouseDown = (e: MouseEvent, resizableDir: Partial<IResizableDirection>) => {
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
    };

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      block.resize(e);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [block, element]);

  return (
    <>
      {/* top */}
      <div
        onMouseDown={(e) => handleMouseDown(e, { t: true })}
        className="z-10 absolute -top-0.5 left-0 h-0.5 bg-black w-full cursor-row-resize"
      ></div>

      {/* left */}
      <div
        onMouseDown={(e) => handleMouseDown(e, { l: true })}
        className="z-10 absolute top-0 -left-0.5 h-full bg-black w-0.5 cursor-col-resize"
      ></div>

      {/* right */}
      <div
        onMouseDown={(e) => handleMouseDown(e, { r: true })}
        className="z-10 absolute top-0 -right-0.5 h-full bg-black w-0.5 cursor-col-resize"
      ></div>

      {/* bottom */}
      <div
        onMouseDown={(e) => handleMouseDown(e, { b: true })}
        className="z-10 absolute -bottom-0.5 left-0 h-0.5 bg-black w-full cursor-row-resize"
      ></div>

      {/* top-left corner */}
      <div
        onMouseDown={(e) => handleMouseDown(e, { t: true, l: true })}
        className="z-10 absolute -top-1 -left-1 border-2 border-black w-2 h-2 cursor-nwse-resize bg-white"
      ></div>

      {/* top-right corner */}
      <div
        onMouseDown={(e) => handleMouseDown(e, { t: true, r: true })}
        className="z-10 absolute -top-1 -right-1 border-2 border-black w-2 h-2 cursor-nesw-resize bg-white"
      ></div>

      {/* bottom-left corner */}
      <div
        onMouseDown={(e) => handleMouseDown(e, { b: true, l: true })}
        className="z-10 absolute -bottom-1 -left-1 border-2 border-black w-2 h-2 cursor-nesw-resize bg-white"
      ></div>

      {/* bottom-right corner */}
      <div
        onMouseDown={(e) => handleMouseDown(e, { b: true, r: true })}
        className="z-10 absolute -bottom-1 -right-1 border-2 border-black w-2 h-2 cursor-nwse-resize bg-white"
      ></div>
    </>
  );
};
