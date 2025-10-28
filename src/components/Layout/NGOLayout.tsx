import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { NGOBottomNavigation } from "./NGOBottomNavigation";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { Search, LogOut, User } from "lucide-react";
import { useNavHistory } from "@/hooks/useNavHistory";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import HimnityLogo from "@/assets/Himnity-Logo1.png";

interface NGOLayoutProps {
  children: ReactNode;
  title?: string;
}

export const NGOLayout = ({ children, title }: NGOLayoutProps) => {
  useNavHistory();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <img
              src={HimnityLogo}
              alt="Himnity logo"
              className="h-8 w-auto"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg font-heading font-bold text-foreground">Himnity</span>
                <Badge variant="secondary" className="text-xs uppercase tracking-wide">
                  NGO Portal
                </Badge>
              </div>
              <span className="text-xs text-muted-foreground">
                {title ?? "Empower your organization’s impact"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="ghost" size="icon" aria-label="Search" className="rounded-full">
              <Search className="h-5 w-5" />
            </Button>
            <NotificationsDropdown />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full p-0"
                  aria-label="Open organization menu"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                      GF
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuLabel>Organization</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link to="/ngo/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Preferences</DropdownMenuLabel>
                <div className="flex items-center justify-between px-2 py-1.5 text-sm text-muted-foreground">
                  <span>Theme</span>
                  <ThemeToggle />
                </div>
                <div className="flex items-center justify-between px-2 pb-1.5 text-sm text-muted-foreground">
                  <span>Language</span>
                  <LanguageToggle />
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast.info("Logged out of NGO workspace (mock)")}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-24 pt-2">
        {children}
      </main>

      {/* Bottom Navigation */}
      <NGOBottomNavigation />
    </div>
  );
};
