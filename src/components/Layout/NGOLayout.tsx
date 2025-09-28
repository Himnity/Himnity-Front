import { ReactNode } from "react";
import { NGOBottomNavigation } from "./NGOBottomNavigation";
import { Search, Bell, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import HimnityLogo from "@/assets/Himnity-Logo.png";

interface NGOLayoutProps {
  children: ReactNode;
  title?: string;
}

export const NGOLayout = ({ children, title }: NGOLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            {title ? (
              <h1 className="text-lg font-heading font-bold text-foreground">{title}</h1>
            ) : (
              <div className="flex items-center space-x-2">
                <img
                  src={HimnityLogo}
                  alt="Himnity logo"
                  className="h-8 w-auto"
                />
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-primary text-sm">NGO Portal</span>
                  <Badge variant="secondary" className="text-xs w-fit">Organization</Badge>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <QrCode className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full text-xs"></span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <NGOBottomNavigation />
    </div>
  );
};
