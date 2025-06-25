import { useGlobalContext } from "./use-global-context";
import { Block, BlockFactory } from "@/domain/builder";
import { hasDropColMixin, hasDropRowMixin } from "@/util";
import { useBlockHistory } from "./use-block-history";
import { useCallback } from "react";
import { ChildrenMixinBlockType } from "@/domain/builder/mixin";
import { flushSync } from "react-dom";

export const useNewBlock = () => {
  const { setCurrentBlock, currentBlock } = useGlobalContext();
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();

  const getInitalProps = useCallback((parent: Block, current: Block, type: Block["type"]) => {
    switch (type) {
      case "FRAME_CANVAS":
      case "FRAME_ROW":
      case "FRAME_COL": {
        return {
          position: "absolute",
          t: hasDropColMixin(parent) ? (current.id === parent.id ? parent.height : current.t + 1) : 0,
          l: hasDropRowMixin(parent) ? (current.id === parent.id ? parent.width : current.l + 1) : 0,
          b: 0,
          r: 0,
          width: 250,
          height: 250,
          widthType: hasDropRowMixin(parent) ? "fill" : "fixed",
          heightType: hasDropColMixin(parent) ? "fill" : "fixed",
          backgroundColor: { r: 239, g: 239, b: 239, a: 1 },
        };
      }
      case "SECTION_CANVAS":
      case "SECTION_ROW":
      case "SECTION_COL": {
        return {
          position: "absolute",
          t: hasDropColMixin(parent) ? (current.id === parent.id ? parent.height : current.t + 1) : 0,
          l: hasDropRowMixin(parent) ? (current.id === parent.id ? parent.width : current.l + 1) : 0,
          b: 0,
          r: 0,
          width: 300,
          height: 300,
          widthType: "fill",
          heightType: "fixed",
          backgroundColor: { r: 255, g: 255, b: 255, a: 0 },
        };
      }
      case "TEXT": {
        return {
          position: "absolute",
          t: hasDropColMixin(parent) ? (current.id === parent.id ? parent.height : current.t + 1) : 0,
          l: hasDropRowMixin(parent) ? (current.id === parent.id ? parent.width : current.l + 1) : 0,
          b: 0,
          r: 0,
          width: 200,
          height: 100,
          widthType: "fit",
          heightType: "fit",
          content: "Double click to edit",
          backgroundColor: { r: 255, g: 255, b: 255, a: 0 },
        };
      }
      case "IMAGE": {
        return {
          position: "absolute",
          t: hasDropColMixin(parent) ? (current.id === parent.id ? parent.height : current.t + 1) : 0,
          l: hasDropRowMixin(parent) ? (current.id === parent.id ? parent.width : current.l + 1) : 0,
          b: 0,
          r: 0,
          width: 200,
          height: 200,
          widthType: "fixed",
          heightType: "fit",
          aspectRatio: 100,
          url: `${process.env.NEXT_PUBLIC_AWS_CF_DOMAIN}/images/default-image.png`,
          backgroundColor: { r: 255, g: 255, b: 255, a: 0 },
        };
      }
    }

    return hasDropRowMixin(parent)
      ? {
          position: "absolute",
          t: 0,
          l: current.id === parent.id ? parent.width : current.l + 1,
          b: 0,
          r: 0,
          width: 100,
          height: 100,
          widthType: "fixed",
          heightType: "fill",
        }
      : hasDropColMixin(parent)
      ? {
          position: "absolute",
          t: current.id === parent.id ? parent.height : current.t + 1,
          l: 0,
          b: 0,
          r: 100,
          width: 100,
          height: 100,
          widthType: "fill",
          heightType: "fixed",
        }
      : {
          position: "absolute",
          t: parent.height / 2 - 50,
          l: parent.width / 2 - 50,
          b: parent.height / 2,
          r: parent.width / 2,
          width: 100,
          height: 100,
          widthType: "fixed",
          heightType: "fixed",
        };
  }, []);

  const addNewBlock = useCallback(
    <T extends Omit<ReturnType<Block["serialize"]>, "id">>(
      type: T["type"],
      serialized: Partial<T>,
      _parent?: ChildrenMixinBlockType
    ) => {
      if (!currentBlock) {
        return null;
      }

      let parent: ChildrenMixinBlockType | null = _parent || currentBlock.getClosestParent();
      if (parent?.type.startsWith("SECTION") && type.startsWith("SECTION")) {
        parent = parent.parent?.getClosestParent() ?? null;
      }
      if (!parent) {
        return null;
      }

      const { width, height, widthType, heightType, ...props } = getInitalProps(parent, currentBlock, type);

      const newBlock = BlockFactory.create(
        {
          type,
          width,
          height,
          widthType,
          heightType,
          pt: 0,
          pr: 0,
          pb: 0,
          pl: 0,
          backgroundType: "color",
          backgroundColor: { r: 255, g: 255, b: 255, a: 1 },
          borderPosition: "inside",
          borderColor: { r: 0, g: 0, b: 0, a: 1 },
          borderRadiusT: 0,
          borderRadiusR: 0,
          borderRadiusB: 0,
          borderRadiusL: 0,
          borderWidth: 0,
          shadow: { x: 0, y: 0, blur: 0, spread: 0, color: { r: 0, g: 0, b: 0, a: 1 } },
          ...props,
          ...serialized,
        },
        parent
      );
      startCaptureSnapshot(`add-${parent.id}`);
      flushSync(() => {
        parent?.addChild(newBlock);
      });
      if (hasDropRowMixin(parent) || hasDropColMixin(parent)) {
        parent.autoLayout("order");
      }
      setCurrentBlock(newBlock);
      endCaptureSnapshot(`add-${parent.id}`);
      return newBlock;
    },
    [currentBlock, endCaptureSnapshot, getInitalProps, setCurrentBlock, startCaptureSnapshot]
  );

  return {
    isAddable: !!currentBlock && currentBlock.type !== "CONTAINER",
    addNewBlock,
  };
};
