import { Block } from "@/domain/block";
import { useBlockHistory } from "@/hooks";
import { useCallback } from "react";
import { flushSync } from "react-dom";

export const useDefaultLayoutSize = <T extends Block = Block>(block: T) => {
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();

  const onWidthChange = useCallback(
    (value: number, after?: () => void, config?: { flush: boolean }) => {
      startCaptureSnapshot(`${block.id}-property-width`);
      if (config?.flush) {
        flushSync(() => {
          block.width = value;
        });
      } else {
        block.width = value;
      }
      after?.();
      endCaptureSnapshot(`${block.id}-property-width`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  const onHeightChange = useCallback(
    (value: number, after?: () => void, config?: { flush: boolean }) => {
      startCaptureSnapshot(`${block.id}-property-height`);
      if (config?.flush) {
        flushSync(() => {
          block.height = value;
        });
      } else {
        block.height = value;
      }
      after?.();
      endCaptureSnapshot(`${block.id}-property-height`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  const onWidthTypeChange = useCallback(
    (value: Block["widthType"], after?: () => void, config?: { flush: boolean }) => {
      startCaptureSnapshot(`${block.id}-property-width-type`);
      if (config?.flush) {
        flushSync(() => {
          block.widthType = value;
        });
      } else {
        block.widthType = value;
      }
      after?.();
      endCaptureSnapshot(`${block.id}-property-width-type`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  const onHeightTypeChange = useCallback(
    (value: Block["heightType"], after?: () => void, config?: { flush: boolean }) => {
      startCaptureSnapshot(`${block.id}-property-height-type`);
      if (config?.flush) {
        flushSync(() => {
          block.heightType = value;
        });
      } else {
        block.heightType = value;
      }
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
