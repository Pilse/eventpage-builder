import { DefaultLayoutSize, DefaultLayoutType } from "@/component/property/layout";
import { SectionBlock } from "@/domain/block";
import { Flex, Heading } from "@radix-ui/themes";
import { useSectionLayoutSize } from "../use-section-layout-size";
import { DefaultBgColor } from "@/component/property/appearance";

export const SectionCanvasProperties = <
  T extends InstanceType<typeof SectionBlock> = InstanceType<typeof SectionBlock>
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
