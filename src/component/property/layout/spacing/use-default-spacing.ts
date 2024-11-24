import { FrameCol, FrameRow, SectionCol, SectionRow } from "@/domain/block";
import { useBlockHistory } from "@/hooks";
import { hasDropColMixin, hasDropRowMixin } from "@/util";
import { useCallback, useMemo } from "react";

export const useDefaultLayoutSpacing = <T extends SectionRow | SectionCol | FrameCol | FrameRow>(
  block: T
) => {
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();

  const onGapChange = useCallback(
    (value: number, after?: () => void) => {
      startCaptureSnapshot(`${block.id}-property-gap`);
      block.gap = value;
      if (hasDropColMixin(block) || hasDropRowMixin(block)) {
        block.autoLayout();
      }
      after?.();
      endCaptureSnapshot(`${block.id}-property-gap`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  const onPaddingChange = useCallback(
    (value: number, dir: ("pr" | "pl" | "pb" | "pt")[], after?: () => void) => {
      startCaptureSnapshot(`${block.id}-property-padding`);
      dir.forEach((d) => {
        block[d] = value;
      });
      if (hasDropColMixin(block) || hasDropRowMixin(block)) {
        block.autoLayout();
      }
      after?.();
      endCaptureSnapshot(`${block.id}-property-padding`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  const paddingValue = useMemo(() => {
    if (block.pt === block.pr && block.pt === block.pb && block.pt === block.pl) {
      return block.pt;
    }
    return "Mixed";
  }, [block.pb, block.pl, block.pr, block.pt]);

  return {
    onGapChange,
    onPaddingChange,
    paddingValue,
  };
};
