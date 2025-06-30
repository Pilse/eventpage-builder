import { AppSidebar } from "@/components/console/app-sidebar";
import { PageList, PageListSkeleton } from "@/components/console/page-list";
import { SidebarInset, SidebarProvider } from "@/components/console/ui/sidebar";
import { auth } from "@/shared/auth";
import { getPages } from "@/service/pages";
import { Suspense } from "react";

export default async function Page() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return null;
  }

  const pagesPromise = getPages(userId);

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <Suspense fallback={<PageListSkeleton />}>
                <PageList pagesPromise={pagesPromise} userId={userId} />
              </Suspense>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
