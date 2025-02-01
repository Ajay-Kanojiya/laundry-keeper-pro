import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { LogOut, User, Phone, MapPin, Building, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function UserNav() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast({
        title: "Success",
        description: "Successfully logged out",
      });
      navigate("/login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to log out",
      });
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5 text-[#8E9196]" />
        <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full" />
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-9 w-9 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-[#0EA5E9] text-white">
                {user?.email?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-[#0EA5E9] text-white text-lg">
                    {user?.email?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none text-[#232F3E]">
                    {user?.displayName || "User"}
                  </p>
                  <p className="text-xs text-[#8E9196] mt-1">
                    {user?.email}
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-2 text-sm">
                <div className="flex items-center text-[#8E9196]">
                  <Phone className="mr-2 h-4 w-4" />
                  <span>{user?.phoneNumber || "No phone number"}</span>
                </div>
                <div className="flex items-center text-[#8E9196]">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>Location not set</span>
                </div>
                <div className="flex items-center text-[#8E9196]">
                  <Building className="mr-2 h-4 w-4" />
                  <span>Organization not set</span>
                </div>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-[#555555]">
            <User className="mr-2 h-4 w-4" />
            <span>Profile Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} className="text-[#555555]">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}