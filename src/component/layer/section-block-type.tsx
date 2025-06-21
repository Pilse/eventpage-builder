import { SectionBlock, SectionColBlock, SectionRowBlock } from "@/domain/block";
import { Flex, IconButton, Inset, Text } from "@radix-ui/themes";
import { CgArrowLongDownE, CgArrowLongRightE } from "react-icons/cg";
import { RxMix } from "react-icons/rx";
import { useDefaultLayoutType } from "../property/layout";
import { useGlobalContext } from "@/hooks";
import { twMerge } from "tailwind-merge";

interface ISectionBlockTypeLayer {
  block:
    | InstanceType<typeof SectionBlock>
    | InstanceType<typeof SectionColBlock>
    | InstanceType<typeof SectionRowBlock>;
}

export const SectionBlockTypeLayer = ({ block }: ISectionBlockTypeLayer) => {
  const { setCurrentBlock } = useGlobalContext();
  const { onTypeChange, onDirectionChange } = useDefaultLayoutType(block);

  return (
    <Flex
      direction="column"
      position="absolute"
      top="0"
      style={{ right: "calc(100% + 15px)" }}
      align="end"
      gap="2"
    >
      <Text size="1" color="blue">
        Section
      </Text>

      <Flex direction="column" className="rounded-full overflow-hidden">
        <Flex direction="column">
          <IconButton
            radius="none"
            variant={block.type !== "SECTION_CANVAS" ? "soft" : "solid"}
            onClick={() => {
              setCurrentBlock(block);
              onTypeChange("free");
            }}
          >
            <RxMix />
          </IconButton>
          <IconButton
            radius="none"
            variant={block.type !== "SECTION_COL" ? "soft" : "solid"}
            onClick={() => {
              setCurrentBlock(block);
              onDirectionChange("column");
            }}
          >
            <CgArrowLongDownE />
          </IconButton>
          <IconButton
            radius="none"
            variant={block.type !== "SECTION_ROW" ? "soft" : "solid"}
            onClick={() => {
              setCurrentBlock(block);
              onDirectionChange("row");
            }}
          >
            <CgArrowLongRightE />
          </IconButton>
        </Flex>
      </Flex>
    </Flex>
  );
};
