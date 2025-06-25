import { ContainerBlock } from "@/domain/builder";
import { Flex, Heading } from "@radix-ui/themes";
import { DefaultBgColor } from "@/components/builder/property/appearance";
import { ContainerLayoutSize } from "./layout-size";
import { useContainerLayoutSize } from "./use-container-layout-size";
import { useDomain } from "@/hooks";

export const ContainerProperties = <
  T extends InstanceType<typeof ContainerBlock> = InstanceType<typeof ContainerBlock>
>({
  block: blockInstance,
}: {
  block: T;
}) => {
  const block = useDomain(blockInstance, blockInstance._listeners);
  const layoutSizeProps = useContainerLayoutSize(block);

  return (
    <Flex direction="column" gap="6" p="4">
      <Flex direction="column" gap="4">
        <Heading size="2">Layout</Heading>
        <Flex direction="column" gap="2">
          <ContainerLayoutSize {...layoutSizeProps} block={block} />
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
