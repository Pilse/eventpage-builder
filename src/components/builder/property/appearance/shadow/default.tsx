import { ShadowMixinBlockType } from "@/domain/builder/mixin";
import { rgbaToCss } from "@/util/color";
import { Flex, Grid, Popover, Text, TextField } from "@radix-ui/themes";
import { useDefaultShadow } from "./use-default-shadow";
import { TbBlur, TbSun } from "react-icons/tb";
import { RgbaColorPicker } from "react-colorful";

export const DefaultShadow = <T extends ShadowMixinBlockType>({ block }: { block: T }) => {
  const { openColorPicker, setOpenColorPicker, onHexChange, onHexCommit, onRgbaCommit, onShadowChange } =
    useDefaultShadow(block);

  return (
    <Grid columns="4" gapX="1" gapY="2">
      <Flex direction="column" gap="1" gridColumn={"1/5"}>
        <Text size="1" as="label" htmlFor="shadow-x">
          Shadow
        </Text>
      </Flex>
      <Flex direction="column" gap="1">
        <TextField.Root
          value={block.shadow.x}
          id="shadow-x"
          type="number"
          onChange={(e) => onShadowChange({ ...block.shadow, x: Number(e.target.value) })}
        >
          <TextField.Slot side="left">X</TextField.Slot>
        </TextField.Root>
      </Flex>
      <Flex direction="column" gap="1">
        <TextField.Root
          value={block.shadow.y}
          id="shadow-y"
          type="number"
          onChange={(e) => onShadowChange({ ...block.shadow, y: Number(e.target.value) })}
        >
          <TextField.Slot side="left">Y</TextField.Slot>
        </TextField.Root>
      </Flex>
      <Flex direction="column" gap="1">
        <TextField.Root
          value={block.shadow.blur}
          id="shadow-blur"
          type="number"
          onChange={(e) => onShadowChange({ ...block.shadow, blur: Number(e.target.value) })}
        >
          <TextField.Slot side="left">
            <TbBlur />
          </TextField.Slot>
        </TextField.Root>
      </Flex>
      <Flex direction="column" gap="1">
        <TextField.Root
          value={block.shadow.spread}
          onBlur={onHexCommit}
          id="shadow-spread"
          type="number"
          onChange={(e) => onShadowChange({ ...block.shadow, spread: Number(e.target.value) })}
        >
          <TextField.Slot side="left">
            <TbSun />
          </TextField.Slot>
        </TextField.Root>
      </Flex>

      <Flex direction="column" gap="1" gridColumn={"1/5"}>
        <TextField.Root
          value={block.shadowColorHex}
          onChange={(e) => {
            onHexChange(e.target.value);
          }}
          onBlur={onHexCommit}
          id="shadow-color-input"
        >
          <TextField.Slot side="left">
            <Popover.Root open={openColorPicker}>
              <Popover.Trigger onClick={() => setOpenColorPicker(true)}>
                <button
                  className="w-3.5 h-3.5 rounded border border-gray-500"
                  style={{ backgroundColor: rgbaToCss(block.shadow.color) }}
                ></button>
              </Popover.Trigger>

              <Popover.Content>
                <RgbaColorPicker color={block.shadow.color} onChange={(color) => onRgbaCommit(color)} />
              </Popover.Content>
            </Popover.Root>
          </TextField.Slot>
        </TextField.Root>
      </Flex>
    </Grid>
  );
};
