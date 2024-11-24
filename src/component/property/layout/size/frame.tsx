import { FrameCanvas, FrameCol, FrameRow, Section } from "@/domain/block";
import { useDefaultLayoutSize } from "./use-default-size";
import { hasDropColMixin, hasDropRowMixin, isAutoLayouted } from "@/util";
import { BaseLayoutSize } from "./base";
import { Select, TextField } from "@radix-ui/themes";

export const FrameLayoutSize = <T extends FrameCanvas | FrameCol | FrameRow>({ block }: { block: T }) => {
  const { onWidthChange, onWidthTypeChange, onHeightChange, onHeightTypeChange } =
    useDefaultLayoutSize(block);

  const handleWidthChange = (width: number) => {
    onWidthChange(width, () => {
      if (hasDropColMixin(block) || hasDropRowMixin(block)) {
        block.autoLayout();
      }

      const parent = block.parent;
      if (parent && (hasDropColMixin(parent) || hasDropRowMixin(parent))) {
        parent.autoLayout();
      }
    });
  };

  const handleWidthTypeChange = (widthType: Section["widthType"]) => {
    onWidthTypeChange(widthType, () => {
      if (hasDropColMixin(block) || hasDropRowMixin(block)) {
        block.autoLayout();
      }

      const parent = block.parent;
      if (parent && (hasDropColMixin(parent) || hasDropRowMixin(parent))) {
        parent.autoLayout();
      }
    });
  };

  const handleHeightChange = (height: number) => {
    onHeightChange(height, () => {
      if (hasDropColMixin(block) || hasDropRowMixin(block)) {
        block.autoLayout();
      }

      const parent = block.parent;
      if (parent && (hasDropColMixin(parent) || hasDropRowMixin(parent))) {
        parent.autoLayout();
      }
    });
  };

  const handleHeightTypeChange = (heightType: Section["heightType"]) => {
    onHeightTypeChange(heightType, () => {
      if (hasDropColMixin(block) || hasDropRowMixin(block)) {
        block.autoLayout();
      }

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
          <TextField.Slot side="right">
            <Select.Root
              value={block.widthType}
              size={"1"}
              onValueChange={(value) => handleWidthTypeChange(value as Section["widthType"])}
            >
              <Select.Trigger variant="ghost" />
              <Select.Content>
                <Select.Item value="fill" disabled={!isAutoLayouted(block)}>
                  Fill
                </Select.Item>
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
          <TextField.Slot side="right">
            <Select.Root
              value={block.heightType}
              size={"1"}
              onValueChange={(value) => handleHeightTypeChange(value as Section["heightType"])}
            >
              <Select.Trigger variant="ghost" />
              <Select.Content>
                {(hasDropRowMixin(block) || hasDropColMixin(block)) && (
                  <Select.Item value="fit">Fit</Select.Item>
                )}
                <Select.Item value="fixed">Fixed</Select.Item>
                <Select.Item value="fill">Fill</Select.Item>
              </Select.Content>
            </Select.Root>
          </TextField.Slot>
        </TextField.Root>
      }
    />
  );
};
