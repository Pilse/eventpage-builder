import { Flex, Grid, IconButton, Popover, Text, TextField } from "@radix-ui/themes";
import { Block } from "@/domain/block";
import { PaddingIcon } from "@radix-ui/react-icons";
import { TbBorderBottom, TbBorderLeft, TbBorderRight, TbBorderSides } from "react-icons/tb";
import { useSpacingPadding } from "./use-default-padding";
import { hasDropColMixin, hasDropRowMixin } from "@/util";

export const LayoutPadding = <T extends Block>({ block }: { block: T }) => {
  const { onPaddingChange, paddingValue } = useSpacingPadding(block);

  const handlePaddingChange = (value: number, dirs: ("pr" | "pl" | "pb" | "pt")[]) => {
    onPaddingChange(
      value,
      dirs,
      () => {
        if (hasDropColMixin(block) || hasDropRowMixin(block)) {
          block.autoLayout();
        }

        const parent = block.parent;
        if (
          (block.widthType === "fit" || block.heightType === "fit") &&
          parent &&
          (hasDropRowMixin(parent) || hasDropColMixin(parent))
        ) {
          parent.autoLayout();
        }
      },
      { flush: true }
    );
  };

  return (
    <Grid columns="2" gap="4">
      <Flex direction="column" gap="1">
        <Text size="1" as="label" htmlFor="padding-input">
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
          onChange={(e) => handlePaddingChange(Number(e.target.value), ["pt", "pr", "pb", "pl"])}
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
                    <Text size="1" as="label" htmlFor="padding-top-input">
                      Top
                    </Text>
                    <TextField.Root
                      type="number"
                      value={block.pt}
                      id="padding-top-input"
                      onChange={(e) => handlePaddingChange(Number(e.target.value), ["pt"])}
                    >
                      <TextField.Slot>
                        <TbBorderLeft />
                      </TextField.Slot>
                    </TextField.Root>
                  </Flex>

                  <Flex direction="column" gap="1">
                    <Text size="1" as="label" htmlFor="padding-right-input">
                      Right
                    </Text>
                    <TextField.Root
                      type="number"
                      value={block.pr}
                      id="padding-right-input"
                      onChange={(e) => handlePaddingChange(Number(e.target.value), ["pr"])}
                    >
                      <TextField.Slot>
                        <TbBorderRight />
                      </TextField.Slot>
                    </TextField.Root>
                  </Flex>

                  <Flex direction="column" gap="1">
                    <Text size="1" as="label" htmlFor="padding-bottom-input">
                      Bottom
                    </Text>
                    <TextField.Root
                      type="number"
                      value={block.pb}
                      id="padding-bottom-input"
                      onChange={(e) => handlePaddingChange(Number(e.target.value), ["pb"])}
                    >
                      <TextField.Slot>
                        <TbBorderBottom />
                      </TextField.Slot>
                    </TextField.Root>
                  </Flex>

                  <Flex direction="column" gap="1">
                    <Text size="1" as="label" htmlFor="padding-left-input">
                      Left
                    </Text>
                    <TextField.Root
                      type="number"
                      value={block.pl}
                      id="padding-left-input"
                      onChange={(e) => handlePaddingChange(Number(e.target.value), ["pl"])}
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
