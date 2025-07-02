import {
  DefaultLayoutAlignment,
  DefaultLayoutSize,
  DefaultLayoutSpacing,
  DefaultLayoutType,
} from "@/components/builder/property/layout";
import { SectionRowBlock } from "@/domain/builder";
import { Box, Flex, Heading } from "@radix-ui/themes";
import { useSectionLayoutSize } from "../use-section-layout-size";
import { DefaultBg } from "@/components/builder/property/appearance";
import { useDomain } from "@/hooks";
import { DefaultUserEventLink } from "@/components/builder/property/user-event";

export const SectionRowProperties = <
  T extends InstanceType<typeof SectionRowBlock> = InstanceType<typeof SectionRowBlock>
>({
  block: blockInstance,
}: {
  block: T;
}) => {
  const block = useDomain(blockInstance, blockInstance._listeners);
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
          <DefaultBg block={block} />
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
