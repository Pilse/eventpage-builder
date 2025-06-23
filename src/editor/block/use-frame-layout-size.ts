import { Block } from "@/domain/block";
import { useCallback, useMemo } from "react";
import { IUseLayoutSize, useDefaultLayoutSize } from "@/editor/property/layout";
import { hasDropColMixin, hasDropRowMixin, isAutoLayouted } from "@/util";

export const useFrameLayoutSize = <T extends Block = Block>(block: T): IUseLayoutSize => {
  const {
    onWidthChange: handleWidthChange,
    onHeightChange: handleHeightChange,
    onWidthTypeChange: handleWidthTypeChange,
    onHeightTypeChange: handleHeightTypeChange,
    widthTypes: defaultWidthTypes,
    heightTypes: defaultHeightTypes,
  } = useDefaultLayoutSize(block);

  const onWidthChange = useCallback(
    (width: number) => {
      handleWidthChange?.(width, () => {
        if (hasDropColMixin(block) || hasDropRowMixin(block)) {
          block.autoLayout();
        }

        const parent = block.parent;
        if (parent && (hasDropColMixin(parent) || hasDropRowMixin(parent))) {
          parent.autoLayout();
        }
      });
    },
    [block, handleWidthChange]
  );

  const onWidthTypeChange = useCallback(
    (widthType: Block["widthType"]) => {
      handleWidthTypeChange?.(widthType, () => {
        if (hasDropColMixin(block) || hasDropRowMixin(block)) {
          block.autoLayout();
        }

        const parent = block.parent;
        if (parent && (hasDropColMixin(parent) || hasDropRowMixin(parent))) {
          parent.autoLayout();
        }
      });
    },
    [block, handleWidthTypeChange]
  );

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
    return defaultWidthTypes.filter((widthType) => {
      if (widthType === "fit") {
        return hasDropColMixin(block) || hasDropRowMixin(block);
      }

      if (widthType === "fill") {
        return isAutoLayouted(block);
      }

      return true;
    });
  }, [block, defaultWidthTypes]);

  const heightTypes = useMemo(() => {
    return defaultHeightTypes.filter((heightType) => {
      if (heightType === "fit") {
        return hasDropColMixin(block) || hasDropRowMixin(block);
      }

      if (heightType === "fill") {
        return isAutoLayouted(block);
      }

      return true;
    });
  }, [block, defaultHeightTypes]);

  return {
    onWidthChange,
    onHeightChange,
    onWidthTypeChange,
    onHeightTypeChange,
    useHeight: true,
    useWidth: true,
    widthTypes,
    heightTypes,
  };
};
