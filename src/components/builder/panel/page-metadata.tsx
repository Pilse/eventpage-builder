import { getPage } from "@/service/pages";
import { Badge, Code, Flex, Heading, Popover, Text, TextField } from "@radix-ui/themes";
import Link from "next/link";
import { useState } from "react";
import { RiGlobalLine } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { usePageName } from "./use-page-name";

interface IPageMetatDataProps {
  userId: string;
  pageData: NonNullable<Awaited<ReturnType<typeof getPage>>>;
}

export const PageMetaData = ({ pageData, userId }: IPageMetatDataProps) => {
  const { pageName, onPageNameChange } = usePageName(pageData.name, {
    pageId: pageData.publicId,
    userId,
  });

  return (
    <Flex direction="column" gap="1" align="start">
      <Popover.Root>
        <Popover.Trigger>
          <Heading size="2" className="cursor-pointer max-w-full">
            <Flex align="center" gap="1" className="max-w-full">
              <span className="truncate">{pageName}</span> <TbEdit className="shrink-0" />
            </Flex>
          </Heading>
        </Popover.Trigger>

        <Popover.Content>
          <TextField.Root
            value={pageName}
            onChange={(e) => onPageNameChange(e.target.value)}
          ></TextField.Root>
        </Popover.Content>
      </Popover.Root>

      {pageData.isPublished ? (
        <Badge color="jade" variant="soft" ml="-1">
          Work In Progress
        </Badge>
      ) : (
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
    </Flex>
  );
};
