import {
  DefaultLayoutAlignment,
  DefaultLayoutSize,
  DefaultLayoutSpacing,
  DefaultLayoutType,
} from "@/components/builder/property/layout";
import { SectionColBlock } from "@/domain/builder";
import { Flex, Heading } from "@radix-ui/themes";
import { useSectionLayoutSize } from "../use-section-layout-size";
import { DefaultBgColor } from "@/components/builder/property/appearance";

export const SectionColProperties = <
  T extends InstanceType<typeof SectionColBlock> = InstanceType<typeof SectionColBlock>
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
