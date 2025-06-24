import { Flex, Grid, Select, Text } from "@radix-ui/themes";
import { useDefaultLayoutType } from "../use-default-type";
import { FrameCanvas, FrameCol, FrameRow, Section, SectionCol, SectionRow } from "@/domain/block";
import { ArrowDownIcon, ArrowRightIcon, MixIcon, StackIcon } from "@radix-ui/react-icons";

const typeData = {
  stack: {
    icon: <StackIcon />,
    label: "Stack",
  },
  free: {
    icon: <MixIcon />,
    label: "Free",
  },
};

const directionData = {
  row: {
    icon: <ArrowRightIcon />,
    label: "Row",
  },
  column: {
    icon: <ArrowDownIcon />,
    label: "Column",
  },
};

export const DefaultLayoutType = <
  T extends Section | SectionRow | SectionCol | FrameCanvas | FrameCol | FrameRow
>({
  block,
}: {
  block: T;
}) => {
  const { typeValue, onTypeChange, directionValue, onDirectionChange } = useDefaultLayoutType(block);

  return (
    <Grid columns="2" gap="4">
      <Flex direction="column" gap="1">
        <Text size="1" as="label" htmlFor="width-input">
          Type
        </Text>
        <Select.Root value={typeValue} onValueChange={(value: typeof typeValue) => onTypeChange(value)}>
          <Select.Trigger>
            <Flex as="span" align="center" gap="2">
              {typeData[typeValue].icon}
              {typeData[typeValue].label}
            </Flex>
          </Select.Trigger>
          <Select.Content>
            {Object.entries(typeData).map(([key, { icon, label }]) => (
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

      {typeValue === "stack" && (
        <Flex direction="column" gap="1">
          <Text size="1" as="label" htmlFor="width-input">
            Direction
          </Text>
          <Select.Root
            value={directionValue}
            onValueChange={(value: typeof directionValue) => onDirectionChange(value)}
          >
            <Select.Trigger>
              <Flex as="span" align="center" gap="2">
                {directionData[directionValue].icon}
                {directionData[directionValue].label}
              </Flex>
            </Select.Trigger>
            <Select.Content>
              {Object.entries(directionData).map(([key, { icon, label }]) => (
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
      )}
    </Grid>
  );
};
