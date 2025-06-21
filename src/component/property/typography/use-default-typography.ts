import { TypographyMixinBlockType } from "@/domain/mixin";
import { useBlockHistory } from "@/hooks";
import { Color, Shadow, TextAlign, TextShadow } from "@/type";
import { hasDropColMixin, hasDropRowMixin } from "@/util";
import { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";

export const useDefaultTypography = <T extends TypographyMixinBlockType>(block: T) => {
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();

  const [openColorPicker, setOpenColorPicker] = useState(false);
  const [openShadowColorPicker, setShadowOpenColorPicker] = useState(false);

  const onFontNameChange = useCallback(
    (fontName: string) => {
      startCaptureSnapshot(`${block.id}.font-name`);
      flushSync(() => {
        block.setFontName(fontName);
      });
      const parent = block.parent;
      if (parent && (hasDropColMixin(parent) || hasDropRowMixin(parent))) {
        parent.autoLayout();
      }
      endCaptureSnapshot(`${block.id}.font-name`);
    },
    [block, startCaptureSnapshot, endCaptureSnapshot]
  );

  const onFontWeightChange = useCallback(
    (fontWeight: string) => {
      startCaptureSnapshot(`${block.id}.font-weight`);
      flushSync(() => {
        block.setFontWeight(Number(fontWeight));
      });
      const parent = block.parent;
      if (parent && (hasDropColMixin(parent) || hasDropRowMixin(parent))) {
        parent.autoLayout();
      }
      endCaptureSnapshot(`${block.id}.font-weight`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  const onFontSizeChange = useCallback(
    (fontSize: number) => {
      startCaptureSnapshot(`${block.id}.font-weight`);
      flushSync(() => {
        block.setFontSize(fontSize);
        block._centerX = block.getCenterX();
        block._centerY = block.getCenterY();
      });
      const parent = block.parent;
      if (parent && (hasDropColMixin(parent) || hasDropRowMixin(parent))) {
        parent.autoLayout();
      }
      endCaptureSnapshot(`${block.id}.font-weight`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  const onHexChange = useCallback(
    (hex: string) => {
      startCaptureSnapshot(`${block.id}-property-shadow-color`);
      block.updateFontColorHex(hex);
      endCaptureSnapshot(`${block.id}-property-shadow-color`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  const onHexCommit = useCallback(() => {
    startCaptureSnapshot(`${block.id}-property-shadow-color`);
    block.commitUpdateFontColorHex();
    endCaptureSnapshot(`${block.id}-property-shadow-color`);
  }, [block, endCaptureSnapshot, startCaptureSnapshot]);

  const onRgbaCommit = useCallback(
    (rgba: Color) => {
      startCaptureSnapshot(`${block.id}-property-shadow-color`);
      block.commitUpdateFontColorRgba(rgba);
      endCaptureSnapshot(`${block.id}-property-shadow-color`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  const onLetterSpacingChange = useCallback(
    (letterSpacing: number) => {
      startCaptureSnapshot(`${block.id}-property-letter-spacing`);
      flushSync(() => {
        block.setLetterSpacing(letterSpacing);
        block._centerX = block.getCenterX();
        block._centerY = block.getCenterY();
      });
      const parent = block.parent;
      if (parent && (hasDropColMixin(parent) || hasDropRowMixin(parent))) {
        parent.autoLayout();
      }
      endCaptureSnapshot(`${block.id}-property-letter-spacing`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  const onLineHeightChange = useCallback(
    (lineHeight: number) => {
      startCaptureSnapshot(`${block.id}-property-line-height`);
      flushSync(() => {
        block.setLineHeight(lineHeight);
        block._centerX = block.getCenterX();
        block._centerY = block.getCenterY();
      });
      const parent = block.parent;
      if (parent && (hasDropColMixin(parent) || hasDropRowMixin(parent))) {
        parent.autoLayout();
      }
      endCaptureSnapshot(`${block.id}-property-line-height`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  const onTextAlignChange = useCallback(
    (textAlign: TextAlign) => {
      startCaptureSnapshot(`${block.id}-property-text-align`);
      block.setTextAlign(textAlign);
      endCaptureSnapshot(`${block.id}-property-text-align`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  const onShadowHexChange = useCallback(
    (hex: string) => {
      startCaptureSnapshot(`${block.id}-property-text-shadow-color`);
      block.updateTextShadowColorHex(hex);
      endCaptureSnapshot(`${block.id}-property-text-shadow-color`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  const onShadowHexCommit = useCallback(() => {
    startCaptureSnapshot(`${block.id}-property-text-shadow-color`);
    block.commitUpdateShadowColorHex();
    endCaptureSnapshot(`${block.id}-property-text-shadow-color`);
  }, [block, endCaptureSnapshot, startCaptureSnapshot]);

  const onShadowRgbaCommit = useCallback(
    (rgba: Color) => {
      startCaptureSnapshot(`${block.id}-property-text-shadow-color`);
      block.commitUpdateShadowColorRgba(rgba);
      endCaptureSnapshot(`${block.id}-property-text-shadow-color`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  const onShadowChange = useCallback(
    (shadow: TextShadow) => {
      startCaptureSnapshot(`${block.id}-property-text-shadow-color`);
      block.textShadow = shadow;
      endCaptureSnapshot(`${block.id}-property-text-shadow-color`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  useEffect(() => {
    const handleMouseDown = (e: Event) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }

      if (target.closest("div.react-colorful")) {
        return;
      }

      setOpenColorPicker(false);
      setShadowOpenColorPicker(false);
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return {
    onFontNameChange,
    onFontWeightChange,
    onFontSizeChange,
    onHexChange,
    onHexCommit,
    onRgbaCommit,
    openColorPicker,
    setOpenColorPicker,
    onLetterSpacingChange,
    onLineHeightChange,
    onTextAlignChange,
    onShadowHexChange,
    onShadowHexCommit,
    onShadowRgbaCommit,
    onShadowChange,
    openShadowColorPicker,
    setShadowOpenColorPicker,
  };
};
