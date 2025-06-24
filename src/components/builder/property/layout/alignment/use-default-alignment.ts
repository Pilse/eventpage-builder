import { FrameCol, FrameRow, SectionCol, SectionRow } from "@/domain/block";
import { useBlockHistory } from "@/hooks";
import { hasDropColMixin, hasDropRowMixin } from "@/util";
import { useCallback, useMemo } from "react";

export const useDefaultAlignment = <T extends SectionRow | SectionCol | FrameCol | FrameRow>(block: T) => {
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();

  const onVerticalAlignChange = useCallback(
    (alignVertical: "top" | "center" | "bottom") => {
      startCaptureSnapshot(`${block.id}.alignVertical`);
      block.alignVertical = alignVertical;
      if (hasDropColMixin(block) || hasDropRowMixin(block)) {
        block.autoLayout();
      }
      endCaptureSnapshot(`${block.id}.alignVertical`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  const onHorizontalAlignChange = useCallback(
    (alignHorizontal: "left" | "center" | "right") => {
      startCaptureSnapshot(`${block.id}.alignHorizontal`);
      block.alignHorizontal = alignHorizontal;
      if (hasDropColMixin(block) || hasDropRowMixin(block)) {
        block.autoLayout();
      }
      endCaptureSnapshot(`${block.id}.alignHorizontal`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  const verticalAlignValue = useMemo<"Top" | "Center" | "Bottom">(() => {
    return (block.alignVertical.charAt(0).toUpperCase() + block.alignVertical.slice(1)) as
      | "Top"
      | "Center"
      | "Bottom";
  }, [block.alignVertical]);

  const horizontalAlignValue = useMemo<"Left" | "Center" | "Right">(() => {
    return (block.alignHorizontal.charAt(0).toUpperCase() + block.alignHorizontal.slice(1)) as
      | "Left"
      | "Center"
      | "Right";
  }, [block.alignHorizontal]);

  return {
    onVerticalAlignChange,
    onHorizontalAlignChange,
    verticalAlignValue,
    horizontalAlignValue,
  };
};
