import { BackgroundMixinBlockType } from "@/domain/mixin";
import { rgbaToCss } from "@/util/color";
import { Flex, Grid, Popover, Text, TextField } from "@radix-ui/themes";
import { useDefaultBgColor } from "./use-default-bg-color";
import { uppercaseFirstCharacter } from "@/util";
import { TbBackground } from "react-icons/tb";
import { RgbaColorPicker } from "react-colorful";

export const DefaultBgColor = <T extends BackgroundMixinBlockType>({ block }: { block: T }) => {
  const { openColorPicker, setOpenColorPicker, onHexChange, onHexCommit, onRgbaCommit } =
    useDefaultBgColor(block);

  return (
    <Grid columns="2" gap="4">
      <Flex direction="column" gap="1">
        <Text size="1" as="label" htmlFor="bgcolor-type">
          Background Type
        </Text>
        <TextField.Root
          value={uppercaseFirstCharacter(block.backgroundType)}
          disabled
          onBlur={onHexCommit}
          id="bgcolor-type"
        >
          <TextField.Slot side="left">
            <TbBackground />
          </TextField.Slot>
        </TextField.Root>
      </Flex>

      <Flex direction="column" gap="1">
        <Text size="1" as="label" htmlFor="bgcolor-input">
          Background Color
        </Text>
        <TextField.Root
          value={block.backgroundColorHex}
          onChange={(e) => {
            onHexChange(e.target.value);
          }}
          onBlur={onHexCommit}
          id="bgcolor-input"
        >
          <TextField.Slot side="left">
            <Popover.Root open={openColorPicker}>
              <Popover.Trigger onClick={() => setOpenColorPicker(true)}>
                <button
                  className="w-3.5 h-3.5 rounded border border-gray-500"
                  style={{ backgroundColor: rgbaToCss(block.backgroundColor) }}
                ></button>
              </Popover.Trigger>

              <Popover.Content>
                <RgbaColorPicker
                  color={block.backgroundColor}
                  onChange={(color) => {
                    onRgbaCommit(color);
                  }}
                />
              </Popover.Content>
            </Popover.Root>
          </TextField.Slot>
        </TextField.Root>
      </Flex>
    </Grid>
  );
};
