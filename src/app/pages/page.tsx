import { AppSidebar } from "@/components/console/app-sidebar";
import { DataTable } from "@/components/console/data-table";
import { SidebarInset, SidebarProvider } from "@/components/console/ui/sidebar";
import data from "./data.json";
import { ThemeProvider } from "@/components/console/theme-provider";
import { SessionProvider } from "next-auth/react";

export default function Page() {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        <SidebarProvider>
          <AppSidebar variant="inset" />
          <SidebarInset>
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  <DataTable data={data} />
                </div>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
