"use client";

import { use } from "react";
import { Tabs } from "@/components/console/ui/tabs";
import { notFound } from "next/navigation";
import { Badge, Card, DataList, Code, Flex, IconButton, Text } from "@radix-ui/themes";
import { getPages } from "@/service/pages";
import dayjs from "dayjs";
import { CopyIcon } from "@radix-ui/react-icons";
import { TbPlus } from "react-icons/tb";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

export function DataTable({ data }: { data: ReturnType<typeof getPages>; userId: string }) {
  const pagesData = use(data);

  if (!pagesData) {
    notFound();
  }

  return (
    <Tabs
      defaultValue="pages"
      className={twMerge("grid w-full grid-cols-[repeat(auto-fit,_minmax(255px,_1fr))] gap-6 p-6")}
    >
      {pagesData.pages.map((page) => (
        <Card key={page.publicId} className="bg-background/70" asChild>
          <Link href={`/page/${page.publicId}`}>
            {page.name}
            <DataList.Root className="mt-4">
              <DataList.Item align="center">
                <DataList.Label minWidth="88px">Status</DataList.Label>
                <DataList.Value>
                  <Badge color={page.isPublished ? "jade" : "amber"} variant="soft" radius="full">
                    {page.isPublished ? "Published" : "Work In Progress"}
                  </Badge>
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">
                  <Flex align="center" gap="1">
                    ID
                  </Flex>
                </DataList.Label>
                <DataList.Value>
                  <Flex align="center" gap="2" maxWidth="100px">
                    <Code variant="ghost" className="truncate">
                      {page.publicId}
                    </Code>
                    <IconButton size="1" aria-label="Copy value" color="gray" variant="ghost">
                      <CopyIcon />
                    </IconButton>
                  </Flex>
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">Last Updated</DataList.Label>
                <DataList.Value>{dayjs(page.updatedAt).format("YYYY-MM-DD HH:mm")}</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">Last Published</DataList.Label>
                <DataList.Value>
                  {page.isPublished ? dayjs(page.publishedAt).format("YYYY-MM-DD HH:MM") : "-"}
                </DataList.Value>
              </DataList.Item>
            </DataList.Root>
          </Link>
        </Card>
      ))}
      <Card asChild>
        <Link
          href={`/page/new?${uuidv4()}`}
          className={twMerge("flex w-full justify-center items-center gap-1 max-w-[255px] min-h-64")}
        >
          <TbPlus />
          <Text> Add Page</Text>
        </Link>
      </Card>
    </Tabs>
  );
}

export const DataTableSkeleton = () => {
  return (
    <Tabs
      defaultValue="pages"
      className={twMerge("grid w-full grid-cols-[repeat(auto-fit,_minmax(255px,_1fr))] gap-6 p-6")}
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="bg-background/40 animate-pulse p-4 space-y-4">
          <div className="h-4 w-1/2 bg-muted rounded" />
          <DataList.Root className="mt-4 space-y-2">
            <DataList.Item>
              <DataList.Label minWidth="88px">Status</DataList.Label>
              <DataList.Value>
                <div className="h-6 w-24 bg-muted rounded-full" />
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label minWidth="88px">ID</DataList.Label>
              <DataList.Value>
                <div className="h-6 w-32 bg-muted rounded" />
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label minWidth="88px">Last Updated</DataList.Label>
              <DataList.Value>
                <div className="h-4 w-32 bg-muted rounded" />
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label minWidth="88px">Last Published</DataList.Label>
              <DataList.Value>
                <div className="h-4 w-32 bg-muted rounded" />
              </DataList.Value>
            </DataList.Item>
          </DataList.Root>
        </Card>
      ))}
    </Tabs>
  );
};
