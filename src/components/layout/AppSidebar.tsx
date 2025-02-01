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
import { Home, Users, ShoppingBag, FileText, Database, CreditCard, FileDown, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { UserNav } from "./UserNav";

const menuItems = [
  { title: "Dashboard", icon: Home, path: "/", color: "#8E9196" },
  { title: "Clients", icon: Users, path: "/clients", color: "#8E9196" },
  { title: "Items", icon: ShoppingBag, path: "/items", color: "#8E9196" },
  { title: "Item Logs", icon: Database, path: "/item-logs", color: "#8E9196" },
  { title: "Invoices", icon: FileText, path: "/invoices", color: "#8E9196" },
];

const accountItems = [
  { title: "Payments", icon: CreditCard, path: "/payments", color: "#8E9196" },
  { title: "Statement", icon: FileDown, path: "/statement", color: "#8E9196" },
  { title: "Settings", icon: Settings, path: "/settings", color: "#8E9196" },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-[#E6E6E6] bg-white">
      <SidebarContent>
        <div className="px-6 py-5 border-b border-[#E6E6E6]">
          <h1 className="text-xl font-semibold text-[#232F3E]">LaundryKeeper Pro</h1>
          <p className="text-sm text-[#8E9196] mt-1">Customer Portal</p>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 py-3 text-sm font-medium text-[#8E9196]">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path}
                      className="flex items-center gap-3 px-6 py-2.5 text-[#555555] hover:bg-[#F8F9FA] hover:text-[#232F3E] rounded-md transition-colors group"
                    >
                      <item.icon className="w-5 h-5" style={{ color: item.color }} />
                      <span className="text-sm font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-6 py-3 text-sm font-medium text-[#8E9196]">
            Account Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path}
                      className="flex items-center gap-3 px-6 py-2.5 text-[#555555] hover:bg-[#F8F9FA] hover:text-[#232F3E] rounded-md transition-colors group"
                    >
                      <item.icon className="w-5 h-5" style={{ color: item.color }} />
                      <span className="text-sm font-medium">{item.title}</span>
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