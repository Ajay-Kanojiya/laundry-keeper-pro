import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Outlet } from "react-router-dom";
import { UserNav } from "./UserNav";

export function Layout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-portal-light">
        <AppSidebar />
        <main className="flex-1">
          <div className="border-b border-portal-border sticky top-0 bg-white z-50">
            <div className="flex h-16 items-center px-6 justify-end">
              <UserNav />
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