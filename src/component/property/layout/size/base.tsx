import { Block } from "@/domain/block";
import { Flex, Grid, Text } from "@radix-ui/themes";
import { ReactNode } from "react";

export const BaseLayoutSize = <T extends Block = Block>({
  block,
  widthChildren,
  heightChildren,
}: {
  block: T;
  widthChildren: ReactNode;
  heightChildren: ReactNode;
}) => {
  return (
    <Grid columns="2" gap="4">
      <Flex direction="column" gap="1">
        <Text size="1" as="label" htmlFor="width-input" ml="1">
          Width
        </Text>
        {widthChildren}
        {/* <TextField.Root value={block.width} id="width-input">
          <TextField.Slot side="right">
            <Select.Root value={block.widthType} size={"1"}>
              <Select.Trigger variant="ghost" />
              <Select.Content>
                <Select.Item value="fill">Fill</Select.Item>
              </Select.Content>
            </Select.Root>
          </TextField.Slot>
        </TextField.Root> */}
      </Flex>

      <Flex direction="column" gap="1">
        <Text size="1" as="label" htmlFor="height-input" ml="1">
          Height
        </Text>
        {heightChildren}
        {/* <TextField.Root value={block.height} id="height-input">
          <TextField.Slot side="right">
            <Select.Root value={block.heightType} size={"1"}>
              <Select.Trigger variant="ghost" />
              <Select.Content>
                <Select.Item value="fit">Fit</Select.Item>
                <Select.Item value="fixed">Fixed</Select.Item>
              </Select.Content>
            </Select.Root>
          </TextField.Slot>
        </TextField.Root> */}
      </Flex>
    </Grid>
  );
};
