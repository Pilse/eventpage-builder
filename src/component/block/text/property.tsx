import { LayoutPadding, DefaultLayoutSize } from "@/component/property/layout";
import { TextBlock } from "@/domain/block";
import { Flex, Heading } from "@radix-ui/themes";
import { useTextLayoutSize } from "./use-text-layout-size";
import { DefaultBgColor } from "@/component/property/appearance";

export const TextProperties = <T extends InstanceType<typeof TextBlock> = InstanceType<typeof TextBlock>>({
  block,
}: {
  block: T;
}) => {
  const sizeProps = useTextLayoutSize(block);

  return (
    <Flex direction="column" gap="6" p="4">
      <Flex direction="column" gap="4">
        <Heading size="2">Layout</Heading>
        <Flex direction="column" gap="2">
          <DefaultLayoutSize block={block} {...sizeProps} />
          <LayoutPadding block={block} />
        </Flex>
      </Flex>

      <Flex direction="column" gap="4">
        <Heading size="2">Apperance</Heading>
        <Flex direction="column" gap="2">
          <DefaultBgColor block={block} />
        </Flex>
      </Flex>
    </Flex>
  );
};
