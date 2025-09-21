interface XPProgressBarProps {
  currentXP: number;
  nextLevelXP: number;
  level: number;
  className?: string;
}

export const XPProgressBar = ({ currentXP, nextLevelXP, level, className = "" }: XPProgressBarProps) => {
  const progress = (currentXP / nextLevelXP) * 100;

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium font-heading text-foreground">
          Level {level}
        </span>
        <span className="text-xs text-muted-foreground">
          {currentXP} / {nextLevelXP} XP
        </span>
      </div>
      <div className="xp-bar">
        <div 
          className="xp-progress" 
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-xs text-muted-foreground text-center">
        {nextLevelXP - currentXP} XP to next level
      </div>
    </div>
  );
};