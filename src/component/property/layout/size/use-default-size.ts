import { Block } from "@/domain/block";
import { useBlockHistory } from "@/hooks";
import { useCallback } from "react";

export const useDefaultLayoutSize = <T extends Block = Block>(block: T) => {
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();

  const onWidthChange = useCallback(
    (value: number, after?: () => void) => {
      startCaptureSnapshot(`${block.id}-property-width`);
      block.width = value;
      after?.();
      endCaptureSnapshot(`${block.id}-property-width`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  const onHeightChange = useCallback(
    (value: number, after?: () => void) => {
      startCaptureSnapshot(`${block.id}-property-height`);
      block.height = value;
      after?.();
      endCaptureSnapshot(`${block.id}-property-height`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  const onWidthTypeChange = useCallback(
    (value: Block["widthType"], after?: () => void) => {
      startCaptureSnapshot(`${block.id}-property-width-type`);
      block.widthType = value;
      after?.();
      endCaptureSnapshot(`${block.id}-property-width-type`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  const onHeightTypeChange = useCallback(
    (value: Block["heightType"], after?: () => void) => {
      startCaptureSnapshot(`${block.id}-property-height-type`);
      block.heightType = value;
      after?.();
      endCaptureSnapshot(`${block.id}-property-height-type`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  return {
    onWidthChange,
    onHeightChange,
    onWidthTypeChange,
    onHeightTypeChange,
  };
};
