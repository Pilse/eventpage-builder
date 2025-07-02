import { BorderMixinBlockType } from "@/domain/builder/mixin";
import { rgbaToCss } from "@/shared/util/color";
import { Flex, Grid, IconButton, Popover, Select, Text, TextField } from "@radix-ui/themes";
import { useDefaultBorder } from "./use-default-border";
import { Block } from "@/domain/builder";
import {
  BorderWidthIcon,
  CornerBottomLeftIcon,
  CornerBottomRightIcon,
  CornersIcon,
  CornerTopLeftIcon,
  CornerTopRightIcon,
} from "@radix-ui/react-icons";
import { TbBorderSides } from "react-icons/tb";
import { RgbaColorPicker } from "react-colorful";
import { MdOutlineBorderStyle } from "react-icons/md";

export const DefaultBorder = <T extends BorderMixinBlockType>({ block }: { block: T }) => {
  const {
    openColorPicker,
    setOpenColorPicker,
    onHexChange,
    onHexCommit,
    onRgbaCommit,
    onBorderWidthChange,
    onBorderPositionChange,
    borderRadiusValue,
    onBorderRadiusChange,
  } = useDefaultBorder(block);

  return (
    <Grid columns="2" gap="4">
      <Flex direction="column" gap="1">
        <Text size="1" as="label" htmlFor="border-width-input">
          Border Width
        </Text>
        <TextField.Root
          type="number"
          value={block.borderWidth}
          id="border-width-input"
          onChange={(e) => onBorderWidthChange(Number(e.target.value))}
        >
          <TextField.Slot side="left">
            <BorderWidthIcon />
          </TextField.Slot>
          <TextField.Slot side="right">
            <Select.Root
              value={block.borderPosition}
              size={"1"}
              onValueChange={(value) => onBorderPositionChange(value as Block["borderPosition"])}
            >
              <Select.Trigger variant="ghost" />
              <Select.Content>
                <Select.Item value="inside">Inside</Select.Item>
                <Select.Item value="outside">Outside</Select.Item>
              </Select.Content>
            </Select.Root>
          </TextField.Slot>
        </TextField.Root>
      </Flex>

      <Flex direction="column" gap="1">
        <Text size="1" as="label" htmlFor="border-color-input">
          Border Color
        </Text>
        <TextField.Root
          value={block.borderColorHex}
          onChange={(e) => {
            onHexChange(e.target.value);
          }}
          onBlur={onHexCommit}
          id="border-color-input"
        >
          <TextField.Slot side="left">
            <Popover.Root open={openColorPicker}>
              <Popover.Trigger onClick={() => setOpenColorPicker(true)}>
                <button className="relative">
                  <div
                    className="w-3.5 h-1 border border-gray-500"
                    style={{ backgroundColor: rgbaToCss(block.borderColor) }}
                  ></div>
                  <div
                    className="w-3.5 h-1.5 border border-gray-500 mt-0.5"
                    style={{ backgroundColor: rgbaToCss(block.borderColor) }}
                  ></div>
                </button>
              </Popover.Trigger>

              <Popover.Content>
                <RgbaColorPicker color={block.borderColor} onChange={(color) => onRgbaCommit(color)} />
              </Popover.Content>
            </Popover.Root>
          </TextField.Slot>
        </TextField.Root>
      </Flex>

      <Flex direction="column" gap="1">
        <Text size="1" as="label" htmlFor="border-radius">
          Border Radius
        </Text>
        <TextField.Root
          type={typeof borderRadiusValue === "number" ? "number" : "text"}
          value={borderRadiusValue}
          id="border-radius"
          onFocus={(e) => {
            if (typeof borderRadiusValue === "string") {
              e.target.select();
            }
          }}
          onChange={(e) => onBorderRadiusChange(Number(e.target.value), ["t", "r", "b", "l"])}
        >
          <TextField.Slot>
            <CornersIcon />
          </TextField.Slot>
          <TextField.Slot side="right">
            <Popover.Root>
              <Popover.Trigger>
                <IconButton size="1" variant="surface">
                  <TbBorderSides />
                </IconButton>
              </Popover.Trigger>

              <Popover.Content>
                <Flex direction="column" gap="1">
                  <Flex direction="column" gap="1">
                    <Text size="1" as="label" htmlFor="padding-top-input">
                      Top Left
                    </Text>
                    <TextField.Root
                      type="number"
                      value={block.borderRadiusT}
                      id="padding-top-input"
                      onChange={(e) => onBorderRadiusChange(Number(e.target.value), ["t"])}
                    >
                      <TextField.Slot>
                        <CornerTopLeftIcon />
                      </TextField.Slot>
                    </TextField.Root>
                  </Flex>

                  <Flex direction="column" gap="1">
                    <Text size="1" as="label" htmlFor="padding-right-input">
                      Top Right
                    </Text>
                    <TextField.Root
                      type="number"
                      value={block.borderRadiusR}
                      id="padding-right-input"
                      onChange={(e) => onBorderRadiusChange(Number(e.target.value), ["r"])}
                    >
                      <TextField.Slot>
                        <CornerTopRightIcon />
                      </TextField.Slot>
                    </TextField.Root>
                  </Flex>

                  <Flex direction="column" gap="1">
                    <Text size="1" as="label" htmlFor="padding-bottom-input">
                      Bottom Right
                    </Text>
                    <TextField.Root
                      type="number"
                      value={block.borderRadiusB}
                      id="padding-bottom-input"
                      onChange={(e) => onBorderRadiusChange(Number(e.target.value), ["b"])}
                    >
                      <TextField.Slot>
                        <CornerBottomRightIcon />
                      </TextField.Slot>
                    </TextField.Root>
                  </Flex>

                  <Flex direction="column" gap="1">
                    <Text size="1" as="label" htmlFor="padding-left-input">
                      Bottom Left
                    </Text>
                    <TextField.Root
                      type="number"
                      value={block.borderRadiusL}
                      id="padding-left-input"
                      onChange={(e) => onBorderRadiusChange(Number(e.target.value), ["l"])}
                    >
                      <TextField.Slot>
                        <CornerBottomLeftIcon />
                      </TextField.Slot>
                    </TextField.Root>
                  </Flex>
                </Flex>
              </Popover.Content>
            </Popover.Root>
          </TextField.Slot>
        </TextField.Root>
      </Flex>
    </Grid>
  );
};
