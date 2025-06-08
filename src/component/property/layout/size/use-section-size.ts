import { Block } from "@/domain/block";
import { useCallback, useMemo } from "react";
import { IUseLayoutSize, useDefaultLayoutSize } from "./use-default-size";
import { hasDropColMixin, hasDropRowMixin, isAutoLayouted } from "@/util";

export const useSectionLayoutSize = <T extends Block = Block>(block: T): IUseLayoutSize => {
  const {
    onHeightChange: handleHeightChange,
    onHeightTypeChange: handleHeightTypeChange,
    widthTypes: defaultWidthTypes,
    heightTypes: defaultHeightTypes,
  } = useDefaultLayoutSize(block);

  const onHeightChange = useCallback(
    (height: number) => {
      handleHeightChange?.(height, () => {
        if (hasDropColMixin(block) || hasDropRowMixin(block)) {
          block.autoLayout();
        }

        const parent = block.parent;
        if (parent && (hasDropColMixin(parent) || hasDropRowMixin(parent))) {
          parent.autoLayout();
        }
      });
    },
    [block, handleHeightChange]
  );

  const onHeightTypeChange = useCallback(
    (heightType: Block["heightType"]) => {
      handleHeightTypeChange?.(heightType, () => {
        if (hasDropColMixin(block) || hasDropRowMixin(block)) {
          block.autoLayout();
        }

        const parent = block.parent;
        if (parent && (hasDropColMixin(parent) || hasDropRowMixin(parent))) {
          parent.autoLayout();
        }
      });
    },
    [block, handleHeightTypeChange]
  );

  const widthTypes = useMemo(() => {
    return ["fill"] as const;
  }, []);

  const heightTypes = useMemo(() => {
    return defaultHeightTypes.filter((heightType) => {
      if (heightType === "fit") {
        return hasDropColMixin(block) || hasDropRowMixin(block);
      }

      if (heightType === "fill") {
        return false;
      }

      return true;
    });
  }, [block, defaultHeightTypes]);

  return {
    onHeightChange,
    onHeightTypeChange,
    useHeight: true,
    useWidth: false,
    widthTypes,
    heightTypes,
  };
};
