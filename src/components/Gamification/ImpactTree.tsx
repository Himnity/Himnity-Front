import { TreePine, Leaf, Flower } from "lucide-react";

interface ImpactTreeProps {
  impactPoints: number;
  level: number;
  className?: string;
  /**
   * Compact mode: hides level, stage and numeric labels (keeps icon + progress bar)
   */
  compact?: boolean;
  /**
   * Visual size emphasis
   */
  big?: boolean;
  /**
   * Choose a specific tree type emoji (overrides stage-based icon). Examples: 'pine', 'lemon', 'olive', 'palm'.
   */
  treeType?: "pine" | "lemon" | "olive" | "palm";
  /**
   * Text status of the tree (e.g. "Healthy", "Growing").
   */
  status?: string;
  /**
   * Optional link with tips on how to grow the tree.
   */
  howToGrowUrl?: string;
}

export const ImpactTree = ({ impactPoints, level, className = "", compact = false, big = false, treeType, status, howToGrowUrl }: ImpactTreeProps) => {
  const getTreeStage = (points: number) => {
    if (points < 100) return "seedling";
    if (points < 500) return "sapling"; 
    if (points < 1000) return "tree";
    return "mature";
  };

  const getTreeIcon = (stage: string) => {
    if (treeType) {
      switch (treeType) {
        case "pine": return "🌲";
        case "lemon": return "🍋";
        case "olive": return "🫒";
        case "palm": return "🌴";
      }
    }
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

  const iconSizeClass = big ? "text-6xl sm:text-7xl md:text-8xl" : "text-3xl";

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="text-center space-y-2">
        {/* Icon wrapper */}
        <div className="relative inline-block">
          <div className={`${iconSizeClass} tree-sway`}>{getTreeIcon(stage)}</div>
        </div>
        {!compact && (
          <div className="space-y-1">
            <div className="text-sm font-heading font-medium text-foreground">Level {level}</div>
            <div className="text-xs text-muted-foreground capitalize">{getStageLabel(stage)}</div>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-success to-primary transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        {!compact && (
          <div className="text-xs text-center text-muted-foreground">{impactPoints} / {nextStagePoints} points</div>
        )}
      </div>

      {(treeType || status || howToGrowUrl) && (
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
          {treeType && (
            <span className="rounded-full border border-border/60 bg-muted/60 px-2 py-0.5 text-foreground">Type: {treeType}</span>
          )}
          {status && (
            <span className="rounded-full border border-border/60 bg-muted/60 px-2 py-0.5 text-foreground">Status: {status}</span>
          )}
          {howToGrowUrl && (
            <a
              className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-primary hover:bg-primary/15"
              href={howToGrowUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              How to grow →
            </a>
          )}
        </div>
      )}
    </div>
  );
};
