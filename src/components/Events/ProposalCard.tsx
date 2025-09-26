import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowUp, Clock, User, Calendar } from "lucide-react";

interface ProposalCardProps {
  proposal: {
    id: string;
    title: string;
    description: string;
    category: string;
    proposedBy: string;
    proposedDate: string;
    preferredTime: string;
    upvotes: number;
    isUpvoted?: boolean;
  };
  onUpvote?: (proposalId: string) => void;
}

export const ProposalCard = ({ proposal, onUpvote }: ProposalCardProps) => {
  const handleUpvote = () => {
    if (onUpvote) onUpvote(proposal.id);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="p-4 card-civic border-l-4 border-l-primary">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-foreground text-lg leading-tight">
              {proposal.title}
            </h3>
            <Badge variant="outline" className="mt-2">
              {proposal.category}
            </Badge>
          </div>
          <Button
            variant={proposal.isUpvoted ? "default" : "outline"}
            size="sm"
            onClick={handleUpvote}
            className={`flex items-center space-x-1 min-w-[60px] transition-colors ${
              proposal.isUpvoted ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300'
            }`}
          >
            <ArrowUp className={`h-4 w-4 ${proposal.isUpvoted ? 'text-white' : 'text-current'}`} />
            <span className="text-sm font-medium">{proposal.upvotes}</span>
          </Button>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {proposal.description}
        </p>

        {/* Details */}
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            <span>Preferred time: {proposal.preferredTime}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center space-x-2">
            <Avatar className="w-6 h-6">
              <AvatarFallback className="text-xs bg-muted">
                {getInitials(proposal.proposedBy)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              by {proposal.proposedBy}
            </span>
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            {proposal.proposedDate}
          </div>
        </div>
      </div>
    </Card>
  );
};