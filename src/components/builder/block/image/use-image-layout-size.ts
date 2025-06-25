import { Image } from "@/domain/builder";
import { useCallback, useMemo } from "react";
import { IUseLayoutSize, useDefaultLayoutSize } from "../../property/layout/size/use-default-size";
import { hasDropColMixin, hasDropRowMixin, isAutoLayouted } from "@/shared/util";

export const useImageLayoutSize = <T extends Image = Image>(block: T): IUseLayoutSize => {
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
    (widthType: Image["widthType"]) => {
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
    (heightType: Image["heightType"]) => {
      handleHeightTypeChange?.(
        heightType,
        () => {
          const parent = block.parent;
          if (parent && (hasDropColMixin(parent) || hasDropRowMixin(parent))) {
            parent.autoLayout();
          }
          if (heightType === "fit") {
            block.setAspectRatioHeight();
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

      if (widthType === "fit") {
        return false;
      }

      return true;
    });
  }, [block, defaultWidthTypes]);

  const heightTypes = useMemo(() => {
    return defaultHeightTypes.filter((heightType) => {
      if (heightType === "fill") {
        return isAutoLayouted(block);
      }

      if (heightType === "fit") {
        block.aspectRatio !== 0;
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
