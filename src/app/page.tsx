"use client";

import { BlockFactory, BlockToolbars, PropertiesFactory, TreeNodeFactory } from "@/component/block";
import { Tree } from "@/component/tree";
import { BlockFactory as BlockFactoryDomain, ContainerBlock } from "@/domain/block";
import { useGlobalContext } from "@/hooks";
import { BlockHistoryProvider } from "@/hooks/use-block-history";
import { sampleContainer } from "@/mock";
import { Flex, Box, Heading } from "@radix-ui/themes";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Home() {
  const globalContext = useGlobalContext();

  return (
    <BlockHistoryProvider
      root={BlockFactoryDomain.deserialize(sampleContainer, null) as InstanceType<typeof ContainerBlock>}
    >
      {({ root, historyId }) => {
        return (
          <Flex maxHeight="100vh" overflow="hidden">
            <Box flexShrink="0" width="250px" height="fit-content" position="sticky" top="0" left="0" p="4">
              <DndProvider backend={HTML5Backend}>
                <Flex direction="column" gap="4">
                  <Heading size="2">Layer</Heading>
                  <TreeNodeFactory key={historyId} block={root} depth={1} />
                </Flex>
              </DndProvider>
            </Box>
            <Flex
              direction="column"
              flexShrink="1"
              flexGrow="1"
              gap="4"
              align="center"
              position="relative"
              width="100%"
              minWidth="0"
              overflow="auto"
              maxHeight="100%"
            >
              <Box position="sticky" top="2" left="0" width="fit-content" style={{ zIndex: 20 }}>
                <BlockToolbars />
              </Box>

              <Flex
                width="100%"
                justify="center"
                flexShrink="1"
                px="4"
                py="8"
                style={{ backgroundColor: "#D9EDFE25" }}
              >
                <DndProvider backend={HTML5Backend}>
                  <BlockFactory key={historyId} block={root} />
                </DndProvider>
              </Flex>
            </Flex>
            <Box flexShrink="0" width="300px" top="0" left="0" overflow="auto" maxHeight="100%">
              {globalContext.currentBlock && <PropertiesFactory block={globalContext.currentBlock} />}
            </Box>
          </Flex>
        );
      }}
    </BlockHistoryProvider>
  );
}
