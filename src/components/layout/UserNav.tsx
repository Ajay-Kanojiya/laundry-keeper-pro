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
import { LogOut, User, Phone, MapPin, Building } from "lucide-react";
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
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
                <AvatarFallback className="text-lg">
                  {user?.email?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">
                  {user?.displayName || "User"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {user?.email}
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <Phone className="mr-2 h-4 w-4" />
                <span>{user?.phoneNumber || "No phone number"}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4" />
                <span>Location not set</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Building className="mr-2 h-4 w-4" />
                <span>Organization not set</span>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}