import { LayoutPadding, DefaultLayoutSize } from "@/component/property/layout";
import { Text } from "@/domain/block";
import { Box, Flex, Heading } from "@radix-ui/themes";
import { useTextLayoutSize } from "./use-text-layout-size";

export const TextProperties = <T extends Text = Text>({ block }: { block: T }) => {
  const sizeProps = useTextLayoutSize(block);

  return (
    <Box p="4">
      <Flex direction="column" gap="4">
        <Heading size="2">Layout</Heading>
        <Flex direction="column" gap="2">
          <DefaultLayoutSize block={block} {...sizeProps} />
          <LayoutPadding block={block} />
        </Flex>
      </Flex>
    </Box>
  );
};
