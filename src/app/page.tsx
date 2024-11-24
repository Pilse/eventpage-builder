"use client";

import { BlockFactory, PropertiesFactory } from "@/component/block";
import { BlockFactory as BlockFactoryDomain, ContainerBlock } from "@/domain/block";
import { useGlobalContext } from "@/hooks";
import { BlockHistoryProvider } from "@/hooks/use-block-history";
import { sampleContainer } from "@/mock";
import { Flex, Box } from "@radix-ui/themes";

export default function Home() {
  const globalContext = useGlobalContext();

  return (
    <BlockHistoryProvider
      root={BlockFactoryDomain.deserialize(sampleContainer, null) as InstanceType<typeof ContainerBlock>}
    >
      {({ root }) => {
        return (
          <Flex>
            <BlockFactory key={JSON.stringify(root.serialize())} block={root} />
            <Box width={"400px"} height={"fit-content"} position={"sticky"} top={"0"} left={"0"}>
              {globalContext.currentBlock && <PropertiesFactory block={globalContext.currentBlock} />}
            </Box>
          </Flex>
        );
      }}
    </BlockHistoryProvider>
  );
}
