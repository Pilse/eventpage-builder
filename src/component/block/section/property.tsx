import { DefaultLayoutSize, DefaultLayoutType } from "@/component/property/layout";
import { Section as SectionBlock } from "@/domain/block";
import { Box, Flex, Heading } from "@radix-ui/themes";
import { useSectionLayoutSize } from "../use-section-layout-size";

export const SectionCanvasProperties = <T extends SectionBlock = SectionBlock>({ block }: { block: T }) => {
  const sizeProps = useSectionLayoutSize(block);

  return (
    <Box p="4">
      <Flex direction="column" gap="4">
        <Heading size="2">Layout</Heading>
        <Flex direction="column" gap="2">
          <DefaultLayoutType block={block} />
          <DefaultLayoutSize block={block} {...sizeProps} />
        </Flex>
      </Flex>
    </Box>
  );
};
