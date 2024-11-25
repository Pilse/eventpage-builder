import { TextLayoutSize } from "@/component/property/layout/size/text";
import { LayoutPadding } from "@/component/property/layout/spacing/padding";
import { Text } from "@/domain/block";
import { Box, Flex, Heading } from "@radix-ui/themes";

export const TextProperties = <T extends Text = Text>({ block }: { block: T }) => {
  return (
    <Box p="4">
      <Flex direction="column" gap="4">
        <Heading size="3">Layout</Heading>
        <Flex direction="column" gap="2">
          <TextLayoutSize block={block} />
          <LayoutPadding block={block} />
        </Flex>
      </Flex>
    </Box>
  );
};
