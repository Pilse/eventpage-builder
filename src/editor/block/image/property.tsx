import { DefaultLayoutSize, DefaultPadding } from "@/editor/property/layout";
import { ImageBlock } from "@/domain/block";
import { Flex, Heading } from "@radix-ui/themes";
import { useImageLayoutSize } from "./use-image-layout-size";
import { DefaultBgColor, DefaultBorder, DefaultShadow } from "@/editor/property/appearance";
import { DefaultFile } from "@/editor/property/image";

export const ImageProperties = <T extends InstanceType<typeof ImageBlock> = InstanceType<typeof ImageBlock>>({
  block,
}: {
  block: T;
}) => {
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
          <DefaultBgColor block={block} />
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
    </Flex>
  );
};
