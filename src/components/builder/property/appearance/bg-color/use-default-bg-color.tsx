import { BackgroundMixinBlockType } from "@/domain/builder/mixin";
import { useBlockHistory, useDebounce } from "@/hooks";
import { Color } from "@/type";
import { useCallback, useEffect, useState } from "react";

export const useDefaultBgColor = (block: BackgroundMixinBlockType) => {
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();
  const debouncedEndCaptureSnapshot = useDebounce(
    () => endCaptureSnapshot(`${block.id}-property-bg-color`),
    300
  );

  const [openColorPicker, setOpenColorPicker] = useState(false);

  const onHexChange = useCallback(
    (hex: string) => {
      startCaptureSnapshot(`${block.id}-property-bg-color`);
      block.updateBgColorHex(hex);
      endCaptureSnapshot(`${block.id}-property-bg-color`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  const onHexCommit = useCallback(() => {
    startCaptureSnapshot(`${block.id}-property-bg-color`);
    block.commitUpdateBgcolorHex();
    endCaptureSnapshot(`${block.id}-property-bg-color`);
  }, [block, endCaptureSnapshot, startCaptureSnapshot]);

  const onRgbaCommit = useCallback(
    (rgba: Color) => {
      startCaptureSnapshot(`${block.id}-property-bg-color`);
      block.commitUpdateBgColorRgba(rgba);
      debouncedEndCaptureSnapshot();
    },
    [block, debouncedEndCaptureSnapshot, startCaptureSnapshot]
  );

  useEffect(() => {
    const handleMouseDown = (e: Event) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }

      if (target.closest("div.react-colorful")) {
        return;
      }

      setOpenColorPicker(false);
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return { openColorPicker, setOpenColorPicker, onHexChange, onHexCommit, onRgbaCommit };
};
