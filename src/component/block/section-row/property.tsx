import {
  DefaultLayoutAlignment,
  DefaultLayoutSize,
  DefaultLayoutSpacing,
  DefaultLayoutType,
  useSectionLayoutSize,
} from "@/component/property/layout";
import { SectionRow as SectionRowBlock } from "@/domain/block";
import { Box, Flex, Heading } from "@radix-ui/themes";

export const SectionRowProperties = <T extends SectionRowBlock = SectionRowBlock>({
  block,
}: {
  block: T;
}) => {
  const sizeProps = useSectionLayoutSize(block);

  return (
    <Box p="4">
      <Flex direction="column" gap="4">
        <Heading size="3">Layout</Heading>
        <Flex direction="column" gap="2">
          <DefaultLayoutType block={block} />
          <DefaultLayoutSize block={block} {...sizeProps} />
          <DefaultLayoutSpacing block={block} />
          <DefaultLayoutAlignment block={block} />
        </Flex>
      </Flex>
    </Box>
  );
};
