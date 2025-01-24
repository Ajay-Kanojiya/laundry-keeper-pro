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
import { Users, ShoppingBag, FileText, Home, List } from "lucide-react";
import { Link } from "react-router-dom";

const menuItems = [
  { title: "Dashboard", icon: Home, path: "/" },
  { title: "Clients", icon: Users, path: "/clients" },
  { title: "Items", icon: ShoppingBag, path: "/items" },
  { title: "Item Logs", icon: List, path: "/item-logs" },
  { title: "Invoices", icon: FileText, path: "/invoices" },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-sidebar">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 py-4 text-lg font-semibold">
            Laundry Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-sidebar-accent rounded-md transition-colors"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-base">{item.title}</span>
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