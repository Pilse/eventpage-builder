import { BackgroundMixinBlockType } from "@/domain/builder/mixin";
import { useBlockHistory, useDebounce } from "@/hooks";
import { uploadImage } from "@/service/image";
import { getImageUrlFromBlobFile, hasChildrenMixin } from "@/shared/util";
import { Color } from "@/type";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useDefaultBg = (block: BackgroundMixinBlockType) => {
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();
  const debouncedEndCaptureSnapshot = useDebounce(
    () => endCaptureSnapshot(`${block.id}-property-bg-color`),
    100
  );

  const [openColorPicker, setOpenColorPicker] = useState(false);

  const onHexChange = useCallback(
    (hex: string) => {
      startCaptureSnapshot(`${block.id}-property-bg-color`);
      block.updateBgColorHex(hex);
      endCaptureSnapshot(`${block.id}-property-bg-color`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  const onHexCommit = useCallback(() => {
    startCaptureSnapshot(`${block.id}-property-bg-color`);
    block.commitUpdateBgcolorHex();
    endCaptureSnapshot(`${block.id}-property-bg-color`);
  }, [block, endCaptureSnapshot, startCaptureSnapshot]);

  const onRgbaCommit = useCallback(
    (rgba: Color) => {
      startCaptureSnapshot(`${block.id}-property-bg-color`);
      block.commitUpdateBgColorRgba(rgba);
      debouncedEndCaptureSnapshot();
    },
    [block, debouncedEndCaptureSnapshot, startCaptureSnapshot]
  );

  const onBgTypeChange = useCallback(
    (type: "color" | "image") => {
      startCaptureSnapshot(`${block.id}-property-bg-color`);
      block.backgroundType = type;
      endCaptureSnapshot(`${block.id}-property-bg-color`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  const onFileUpload = useCallback(
    async (file: File) => {
      startCaptureSnapshot(`${block.id}-property-bg-image`);
      const tempUrl = getImageUrlFromBlobFile(file);
      block.backgroundImageUrl = tempUrl;

      block.backgroundImageFilename = file.name;

      const imageUrl = await uploadImage(file);
      if (!imageUrl) {
        block.backgroundImageUrl = "";
        endCaptureSnapshot(`${block.id}-property-bg-image`);
        return;
      }

      block.backgroundImageUrl = imageUrl;
      endCaptureSnapshot(`${block.id}-property-bg-image`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  const onBackgroundImageSizeChange = useCallback(
    (size: "cover" | "contain") => {
      startCaptureSnapshot(`${block.id}-property-bg-image`);
      block.backgroundImageSize = size;
      endCaptureSnapshot(`${block.id}-property-bg-image`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  const onBackgroundImagePositionVerticalChange = useCallback(
    (vertical: "top" | "center" | "bottom") => {
      startCaptureSnapshot(`${block.id}-property-bg-image`);
      block.backgroundImagePositionVertical = vertical;
      endCaptureSnapshot(`${block.id}-property-bg-image`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  const onBackgroundImagePositionHorizontalChange = useCallback(
    (horizontal: "left" | "center" | "right") => {
      startCaptureSnapshot(`${block.id}-property-bg-image`);
      block.backgroundImagePositionHorizontal = horizontal;
      endCaptureSnapshot(`${block.id}-property-bg-image`);
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
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const bgTypes = useMemo(() => {
    return (["color", "image"] as const).filter((key) => {
      if (key === "image") {
        return hasChildrenMixin(block);
      } else {
        return true;
      }
    });
  }, [block]);

  return {
    openColorPicker,
    setOpenColorPicker,
    onHexChange,
    onHexCommit,
    onRgbaCommit,
    bgTypes,
    onBgTypeChange,
    onFileUpload,
    onBackgroundImageSizeChange,
    onBackgroundImagePositionVerticalChange,
    onBackgroundImagePositionHorizontalChange,
  };
};
