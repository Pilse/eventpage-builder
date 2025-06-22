import { ImageBlock } from "@/domain/block";
import { useBlockHistory } from "@/hooks";
import { uploadImage } from "@/service/image";
import { getImageSizeFromBlobFile, getImageUrlFromBlobFile } from "@/util";
import { useCallback } from "react";

export const useDefaultFile = <T extends InstanceType<typeof ImageBlock>>(block: T) => {
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();

  const onFileUpload = useCallback(
    async (file: File) => {
      startCaptureSnapshot(`${block.id}-file-upload`);
      const tempUrl = getImageUrlFromBlobFile(file);
      block.url = tempUrl;
      const imageUrl = await uploadImage(file);
      if (!imageUrl) {
        block.url = "";
        endCaptureSnapshot(`${block.id}-file-upload`);
        return;
      }

      const { width, height } = await getImageSizeFromBlobFile(file);
      block.url = imageUrl || "";
      block.filename = file.name;
      block.aspectRatio = Math.floor((width * 100) / height);
      block.heightType = "fit";
      block.setAspectRatioHeight();
      block._centerY = block.getCenterY();
      endCaptureSnapshot(`${block.id}-file-upload`);
    },
    [block, endCaptureSnapshot, startCaptureSnapshot]
  );

  return {
    onFileUpload,
  };
};
