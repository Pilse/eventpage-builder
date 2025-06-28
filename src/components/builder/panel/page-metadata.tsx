import { getPage, publishPage } from "@/service/pages";
import { Badge, Button, Code, Flex, Heading, Popover, Text, TextField } from "@radix-ui/themes";
import Link from "next/link";
import { useState } from "react";
import { RiGlobalLine } from "react-icons/ri";
import { TbEdit, TbLoader2, TbSettings } from "react-icons/tb";
import { usePageName } from "./use-page-name";
import { useServerAction } from "@/hooks";
import { Container } from "@/domain/builder";

interface IPageMetatDataProps {
  block: Container;
  userId: string;
  pageData: NonNullable<Awaited<ReturnType<typeof getPage>>>;
}

export const PageMetaData = ({ block, pageData, userId }: IPageMetatDataProps) => {
  const { action: publishPageAction, loading: publishPageLoading } = useServerAction(publishPage);
  const { pageName, onPageNameChange } = usePageName(pageData.name, {
    pageId: pageData.publicId,
    userId,
  });

  return (
    <Flex direction="column" gap="2" align="start">
      <Popover.Root>
        <Popover.Trigger>
          <Heading size="2" className="cursor-pointer max-w-full">
            <Flex align="center" gap="1" className="max-w-full">
              <span className="truncate">{pageName}</span> <TbSettings className="shrink-0" />
            </Flex>
          </Heading>
        </Popover.Trigger>

        <Popover.Content width="250px">
          <Flex direction="column" gap="2">
            <TextField.Root value={pageName} onChange={(e) => onPageNameChange(e.target.value)} />

            {pageData.isPublished && (
              <Link href={`/p/${pageData.publicId}`} className="max-w-full">
                <Text className="max-w-full hover:underline" color="blue" size="1">
                  <Flex align="center" gap="1">
                    <RiGlobalLine className="shrink-0" />
                    <Code variant="ghost" className="truncate" size="1" color="blue">
                      https://pageio.app/p/{pageData.publicId}
                    </Code>
                  </Flex>
                </Text>
              </Link>
            )}

            <Button color="gray" variant="soft" disabled={!pageData.isPublished}>
              Back to Draft
            </Button>
          </Flex>
        </Popover.Content>
      </Popover.Root>

      <Button
        color="blue"
        variant="soft"
        className="w-full"
        size="2"
        onClick={() => publishPageAction(pageData.publicId, userId, block.serialize())}
        disabled={publishPageLoading}
      >
        <Flex align="center" gap="1">
          {publishPageLoading ? <TbLoader2 className="animate-spin" /> : <RiGlobalLine />}
          Publish
        </Flex>
      </Button>
    </Flex>
  );
};
