import { BlockFactory, ContainerBlock } from "@/domain/block";
import { IUseDefaultBlockProps, useBlockHistory, useDefaultBlockProps, useGlobalContext } from "@/hooks";
import {
  getImageSizeFromBlobFile,
  getImageUrlFromBlobFile,
  hasChildrenMixin,
  hasDropColMixin,
  hasDropRowMixin,
  isAutoLayouted,
} from "@/util";
import { useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";

interface IUseContainerBlockProps extends IUseDefaultBlockProps<InstanceType<typeof ContainerBlock>> {}

export const useContainerBlockProps = (
  containerBlock: InstanceType<typeof ContainerBlock>
): IUseContainerBlockProps => {
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();
  const { block: container, ...props } = useDefaultBlockProps(containerBlock);
  const globalContext = useGlobalContext();

  useHotkeys("backspace", () => {
    const block = globalContext.currentBlock;
    if (!block) {
      return;
    }

    const parent = block.parent;
    if (parent && hasChildrenMixin(parent)) {
      startCaptureSnapshot(`remove-${parent.id}`);
      parent.removeChild(block);
      endCaptureSnapshot(`remove-${parent.id}`);
    }
  });

  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      const blob = e.clipboardData?.files[0];
      if (!blob) {
        return;
      }

      e.preventDefault();

      let currentBlock = globalContext.currentBlock;
      if (!currentBlock) {
        return;
      }

      if (!hasChildrenMixin(currentBlock)) {
        currentBlock = currentBlock.parent;
      }

      if (!currentBlock) {
        return;
      }

      const url = getImageUrlFromBlobFile(blob);
      const { width, height } = await getImageSizeFromBlobFile(blob);

      if (url && hasChildrenMixin(currentBlock)) {
        const image = BlockFactory.create(
          {
            type: "IMAGE",
            url,
            t: currentBlock.height / 2 - 50,
            l: currentBlock.width / 2 - 50,
            b: currentBlock.height / 2,
            r: currentBlock.width / 2,
            position: "absolute",
            width,
            height,
          },
          currentBlock
        );
        startCaptureSnapshot(`new-${image.id}`);
        currentBlock.addChild(image);
        globalContext.setCurrentBlock(image);
        if (hasDropRowMixin(currentBlock) || hasDropColMixin(currentBlock)) {
          currentBlock.autoLayout();
        }
        endCaptureSnapshot(`new-${image.id}`);
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, [endCaptureSnapshot, globalContext, startCaptureSnapshot]);

  return { block: container, ...props };
};
