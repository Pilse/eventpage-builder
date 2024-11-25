import { Image } from "@/domain/block";
import { useDefaultLayoutSize } from "./use-default-size";
import { hasDropColMixin, hasDropRowMixin, isAutoLayouted } from "@/util";
import { BaseLayoutSize } from "./base";
import { Select, TextField } from "@radix-ui/themes";
import { HeightIcon, WidthIcon } from "@radix-ui/react-icons";

export const ImageLayoutSize = <T extends Image>({ block }: { block: T }) => {
  const { onWidthChange, onWidthTypeChange, onHeightChange, onHeightTypeChange } =
    useDefaultLayoutSize(block);

  const handleWidthChange = (width: number) => {
    onWidthChange(width, () => {
      const parent = block.parent;
      if (parent && (hasDropColMixin(parent) || hasDropRowMixin(parent))) {
        parent.autoLayout();
      }
    });
  };

  const handleWidthTypeChange = (widthType: Image["widthType"]) => {
    onWidthTypeChange(widthType, () => {
      const parent = block.parent;
      if (parent && (hasDropColMixin(parent) || hasDropRowMixin(parent))) {
        parent.autoLayout();
      }
    });
  };

  const handleHeightChange = (height: number) => {
    onHeightChange(height, () => {
      const parent = block.parent;
      if (parent && (hasDropColMixin(parent) || hasDropRowMixin(parent))) {
        parent.autoLayout();
      }
    });
  };

  const handleHeightTypeChange = (heightType: Image["heightType"]) => {
    onHeightTypeChange(heightType, () => {
      const parent = block.parent;
      if (parent && (hasDropColMixin(parent) || hasDropRowMixin(parent))) {
        parent.autoLayout();
      }
    });
  };

  return (
    <BaseLayoutSize
      block={block}
      widthChildren={
        <TextField.Root
          value={block.width}
          id="width-input"
          onChange={(e) => handleWidthChange(Number(e.target.value))}
        >
          <TextField.Slot side="left">
            <WidthIcon />
          </TextField.Slot>
          <TextField.Slot side="right">
            <Select.Root
              value={block.widthType}
              size={"1"}
              onValueChange={(value) => handleWidthTypeChange(value as Image["widthType"])}
            >
              <Select.Trigger variant="ghost" />
              <Select.Content>
                {isAutoLayouted(block) && <Select.Item value="fill">Fill</Select.Item>}
                <Select.Item value="fixed">Fixed</Select.Item>
              </Select.Content>
            </Select.Root>
          </TextField.Slot>
        </TextField.Root>
      }
      heightChildren={
        <TextField.Root
          type="number"
          value={block.height}
          id="height-input"
          onChange={(e) => handleHeightChange(Number(e.target.value))}
        >
          <TextField.Slot side="left">
            <HeightIcon />
          </TextField.Slot>
          <TextField.Slot side="right">
            <Select.Root
              value={block.heightType}
              size={"1"}
              onValueChange={(value) => handleHeightTypeChange(value as Image["heightType"])}
            >
              <Select.Trigger variant="ghost" />
              <Select.Content>
                <Select.Item value="fixed">Fixed</Select.Item>
                {isAutoLayouted(block) && <Select.Item value="fill">Fill</Select.Item>}
                {block.aspectRatio !== 0 && <Select.Item value="fit">Fit</Select.Item>}
              </Select.Content>
            </Select.Root>
          </TextField.Slot>
        </TextField.Root>
      }
    />
  );
};
