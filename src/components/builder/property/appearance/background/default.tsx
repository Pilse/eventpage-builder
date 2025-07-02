import { BackgroundMixinBlockType } from "@/domain/builder/mixin";
import { rgbaToCss } from "@/shared/util/color";
import { Button, Flex, Grid, Popover, Select, Text, TextField } from "@radix-ui/themes";
import { useDefaultBg } from "./use-default-bg";
import { TbBackground, TbCloudUpload, TbPhoto } from "react-icons/tb";
import { RgbaColorPicker } from "react-colorful";
import { uppercaseFirstCharacter } from "@/shared/util";

const bgTypeData = {
  color: {
    icon: <TbBackground />,
    label: "Color",
  },
  image: {
    icon: <TbPhoto />,
    label: "Image",
  },
};

const bgImageSizeData = {
  cover: {
    icon: (
      <div className="relative w-4 h-4 overflow-hidden border-l border-r border-gray-500">
        <TbPhoto className="w-5 h-5" />
      </div>
    ),
    label: "Cover",
  },
  contain: {
    icon: (
      <div className="relative p-0.5 overflow-hidden border-l border-r border-gray-500">
        <TbPhoto />
      </div>
    ),
    label: "Contain",
  },
};

const bgImagePositionHorizontalData = {
  left: {
    icon: (
      <div className="relative overflow-hidden">
        <TbPhoto /> <div className="w-2/3 h-full absolute top-0 left-1/3 bg-black/60 rounded-r"></div>
      </div>
    ),
    label: "Left",
  },
  center: {
    icon: (
      <div className="relative overflow-hidden">
        <TbPhoto /> <div className="w-1/3 h-full absolute top-0 left-0 bg-black/60 rounded-l"></div>
        <div className="w-1/3 h-full absolute top-0 right-0 bg-black/60 rounded-r"></div>
      </div>
    ),
    label: "Center",
  },
  right: {
    icon: (
      <div className="relative overflow-hidden">
        <TbPhoto /> <div className="w-2/3 h-full absolute top-0 left-0 bg-black/60 rounded-l"></div>
      </div>
    ),
    label: "Right",
  },
};

const bgImagePositionVerticalData = {
  top: {
    icon: (
      <div className="relative overflow-hidden">
        <TbPhoto /> <div className="w-full h-2/3 absolute top-1/3 left-0 bg-black/60 rounded-b"></div>
      </div>
    ),
    label: "Top",
  },
  center: {
    icon: (
      <div className="relative overflow-hidden">
        <TbPhoto /> <div className="w-full h-1/3 absolute top-0 left-0 bg-black/60 rounded-t"></div>
        <div className="w-full h-1/3 absolute bottom-0 right-0 bg-black/60 rounded-b"></div>
      </div>
    ),
    label: "Center",
  },
  bottom: {
    icon: (
      <div className="relative overflow-hidden">
        <TbPhoto /> <div className="w-full h-2/3 absolute top-0 left-0 bg-black/60 rounded-t"></div>
      </div>
    ),
    label: "Bottom",
  },
};

export const DefaultBg = <T extends BackgroundMixinBlockType>({ block }: { block: T }) => {
  const {
    openColorPicker,
    setOpenColorPicker,
    onHexChange,
    onHexCommit,
    onRgbaCommit,
    bgTypes,
    onBgTypeChange,
    onFileUpload,
    onBackgroundImageSizeChange,
    onBackgroundImagePositionVerticalChange,
    onBackgroundImagePositionHorizontalChange,
  } = useDefaultBg(block);

  return (
    <Grid columns="2" gapX="4" gapY="2">
      <Flex direction="column" gap="1">
        <Text size="1" as="label" htmlFor="bgcolor-type">
          Background Type
        </Text>
        <Select.Root
          value={block.backgroundType}
          onValueChange={(value: "color" | "image") => onBgTypeChange(value)}
        >
          <Select.Trigger>
            <Flex align="center" gap="2">
              {bgTypeData[block.backgroundType].icon} {uppercaseFirstCharacter(block.backgroundType)}
            </Flex>
          </Select.Trigger>
          <Select.Content>
            {bgTypes.map((key) => (
              <Select.Item key={key} value={key}>
                <Flex align="center" gap="2">
                  {bgTypeData[key].icon} {uppercaseFirstCharacter(key)}
                </Flex>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Flex>

      {block.backgroundType === "color" && (
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
      )}

      {block.backgroundType === "image" && (
        <>
          <Flex direction="column" gap="1">
            <Text size="1" as="label" htmlFor="bgimage-size">
              Bg Image Size
            </Text>
            <Select.Root
              value={block.backgroundImageSize}
              onValueChange={(value: "cover" | "contain") => onBackgroundImageSizeChange(value)}
            >
              <Select.Trigger>
                <Flex align="center" gap="2">
                  {bgImageSizeData[block.backgroundImageSize].icon}
                  <Text>{bgImageSizeData[block.backgroundImageSize].label}</Text>
                </Flex>
              </Select.Trigger>
              <Select.Content>
                {["cover" as const, "contain" as const].map((key) => (
                  <Select.Item key={key} value={key}>
                    <Flex align="center" gap="2">
                      {bgImageSizeData[key].icon}
                      <Text>{bgImageSizeData[key].label}</Text>
                    </Flex>
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Flex>

          <Flex direction="column" gap="1" gridColumn={"1/3"}>
            <Text size="1" as="label" htmlFor="bgimage-input">
              Background Image
            </Text>
            <input
              type="file"
              accept="image/*"
              id="bgimage-input"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  onFileUpload(file);
                }
              }}
            />
            <Button variant="outline" asChild>
              <label htmlFor="bgimage-input">
                <TbCloudUpload /> <Text size="1">{block.backgroundImageFilename || "Upload"}</Text>
              </label>
            </Button>
          </Flex>

          <Flex direction="column" gap="1">
            <Text size="1" as="label" htmlFor="bgimage-position-horizontal">
              Bg Image Crop X
            </Text>
            <Select.Root
              value={block.backgroundImagePositionHorizontal}
              onValueChange={(value: "left" | "center" | "right") =>
                onBackgroundImagePositionHorizontalChange(value)
              }
            >
              <Select.Trigger>
                <Flex align="center" gap="2">
                  {bgImagePositionHorizontalData[block.backgroundImagePositionHorizontal].icon}
                  <Text>{bgImagePositionHorizontalData[block.backgroundImagePositionHorizontal].label}</Text>
                </Flex>
              </Select.Trigger>
              <Select.Content>
                {["left" as const, "center" as const, "right" as const].map((key) => (
                  <Select.Item key={key} value={key}>
                    <Flex align="center" gap="2">
                      {bgImagePositionHorizontalData[key].icon}
                      <Text>{bgImagePositionHorizontalData[key].label}</Text>
                    </Flex>
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Flex>

          <Flex direction="column" gap="1">
            <Text size="1" as="label" htmlFor="bgimage-position-vertical">
              Bg Image Crop Y
            </Text>
            <Select.Root
              value={block.backgroundImagePositionVertical}
              onValueChange={(value: "top" | "center" | "bottom") =>
                onBackgroundImagePositionVerticalChange(value)
              }
            >
              <Select.Trigger>
                <Flex align="center" gap="2">
                  {bgImagePositionVerticalData[block.backgroundImagePositionVertical].icon}
                  <Text>{bgImagePositionVerticalData[block.backgroundImagePositionVertical].label}</Text>
                </Flex>
              </Select.Trigger>
              <Select.Content>
                {["top" as const, "center" as const, "bottom" as const].map((key) => (
                  <Select.Item key={key} value={key}>
                    <Flex align="center" gap="2">
                      {bgImagePositionVerticalData[key].icon}
                      <Text>{bgImagePositionVerticalData[key].label}</Text>
                    </Flex>
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Flex>
        </>
      )}
    </Grid>
  );
};
