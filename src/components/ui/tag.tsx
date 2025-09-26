import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "activity" | "skill" | "location";
  className?: string;
}

export const Tag = ({ children, variant = "default", className }: TagProps) => {
  const variants = {
    default: "bg-secondary text-secondary-foreground",
    activity: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    skill: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    location: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};