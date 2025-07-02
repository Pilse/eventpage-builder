import { DefaultLayoutSize, DefaultLayoutType } from "@/components/builder/property/layout";
import { SectionBlock } from "@/domain/builder";
import { Flex, Heading } from "@radix-ui/themes";
import { useSectionLayoutSize } from "../use-section-layout-size";
import { DefaultBg } from "@/components/builder/property/appearance";
import { useDomain } from "@/hooks";

export const SectionCanvasProperties = <
  T extends InstanceType<typeof SectionBlock> = InstanceType<typeof SectionBlock>
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
        </Flex>
      </Flex>

      <Flex direction="column" gap="4">
        <Heading size="2">Apperance</Heading>
        <Flex direction="column" gap="2">
          <DefaultBg block={block} />
        </Flex>
      </Flex>
    </Flex>
  );
};
