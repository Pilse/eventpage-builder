import { TypographyMixinBlockType } from "@/domain/mixin";
import { useBlockHistory } from "@/hooks";
import { Flex, Grid, Select, Text } from "@radix-ui/themes";
import Image from "next/image";

export const DefaultFont = <T extends TypographyMixinBlockType>({ block }: { block: T }) => {
  const { startCaptureSnapshot, endCaptureSnapshot } = useBlockHistory();

  const onFontNameChange = (fontName: string) => {
    startCaptureSnapshot(`${block.id}.font-name`);
    block.setFontName(fontName);
    endCaptureSnapshot(`${block.id}.font-name`);
  };

  const onFontWeightChange = (fontWeight: string) => {
    startCaptureSnapshot(`${block.id}.font-weight`);
    block.setFontWeight(Number(fontWeight));
    endCaptureSnapshot(`${block.id}.font-weight`);
  };

  return (
    <Grid columns="2" gap="4">
      <Flex direction="column" gap="1">
        <Text size="1" as="label" htmlFor="bgcolor-type">
          Font Name
        </Text>
        <Select.Root
          value={block.fontName}
          onValueChange={(value) => {
            onFontNameChange(value);
          }}
        >
          <Select.Trigger>
            <Image
              src={block.getFont().thumbnail}
              alt={block.getFont().fontName}
              width={60}
              height={20}
              className="brightness-100 invert w-full h-5 object-cover"
            />
          </Select.Trigger>
          <Select.Content>
            {block.getFonts().map((font) => (
              <Select.Item key={font.fontName} value={font.fontName}>
                <Image
                  src={font.thumbnail}
                  alt={font.fontName}
                  width={80}
                  height={30}
                  className="brightness-100 invert w-full h-5 object-cover"
                />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Flex>

      <Flex direction="column" gap="1">
        <Text size="1" as="label" htmlFor="bgcolor-type">
          Font Weight
        </Text>
        <Select.Root
          value={String(block.fontWeight)}
          onValueChange={(value) => {
            onFontWeightChange(value);
          }}
        >
          <Select.Trigger>{block.fontWeight}</Select.Trigger>
          <Select.Content>
            {block.getFont().weights.map((weight) => (
              <Select.Item key={weight} value={String(weight)}>
                {weight}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Flex>
    </Grid>
  );
};
