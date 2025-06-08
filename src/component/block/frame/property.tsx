import { DefaultLayoutType, DefaultLayoutSize, useFrameLayoutSize } from "@/component/property/layout";
import { FrameCanvas } from "@/domain/block";
import { Box, Flex, Heading } from "@radix-ui/themes";

export const FrameCanvasProperties = <T extends FrameCanvas = FrameCanvas>({ block }: { block: T }) => {
  const sizeProps = useFrameLayoutSize(block);

  return (
    <Box p="4">
      <Flex direction="column" gap="4">
        <Heading size="3">Layout</Heading>
        <Flex direction="column" gap="2">
          <DefaultLayoutType block={block} />
          <DefaultLayoutSize block={block} {...sizeProps} />
        </Flex>
      </Flex>
    </Box>
  );
};
