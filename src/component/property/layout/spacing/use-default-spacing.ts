import { FrameCol, FrameRow, SectionCol, SectionRow } from "@/domain/block";
import { useBlockHistory } from "@/hooks";
import { hasDropColMixin, hasDropRowMixin } from "@/util";
import { useCallback, useMemo } from "react";
import { useSpacingPadding } from "./use-spacing-padding";

export const useDefaultLayoutSpacing = <T extends SectionRow | SectionCol | FrameCol | FrameRow>(
  block: T
) => {
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();
  const { onPaddingChange, paddingValue } = useSpacingPadding(block);

  const onGapChange = useCallback(
    (value: number, after?: () => void) => {
      startCaptureSnapshot(`${block.id}-property-gap`);
      block.gap = value;
      after?.();
      endCaptureSnapshot(`${block.id}-property-gap`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  return {
    onGapChange,
    onPaddingChange,
    paddingValue,
  };
};
