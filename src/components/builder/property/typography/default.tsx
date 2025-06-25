import { TypographyMixinBlockType } from "@/domain/builder/mixin";
import { Flex, Grid, Popover, Select, Text, TextField } from "@radix-ui/themes";
import Image from "next/image";
import { useDefaultTypography } from "./use-default-typography";
import { TbBlur, TbTextSize } from "react-icons/tb";
import { PiTextAlignCenter, PiTextAlignLeft, PiTextAlignRight, PiTextBBold } from "react-icons/pi";
import { rgbaToCss } from "@/shared/util/color";
import { RgbaColorPicker } from "react-colorful";
import { CgFontHeight, CgFontSpacing } from "react-icons/cg";
import { TextAlign } from "@/type";

const textAlignData = {
  left: {
    icon: <PiTextAlignLeft />,
    label: "Left",
  },
  center: {
    icon: <PiTextAlignCenter />,
    label: "Center",
  },
  right: {
    icon: <PiTextAlignRight />,
    label: "Right",
  },
};

export const DefaultTypoGraphy = <T extends TypographyMixinBlockType>({ block }: { block: T }) => {
  const {
    onFontNameChange,
    onFontWeightChange,
    onFontSizeChange,
    onHexChange,
    onHexCommit,
    onRgbaCommit,
    openColorPicker,
    setOpenColorPicker,
    onLetterSpacingChange,
    onLineHeightChange,
    onTextAlignChange,
    onShadowChange,
    onShadowHexChange,
    onShadowHexCommit,
    onShadowRgbaCommit,
    openShadowColorPicker,
    setShadowOpenColorPicker,
  } = useDefaultTypography(block);

  return (
    <Grid columns="2" gapX="4" gapY="2">
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
          <Select.Trigger style={{ paddingLeft: 8, paddingRight: 8 }}>
            <Image
              src={block.getFont().thumbnail}
              alt={block.getFont().fontName}
              width={60}
              height={20}
              className="brightness-100 invert w-full h-5 object-cover "
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
          <Select.Trigger style={{ paddingLeft: 8, paddingRight: 8 }}>
            <Flex align="center" gap="2">
              <PiTextBBold />
              {block.fontWeight}
            </Flex>
          </Select.Trigger>

          <Select.Content>
            {block.getFont().weights.map((weight) => (
              <Select.Item key={weight} value={String(weight)}>
                {weight}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Flex>

      <Flex direction="column" gap="1">
        <Text size="1" as="label" htmlFor="font-size-input">
          Font Size
        </Text>

        <TextField.Root
          value={block.fontSize}
          id="font-size-input"
          onChange={(e) => onFontSizeChange(Number(e.target.value))}
          type="number"
        >
          <TextField.Slot side="left">
            <TbTextSize />
          </TextField.Slot>
        </TextField.Root>
      </Flex>

      <Flex direction="column" gap="1">
        <Text size="1" as="label" htmlFor="font-size-input">
          Font Color
        </Text>

        <TextField.Root
          value={block.fontColorHex}
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
                  style={{ backgroundColor: rgbaToCss(block.fontColor) }}
                ></button>
              </Popover.Trigger>

              <Popover.Content>
                <RgbaColorPicker color={block.fontColor} onChange={(color) => onRgbaCommit(color)} />
              </Popover.Content>
            </Popover.Root>
          </TextField.Slot>
        </TextField.Root>
      </Flex>

      <Flex direction="column" gap="1">
        <Text size="1" as="label" htmlFor="letter-spacing-input">
          Letter Spacing
        </Text>

        <TextField.Root
          value={block.letterSpacing}
          id="letter-spacing-input"
          onChange={(e) => onLetterSpacingChange(Number(e.target.value))}
          type="number"
        >
          <TextField.Slot side="left">
            <CgFontSpacing />
          </TextField.Slot>

          <TextField.Slot side="right">
            <Text>px</Text>
          </TextField.Slot>
        </TextField.Root>
      </Flex>

      <Flex direction="column" gap="1">
        <Text size="1" as="label" htmlFor="line-height-input">
          Line Height
        </Text>

        <TextField.Root
          value={block.lineHeight}
          id="line-height-input"
          onChange={(e) => onLineHeightChange(Number(e.target.value))}
          type="number"
        >
          <TextField.Slot side="left">
            <CgFontHeight />
          </TextField.Slot>

          <TextField.Slot side="right">
            <Text>em</Text>
          </TextField.Slot>
        </TextField.Root>
      </Flex>

      <Flex direction="column" gap="1">
        <Text size="1" as="label" htmlFor="width-input">
          Align
        </Text>
        <Select.Root value={block.textAlign} onValueChange={(value: TextAlign) => onTextAlignChange(value)}>
          <Select.Trigger>
            <Flex as="span" align="center" gap="2">
              {textAlignData[block.textAlign].icon}
              {textAlignData[block.textAlign].label}
            </Flex>
          </Select.Trigger>
          <Select.Content>
            {Object.entries(textAlignData).map(([key, { icon, label }]) => (
              <Select.Item key={key} value={key}>
                <Flex align="center" gap="2">
                  {icon}
                  {label}
                </Flex>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Flex>

      <Flex></Flex>

      <Grid columns="3" gapX="1" gapY="2" gridColumn={"1/3"}>
        <Flex direction="column" gap="1" gridColumn={"1/5"}>
          <Text size="1" as="label" htmlFor="text-shadow-x">
            Text Shadow
          </Text>
        </Flex>
        <Flex direction="column" gap="1">
          <TextField.Root
            value={block.textShadow.x}
            id="text-shadow-x"
            type="number"
            onChange={(e) => onShadowChange({ ...block.textShadow, x: Number(e.target.value) })}
          >
            <TextField.Slot side="left">X</TextField.Slot>
          </TextField.Root>
        </Flex>
        <Flex direction="column" gap="1">
          <TextField.Root
            value={block.textShadow.y}
            id="text-shadow-y"
            type="number"
            onChange={(e) => onShadowChange({ ...block.textShadow, y: Number(e.target.value) })}
          >
            <TextField.Slot side="left">Y</TextField.Slot>
          </TextField.Root>
        </Flex>
        <Flex direction="column" gap="1">
          <TextField.Root
            value={block.textShadow.blur}
            id="text-shadow-blur"
            type="number"
            onChange={(e) => onShadowChange({ ...block.textShadow, blur: Number(e.target.value) })}
          >
            <TextField.Slot side="left">
              <TbBlur />
            </TextField.Slot>
          </TextField.Root>
        </Flex>

        <Flex direction="column" gap="1" gridColumn={"1/4"}>
          <TextField.Root
            value={block.textShadowColorHex}
            onChange={(e) => {
              onShadowHexChange(e.target.value);
            }}
            onBlur={onShadowHexCommit}
            id="text-shadow-color-input"
          >
            <TextField.Slot side="left">
              <Popover.Root open={openShadowColorPicker}>
                <Popover.Trigger onClick={() => setShadowOpenColorPicker(true)}>
                  <button
                    className="w-3.5 h-3.5 rounded border border-gray-500"
                    style={{ backgroundColor: rgbaToCss(block.textShadow.color) }}
                  ></button>
                </Popover.Trigger>

                <Popover.Content>
                  <RgbaColorPicker
                    color={block.textShadow.color}
                    onChange={(color) => onShadowRgbaCommit(color)}
                  />
                </Popover.Content>
              </Popover.Root>
            </TextField.Slot>
          </TextField.Root>
        </Flex>
      </Grid>
    </Grid>
  );
};
