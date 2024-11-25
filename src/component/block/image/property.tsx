import { ImageLayoutSize } from "@/component/property/layout/size/image";
import { LayoutPadding } from "@/component/property/layout/spacing/padding";
import { Image } from "@/domain/block";
import { Box, Flex, Heading } from "@radix-ui/themes";

export const ImageProperties = <T extends Image = Image>({ block }: { block: T }) => {
  return (
    <Box p="4">
      <Flex direction="column" gap="4">
        <Heading size="3">Layout</Heading>
        <Flex direction="column" gap="2">
          <ImageLayoutSize block={block} />
          <LayoutPadding block={block} />
        </Flex>
      </Flex>
    </Box>
  );
};
