import { NavLink } from "react-router-dom";
// Warm route chunks on hover to improve perceived performance
const preloaders: Record<string, () => Promise<any>> = {
  "/": () => import("@/pages/Home"),
  "/events": () => import("@/pages/Events"),
  "/storybook": () => import("@/pages/Storybook"),
  "/hall-of-fame": () => import("@/pages/HallOfFame"),
  "/profile": () => import("@/pages/Profile"),
};
import { Home, Calendar, BookOpen, Trophy, User } from "lucide-react";

const navigationItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/events", icon: Calendar, label: "Events" },
  { path: "/storybook", icon: BookOpen, label: "Storybook" },
  { path: "/hall-of-fame", icon: Trophy, label: "Hall of Fame" },
  { path: "/profile", icon: User, label: "Profile" },
];

export const BottomNavigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="grid grid-cols-5 h-16">
        {navigationItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            onMouseEnter={() => preloaders[path]?.()}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center space-y-1 transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs font-medium font-body">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
