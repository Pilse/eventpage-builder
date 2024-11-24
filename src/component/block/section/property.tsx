import { DefaultLayoutType, SectionLayoutSize } from "@/component/property/layout";
import { Section as SectionBlock } from "@/domain/block";
import { Box, Flex, Heading } from "@radix-ui/themes";

export const SectionCanvasProperties = <T extends SectionBlock = SectionBlock>({ block }: { block: T }) => {
  return (
    <Box p="4">
      <Flex direction="column" gap="4">
        <Heading size="3">Layout</Heading>
        <Flex direction="column" gap="2">
          <DefaultLayoutType block={block} />
          <SectionLayoutSize block={block} />
        </Flex>
      </Flex>
    </Box>
  );
};
