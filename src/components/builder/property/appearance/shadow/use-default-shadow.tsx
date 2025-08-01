import { ShadowMixinBlockType } from "@/domain/builder/mixin";
import { useBlockHistory, useDebounce } from "@/hooks";
import { Color, Shadow } from "@/type";
import { useCallback, useEffect, useState } from "react";

export const useDefaultShadow = (block: ShadowMixinBlockType) => {
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();
  const debouncedEndCaptureSnapshot = useDebounce(
    () => endCaptureSnapshot(`${block.id}-property-shadow-color`),
    100
  );
  const [openColorPicker, setOpenColorPicker] = useState(false);

  const onHexChange = useCallback(
    (hex: string) => {
      startCaptureSnapshot(`${block.id}-property-shadow-color`);
      block.updateShadowColorHex(hex);
      endCaptureSnapshot(`${block.id}-property-shadow-color`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  const onHexCommit = useCallback(() => {
    startCaptureSnapshot(`${block.id}-property-shadow-color`);
    block.commitUpdateShadowColorHex();
    endCaptureSnapshot(`${block.id}-property-shadow-color`);
  }, [block, endCaptureSnapshot, startCaptureSnapshot]);

  const onRgbaCommit = useCallback(
    (rgba: Color) => {
      startCaptureSnapshot(`${block.id}-property-shadow-color`);
      block.commitUpdateShadowColorRgba(rgba);
      debouncedEndCaptureSnapshot();
    },
    [block, debouncedEndCaptureSnapshot, startCaptureSnapshot]
  );

  const onShadowChange = useCallback(
    (shadow: Shadow) => {
      startCaptureSnapshot(`${block.id}-property-shadow-color`);
      block.shadow = shadow;
      endCaptureSnapshot(`${block.id}-property-shadow-color`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
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

  return { openColorPicker, setOpenColorPicker, onHexChange, onHexCommit, onRgbaCommit, onShadowChange };
};
