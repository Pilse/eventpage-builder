import { BlockFactory, ContainerBlock, Image, ImageBlock } from "@/domain/builder";
import {
  IUseDefaultBlockProps,
  useBlockHistory,
  useDefaultBlockProps,
  useGlobalContext,
  useNewBlock,
} from "@/hooks";
import { uploadImage } from "@/service/image";
import {
  getImageSizeFromBlobFile,
  getImageUrlFromBlobFile,
  hasChildrenMixin,
  hasDropColMixin,
  hasDropRowMixin,
} from "@/shared/util";
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
    if (!globalContext.currentBlock) {
      return;
    }

    const parent = globalContext.currentBlock.parent;
    if (parent && hasChildrenMixin(parent)) {
      startCaptureSnapshot(`remove-${parent.id}`);
      parent.removeChild(globalContext.currentBlock);
      if (hasDropColMixin(parent) || hasDropRowMixin(parent)) {
        parent.autoLayout();
      }
      globalContext.setCurrentBlock(containerBlock);
      endCaptureSnapshot(`remove-${parent.id}`);
    }
  });

  useHotkeys("mod+c", () => {
    if (!globalContext.currentBlock) {
      return;
    }

    navigator.clipboard.writeText(JSON.stringify(globalContext.currentBlock.serialize()));
  });

  useEffect(() => {
    const handleTextPaste = (e: ClipboardEvent) => {
      const text = e.clipboardData?.getData("text/plain");
      if (!text || !isAddable) {
        return false;
      }

      try {
        const parent =
          globalContext.currentBlock && hasChildrenMixin(globalContext.currentBlock)
            ? globalContext.currentBlock.parent?.getClosestParent()
            : globalContext.currentBlock?.getClosestParent();
        if (!parent) {
          return false;
        }

        const block = BlockFactory.create(JSON.parse(text), parent);
        addNewBlock(block.type, block.serialize(), parent);
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

      const tempUrl = getImageUrlFromBlobFile(blob);
      const { width, height } = await getImageSizeFromBlobFile(blob);
      const imageProps = {
        position: "absolute",
        width,
        height,
        widthType: "fixed",
        heightType: "fit",
        filename: blob.name,
        url: tempUrl,
        aspectRatio: Math.floor((width * 100) / height),
        backgroundType: "color",
        backgroundColor: { r: 0, g: 0, b: 0, a: 0 },
      } satisfies Partial<ReturnType<Image["serialize"]>>;

      const imageBlock = addNewBlock("IMAGE", imageProps) as InstanceType<typeof ImageBlock> | null;
      if (!imageBlock) {
        return;
      }

      const imageUrl = await uploadImage(blob);
      imageBlock.url = imageUrl || "";
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
  }, [addNewBlock, endCaptureSnapshot, isAddable, startCaptureSnapshot, globalContext.currentBlock]);

  useEffect(() => {
    if (globalContext.currentBlock === null) {
      globalContext.setCurrentBlock(container);
    }
  }, [container, globalContext]);

  return { block: container, ...props };
};
