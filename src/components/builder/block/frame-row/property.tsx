import {
  DefaultLayoutAlignment,
  DefaultLayoutSize,
  DefaultLayoutSpacing,
  DefaultLayoutType,
} from "@/components/builder/property/layout";
import { FrameRowBlock } from "@/domain/block";
import { Flex, Heading } from "@radix-ui/themes";
import { useFrameLayoutSize } from "../use-frame-layout-size";
import { DefaultBgColor, DefaultBorder, DefaultShadow } from "@/components/builder/property/appearance";

export const FrameRowProperties = <
  T extends InstanceType<typeof FrameRowBlock> = InstanceType<typeof FrameRowBlock>
>({
  block,
}: {
  block: T;
}) => {
  const sizeProps = useFrameLayoutSize(block);

  return (
    <Flex direction="column" gap="6" p="4">
      <Flex direction="column" gap="4">
        <Heading size="2">Layout</Heading>
        <Flex direction="column" gap="2">
          <DefaultLayoutType block={block} />
          <DefaultLayoutSize block={block} {...sizeProps} />
          <DefaultLayoutSpacing block={block} />
          <DefaultLayoutAlignment block={block} />
        </Flex>
      </Flex>

      <Flex direction="column" gap="4">
        <Heading size="2">Apperance</Heading>
        <Flex direction="column" gap="2">
          <DefaultBgColor block={block} />
          <DefaultBorder block={block} />
          <DefaultShadow block={block} />
        </Flex>
      </Flex>
    </Flex>
  );
};
