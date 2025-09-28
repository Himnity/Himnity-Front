import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Calendar, User, Lightbulb } from "lucide-react";

export const NGOBottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/ngo", icon: Home, label: "Home" },
    { path: "/ngo/proposals", icon: Lightbulb, label: "Proposals" },
    { path: "/ngo/events", icon: Calendar, label: "Events" },
    { path: "/ngo/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-t border-border">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path || (path === "/ngo/events" && location.pathname.startsWith("/ngo/events"));
          return (
            <Button
              key={path}
              variant="ghost"
              onClick={() => navigate(path)}
              className={`flex flex-col items-center justify-center h-14 px-3 space-y-1 transition-colors ${
                isActive
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "text-primary" : ""}`} />
              <span className="text-xs font-medium">{label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};
