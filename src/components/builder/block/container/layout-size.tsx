import { WidthIcon } from "@radix-ui/react-icons";
import { Flex, Grid, Select, Text, TextField } from "@radix-ui/themes";
import { ContainerBlock } from "@/domain/builder";
import { useContainerLayoutSize } from "./use-container-layout-size";
import { Device } from "@/domain/builder/mixin";
import { ReactNode } from "react";
import { HiMiniDevicePhoneMobile, HiMiniDeviceTablet } from "react-icons/hi2";
import { TbDeviceDesktop } from "react-icons/tb";

export interface IContainerLayoutSizeProps extends ReturnType<typeof useContainerLayoutSize> {
  block: InstanceType<typeof ContainerBlock>;
}

const deviceIcons: Record<"mobile" | "desktop" | "tablet", ReactNode> = {
  mobile: <HiMiniDevicePhoneMobile />,
  tablet: <HiMiniDeviceTablet />,
  desktop: <TbDeviceDesktop />,
};

export const ContainerLayoutSize = ({
  block,
  devices,
  onDeviceChange,
  onWidthChange,
}: IContainerLayoutSizeProps) => {
  return (
    <Grid columns="3" gap="2">
      <Flex direction="column" gap="1" gridColumn="1/3">
        <Text size="1" as="label" htmlFor="height-input">
          Device
        </Text>
        <Select.Root
          value={block.device ?? "Custom"}
          onValueChange={(value: Device) => onDeviceChange(value)}
        >
          <Select.Trigger>
            <Flex as="span" align="center" gap="2">
              {deviceIcons[block.getDeviceType((block.device as Device) ?? "iPhone Pro Max") ?? "mobile"]}
              <Text size="2">{block.device ?? "Custom"}</Text>
            </Flex>
          </Select.Trigger>
          <Select.Content>
            {Object.values(devices).map(({ name, width, device }) => (
              <Select.Item key={name} value={name}>
                <Flex align="center" gap="2">
                  {deviceIcons[device]}
                  {name}
                  <Text size="1" color="gray">
                    {width}px
                  </Text>
                </Flex>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Flex>

      <Flex direction="column" gap="1">
        <Text size="1" as="label" htmlFor="width-input">
          Width
        </Text>

        <TextField.Root
          value={block.width}
          id="width-input"
          type="number"
          disabled
          onChange={(e) => onWidthChange?.(Number(e.target.value))}
        >
          <TextField.Slot side="left">
            <WidthIcon />
          </TextField.Slot>
        </TextField.Root>
      </Flex>
    </Grid>
  );
};
