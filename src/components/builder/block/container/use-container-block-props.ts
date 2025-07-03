import { ContainerBlock, Image, ImageBlock } from "@/domain/builder";
import {
  IUseDefaultBlockProps,
  useDefaultBlockProps,
  useDeleteBlock,
  useGlobalContext,
  useNewBlock,
  useCopyPasteBlock,
} from "@/hooks";
import { uploadImage } from "@/service/image";
import { getImageSizeFromBlobFile, getImageUrlFromBlobFile } from "@/shared/util";
import { useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";

interface IUseContainerBlockProps extends IUseDefaultBlockProps<InstanceType<typeof ContainerBlock>> {}

export const useContainerBlockProps = (
  containerBlock: InstanceType<typeof ContainerBlock>
): IUseContainerBlockProps => {
  const { block: container, ...props } = useDefaultBlockProps(containerBlock);
  const globalContext = useGlobalContext();
  const { deleteBlock } = useDeleteBlock();
  const { isAddable, addNewBlock } = useNewBlock();
  const { copyBlock, pasteBlock } = useCopyPasteBlock();
  useHotkeys("backspace", () => {
    deleteBlock();
  });

  useHotkeys("mod+c", () => {
    if (!globalContext.currentBlock) {
      return;
    }

    copyBlock(globalContext.currentBlock);
  });

  useEffect(() => {
    const handleTextPaste = (e: ClipboardEvent) => {
      const text = e.clipboardData?.getData("text/plain");
      if (!text || !isAddable) {
        return false;
      }

      try {
        pasteBlock(text);
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
  }, [addNewBlock, isAddable, pasteBlock]);

  useEffect(() => {
    if (globalContext.currentBlock === null) {
      globalContext.setCurrentBlock(container);
    }
  }, [container, globalContext]);

  return { block: container, ...props };
};
