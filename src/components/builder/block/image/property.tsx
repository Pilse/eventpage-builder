import { DefaultLayoutSize, DefaultPadding } from "@/components/builder/property/layout";
import { ImageBlock } from "@/domain/builder";
import { Flex, Heading } from "@radix-ui/themes";
import { useImageLayoutSize } from "./use-image-layout-size";
import { DefaultBg, DefaultBorder, DefaultShadow } from "@/components/builder/property/appearance";
import { DefaultFile } from "@/components/builder/property/image";
import { useDomain } from "@/hooks";
import { DefaultUserEventLink } from "@/components/builder/property/user-event";

export const ImageProperties = <T extends InstanceType<typeof ImageBlock> = InstanceType<typeof ImageBlock>>({
  block: blockInstance,
}: {
  block: T;
}) => {
  const block = useDomain(blockInstance, blockInstance._listeners);
  const sizeProps = useImageLayoutSize(block);

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
          <DefaultBg block={block} />
          <DefaultBorder block={block} />
          <DefaultShadow block={block} />
        </Flex>
      </Flex>

      <Flex direction="column" gap="4">
        <Heading size="2">Image</Heading>
        <Flex direction="column" gap="2">
          <DefaultFile block={block} />
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
