"use client";

import { BlockFactory, BlockToolbars, PropertiesFactory, TreeNodeFactory } from "@/components/builder/block";
import { BlockFactory as BlockFactoryDomain, Container, ContainerBlock } from "@/domain/builder";
import { useGlobalContext } from "@/hooks";
import { BlockHistoryProvider } from "@/hooks/use-block-history";
import { getPage } from "@/service/pages";
import { Flex, Box, Heading, Skeleton, Separator } from "@radix-ui/themes";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { use, useLayoutEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { PageMetaData } from "./page-metadata";

interface IBuilderPanelProps {
  pagePromise: ReturnType<typeof getPage>;
}

export const BuilderPanel = ({ pagePromise }: IBuilderPanelProps) => {
  const pageData = use(pagePromise);
  const { data: session } = useSession();
  const router = useRouter();
  const globalContext = useGlobalContext();

  useLayoutEffect(() => {
    if (!session) {
      signIn("google", { redirect: true });
      return;
    }

    if (!pageData) {
      router.replace("/console");
      return;
    }
  }, [pageData, router, session]);

  if (!pageData) {
    return null;
  }

  return (
    <BlockHistoryProvider
      userId={session?.user?.id ?? ""}
      pageId={pageData.publicId}
      root={
        BlockFactoryDomain.deserialize(
          pageData.block as ReturnType<Container["serialize"]>,
          null
        ) as InstanceType<typeof ContainerBlock>
      }
    >
      {({ root, historyId }) => {
        return (
          <Flex maxHeight="100vh" overflow="hidden">
            <Box
              flexShrink="0"
              width="256px"
              height="100vh"
              className="overflow-auto"
              position="sticky"
              top="0"
              left="0"
              p="4"
            >
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
              minHeight="100vh"
              style={{ backgroundColor: "#D9EDFE25" }}
              onClick={(e) => {
                const target = e.target as HTMLElement;
                if (!target.closest("[data-block-type]")) {
                  globalContext.setCurrentBlock(root);
                }
              }}
            >
              <Box
                position="absolute"
                top="2"
                width="fit-content"
                style={{ zIndex: 20, left: "50%", transform: "translateX(-50%)" }}
              >
                <BlockToolbars />
              </Box>
              <Box width="100%" flexShrink="1" overflow="auto" px="9" py="8" mt="9" flexGrow="1">
                <DndProvider backend={HTML5Backend}>
                  <BlockFactory key={historyId} block={root} />
                </DndProvider>
              </Box>
            </Flex>
            <Box flexShrink="0" width="300px" top="0" left="0" overflow="auto" maxHeight="100%">
              <Flex direction="column" p="4">
                <PageMetaData block={root} pageData={pageData} userId={session?.user?.id ?? ""} />
              </Flex>
              <Separator size="4" />
              {globalContext.currentBlock && <PropertiesFactory block={globalContext.currentBlock} />}
            </Box>
          </Flex>
        );
      }}
    </BlockHistoryProvider>
  );
};

export const BlockPanelSkelton = () => {
  return (
    <Flex maxHeight="100vh" overflow="hidden">
      <Box flexShrink="0" width="256px" height="fit-content" position="sticky" top="0" left="0" p="4"></Box>
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
        minHeight="100vh"
        style={{ backgroundColor: "#D9EDFE25" }}
      >
        <Box
          position="absolute"
          top="2"
          width="fit-content"
          style={{ zIndex: 20, left: "50%", transform: "translateX(-50%)" }}
        >
          <Skeleton className="w-[400px] h-[800px] mt-28"></Skeleton>
        </Box>
        <Box width="100%" flexShrink="1" overflow="auto" px="9" py="8" mt="9" flexGrow="1"></Box>
      </Flex>
      <Box flexShrink="0" width="300px" top="0" left="0" overflow="auto" maxHeight="100%"></Box>
    </Flex>
  );
};
