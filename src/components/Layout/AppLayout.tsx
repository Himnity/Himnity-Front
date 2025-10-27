import { ReactNode } from "react";
import { BottomNavigation } from "./BottomNavigation";
import { Search, Bell, LogOut, User } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import HimnityLogo from "@/assets/Himnity-Logo1.png";

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <img
              src={HimnityLogo}
              alt="Himnity logo"
              className="h-8 w-auto"
            />
            <span className="text-lg font-heading font-bold text-foreground">Himnity</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Standalone Search and Notifications */}
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full text-xs"></span>
            </Button>

            {/* User menu: profile + logout */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="p-0 rounded-full" aria-label="Open user menu">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">AG</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <div className="px-2 py-1.5 text-sm text-muted-foreground flex items-center justify-between">
                  <span>Theme</span>
                  <ThemeToggle />
                </div>
                <div className="px-2 pb-1.5 text-sm text-muted-foreground flex items-center justify-between">
                  <span>Language</span>
                  <LanguageToggle />
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast.info("Logged out (mock)")}> 
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};
