import {
  DefaultLayoutAlignment,
  DefaultLayoutSize,
  DefaultLayoutSpacing,
  DefaultLayoutType,
} from "@/component/property/layout";
import { SectionRowBlock } from "@/domain/block";
import { Box, Flex, Heading } from "@radix-ui/themes";
import { useSectionLayoutSize } from "../use-section-layout-size";
import { DefaultBgColor } from "@/component/property/appearance";

export const SectionRowProperties = <
  T extends InstanceType<typeof SectionRowBlock> = InstanceType<typeof SectionRowBlock>
>({
  block,
}: {
  block: T;
}) => {
  const sizeProps = useSectionLayoutSize(block);

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
        </Flex>
      </Flex>
    </Flex>
  );
};
