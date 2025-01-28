import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-laundry-dark">
        <AppSidebar />
        <main className="flex-1 bg-white">
          <div className="border-b sticky top-0 bg-white z-50 shadow-sm">
            <div className="flex h-14 items-center px-4">
              <SidebarTrigger className="md:hidden p-2 hover:bg-accent rounded-md" />
            </div>
          </div>
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}