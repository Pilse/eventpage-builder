import { DefaultPadding, DefaultLayoutSize } from "@/editor/property/layout";
import { TextBlock } from "@/domain/block";
import { Flex, Heading } from "@radix-ui/themes";
import { useTextLayoutSize } from "./use-text-layout-size";
import { DefaultBgColor, DefaultBorder, DefaultShadow } from "@/editor/property/appearance";
import { DefaultTypoGraphy } from "@/editor/property/typography";

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
          <DefaultPadding block={block} />
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

      <Flex direction="column" gap="4">
        <Heading size="2">Typography</Heading>
        <Flex direction="column" gap="2">
          <DefaultTypoGraphy block={block} />
        </Flex>
      </Flex>
    </Flex>
  );
};
