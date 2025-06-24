import { Text } from "@/domain/block";
import { useCallback, useMemo } from "react";
import { hasDropColMixin, hasDropRowMixin, isAutoLayouted } from "@/util";
import { IUseLayoutSize, useDefaultLayoutSize } from "@/components/builder/property/layout";

export const useTextLayoutSize = <T extends Text = Text>(block: T): IUseLayoutSize => {
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
        const parent = block.parent;
        if (parent && (hasDropColMixin(parent) || hasDropRowMixin(parent))) {
          parent.autoLayout();
        }
      });
    },
    [block, handleWidthChange]
  );

  const onWidthTypeChange = useCallback(
    (widthType: Text["widthType"]) => {
      handleWidthTypeChange?.(
        widthType,
        () => {
          const parent = block.parent;
          if (parent && (hasDropColMixin(parent) || hasDropRowMixin(parent))) {
            parent.autoLayout();
          }
        },
        { flush: true }
      );
    },
    [block, handleWidthTypeChange]
  );

  const onHeightChange = useCallback(
    (height: number) => {
      handleHeightChange?.(height, () => {
        const parent = block.parent;
        if (parent && (hasDropColMixin(parent) || hasDropRowMixin(parent))) {
          parent.autoLayout();
        }
      });
    },
    [block, handleHeightChange]
  );

  const onHeightTypeChange = useCallback(
    (heightType: Text["heightType"]) => {
      handleHeightTypeChange?.(
        heightType,
        () => {
          const parent = block.parent;
          if (parent && (hasDropColMixin(parent) || hasDropRowMixin(parent))) {
            parent.autoLayout();
          }
        },
        { flush: true }
      );
    },
    [block, handleHeightTypeChange]
  );

  const widthTypes = useMemo(() => {
    return defaultWidthTypes.filter((widthType) => {
      if (widthType === "fill") {
        return isAutoLayouted(block);
      }

      return true;
    });
  }, [block, defaultWidthTypes]);

  const heightTypes = useMemo(() => {
    return defaultHeightTypes.filter((heightType) => {
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
