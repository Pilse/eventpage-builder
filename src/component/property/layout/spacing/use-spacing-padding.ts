import { Block } from "@/domain/block";
import { useBlockHistory } from "@/hooks";
import { hasDropColMixin, hasDropRowMixin } from "@/util";
import { useCallback, useMemo } from "react";

export const useSpacingPadding = <T extends Block>(block: T) => {
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();

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
    onPaddingChange,
    paddingValue,
  };
};
