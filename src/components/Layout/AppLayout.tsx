import { ReactNode } from "react";
import { BottomNavigation } from "./BottomNavigation";
import { Search, Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppLayoutProps {
  children: ReactNode;
  showFab?: boolean;
  fabAction?: () => void;
  title?: string;
}

export const AppLayout = ({ children, showFab = true, fabAction, title }: AppLayoutProps) => {
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
                <div className="w-8 h-8 rounded-lg gradient-civic flex items-center justify-center">
                  <span className="text-white font-heading font-bold text-sm">C</span>
                </div>
                <span className="font-heading font-bold text-primary">CivicConnect</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
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

      {/* Floating Action Button */}
      {showFab && (
        <Button
          onClick={fabAction}
          className="fixed bottom-20 right-4 w-14 h-14 rounded-full shadow-xl gradient-gamification hover:scale-110 transition-transform z-40"
        >
          <Plus className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};