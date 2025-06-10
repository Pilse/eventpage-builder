import { FrameCol, FrameRow, SectionCol, SectionRow } from "@/domain/block";
import { useBlockHistory } from "@/hooks";
import { useCallback } from "react";
import { useDefaultPadding } from "./use-default-padding";

export const useDefaultSpacing = <T extends SectionRow | SectionCol | FrameCol | FrameRow>(block: T) => {
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();
  const { onPaddingChange, paddingValue } = useDefaultPadding(block);

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
