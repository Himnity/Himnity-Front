import { NavLink } from "react-router-dom";
import { Home, Calendar, Lightbulb, BarChart3 } from "lucide-react";

const preloaders: Record<string, () => Promise<unknown>> = {
  "/ngo": () => import("@/pages/NGO/NGODashboard"),
  "/ngo/proposals": () => import("@/pages/NGO/NGOProposals"),
  "/ngo/events": () => import("@/pages/NGO/NGOEvents"),
  "/ngo/analytics": () => import("@/pages/NGO/NGOAnalytics"),
};

const navigationItems = [
  { path: "/ngo", icon: Home, label: "Home", end: true },
  { path: "/ngo/proposals", icon: Lightbulb, label: "Proposals" },
  { path: "/ngo/events", icon: Calendar, label: "Events" },
  { path: "/ngo/analytics", icon: BarChart3, label: "Analytics" },
];

export const NGOBottomNavigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-sm">
      <div className="grid h-16 grid-cols-4">
        {navigationItems.map(({ path, icon: Icon, label, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            onMouseEnter={() => preloaders[path]?.()}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
