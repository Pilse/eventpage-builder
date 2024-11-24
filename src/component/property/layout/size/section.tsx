import { Section, SectionCol, SectionRow } from "@/domain/block";
import { useDefaultLayoutSize } from "./use-default-size";
import { hasDropColMixin, hasDropRowMixin } from "@/util";
import { BaseLayoutSize } from "./base";
import { Select, TextField } from "@radix-ui/themes";

export const SectionLayoutSize = <T extends Section | SectionCol | SectionRow>({ block }: { block: T }) => {
  const { onHeightChange, onHeightTypeChange } = useDefaultLayoutSize(block);

  const handleHeightChange = (height: number) => {
    onHeightChange(height, () => {
      if (hasDropColMixin(block)) {
        block.autoLayout();
      }

      const parent = block.parent;
      if (parent && hasDropColMixin(parent)) {
        parent.autoLayout();
      }
    });
  };

  const handleHeightTypeChange = (heightType: Section["heightType"]) => {
    onHeightTypeChange(heightType, () => {
      if (hasDropColMixin(block)) {
        block.autoLayout();
      }

      const parent = block.parent;
      console.log(parent);
      if (parent && hasDropColMixin(parent)) {
        parent.autoLayout();
      }
    });
  };

  return (
    <BaseLayoutSize
      block={block}
      widthChildren={
        <TextField.Root value={block.width} id="width-input" disabled>
          <TextField.Slot side="right">
            <Select.Root value={block.widthType} size={"1"} disabled>
              <Select.Trigger variant="ghost" />
              <Select.Content>
                <Select.Item value="fill">Fill</Select.Item>
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
              </Select.Content>
            </Select.Root>
          </TextField.Slot>
        </TextField.Root>
      }
    />
  );
};
