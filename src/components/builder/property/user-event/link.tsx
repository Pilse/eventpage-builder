import { Flex, Grid, Text, TextField } from "@radix-ui/themes";
import { Block } from "@/domain/builder";
import { TbLink } from "react-icons/tb";
import { useDefaultLink } from "./use-default-link";

export const DefaultUserEventLink = <T extends Block>({ block }: { block: T }) => {
  const { onLinkChange } = useDefaultLink(block);

  return (
    <Grid columns="1" gap="4">
      <Flex direction="column" gap="1">
        <Text size="1" as="label" htmlFor="link-input">
          Link
        </Text>
        <TextField.Root
          value={block.link ?? ""}
          onChange={(e) => onLinkChange(e.target.value)}
          placeholder="https://pageio.app"
        >
          <TextField.Slot side="left">
            <TbLink />
          </TextField.Slot>
        </TextField.Root>
      </Flex>
    </Grid>
  );
};
