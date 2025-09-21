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

  const stage = getTreeStage(impactPoints);
  const nextStagePoints = stage === "seedling" ? 100 : stage === "sapling" ? 500 : stage === "tree" ? 1000 : 2000;
  const progress = (impactPoints / nextStagePoints) * 100;

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium font-heading text-foreground">
          Impact Level {level}
        </span>
        <span className="text-xs text-muted-foreground">
          {impactPoints} points
        </span>
      </div>
      
      <div className="flex flex-col items-center space-y-2">
        <div className="text-4xl animate-pulse">
          {getTreeIcon(stage)}
        </div>
        <div className="text-xs text-center text-muted-foreground capitalize">
          {stage} Tree
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Growth Progress</span>
          <span>{Math.min(progress, 100).toFixed(0)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="h-2 rounded-full bg-gradient-to-r from-success to-primary transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        {stage !== "mature" && (
          <div className="text-xs text-muted-foreground text-center">
            {nextStagePoints - impactPoints} points to next stage
          </div>
        )}
      </div>
    </div>
  );
};