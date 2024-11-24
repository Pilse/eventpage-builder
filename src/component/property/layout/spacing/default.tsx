import { Flex, Grid, IconButton, Popover, Text, TextField } from "@radix-ui/themes";
import { FrameCol, FrameRow, SectionCol, SectionRow } from "@/domain/block";
import { ColumnSpacingIcon, PaddingIcon, RowSpacingIcon } from "@radix-ui/react-icons";
import { useDefaultLayoutType } from "../use-default-type";
import { useDefaultLayoutSpacing } from "./use-default-spacing";
import { TbBorderBottom, TbBorderLeft, TbBorderRight, TbBorderSides, TbBorderTop } from "react-icons/tb";

const gapData = {
  column: {
    icon: <RowSpacingIcon />,
  },
  row: {
    icon: <ColumnSpacingIcon />,
  },
};

export const DefaultLayoutSpacing = <T extends SectionRow | SectionCol | FrameCol | FrameRow>({
  block,
}: {
  block: T;
}) => {
  const { directionValue } = useDefaultLayoutType(block);
  const { onGapChange, onPaddingChange, paddingValue } = useDefaultLayoutSpacing(block);

  return (
    <Grid columns="2" gap="4">
      <Flex direction="column" gap="1">
        <Text size="1" as="label" htmlFor="gap-input" ml="1">
          Gap
        </Text>
        <TextField.Root
          type="number"
          value={block.gap}
          id="gap-input"
          onChange={(e) => onGapChange(Number(e.target.value))}
        >
          <TextField.Slot>{gapData[directionValue].icon}</TextField.Slot>
        </TextField.Root>
      </Flex>

      <Flex direction="column" gap="1">
        <Text size="1" as="label" htmlFor="padding-input" ml="1">
          Padding
        </Text>
        <TextField.Root
          type={typeof paddingValue === "number" ? "number" : "text"}
          value={paddingValue}
          id="padding-input"
          onFocus={(e) => {
            if (typeof paddingValue === "string") {
              e.target.select();
            }
          }}
          onChange={(e) => onPaddingChange(Number(e.target.value), ["pt", "pr", "pb", "pl"])}
        >
          <TextField.Slot>
            <PaddingIcon />
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
                    <Text size="1" as="label" htmlFor="padding-top-input" ml="1">
                      Top
                    </Text>
                    <TextField.Root
                      type="number"
                      value={block.pt}
                      id="padding-top-input"
                      onChange={(e) => onPaddingChange(Number(e.target.value), ["pt"])}
                    >
                      <TextField.Slot>
                        <TbBorderLeft />
                      </TextField.Slot>
                    </TextField.Root>
                  </Flex>

                  <Flex direction="column" gap="1">
                    <Text size="1" as="label" htmlFor="padding-right-input" ml="1">
                      Right
                    </Text>
                    <TextField.Root
                      type="number"
                      value={block.pr}
                      id="padding-right-input"
                      onChange={(e) => onPaddingChange(Number(e.target.value), ["pr"])}
                    >
                      <TextField.Slot>
                        <TbBorderRight />
                      </TextField.Slot>
                    </TextField.Root>
                  </Flex>

                  <Flex direction="column" gap="1">
                    <Text size="1" as="label" htmlFor="padding-bottom-input" ml="1">
                      Bottom
                    </Text>
                    <TextField.Root
                      type="number"
                      value={block.pb}
                      id="padding-bottom-input"
                      onChange={(e) => onPaddingChange(Number(e.target.value), ["pb"])}
                    >
                      <TextField.Slot>
                        <TbBorderBottom />
                      </TextField.Slot>
                    </TextField.Root>
                  </Flex>

                  <Flex direction="column" gap="1">
                    <Text size="1" as="label" htmlFor="padding-left-input" ml="1">
                      Left
                    </Text>
                    <TextField.Root
                      type="number"
                      value={block.pl}
                      id="padding-left-input"
                      onChange={(e) => onPaddingChange(Number(e.target.value), ["pl"])}
                    >
                      <TextField.Slot>
                        <TbBorderLeft />
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
