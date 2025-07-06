"use client";

import { use } from "react";
import { Tabs } from "@/components/console/ui/tabs";
import { notFound } from "next/navigation";
import { Badge, Card, DataList, Code, Flex, IconButton, Text, Heading, DropdownMenu } from "@radix-ui/themes";
import { getPages } from "@/service/pages";
import { CopyIcon } from "@radix-ui/react-icons";
import { TbPlus, TbTrash } from "react-icons/tb";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";
import { updatedTimeToText } from "@/shared/util/utils";
import { MdOutlineMoreVert } from "react-icons/md";
import { deletePage } from "@/service/pages/delete-page";
import { useServerAction } from "@/hooks";

export function PageList({
  pagesPromise,
  userId,
}: {
  pagesPromise: ReturnType<typeof getPages>;
  userId: string;
}) {
  const pagesData = use(pagesPromise);
  const { action: deletePageAction, loading: deletePageLoading } = useServerAction(deletePage);

  if (!pagesData) {
    notFound();
  }

  return (
    <Tabs
      defaultValue="pages"
      className={twMerge(
        "grid w-full grid-cols-[repeat(auto-fit,1fr)] gap-6 p-6 xl:grid-cols-[repeat(auto-fit,_minmax(300px,400px))]",
        deletePageLoading && "opacity-50 pointer-events-none"
      )}
    >
      {pagesData.pages.map((page) => (
        <Card key={page.publicId} className="bg-background/70">
          <Flex direction="column" gap="2" p="2" className="w-full">
            <Flex justify="between" align="center" className="w-full" gap="2">
              {/* 두줄까지만 보이게  */}
              <Link
                href={`/page/${page.publicId}`}
                className="underline underline-offset-4 hover:opacity-80 transition grow w-[calc(100%-1rem)]"
              >
                <Heading size="4" className="truncate">
                  {page.name}
                </Heading>
              </Link>

              <DropdownMenu.Root>
                <DropdownMenu.Trigger className="shrink-0">
                  <MdOutlineMoreVert />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content size="2">
                  <DropdownMenu.Item
                    color="red"
                    onClick={() => deletePageAction(page.publicId, userId)}
                    disabled={deletePageLoading}
                  >
                    <Text className="min-w-16 flex items-center gap-2 justify-between" weight="medium">
                      Delete
                      <TbTrash className="shrink-0" />
                    </Text>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </Flex>

            <DataList.Root className="mt-4">
              <DataList.Item align="center">
                <DataList.Label>Status</DataList.Label>
                <DataList.Value>
                  <Badge color={page.isPublished ? "blue" : "gray"} variant="soft" size="2">
                    {page.isPublished ? "Published" : "Draft"}
                  </Badge>
                </DataList.Value>
              </DataList.Item>

              <DataList.Item>
                <DataList.Label>
                  <Flex align="center" gap="1">
                    Link
                  </Flex>
                </DataList.Label>
                <DataList.Value>
                  <Flex align="center" gap="2" maxWidth="100%">
                    <Code
                      variant="ghost"
                      color={page.isPublished ? "blue" : "gray"}
                      className="truncate w-full"
                    >
                      {page.isPublished ? (
                        <Link
                          href={`/p/${page.publicId}`}
                          target="_blank"
                          className="hover:underline w-full "
                        >
                          {window.location.origin}/p/{page.publicId}
                        </Link>
                      ) : (
                        <> - </>
                      )}
                    </Code>
                    {page.isPublished && (
                      <IconButton
                        size="1"
                        aria-label="Copy value"
                        color="gray"
                        variant="ghost"
                        onClick={() =>
                          navigator.clipboard.writeText(`${window.location.origin}/p/${page.publicId}`)
                        }
                        className="cursor-pointer"
                      >
                        <CopyIcon />
                      </IconButton>
                    )}
                  </Flex>
                </DataList.Value>
              </DataList.Item>

              <DataList.Item>
                <DataList.Label minWidth="88px">Last Updated</DataList.Label>
                <DataList.Value>{updatedTimeToText(page.updatedAt)}</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">Last Published</DataList.Label>
                <DataList.Value>
                  {page.isPublished ? updatedTimeToText(page.publishedAt ?? "") : "-"}
                </DataList.Value>
              </DataList.Item>
            </DataList.Root>
          </Flex>
        </Card>
      ))}
      <Card>
        <Link
          href={`/page/new?${uuidv4()}`}
          className={twMerge("flex w-full h-full justify-center items-center gap-1 min-h-[13rem]")}
        >
          <TbPlus />
          <Text> Add Page</Text>
        </Link>
      </Card>
    </Tabs>
  );
}

export const PageListSkeleton = () => {
  return (
    <Tabs
      defaultValue="pages"
      className={twMerge(
        "grid w-full grid-cols-[repeat(auto-fit,1fr)] gap-6 p-6 xl:grid-cols-[repeat(auto-fit,_minmax(300px,400px))]"
      )}
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="bg-background/40 animate-pulse p-4 space-y-4">
          <div className="h-4 w-1/2 bg-muted rounded" />
          <DataList.Root className="mt-4 space-y-2">
            <DataList.Item>
              <DataList.Label>Status</DataList.Label>
              <DataList.Value>
                <div className="h-6 w-24 bg-muted rounded-full" />
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Link</DataList.Label>
              <DataList.Value>
                <div className="h-6 w-32 bg-muted rounded" />
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Last Updated</DataList.Label>
              <DataList.Value>
                <div className="h-4 w-32 bg-muted rounded" />
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Last Published</DataList.Label>
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
