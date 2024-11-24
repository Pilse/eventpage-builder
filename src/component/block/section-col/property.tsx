import {
  DefaultLayoutAlignment,
  DefaultLayoutSpacing,
  DefaultLayoutType,
  SectionLayoutSize,
} from "@/component/property/layout";
import { SectionCol as SectionColBlock } from "@/domain/block";
import { Box, Flex, Heading } from "@radix-ui/themes";

export const SectionColProperties = <T extends SectionColBlock = SectionColBlock>({
  block,
}: {
  block: T;
}) => {
  return (
    <Box p="4">
      <Flex direction="column" gap="4">
        <Heading size="3">Layout</Heading>
        <Flex direction="column" gap="2">
          <DefaultLayoutType block={block} />
          <SectionLayoutSize block={block} />
          <DefaultLayoutSpacing block={block} />
          <DefaultLayoutAlignment block={block} />
        </Flex>
      </Flex>
    </Box>
  );
};
