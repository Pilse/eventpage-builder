import { BlockFactory, ContainerBlock } from "@/domain/block";
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
  const { currentBlock } = useGlobalContext();
  const { isAddable, addNewBlock } = useNewBlock();

  useHotkeys("backspace", () => {
    if (!currentBlock) {
      return;
    }

    const parent = currentBlock.parent;
    if (parent && hasChildrenMixin(parent)) {
      startCaptureSnapshot(`remove-${parent.id}`);
      parent.removeChild(currentBlock);
      if (hasDropColMixin(parent) || hasDropRowMixin(parent)) {
        parent.autoLayout();
      }
      endCaptureSnapshot(`remove-${parent.id}`);
    }
  });

  useHotkeys("mod+c", () => {
    if (!currentBlock) {
      return;
    }

    navigator.clipboard.writeText(JSON.stringify(currentBlock.serialize()));
  });

  useEffect(() => {
    const handleTextPaste = (e: ClipboardEvent) => {
      const text = e.clipboardData?.getData("text/plain");
      if (!text || !isAddable) {
        return false;
      }
      try {
        const parent = currentBlock?.getClosestParent();
        if (!parent) {
          return false;
        }

        const block = BlockFactory.create(JSON.parse(text), parent);
        addNewBlock(block.type, block.serialize());
        return true;
      } catch {
        console.error("Failed to paste text block");
        return false;
      } finally {
        return false;
      }
    };

    const handleBlobPaste = async (e: ClipboardEvent) => {
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

    const handlePaste = async (e: ClipboardEvent) => {
      const textHandled = handleTextPaste(e);
      if (textHandled) {
        return;
      }

      handleBlobPaste(e);
    };

    document.addEventListener("paste", handlePaste);
    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, [addNewBlock, endCaptureSnapshot, isAddable, startCaptureSnapshot, currentBlock]);

  return { block: container, ...props };
};
