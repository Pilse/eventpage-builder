"use client";

import { BlockFactory, BlockToolbars, PropertiesFactory, TreeNodeFactory } from "@/component/block";
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
              maxHeight="100%"
              style={{ backgroundColor: "#D9EDFE25" }}
            >
              <Box
                position="absolute"
                top="2"
                width="fit-content"
                style={{ zIndex: 20, left: "50%", transform: "translateX(-50%)" }}
              >
                <BlockToolbars />
              </Box>

              <Box
                width="100%"
                flexShrink="1"
                overflow="auto"
                px="8"
                py="8"
                mt="9"
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (!target.closest("[data-block-type]")) {
                    globalContext.setCurrentBlock(root);
                  }
                }}
              >
                <DndProvider backend={HTML5Backend}>
                  <BlockFactory key={historyId} block={root} />
                </DndProvider>
              </Box>
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
