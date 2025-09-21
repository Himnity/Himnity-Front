import { Target, CheckCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Milestone {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  completed: boolean;
  icon: string;
  category: string;
}

interface MilestoneTrackerProps {
  milestones: Milestone[];
  className?: string;
}

export const MilestoneTracker = ({ milestones, className = "" }: MilestoneTrackerProps) => {
  const activeMilestones = milestones.filter(m => !m.completed);
  const completedCount = milestones.filter(m => m.completed).length;

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium font-heading text-foreground">
          Milestones
        </h3>
        <Badge variant="secondary" className="text-xs">
          {completedCount}/{milestones.length}
        </Badge>
      </div>

      <div className="space-y-2">
        {activeMilestones.slice(0, 2).map((milestone) => (
          <div key={milestone.id} className="p-2 rounded-lg bg-muted/50 space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm">{milestone.icon}</span>
              <div className="flex-1">
                <div className="text-xs font-medium text-foreground">
                  {milestone.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {milestone.progress}/{milestone.target} {milestone.description}
                </div>
              </div>
              {milestone.progress > 0 && (
                <Clock className="h-3 w-3 text-primary" />
              )}
            </div>
            
            <div className="w-full bg-background rounded-full h-1.5">
              <div 
                className="h-1.5 rounded-full bg-primary transition-all duration-300"
                style={{ width: `${(milestone.progress / milestone.target) * 100}%` }}
              />
            </div>
          </div>
        ))}
        
        {activeMilestones.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            <CheckCircle className="h-8 w-8 mx-auto mb-2 text-success" />
            <div className="text-sm">All milestones completed!</div>
          </div>
        )}
      </div>
    </div>
  );
};