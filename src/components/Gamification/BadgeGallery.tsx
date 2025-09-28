import { Badge } from "@/components/ui/badge";
import civicBadgesImage from "@/assets/civic-badges.jpg";

interface BadgeData {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

interface BadgeGalleryProps {
  badges: BadgeData[];
  className?: string;
}

export const BadgeGallery = ({ badges, className = "" }: BadgeGalleryProps) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className="text-lg font-heading font-semibold text-foreground">Achievements</h3>
      <div className="grid grid-cols-4 gap-3">
        {badges.map((badge) => (
          <div key={badge.id} className="text-center space-y-1">
            <div 
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg ${
                badge.unlocked 
                  ? "gradient-primary shadow-md" 
                  : "bg-muted"
              }`}
            >
              <span className={badge.unlocked ? "text-white" : "text-muted-foreground"}>
                {badge.icon}
              </span>
            </div>
            <span className={`text-xs font-medium ${
              badge.unlocked ? "text-foreground" : "text-muted-foreground"
            }`}>
              {badge.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
