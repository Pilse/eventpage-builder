import { Block } from "@/domain/builder";
import { useBlockHistory, useDebounce } from "@/hooks";
import { useCallback } from "react";
import { flushSync } from "react-dom";

export interface IUseLayoutSize {
  onWidthChange?: (value: number, after?: () => void, config?: { flush: boolean }) => void;
  onHeightChange?: (value: number, after?: () => void, config?: { flush: boolean }) => void;
  onWidthTypeChange?: (value: Block["widthType"], after?: () => void, config?: { flush: boolean }) => void;
  onHeightTypeChange?: (value: Block["heightType"], after?: () => void, config?: { flush: boolean }) => void;
  useHeight: boolean;
  useWidth: boolean;
  widthTypes: readonly Block["widthType"][];
  heightTypes: readonly Block["heightType"][];
}

export const useDefaultLayoutSize = <T extends Block = Block>(block: T): IUseLayoutSize => {
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();
  const debouncedWidthEndCaptureSnapshot = useDebounce(() => {
    endCaptureSnapshot(`${block.id}-property-width`);
  }, 100);
  const debouncedHeightEndCaptureSnapshot = useDebounce(() => {
    endCaptureSnapshot(`${block.id}-property-height`);
  }, 100);

  const onWidthChange = useCallback(
    (value: number, after?: () => void, config?: { flush: boolean }) => {
      startCaptureSnapshot(`${block.id}-property-width`);
      if (config?.flush) {
        flushSync(() => {
          block.width = value;
          if (block.widthType !== "fixed") {
            block.widthType = "fixed";
          }
        });
      } else {
        block.width = value;
        if (block.widthType !== "fixed") {
          block.widthType = "fixed";
        }
      }
      after?.();
      debouncedWidthEndCaptureSnapshot();
    },
    [block, debouncedWidthEndCaptureSnapshot, startCaptureSnapshot]
  );

  const onHeightChange = useCallback(
    (value: number, after?: () => void, config?: { flush: boolean }) => {
      startCaptureSnapshot(`${block.id}-property-height`);
      if (config?.flush) {
        flushSync(() => {
          block.height = value;
          if (block.heightType !== "fixed") {
            block.heightType = "fixed";
          }
        });
      } else {
        block.height = value;
        if (block.heightType !== "fixed") {
          block.heightType = "fixed";
        }
      }
      after?.();
      debouncedHeightEndCaptureSnapshot();
    },
    [block, debouncedHeightEndCaptureSnapshot, startCaptureSnapshot]
  );

  const onWidthTypeChange = useCallback(
    (value: Block["widthType"], after?: () => void, config?: { flush: boolean }) => {
      startCaptureSnapshot(`${block.id}-property-width-type`);
      if (config?.flush) {
        flushSync(() => {
          block.widthType = value;
          block._centerX = block.getCenterX();
          block._centerY = block.getCenterY();
        });
      } else {
        block.widthType = value;
        block._centerX = block.getCenterX();
        block._centerY = block.getCenterY();
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
          block._centerX = block.getCenterX();
          block._centerY = block.getCenterY();
        });
      } else {
        block.heightType = value;
        block._centerX = block.getCenterX();
        block._centerY = block.getCenterY();
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
    useHeight: true,
    useWidth: true,
    widthTypes: ["fill", "fixed", "fit"] as const,
    heightTypes: ["fill", "fixed", "fit"] as const,
  };
};
