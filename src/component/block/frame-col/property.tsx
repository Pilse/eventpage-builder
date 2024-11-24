import {
  DefaultLayoutAlignment,
  DefaultLayoutSpacing,
  DefaultLayoutType,
  FrameLayoutSize,
} from "@/component/property/layout";
import { FrameCol } from "@/domain/block";
import { Box, Flex, Heading } from "@radix-ui/themes";

export const FrameColProperties = <T extends FrameCol = FrameCol>({ block }: { block: T }) => {
  return (
    <Box p="4">
      <Flex direction="column" gap="4">
        <Heading size="3">Layout</Heading>
        <Flex direction="column" gap="2">
          <DefaultLayoutType block={block} />
          <FrameLayoutSize block={block} />
          <DefaultLayoutSpacing block={block} />
          <DefaultLayoutAlignment block={block} />
        </Flex>
      </Flex>
    </Box>
  );
};
