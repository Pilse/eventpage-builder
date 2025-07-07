import { FrameBlock, FrameColBlock, FrameRowBlock } from "@/domain/builder";
import { Flex, IconButton, Text } from "@radix-ui/themes";
import { CgArrowLongDownE, CgArrowLongRightE } from "react-icons/cg";
import { RxMix } from "react-icons/rx";
import { useDefaultLayoutType } from "../property/layout";
import { twMerge } from "tailwind-merge";

interface IFrameBlockTypeLayer {
  block:
    | InstanceType<typeof FrameBlock>
    | InstanceType<typeof FrameColBlock>
    | InstanceType<typeof FrameRowBlock>;
}

export const FrameBlockTypeLayer = ({ block }: IFrameBlockTypeLayer) => {
  const { onTypeChange, onDirectionChange } = useDefaultLayoutType(block);

  const isSectionDirectChild = block.parent?.parent?.type === "CONTAINER";

  return (
    <Flex
      position="absolute"
      style={{
        ...(isSectionDirectChild ? { bottom: "calc(100%)", minWidth: "100%" } : { left: "calc(100%)" }),
      }}
      align="center"
      gap="2"
      justify="between"
      direction={isSectionDirectChild ? "row" : "column"}
    >
      {isSectionDirectChild && (
        <Text size="1" color="blue" weight="medium">
          Frame
        </Text>
      )}
      <Flex
        direction={isSectionDirectChild ? "row" : "column"}
        className={twMerge(
          "overflow-hidden backdrop-blur-md bg-white/80 ",
          isSectionDirectChild ? "rounded-t-md" : "rounded-r-md"
        )}
      >
        <IconButton
          size="1"
          radius="none"
          variant={block.type !== "FRAME_CANVAS" ? "soft" : "solid"}
          onClick={(e) => {
            onTypeChange("free");
            e.stopPropagation();
            e.stopPropagation();
          }}
        >
          <RxMix />
        </IconButton>
        <IconButton
          size="1"
          radius="none"
          variant={block.type !== "FRAME_COL" ? "soft" : "solid"}
          onClick={(e) => {
            onDirectionChange("column");
            e.stopPropagation();
            e.stopPropagation();
          }}
        >
          <CgArrowLongDownE />
        </IconButton>
        <IconButton
          size="1"
          radius="none"
          variant={block.type !== "FRAME_ROW" ? "soft" : "solid"}
          onClick={(e) => {
            onDirectionChange("row");
            e.stopPropagation();
            e.stopPropagation();
          }}
        >
          <CgArrowLongRightE />
        </IconButton>
      </Flex>
    </Flex>
  );
};
