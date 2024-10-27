import { ContainerBlock } from "@/domain/block";
import {
  IUseDefaultBlockProps,
  useBlockHistory,
  useDefaultBlockProps,
  useGlobalContext,
  useNewBlock,
} from "@/hooks";
import {
  getImageSizeFromBlobFile,
  getImageUrlFromBlobFile,
  hasChildrenMixin,
  hasDropColMixin,
  hasDropRowMixin,
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
  const { isAddable, addNewBlock } = useNewBlock();

  useHotkeys("backspace", () => {
    const block = globalContext.currentBlock;
    if (!block) {
      return;
    }

    const parent = block.parent;
    if (parent && hasChildrenMixin(parent)) {
      startCaptureSnapshot(`remove-${parent.id}`);
      parent.removeChild(block);
      if (hasDropColMixin(parent) || hasDropRowMixin(parent)) {
        parent.autoLayout();
      }
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

      if (!isAddable) {
        return;
      }

      const url = getImageUrlFromBlobFile(blob);
      if (!url) {
        return;
      }

      const { width, height } = await getImageSizeFromBlobFile(blob);
      const imageProps = {
        position: "absolute",
        width,
        height,
        widthType: "fixed",
        heightType: "fixed",
        url,
      } as const;
      addNewBlock("IMAGE", imageProps);
    };

    document.addEventListener("paste", handlePaste);
    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, [endCaptureSnapshot, globalContext, startCaptureSnapshot]);

  return { block: container, ...props };
};
