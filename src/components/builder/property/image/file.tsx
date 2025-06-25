import { Button, Flex, Grid, Text } from "@radix-ui/themes";
import { ImageBlock } from "@/domain/builder";

import { TbCloudUpload } from "react-icons/tb";
import { useDefaultFile } from "./use-default-file";

export const DefaultFile = <T extends InstanceType<typeof ImageBlock>>({ block }: { block: T }) => {
  const { onFileUpload } = useDefaultFile(block);

  return (
    <Grid columns="1" gap="4">
      <Flex direction="column" gap="1">
        <Text size="1" as="label" htmlFor="width-input" ml="1">
          File
        </Text>
        <input
          type="file"
          accept="image/*"
          id="file-input"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              onFileUpload(file);
            }
          }}
        />
        <Button variant="surface" asChild>
          <label htmlFor="file-input">
            <TbCloudUpload /> <Text size="1">{block.filename || "Upload File"}</Text>
          </label>
        </Button>
      </Flex>
    </Grid>
  );
};
