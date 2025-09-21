import { Flame } from "lucide-react";

interface StreakCounterProps {
  streakCount: number;
  className?: string;
}

export const StreakCounter = ({ streakCount, className = "" }: StreakCounterProps) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Flame className="h-5 w-5 streak-flame" />
      <div className="text-center">
        <div className="text-lg font-bold font-heading text-accent">{streakCount}</div>
        <div className="text-xs text-muted-foreground">day streak</div>
      </div>
    </div>
  );
};