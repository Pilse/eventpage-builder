import { DefaultLayoutType, DefaultLayoutSize } from "@/components/builder/property/layout";
import { FrameBlock } from "@/domain/builder";
import { Flex, Heading } from "@radix-ui/themes";
import { useFrameLayoutSize } from "../use-frame-layout-size";
import { DefaultBg, DefaultBorder, DefaultShadow } from "@/components/builder/property/appearance";
import { useDomain } from "@/hooks";
import { DefaultUserEventLink } from "@/components/builder/property/user-event";

export const FrameCanvasProperties = <
  T extends InstanceType<typeof FrameBlock> = InstanceType<typeof FrameBlock>
>({
  block: blockInstance,
}: {
  block: T;
}) => {
  const block = useDomain(blockInstance, blockInstance._listeners);
  const sizeProps = useFrameLayoutSize(block);

  return (
    <Flex direction="column" gap="6" p="4">
      <Flex direction="column" gap="4">
        <Heading size="2">Layout</Heading>
        <Flex direction="column" gap="2">
          <DefaultLayoutType block={block} />
          <DefaultLayoutSize block={block} {...sizeProps} />
        </Flex>
      </Flex>

      <Flex direction="column" gap="4">
        <Heading size="2">Apperance</Heading>
        <Flex direction="column" gap="2">
          <DefaultBg block={block} />
          <DefaultBorder block={block} />
          <DefaultShadow block={block} />
        </Flex>
      </Flex>

      <Flex direction="column" gap="4">
        <Heading size="2">User Event</Heading>
        <Flex direction="column" gap="2">
          <DefaultUserEventLink block={block} />
        </Flex>
      </Flex>
    </Flex>
  );
};
