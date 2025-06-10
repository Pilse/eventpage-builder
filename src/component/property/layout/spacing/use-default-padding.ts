import { Block } from "@/domain/block";
import { useBlockHistory } from "@/hooks";
import { useCallback, useMemo } from "react";
import { flushSync } from "react-dom";

export const useDefaultPadding = <T extends Block>(block: T) => {
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();

  const onPaddingChange = useCallback(
    (value: number, dir: ("pr" | "pl" | "pb" | "pt")[], after?: () => void, config?: { flush: boolean }) => {
      startCaptureSnapshot(`${block.id}-property-padding`);
      if (config?.flush) {
        flushSync(() => {
          dir.forEach((d) => {
            block[d] = value;
          });
        });
      } else {
        dir.forEach((d) => {
          block[d] = value;
        });
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
