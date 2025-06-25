import { HeightIcon, WidthIcon } from "@radix-ui/react-icons";
import { IUseLayoutSize } from "./use-default-size";
import { Flex, Grid, Select, Text, TextField } from "@radix-ui/themes";
import { Block } from "@/domain/builder";
import { uppercaseFirstCharacter } from "@/util";

export interface IDefaultLayoutSizeProps extends IUseLayoutSize {
  block: Block;
}

export const DefaultLayoutSize = ({
  block,
  useHeight,
  useWidth,
  heightTypes,
  widthTypes,
  onHeightChange,
  onWidthChange,
  onHeightTypeChange,
  onWidthTypeChange,
}: IDefaultLayoutSizeProps) => {
  return (
    <Grid columns="2" gap="4">
      <Flex direction="column" gap="1">
        <Text size="1" as="label" htmlFor="width-input">
          Width
        </Text>

        <TextField.Root
          value={block.width}
          id="width-input"
          onChange={(e) => onWidthChange?.(Number(e.target.value))}
          disabled={!useWidth}
        >
          <TextField.Slot side="left">
            <WidthIcon />
          </TextField.Slot>
          <TextField.Slot side="right">
            <Select.Root
              value={block.widthType}
              size={"1"}
              onValueChange={(value) => onWidthTypeChange?.(value as Block["widthType"])}
              disabled={!useWidth}
            >
              <Select.Trigger variant="ghost" />
              <Select.Content>
                {widthTypes.map((widthType) => (
                  <Select.Item value={widthType} key={widthType}>
                    {uppercaseFirstCharacter(widthType)}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </TextField.Slot>
        </TextField.Root>
      </Flex>

      <Flex direction="column" gap="1">
        <Text size="1" as="label" htmlFor="height-input">
          Height
        </Text>
        <TextField.Root
          value={block.height}
          id="height-input"
          onChange={(e) => onHeightChange?.(Number(e.target.value))}
          disabled={!useHeight}
        >
          <TextField.Slot side="left">
            <HeightIcon />
          </TextField.Slot>
          <TextField.Slot side="right">
            <Select.Root
              value={block.heightType}
              size={"1"}
              onValueChange={(value) => onHeightTypeChange?.(value as Block["heightType"])}
              disabled={!useHeight}
            >
              <Select.Trigger variant="ghost" />
              <Select.Content>
                {heightTypes.map((heightType) => (
                  <Select.Item value={heightType} key={heightType}>
                    {uppercaseFirstCharacter(heightType)}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </TextField.Slot>
        </TextField.Root>
      </Flex>
    </Grid>
  );
};
