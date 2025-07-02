import { Block } from "@/domain/builder";
import { BorderMixinBlockType } from "@/domain/builder/mixin";
import { useBlockHistory, useDebounce } from "@/hooks";
import { Color } from "@/type";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useDefaultBorder = (block: BorderMixinBlockType) => {
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();
  const debouncedEndCaptureSnapshot = useDebounce(
    () => endCaptureSnapshot(`${block.id}-property-border-color`),
    100
  );

  const [openColorPicker, setOpenColorPicker] = useState(false);

  const onHexChange = useCallback(
    (hex: string) => {
      startCaptureSnapshot(`${block.id}-property-border-color`);
      block.updateBorderColorHex(hex);
      endCaptureSnapshot(`${block.id}-property-border-color`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  const onHexCommit = useCallback(() => {
    startCaptureSnapshot(`${block.id}-property-border-color`);
    block.commitUpdateBordercolorHex();
    endCaptureSnapshot(`${block.id}-property-border-color`);
  }, [block, endCaptureSnapshot, startCaptureSnapshot]);

  const onRgbaCommit = useCallback(
    (rgba: Color) => {
      startCaptureSnapshot(`${block.id}-property-border-color`);
      block.commitUpdateBorderColorRgba(rgba);
      debouncedEndCaptureSnapshot();
    },
    [block, debouncedEndCaptureSnapshot, startCaptureSnapshot]
  );

  const onBorderWidthChange = useCallback(
    (width: number) => {
      startCaptureSnapshot(`${block.id}-property-border-width`);
      block.borderWidth = width;
      endCaptureSnapshot(`${block.id}-property-border-width`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  const onBorderPositionChange = useCallback(
    (position: Block["borderPosition"]) => {
      startCaptureSnapshot(`${block.id}-property-border-position`);
      block.borderPosition = position;
      endCaptureSnapshot(`${block.id}-property-border-position`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  const onBorderRadiusChange = useCallback(
    (value: number, dir: ("r" | "l" | "b" | "t")[]) => {
      startCaptureSnapshot(`${block.id}-property-border-radius`);
      dir.forEach((d) => {
        switch (d) {
          case "r":
            block.borderRadiusR = value;
            break;
          case "l":
            block.borderRadiusL = value;
            break;
          case "t":
            block.borderRadiusT = value;
            break;
          case "b":
            block.borderRadiusB = value;
            break;
        }
      });
      endCaptureSnapshot(`${block.id}-property-border-radius`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  const borderRadiusValue = useMemo(() => {
    if (
      block.borderRadiusR === block.borderRadiusL &&
      block.borderRadiusT === block.borderRadiusB &&
      block.borderRadiusB === block.borderRadiusL
    ) {
      return block.borderRadiusT;
    }
    return "Mixed";
  }, [block.borderRadiusB, block.borderRadiusL, block.borderRadiusR, block.borderRadiusT]);

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

  return {
    openColorPicker,
    setOpenColorPicker,
    onHexChange,
    onHexCommit,
    onRgbaCommit,
    onBorderWidthChange,
    onBorderPositionChange,
    onBorderRadiusChange,
    borderRadiusValue,
  };
};
