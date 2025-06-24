"use client";

import * as React from "react";

import { NavMain } from "@/components/console/nav-main";
import { NavUser } from "@/components/console/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/console/ui/sidebar";
import Image from "next/image";
import { FolderIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Pages",
      url: "#",
      icon: FolderIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="/">
                <Image width={15} height={15} src="/image/pageio.svg" alt="pageio" />
                <span className="text-base font-semibold">PageIO</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {session && (
          <NavUser
            user={{
              name: session?.user?.name || "",
              email: session?.user?.email || "",
              avatar: session?.user?.image || "",
            }}
          />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
