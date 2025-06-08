import { DefaultLayoutSize, useImageLayoutSize, LayoutPadding } from "@/component/property/layout";
import { Image } from "@/domain/block";
import { Box, Flex, Heading } from "@radix-ui/themes";

export const ImageProperties = <T extends Image = Image>({ block }: { block: T }) => {
  const sizeProps = useImageLayoutSize(block);

  return (
    <Box p="4">
      <Flex direction="column" gap="4">
        <Heading size="3">Layout</Heading>
        <Flex direction="column" gap="2">
          <DefaultLayoutSize block={block} {...sizeProps} />
          <LayoutPadding block={block} />
        </Flex>
      </Flex>
    </Box>
  );
};
