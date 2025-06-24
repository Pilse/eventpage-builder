import { Flex, Grid, IconButton, Popover, Select, Text, TextField } from "@radix-ui/themes";
import { FrameCol, FrameRow, SectionCol, SectionRow } from "@/domain/block";
import {
  AlignBottomIcon,
  AlignCenterHorizontallyIcon,
  AlignCenterVerticallyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  AlignTopIcon,
} from "@radix-ui/react-icons";
import { useDefaultAlignment } from "./use-default-alignment";

const verticalAlignData = {
  Top: {
    icon: <AlignTopIcon />,
    label: "Top",
    value: "top",
  },
  Bottom: {
    icon: <AlignBottomIcon />,
    label: "Bottom",
    value: "bottom",
  },
  Center: {
    icon: <AlignCenterVerticallyIcon />,
    label: "Center",
    value: "center",
  },
};

const horizontalAlignData = {
  Left: {
    icon: <AlignLeftIcon />,
    label: "Left",
    value: "left",
  },
  Right: {
    icon: <AlignRightIcon />,
    label: "Right",
    value: "right",
  },
  Center: {
    icon: <AlignCenterHorizontallyIcon />,
    label: "Center",
    value: "center",
  },
};

export const DefaultLayoutAlignment = <T extends SectionRow | SectionCol | FrameCol | FrameRow>({
  block,
}: {
  block: T;
}) => {
  const { onHorizontalAlignChange, onVerticalAlignChange, verticalAlignValue, horizontalAlignValue } =
    useDefaultAlignment(block);

  return (
    <Grid columns="2" gap="4">
      <Flex direction="column" gap="1">
        <Text size="1" as="label" htmlFor="width-input" ml="1">
          Vertical Align
        </Text>
        <Select.Root
          value={verticalAlignValue}
          onValueChange={(value: (typeof block)["alignVertical"]) => onVerticalAlignChange(value)}
        >
          <Select.Trigger>
            <Flex as="span" align="center" gap="2">
              {verticalAlignData[verticalAlignValue].icon}
              {verticalAlignData[verticalAlignValue].label}
            </Flex>
          </Select.Trigger>
          <Select.Content>
            {Object.entries(verticalAlignData).map(([key, { icon, label, value }]) => (
              <Select.Item key={key} value={value}>
                <Flex align="center" gap="2">
                  {icon}
                  {label}
                </Flex>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Flex>

      <Flex direction="column" gap="1">
        <Text size="1" as="label" htmlFor="width-input" ml="1">
          Horizontal Align
        </Text>
        <Select.Root
          value={horizontalAlignValue}
          onValueChange={(value: (typeof block)["alignHorizontal"]) => onHorizontalAlignChange(value)}
        >
          <Select.Trigger>
            <Flex as="span" align="center" gap="2">
              {horizontalAlignData[horizontalAlignValue].icon}
              {horizontalAlignData[horizontalAlignValue].label}
            </Flex>
          </Select.Trigger>
          <Select.Content>
            {Object.entries(horizontalAlignData).map(([key, { icon, label, value }]) => (
              <Select.Item key={key} value={value}>
                <Flex align="center" gap="2">
                  {icon}
                  {label}
                </Flex>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Flex>
    </Grid>
  );
};
