import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Outlet } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UserNav } from "./UserNav";

export function Layout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#F8F9FA]">
        <AppSidebar />
        <main className="flex-1">
          <div className="border-b border-[#E6E6E6] sticky top-0 bg-white z-50 px-6">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden p-2 hover:bg-[#F8F9FA] rounded-md" />
                <div className="relative w-96">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#8E9196]" />
                  <Input placeholder="Search..." className="pl-8 bg-transparent border-[#E6E6E6]" />
                </div>
              </div>
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