import { FrameBlock, FrameColBlock, FrameRowBlock } from "@/domain/block";
import { Flex, IconButton } from "@radix-ui/themes";
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
        ...(isSectionDirectChild
          ? { bottom: "calc(100% + 5px)", minWidth: "100%" }
          : { right: "calc(100% + 5px)" }),
      }}
      align="center"
      gap="2"
      justify="end"
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onDragStart={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      direction={isSectionDirectChild ? "row" : "column"}
    >
      <Flex
        direction={isSectionDirectChild ? "row" : "column"}
        className="rounded-full overflow-hidden backdrop-blur-md bg-white/80"
      >
        <IconButton
          size="1"
          radius="none"
          variant={block.type !== "FRAME_CANVAS" ? "soft" : "solid"}
          onClick={() => {
            onTypeChange("free");
          }}
        >
          <RxMix />
        </IconButton>
        <IconButton
          size="1"
          radius="none"
          variant={block.type !== "FRAME_COL" ? "soft" : "solid"}
          onClick={() => {
            onDirectionChange("column");
          }}
        >
          <CgArrowLongDownE />
        </IconButton>
        <IconButton
          size="1"
          radius="none"
          variant={block.type !== "FRAME_ROW" ? "soft" : "solid"}
          onClick={() => {
            onDirectionChange("row");
          }}
        >
          <CgArrowLongRightE />
        </IconButton>
      </Flex>
    </Flex>
  );
};
