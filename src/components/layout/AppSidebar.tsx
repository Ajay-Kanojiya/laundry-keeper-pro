import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Users, ShoppingBag, FileText, Home, List, Database } from "lucide-react";
import { Link } from "react-router-dom";
import { UserNav } from "./UserNav";

const menuItems = [
  { title: "Dashboard", icon: Home, path: "/", color: "#9b87f5" },
  { title: "Clients", icon: Users, path: "/clients", color: "#7E69AB" },
  { title: "Items", icon: ShoppingBag, path: "/items", color: "#6E59A5" },
  { title: "Item Logs", icon: Database, path: "/item-logs", color: "#9b87f5" },
  { title: "Invoices", icon: FileText, path: "/invoices", color: "#7E69AB" },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-laundry-dark">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-6 text-xl font-semibold border-b border-laundry-tertiary/20 flex items-center justify-between text-white">
            Laundry Management
            <UserNav />
          </SidebarGroupLabel>
          <SidebarGroupContent className="py-4">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path}
                      className="flex items-center gap-4 px-6 py-4 hover:bg-laundry-tertiary/10 rounded-md transition-colors text-laundry-neutral hover:text-white group"
                    >
                      <item.icon 
                        className="w-6 h-6" 
                        style={{ color: item.color }}
                      />
                      <span className="text-base font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}