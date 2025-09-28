import { TreePine, Leaf, Flower } from "lucide-react";

interface ImpactTreeProps {
  impactPoints: number;
  level: number;
  className?: string;
}

export const ImpactTree = ({ impactPoints, level, className = "" }: ImpactTreeProps) => {
  const getTreeStage = (points: number) => {
    if (points < 100) return "seedling";
    if (points < 500) return "sapling"; 
    if (points < 1000) return "tree";
    return "mature";
  };

  const getTreeIcon = (stage: string) => {
    switch (stage) {
      case "seedling": return "🌱";
      case "sapling": return "🌿";
      case "tree": return "🌳";
      case "mature": return "🌲";
      default: return "🌱";
    }
  };

  const getStageLabel = (stage: string) => {
    if (stage === "tree") {
      return "Poplar Tree";
    }

    return `${stage} Tree`;
  };

  const stage = getTreeStage(impactPoints);
  const nextStagePoints = stage === "seedling" ? 100 : stage === "sapling" ? 500 : stage === "tree" ? 1000 : 2000;
  const progress = (impactPoints / nextStagePoints) * 100;

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="text-center space-y-2">
        <div className="text-3xl animate-pulse">
          {getTreeIcon(stage)}
        </div>
        <div className="space-y-1">
          <div className="text-sm font-heading font-medium text-foreground">
            Level {level}
          </div>
          <div className="text-xs text-muted-foreground capitalize">
            {getStageLabel(stage)}
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="h-2 rounded-full bg-gradient-to-r from-success to-primary transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className="text-xs text-center text-muted-foreground">
          {impactPoints} / {nextStagePoints} points
        </div>
      </div>
    </div>
  );
};
