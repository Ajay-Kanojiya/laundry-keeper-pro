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
          <SidebarGroupLabel className="px-4 py-6 text-xl font-semibold border-b border-sidebar-border">
            Laundry Management
          </SidebarGroupLabel>
          <SidebarGroupContent className="py-4">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path}
                      className="flex items-center gap-4 px-6 py-4 hover:bg-sidebar-accent rounded-md transition-colors text-sidebar-foreground"
                    >
                      <item.icon className="w-6 h-6" />
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