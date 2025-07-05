import { useCallback } from "react";
import { useGlobalContext } from "./use-global-context";
import { Block, BlockFactory, DropCanvasMixin, Image, ImageBlock } from "@/domain/builder";
import {
  getImageSizeFromBlobFile,
  getImageUrlFromBlobFile,
  hasChildrenMixin,
  hasDropCanvasMixin,
} from "@/shared/util";
import { useNewBlock } from "./use-new-block";
import { uploadImage } from "@/service/image";

export const useCopyPasteBlock = () => {
  const globalContext = useGlobalContext();
  const { isAddable, addNewBlock } = useNewBlock();

  const copyBlock = useCallback((block: Block) => {
    navigator.clipboard.writeText(JSON.stringify(block.serialize()));
  }, []);

  const pasteBlock = useCallback(
    (text: string, block?: Block) => {
      if (!isAddable && !block) {
        return;
      }

      const currentBlock = block ?? globalContext.currentBlock;

      const copiedBlock = JSON.parse(text);
      const isSameBlock = currentBlock?.id === copiedBlock.id;

      const parent =
        currentBlock && hasChildrenMixin(currentBlock) && isSameBlock
          ? currentBlock.parent?.getClosestParent()
          : currentBlock?.getClosestParent();

      if (!parent) {
        return;
      }

      if (hasDropCanvasMixin(parent)) {
        const t = copiedBlock.t > parent.height / 2 ? parent.height / 2 : copiedBlock.t;
        const l = copiedBlock.l > parent.width / 2 ? parent.width / 2 : copiedBlock.l;
        const newBlock = BlockFactory.create(copiedBlock, parent);
        newBlock.t = t;
        newBlock.l = l;
        newBlock._centerX = newBlock.getCenterX() - parent.getCenterX();
        newBlock._centerY = newBlock.getCenterY() - parent.getCenterY();
        addNewBlock(newBlock.type, newBlock.serialize(), parent);
      } else {
        const newBlock = BlockFactory.create(copiedBlock, parent);
        addNewBlock(newBlock.type, newBlock.serialize(), parent);
      }
    },
    [addNewBlock, globalContext, isAddable]
  );

  const pasteBlob = useCallback(
    async (blob: File) => {
      if (!isAddable) {
        return;
      }

      if (!globalContext.currentBlock) {
        return;
      }
      const parent = globalContext.currentBlock.parent;
      if (!parent) {
        return;
      }

      const tempUrl = getImageUrlFromBlobFile(blob);
      const { width, height } = await getImageSizeFromBlobFile(blob);
      const adjustedWidth = width > parent.width / 2 ? parent.width / 2 : width;
      const adjustedHeight = (height * adjustedWidth) / width;

      const imageProps = {
        position: "absolute",
        width: adjustedWidth,
        height: adjustedHeight,
        widthType: "fixed",
        heightType: "fit",
        filename: blob.name,
        url: tempUrl,
        aspectRatio: Math.floor((adjustedWidth * 100) / adjustedHeight),
        backgroundType: "color",
        backgroundColor: { r: 0, g: 0, b: 0, a: 0 },
      } satisfies Partial<ReturnType<Image["serialize"]>>;

      const imageBlock = addNewBlock("IMAGE", imageProps) as InstanceType<typeof ImageBlock> | null;
      if (!imageBlock) {
        return;
      }
      const imageUrl = await uploadImage(blob);
      imageBlock.url = imageUrl || "";
    },
    [addNewBlock, globalContext.currentBlock, isAddable]
  );

  return { copyBlock, pasteBlock, pasteBlob };
};
