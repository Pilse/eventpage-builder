import {
  DefaultLayoutAlignment,
  DefaultLayoutSpacing,
  DefaultLayoutType,
  FrameLayoutSize,
} from "@/component/property/layout";
import { FrameRow } from "@/domain/block";
import { Box, Flex, Heading } from "@radix-ui/themes";

export const FrameRowProperties = <T extends FrameRow = FrameRow>({ block }: { block: T }) => {
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
